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

    console.log("QUOTE BODY:", body)

    // ✅ SAFETY: ensure required fields
    if (!body.serviceId || !body.vehicleId) {
      throw new Error("Missing service or vehicle")
    }

    // 1. Calculate quote (SAFE WRAP)
    let result
    try {
      result = await calculateQuote(body)
    } catch (err) {
      console.error("CALCULATION ERROR:", err)
      throw new Error("Quote calculation failed")
    }

    // 2. Customer
    let customer = await prisma.customer.findFirst({
      where: { email: body.email },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: `${body.firstName} ${body.lastName}`,
          email: body.email,
          phone: body.phone,
        },
      })
    }

    // 3. Quote number
    const quoteNumber = `QT-${Date.now()}`

    // ✅ SAFE DATE HANDLING
    const pickupDate = body.pickupDate
      ? new Date(body.pickupDate)
      : new Date()

    const dropoffDate = body.dropoffDate
      ? new Date(body.dropoffDate)
      : null

    // 4. Create quote
    const quote = await prisma.quote.create({
      data: {
        quoteNumber,
        customerId: customer.id,
        status: "PENDING",
        totalPrice: result.total,
        items: {
        create: result.breakdown.map((item) => ({
          serviceId: body.serviceId,
          vehicleId: body.vehicleId,

          description: item.label,

          passengers: Number(body.passengers || 0),

          pickup: body.pickupAddress || "",
          destination: body.destinationAddress || "",

          startDate: pickupDate,
          endDate: dropoffDate,

          distanceKm: result.distanceKm || 0,

          price: item.amount,
        })),
      },
       
      },
      include: {
        customer: true,
        items: {
          include: {
            service: true,
            vehicle: true,
          },
        },
      },
    })

    // 5. Generate PDF (SAFE)
    let pdfBuffer: Buffer | null = null

    try {
      console.log("Altrotech here is the quote data: ", quote)
      pdfBuffer = await renderToBuffer(
        <InvoicePDF quote={quote as any} />
      )
    } catch (err) {
      console.error("PDF ERROR:", err)
    }

    const quoteRef = quote.quoteNumber

    // 6. Email client
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: quote.customer.email,
        subject: `Quotation ${quoteRef}`,
        html: `
          <p>Dear ${quote.customer.name},</p>
          <p>Please find your quotation attached.</p>
        `,
        attachments: pdfBuffer
          ? [
              {
                filename: `Quotation-${quoteRef}.pdf`,
                content: pdfBuffer,
              },
            ]
          : [],
      })
    } catch (err) {
      console.error("CLIENT EMAIL ERROR:", err)
    }

    // 7. Staff email
    try {
      const staffEmails = [
        "info@mdtravels.co.za",
        "malipheze@mdtravels.co.za",
        "iviwedlunge111@gmail.com",
      ]

      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: staffEmails,
        subject: `🚨 New Quote - ${quoteRef}`,
        html: `
          <h3>New Quote Received</h3>
          <p><strong>Quote:</strong> ${quoteRef}</p>
          <p><strong>Name:</strong> ${quote.customer.name}</p>
          <p><strong>Email:</strong> ${quote.customer.email}</p>
          <p><strong>Total:</strong> R${quote.totalPrice}</p>
        `,
        attachments: pdfBuffer
          ? [
              {
                filename: `Quotation-${quoteRef}.pdf`,
                content: pdfBuffer,
              },
            ]
          : [],
      })
    } catch (err) {
      console.error("STAFF EMAIL ERROR:", err)
    }

    return NextResponse.json({
      success: true,
      total: result.total,
      deposit: result.deposit,
    })
  } catch (error) {
    console.error("QUOTE ERROR:", error)

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    )
  }
}