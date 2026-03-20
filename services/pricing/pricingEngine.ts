import { PricingContext } from "./types"

import { airportTransferPrice } from "./models/airportTransfer"
import { singleTripPrice } from "./models/singleTrip"
import { dailyTripPrice } from "./models/dailyTrip"
import { halfDayTripPrice } from "./models/halfDayTrip"
import { hourlyPrice } from "./models/hourly"

export function calculateQuoteItemPrice(ctx: PricingContext) {

  switch (ctx.service.pricingModel) {

    case "AIRPORT_TRANSFER":
      return airportTransferPrice(ctx)

    case "SINGLE_TRIP":
      return singleTripPrice(ctx)

    case "DAILY_TRIP":
      return dailyTripPrice(ctx)

    case "HALF_DAY_TRIP":
      return halfDayTripPrice(ctx)

    case "HOURLY":
      return hourlyPrice(ctx)

    default:
      throw new Error("Unsupported pricing model")
  }
}