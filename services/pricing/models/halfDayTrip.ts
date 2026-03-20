
import { PricingContext } from "../types"
import { resolvePerDay } from "../priceResolvers"

export function halfDayTripPrice(ctx: PricingContext) {

  const perDay = resolvePerDay(ctx.service, ctx.vehicle)

  return perDay * 0.6
}