interface PricingInput {
  distanceKm: number

  pricingModel:
    | "FIXED"
    | "DISTANCE"
    | "HOURLY"
    | "FULL_DAY"

  basePrice?: number | null
  perKmPrice?: number | null
}

export function calculatePrice(
  input: PricingInput
) {
  switch (input.pricingModel) {
    case "DISTANCE":
      return (
        (input.basePrice || 0) +
        input.distanceKm *
          (input.perKmPrice || 0)
      )

    case "FIXED":
      return input.basePrice || 0

    default:
      return input.basePrice || 0
  }
}