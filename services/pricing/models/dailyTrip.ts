import { PricingContext } from "../types"
import { resolvePerDay } from "../priceResolvers"

export function dailyTripPrice(ctx: PricingContext) {

  const perDay = resolvePerDay(ctx.service, ctx.vehicle)

  const start = new Date(ctx.startDate!)
  const end = new Date(ctx.endDate!)

  const diffMs = end.getTime() - start.getTime()

  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  return days * perDay
}