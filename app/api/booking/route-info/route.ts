import { NextResponse } from "next/server"

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json()

    const {
      pickupPlaceId,
      destinationPlaceId,
    } = body

    const url =
      `https://maps.googleapis.com/maps/api/distancematrix/json` +
      `?origins=place_id:${pickupPlaceId}` +
      `&destinations=place_id:${destinationPlaceId}` +
      `&key=${process.env.GOOGLE_MAPS_API_KEY}`

    const response =
      await fetch(url)

    const data =
      await response.json()

    const element =
      data.rows[0].elements[0]

    return NextResponse.json({
      distanceKm:
        element.distance.value /
        1000,

      durationMin:
        Math.round(
          element.duration.value /
            60
        ),
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to calculate route",
      },
      {
        status: 500,
      }
    )

  }
}