import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Resend } from "resend"
import { PDFDocument, StandardFonts } from "pdf-lib"
import fs from "fs"
import path from "path"
import { renderToBuffer } from "@react-pdf/renderer"
import InvoicePDF from "@/components/InvoicePDF"
import type { InvoiceQuote } from "@/components/InvoicePDF"

const resend = new Resend(process.env.RESEND_API_KEY)

/* -------------------- SCHEMA -------------------- */

const QuoteSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),

  pickupAddress: z.string().min(5),
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),

  destinationAddress: z.string().min(3),
  destinationLat: z.number().optional(),
  destinationLng: z.number().optional(),

  pickupDate: z.string().datetime(),
  dropoffDate: z.string().datetime(),
  pickupTime: z.string().min(3),

  passengers: z.coerce.number().int().min(1),

  serviceId: z.string().cuid(),
  vehicleCategory: z.string().min(1).optional(),

  additionalRequirements: z.string().optional(),
})

/* -------------------- PRICING ENGINE -------------------- */

function calculatePrice(data: z.infer<typeof QuoteSchema>) {
  const airportKeyword = "airport"

  const isAirportRoute =
    data.pickupAddress.toLowerCase().includes(airportKeyword) ||
    data.destinationAddress.toLowerCase().includes(airportKeyword)

  const days =
    (new Date(data.dropoffDate).getTime() -
      new Date(data.pickupDate).getTime()) /
      (1000 * 60 * 60 * 24) +
    1

  if (isAirportRoute) return 8500
  if (days > 1) return 4000 * days

  return 2500
}

/* -------------------- PDF GENERATOR -------------------- */

async function generatePDF(quote: any, total: number) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842])

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Logo
  const logoPath = path.join(process.cwd(), "public/logo.png")
  const logo = await pdfDoc.embedPng(fs.readFileSync(logoPath))

  page.drawImage(logo, { x: 40, y: 760, width: 120, height: 60 })

  // Title
  page.drawText("QUOTATION", {
    x: 420,
    y: 780,
    size: 20,
    font: bold,
  })

  // Client info
  page.drawText(`Client: ${quote.firstName} ${quote.lastName}`, {
    x: 40,
    y: 700,
    size: 12,
    font,
  })

  page.drawText(`Email: ${quote.email}`, { x: 40, y: 680, size: 12, font })
  page.drawText(`Phone: ${quote.phone}`, { x: 40, y: 660, size: 12, font })

  // Service details
  page.drawText("SERVICE DETAILS", {
    x: 40,
    y: 620,
    size: 14,
    font: bold,
  })

  page.drawText(`From: ${quote.pickupAddress}`, {
    x: 40,
    y: 600,
    size: 11,
    font,
  })

  page.drawText(`To: ${quote.destinationAddress}`, {
    x: 40,
    y: 580,
    size: 11,
    font,
  })

  page.drawText(`Passengers: ${quote.passengers}`, {
    x: 40,
    y: 560,
    size: 11,
    font,
  })

  // Price
  page.drawText(`TOTAL: R ${total.toLocaleString()}`, {
    x: 40,
    y: 520,
    size: 16,
    font: bold,
  })

  return await pdfDoc.save()
}



/* -------------------- API -------------------- */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = QuoteSchema.parse(body)
    const total = calculatePrice(parsed)

    /* ---------- SAVE QUOTE ---------- */

    const quote = await prisma.quote.create({
      data: {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
      phone: parsed.phone,

      pickupAddress: parsed.pickupAddress,
      pickupLat: parsed.pickupLat ?? 0,
      pickupLng: parsed.pickupLng ?? 0,

      destinationAddress: parsed.destinationAddress,
      destinationLat: parsed.destinationLat ?? 0,
      destinationLng: parsed.destinationLng ?? 0,

      pickupDate: new Date(parsed.pickupDate),
      dropoffDate: new Date(parsed.dropoffDate),
      pickupTime: parsed.pickupTime,

      passengers: parsed.passengers,

      vehicleCategory: parsed.vehicleCategory ?? "STANDARD",

      serviceId: parsed.serviceId,
      additionalRequirements: parsed.additionalRequirements,

      status: "NEW",
      total,
        },
        include: { service: true },
    })

    
    /* ---------- GENERATE PDF FROM PRISMA RESPONSE ---------- */
    const pdfQuote: InvoiceQuote = {
        id: quote.id,
        firstName: quote.firstName,
        lastName: quote.lastName,
        email: quote.email,
        phone: quote.phone,
        pickupAddress: quote.pickupAddress ?? "N/A",
        destinationAddress: quote.destinationAddress ?? "N/A",
        pickupDate: quote.pickupDate,
        passengers: quote.passengers,
        vehicleCategory: quote.vehicleCategory ?? "STANDARD",
        total: Number(quote.total ?? 0),
        service: quote.service
          ? { name: quote.service.name }
          : null,
      }


    const pdfBuffer = await renderToBuffer(<InvoicePDF quote={pdfQuote} />)

    

    
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: quote.email,
      subject: `MD Travels Invoice ${quote.id.slice(0, 6).toUpperCase()}`,
      html: `
        <p>Dear ${quote.firstName},</p>
        <p>Please find your official invoice attached.</p>
        <p>Thank you for choosing MD Travels.</p>
        <p>Kind regards,<br/>MD Travels</p>
      `,
      attachments: [
        {
          filename: `MD-Invoice-${quote.id.slice(0, 6)}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, message: "Error creating quote" },
      { status: 500 }
    )
  }
}
