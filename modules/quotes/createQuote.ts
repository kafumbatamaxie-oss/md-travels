import { prisma } from "@/lib/prisma"
import { calculateQuoteItemPrice } from "@/services/pricing/pricingEngine"

export function ensure<T>(value: T | null, message: string): T {
  if (!value) throw new Error(message)
  return value
}

export async function createQuoteItem(data: {
  serviceId: string
  vehicleId?: string
  passengers: number
  startDate?: Date
  endDate?: Date
  distanceKm?: number
}) {

    const service = ensure(
    await prisma.service.findUnique({ where: { id: data.serviceId } }),
    "Service not found"
    )

  if (!service) {
    throw new Error("Service not found")
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId }
    }) ?? undefined

  const price = calculateQuoteItemPrice({
    service,
    vehicle,
    passengers: data.passengers,
    startDate: data.startDate,
    endDate: data.endDate,
    distanceKm: data.distanceKm
  })

  return price
}