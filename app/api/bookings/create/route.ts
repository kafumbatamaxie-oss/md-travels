import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

function generateBookingRef() {
  return `MDT-${Date.now()}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
        customerId,
        serviceId,
        vehicleId,

        passengers,

        pickupAddress,
        pickupLat,
        pickupLng,
        pickupPlaceId,

        destinationAddress,
        destinationLat,
        destinationLng,
        destinationPlaceId,

        startDate,

        distanceKm,
        durationMinutes,

        price,
        } = body;
    const bookingRef ="MD-" + Math.floor(100000 + Math.random() * 900000)

    let customer =
      await prisma.customer.findFirst({
        where: {
          email: body.email,
        },
      })

    if (!customer) {
      customer =
        await prisma.customer.create({
          data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
          },
        })
    }

    const booking = await prisma.booking.create({
  data: {
    bookingRef,

    customerId,
    serviceId,
    vehicleId,

    passengers,

    pickup: pickupAddress,
    destination: destinationAddress,

    pickupAddress,
    pickupLat,
    pickupLng,
    pickupPlaceId,

    destinationAddress,
    destinationLat,
    destinationLng,
    destinationPlaceId,

    startDate: new Date(startDate),

    distanceKm,
    durationMinutes,

    price,

    status: "NEW",
  },
})

    return NextResponse.json({
      success: true,
      bookingRef:
        booking.bookingRef,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Booking failed",
      },
      {
        status: 500,
      }
    )
  }
}