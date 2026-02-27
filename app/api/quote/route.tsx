import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { renderToBuffer } from "@react-pdf/renderer"
import InvoicePDF from "@/components/InvoicePDF"
import { calculateQuote } from "@/lib/quote-engine/calculateQuote"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("REQUEST BODY:", body)

    console.log("STEP 1: Starting calculateQuote")
    const result = await calculateQuote(body)
    console.log("STEP 2: Quote calculated with total amount : ", result)

    console.log("STEP 3: Creating quote in DB")
    const quote = await prisma.quote.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone,

          pickupAddress: body.pickupAddress,
          destinationAddress: body.destinationAddress,

          pickupDate: new Date(body.pickupDate),
          dropoffDate: new Date(body.dropoffDate),
          pickupTime: body.pickupTime,

          passengers: Number(body.passengers),

          serviceId: body.serviceId,
          vehicleId: body.vehicleId,

          additionalRequirements: "",

          distanceKm: result.distanceKm,
          durationMinutes: result.durationMinutes,
          zoneMultiplier: result.zoneMultiplier,

          total: result.total,
          depositAmount: result.deposit,
        },
        include: {
          vehicle: true,
          service: true,
        },
      })
    
    console.log("STEP 4: Quote saved")

    console.log("STEP 5: Generating PDF")
    const pdfBuffer = await renderToBuffer(
      <InvoicePDF quote={quote as any} />
    )
    
    console.log("STEP 6: Resend api key : ", process.env.RESEND_FROM, " with api", process.env.RESEND_API_KEY)
    console.log("STEP 7: Resend is about to send PDF to ", quote.email)
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: quote.email,
      subject: `Quotation ${quote.id.slice(0, 6).toUpperCase()}`,
      html: `
        <p>Dear ${quote.firstName},</p>
        <p>Please find your official quotation attached.</p>
      `,
      attachments: [
        {
          filename: `Quotation-${quote.id.slice(0, 6)}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    console.log("STEP 8: Resend sent email with result:  ", emailResult.data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("FULL ERROR:", error)

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}