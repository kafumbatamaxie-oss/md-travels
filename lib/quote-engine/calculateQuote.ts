import { prisma } from "@/lib/prisma"
import { getDistance } from "../google/getDistance"
import { getZoneMultiplier } from "./getZoneMultiplier"

export async function calculateQuote(data: any) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  })

  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  })

  if (!vehicle || !service) throw new Error("Invalid selection")

  const { distanceKm, durationMinutes } = await getDistance(
    data.pickupAddress,
    data.destinationAddress
  )

  const zoneMultiplier = await getZoneMultiplier(
    data.destinationAddress
  )

  const days =
    (new Date(data.dropoffDate).getTime() -
      new Date(data.pickupDate).getTime()) /
      (1000 * 60 * 60 * 24) +
    1

  let total = service.basePrice ?? 0

  if (service.pricingType === "DISTANCE") {
    total += (vehicle.perKmRate ?? 0) * distanceKm
  }

  if (service.pricingType === "HOURLY") {
    const hours = durationMinutes / 60
    total += (vehicle.hourlyRate ?? 0) * hours
  }

  if (service.pricingType === "DAILY") {
    total += (vehicle.dailyRate ?? 0) * days
  }

  total = total * zoneMultiplier

  const deposit = total * 0.5

  return {
    distanceKm,
    durationMinutes,
    zoneMultiplier,
    total,
    deposit,
  }
}