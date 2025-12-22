// Raw DB shape (Prisma output)
export type DbVehicle = {
  id: string
  name: string
  brand: string
  category: string
  passengers: number
  pricePerDay: number
  imageUrl: string
  status: string
  description?: string | null
  fuelType?: string | null
  createdAt: Date
  updatedAt: Date
}

// UI-ready vehicle
export type UiVehicle = {
  id: string
  name: string
  category: string
  imageUrl: string
  pricePerDay: number
  status: string
  passengers: number
  fuelType: string
  transmission: string
  features: string[]
}
