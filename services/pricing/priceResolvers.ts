import { Service, Vehicle } from "@prisma/client"

// Purpose: determine which price to use (vehicle vs service).
export function resolveBasePrice(service: Service, vehicle?: Vehicle) {
  return vehicle?.basePrice ?? service.basePrice ?? 0
}

export function resolvePerKm(service: Service, vehicle?: Vehicle) {
  return vehicle?.perKmPrice ?? service.pricePerKm ?? 0
}

export function resolvePerDay(service: Service, vehicle?: Vehicle) {
  return vehicle?.perDayPrice ?? service.pricePerDay ?? 0
}