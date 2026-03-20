import { PricingContext } from "../types"
import { resolvePerKm } from "../priceResolvers"

export function singleTripPrice(ctx: PricingContext) {

  const perKm = resolvePerKm(ctx.service, ctx.vehicle)

  return (ctx.distanceKm ?? 0) * perKm
}