export function calculateBookingPrice({
  service,
  vehicle,
  distanceKm,
}: {
  service: any
  vehicle: any
  distanceKm: number
}) {
  let price = 0

  if (service.pricingModel === "DISTANCE") {
    price =
      (vehicle.perKmPrice || service.perKmPrice || 0) *
      distanceKm

    if (service.minimumCharge) {
      price = Math.max(
        price,
        service.minimumCharge
      )
    }
  }

  if (service.pricingModel === "FULL_DAY") {
    price =
      vehicle.perDayPrice ||
      service.perDayPrice ||
      0
  }

  return Math.round(price)
}