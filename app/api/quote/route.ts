import { NextRequest, NextResponse } from "next/server"
import Twilio from "twilio"
import { prisma } from "@/lib/prisma"

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      pickupAddress,
      destination,
      pickupDate,
      dropoffDate,
      pickupTime,
      passengers,
      serviceType,
      additionalRequirements,
    } = data

    if (!firstName || !phone || !pickupAddress || !serviceType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    /* -------------------- SAVE TO DATABASE -------------------- */
    const quote = await prisma.quote.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        pickupAddress,
        destination,
        pickupDate: new Date(pickupDate),
        dropoffDate: new Date(dropoffDate),
        pickupTime,
        passengers: Number(passengers),
        serviceType,
        additionalRequirements,
        status: "NEW",
      },
    })

    /* -------------------- SEND SMS -------------------- */
    const smsBody = `
🆕 MD Travels Quote Request

Name: ${firstName} ${lastName}
Phone: ${phone}
Service: ${serviceType}
Passengers: ${passengers}

Pickup: ${pickupAddress}
Destination: ${destination}

Dashboard:
https://www.mdtravels.co.za/dashboard
`

    await client.messages.create({
      body: smsBody,
      to: "+27815116234",
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID!,
    })

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully",
      quoteId: quote.id,
    })
  } catch (error) {
    console.error("[QUOTE_ERROR]", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit quote" },
      { status: 500 }
    )
  }
}
