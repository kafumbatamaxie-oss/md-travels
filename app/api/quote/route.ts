import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Resend } from "resend"
import { sendSMS } from "@/lib/sms"
import { QuoteAlertEmailTemplate } from "@/lib/emails/quote-alert-email"
import { QuoteConfirmationEmailTemplate } from "@/lib/emails/quote-confirmation-email"

const resend = new Resend(process.env.RESEND_API_KEY)

/* -------------------- ZOD SCHEMA -------------------- */
const QuoteSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),

  pickupAddress: z.string().min(5),
  destination: z.string().min(3),
  pickupDate: z.string().datetime(),
  dropoffDate: z.string().datetime(),
  pickupTime: z.string().min(3),
  passengers: z.coerce.number().int().min(1),

  serviceId: z.string().cuid(),

  additionalRequirements: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    /* ---------- VALIDATION ---------- */
    const parsed = QuoteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data;
    

    /* ---------- VERIFY SERVICE ---------- */
    const service = await prisma.service.findFirst({
      where: { id: data.serviceId, active: true },
      select: { id: true, name: true },
    })

    if (!service) {
      return NextResponse.json(
        { success: false, message: "Invalid service selected" },
        { status: 400 }
      )
    }



    /* ---------- CREATE QUOTE ---------- */
    const quote = await prisma.quote.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        pickupAddress: data.pickupAddress,
        destination: data.destination,
        pickupDate: new Date(data.pickupDate),
        dropoffDate: new Date(data.dropoffDate),
        pickupTime: data.pickupTime,
        passengers: data.passengers,
        serviceId: service.id,
        additionalRequirements: data.additionalRequirements,
        status: "NEW",
      },
      include: {
        service: true,
      },
    })

    const {firstName, lastName, phone, pickupAddress, destination } = data;
    const serviceName = service.name

    
 

    /* ---------- EMAILS (NON-BLOCKING) ---------- */
    Promise.allSettled([
      resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: ['kafumbatamaxie@gmail.com',"info@mdtraders.co.za","malipheze@mdtravels.co.za"],
        subject: `🔔🆕🔔 New Inquiry: ${quote.service.name}`,
        html: QuoteAlertEmailTemplate(firstName, lastName, phone, serviceName, pickupAddress, destination)
      }),

      resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: data.email,
        subject: "✅ Quote Request Received",
        html: QuoteConfirmationEmailTemplate(firstName, serviceName, pickupAddress, destination)
      }),
    ])

    // Send sms
     // 🔔 ADMIN SMS (non-blocking)
    sendSMS({
        to: process.env.ADMIN_PHONE!,
        message: `🔔🚗 New Quote Request
        Service: ${quote.service.name}
        From: ${quote.pickupAddress}
        To: ${quote.destination}
        Name: ${quote.firstName} ${quote.lastName}
        Phone: ${quote.phone}`,
      })

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
    })
  } catch (error) {
    console.error("[QUOTE_API_ERROR]", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
