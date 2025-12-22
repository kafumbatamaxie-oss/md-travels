export type Vehicle = {
  id: string
  name: string
  category: string
  imageUrl: string
  pricePerDay: number
  status: "AVAILABLE" | "UNAVAILABLE"
  features: string[]
  passengers: number
  transmission: string
  fuelType: string
}
