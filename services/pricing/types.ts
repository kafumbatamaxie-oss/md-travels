import { Service, Vehicle } from "@prisma/client"

export type PricingContext = {
  service: Service
  vehicle?: Vehicle

  passengers: number

  startDate?: Date
  endDate?: Date

  distanceKm?: number
}