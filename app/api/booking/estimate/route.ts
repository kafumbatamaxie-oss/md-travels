// app/api/booking/estimate/route.ts

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getDistance } from "@/lib/google-distance"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      serviceId,
      pickupPlaceId,
      destinationPlaceId,
    } = body

    const service =
      await prisma.service.findUnique({
        where: {
          id: serviceId,
        },
      })

    if (!service) {
      return NextResponse.json(
        {
          error: "Service not found",
        },
        {
          status: 404,
        }
      )
    }

    const {
      distanceKm,
      durationMinutes,
    } = await getDistance(
      pickupPlaceId,
      destinationPlaceId
    )

    let price = 0

    switch (service.pricingModel) {
      case "DISTANCE":
        price =
          (service.basePrice ?? 0) +
          distanceKm *
            (service.perKmPrice ?? 0)
        break

      case "FIXED":
        price =
          service.basePrice ?? 0
        break

      case "HOURLY":
        price =
          (service.perHourPrice ?? 0) *
          (durationMinutes / 60)
        break

      case "FULL_DAY":
        price =
          service.perDayPrice ?? 0
        break

      default:
        price =
          service.minimumCharge ?? 0
    }

    return NextResponse.json({
      distanceKm,
      durationMinutes,
      price: Math.round(price),
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Estimate failed",
      },
      {
        status: 500,
      }
    )
  }
}