import { PricingContext } from "../types"
import { resolveBasePrice } from "../priceResolvers"

export function hourlyPrice(ctx: PricingContext) {

  const hourlyRate = resolveBasePrice(ctx.service, ctx.vehicle)

  const start = new Date(ctx.startDate!)
  const end = new Date(ctx.endDate!)

  const hours =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60)

  return hourlyRate * hours
}