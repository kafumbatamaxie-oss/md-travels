export async function getDistance(
  origin: string,
  destination: string
): Promise<{ distanceKm: number; durationMinutes: number }> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    
    throw new Error("GOOGLE_MAPS_API_KEY is not defined")
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Google API HTTP error: ${res.status}`)
  }

  const data = await res.json()

  console.log("Google Distance API response:", data)

  // Check top-level API status
  if (data.status !== "OK") {
    throw new Error(`Google API error: ${data.status} - ${data.error_message ?? "No message"}`)
  }

  // Check structure safely
  if (!data.rows?.[0]?.elements?.[0]) {
    throw new Error("Invalid Distance Matrix response structure")
  }

  const element = data.rows[0].elements[0]

  if (element.status !== "OK") {
    throw new Error(`Route error: ${element.status}`)
  }

  const distanceKm = element.distance.value / 1000
  const durationMinutes = element.duration.value / 60

  return {
    distanceKm,
    durationMinutes,
  }
}