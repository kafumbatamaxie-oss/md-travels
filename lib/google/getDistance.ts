export async function getDistance(
  origin: string,
  destination: string
): Promise<{ distanceKm: number; durationMinutes: number }> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`

  const res = await fetch(url)
  const data = await res.json()

  const element = data.rows[0].elements[0]

  const distanceKm = element.distance.value / 1000
  const durationMinutes = element.duration.value / 60

  return {
    distanceKm,
    durationMinutes,
  }
}