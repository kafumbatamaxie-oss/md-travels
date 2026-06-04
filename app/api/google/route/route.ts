import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      pickupPlaceId,
      destinationPlaceId,
    } = body

    if (!pickupPlaceId || !destinationPlaceId) {
      return NextResponse.json(
        {
          error: "Pickup and destination are required",
        },
        {
          status: 400,
        }
      )
    }

    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY

    const url =
      `https://maps.googleapis.com/maps/api/distancematrix/json` +
      `?origins=place_id:${pickupPlaceId}` +
      `&destinations=place_id:${destinationPlaceId}` +
      `&key=${apiKey}`

    const response = await fetch(url)

    const data = await response.json()

    const element =
      data.rows?.[0]?.elements?.[0]

    if (
      !element ||
      element.status !== "OK"
    ) {
      return NextResponse.json(
        {
          error:
            "Unable to calculate route",
        },
        {
          status: 400,
        }
      )
    }

    const distanceKm =
      element.distance.value / 1000

    const durationMinutes =
      Math.ceil(
        element.duration.value / 60
      )

    return NextResponse.json({
      distanceKm,
      durationMinutes,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Route calculation failed",
      },
      {
        status: 500,
      }
    )
  }
}