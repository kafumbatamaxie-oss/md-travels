import { PricingContext } from "../types"
import { resolveBasePrice, resolvePerKm } from "../priceResolvers"

export function airportTransferPrice(ctx: PricingContext) {

  const base = resolveBasePrice(ctx.service, ctx.vehicle)
  const perKm = resolvePerKm(ctx.service, ctx.vehicle)

  const distance = ctx.distanceKm ?? 0

  return base + distance * perKm
}