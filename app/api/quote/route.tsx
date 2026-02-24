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

    const result = await calculateQuote(body)

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

    const pdfBuffer = await renderToBuffer(
      <InvoicePDF quote={quote as any} />
    )

    await resend.emails.send({
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}