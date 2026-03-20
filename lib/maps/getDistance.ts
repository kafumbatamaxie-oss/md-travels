const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY!

type DistanceResult = {
  distanceKm: number
  durationMinutes: number
}

export async function getDistance(
  origin: string,
  destination: string
): Promise<DistanceResult> {

  const url =
    `https://maps.googleapis.com/maps/api/distancematrix/json` +
    `?origins=${encodeURIComponent(origin)}` +
    `&destinations=${encodeURIComponent(destination)}` +
    `&units=metric` +
    `&key=${GOOGLE_API_KEY}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Distance API request failed")
  }

  const data = await res.json()

  const element = data.rows?.[0]?.elements?.[0]

  if (!element || element.status !== "OK") {
    throw new Error("Unable to calculate distance")
  }

  return {
    distanceKm: element.distance.value / 1000,
    durationMinutes: element.duration.value / 60,
  }
}