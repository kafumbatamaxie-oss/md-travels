import { NextResponse } from "next/server"
import { Resend } from "resend"
import { generateInvoice } from "@/lib/generateInvoice"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

  const formData = await req.formData()

  const clientName = formData.get("clientName") as string
  const clientEmail = formData.get("clientEmail") as string
  const clientPhone = formData.get("clientPhone") as string
  const startDate = formData.get("startDate") as string
  const numberOfDays = Number(formData.get("numberOfDays") || 1)
  const packageType = formData.get("packageType") as string

  // 🔥 HARD CODED PRICING
  const airportPrice = 8500
  const dailyTripPrice = 4000
  const depositRate = 0.5

  let totalPrice = 0
  let tripItems: any[] = []

  if (packageType === "AIRPORT_ONLY") {
    totalPrice = airportPrice
    tripItems.push({
      description: "Airport Transfer (Arrival + Return)",
      quantity: 1,
      total: airportPrice
    })
  }

  if (packageType === "DAILY_ONLY") {
    totalPrice = dailyTripPrice * numberOfDays
    tripItems.push({
      description: "Daily Trip",
      quantity: numberOfDays,
      total: totalPrice
    })
  }

  if (packageType === "FULL_PACKAGE") {
    totalPrice = airportPrice + (dailyTripPrice * numberOfDays)

    tripItems.push({
      description: "Airport Transfer (Arrival + Return)",
      quantity: 1,
      total: airportPrice
    })

    tripItems.push({
      description: "Daily Trip",
      quantity: numberOfDays,
      total: dailyTripPrice * numberOfDays
    })
  }

  const depositDue = totalPrice * depositRate
  const balanceDue = totalPrice - depositDue
  

  const pdfBuffer = await generateInvoice({
    clientName,
    clientEmail,
    clientPhone,
    tripItems,
    totalPrice,
    depositDue,
    balanceDue
  }, tripItems)

  await resend.emails.send({
    from: "info@mdshuttles.co.za",
    to: clientEmail,
    subject: "MD Shuttles Booking Invoice",
    html: `
      <h2>Dear ${clientName}</h2>
      <p>Total: R ${totalPrice}</p>
      <p>Deposit Required: R ${depositDue}</p>
    `,
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdfBuffer
      }
    ]
  })

  return NextResponse.redirect(new URL("/", req.url))
}