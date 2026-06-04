import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json()

    const draft =
      await prisma.bookingDraft.create({
        data: {
          pickup:
            body.pickup || "",

          destination:
            body.destination || "",

          distanceKm:
            body.distanceKm,

          durationMin:
            body.durationMin,

          vehicleId:
            body.vehicleId,

          estimatedPrice:
            body.estimatedPrice,
        },
      })

    return NextResponse.json(
      draft
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to save draft",
      },
      {
        status: 500,
      }
    )
  }
}