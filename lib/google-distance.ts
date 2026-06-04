// lib/google-distance.ts

export async function getDistance(
  originPlaceId: string,
  destinationPlaceId: string
) {
  const key = process.env.GOOGLE_MAPS_API_KEY

  const url =
    `https://maps.googleapis.com/maps/api/distancematrix/json` +
    `?origins=place_id:${originPlaceId}` +
    `&destinations=place_id:${destinationPlaceId}` +
    `&key=${key}`

  const response = await fetch(url)

  const data = await response.json()

  const element =
    data.rows?.[0]?.elements?.[0]

  if (!element || element.status !== "OK") {
    throw new Error("Distance lookup failed")
  }

  return {
    distanceKm:
      element.distance.value / 1000,

    durationMinutes:
      Math.round(
        element.duration.value / 60
      ),
  }
}