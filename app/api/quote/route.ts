import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Resend } from "resend"

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

    const data = parsed.data

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

    /* ---------- EMAILS (NON-BLOCKING) ---------- */
    Promise.allSettled([
      resend.emails.send({
        from: "MD Travels <no-reply@resend.dev>",
        to: process.env.ADMIN_EMAIL!,
        subject: "🆕 New Quote Request",
        html: `
          <h2>New Quote Request</h2>
          <p><b>Name:</b> ${quote.firstName} ${quote.lastName}</p>
          <p><b>Phone:</b> ${quote.phone}</p>
          <p><b>Service:</b> ${quote.service.name}</p>
          <p><b>Pickup:</b> ${quote.pickupAddress}</p>
          <p><b>Destination:</b> ${quote.destination}</p>
        `,
      }),

      resend.emails.send({
        from: "MD Travels <admin@resend.dev>",
        to: quote.email,
        subject: "✅ Quote Request Received",
        html: `
          <h2>Thank you ${quote.firstName}!</h2>
          <p>Your request for <b>${quote.service.name}</b> has been received.</p>
          <p>Our Cape Town team will contact you shortly.</p>
          <br/>
          <p>MD Travels</p>
        `,
      }),
    ])

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
