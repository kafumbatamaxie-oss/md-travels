import { prisma } from "@/lib/prisma"
import { QuoteCalculationResult } from "./types"
import { getDistance } from "@/lib/maps/getDistance"

export async function calculateQuote(
  data: any
): Promise<QuoteCalculationResult> {

  // --------------------------------------------------
  // 1. Load Service + Vehicle
  // --------------------------------------------------
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  })

  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  })

  if (!service || !vehicle) {
    throw new Error("Invalid service or vehicle")
  }

  const pricingModel = service.pricingModel

  const breakdown: QuoteCalculationResult["breakdown"] = []

  let subtotal = 0
  let distanceKm = 0
  let durationMinutes = 0
  let hours = Number(data.hours || 0)
  let days = 1

  // --------------------------------------------------
  // 2. AUTO DISTANCE CALCULATION (NEW ✅)
  // --------------------------------------------------
  const needsDistance =
    pricingModel === "AIRPORT_TRANSFER" ||
    pricingModel === "SINGLE_TRIP"

  if (needsDistance) {
    if (!data.pickupAddress || !data.destinationAddress) {
      throw new Error(
        "Pickup and destination required for distance calculation"
      )
    }

    const distance = await getDistance(
      data.pickupAddress,
      data.destinationAddress
    )

    distanceKm = distance.distanceKm
    durationMinutes = distance.durationMinutes
  }

  // --------------------------------------------------
  // 3. Calculate Days (for daily trips)
  // --------------------------------------------------
  if (data.pickupDate && data.dropoffDate) {
    const start = new Date(data.pickupDate).getTime()
    const end = new Date(data.dropoffDate).getTime()

    const diff = Math.ceil(
      (end - start) / (1000 * 60 * 60 * 24)
    )

    days = Math.max(diff, 1)
  }

  // --------------------------------------------------
  // 4. Pricing Logic
  // --------------------------------------------------
  switch (pricingModel) {

    /**
     * ======================================
     * AIRPORT / CITY POINT-TO-POINT
     * ======================================
     */
    case "AIRPORT_TRANSFER":
    case "SINGLE_TRIP": {

      const base =
        vehicle.basePrice ??
        service.basePrice ??
        0

      const perKm =
        vehicle.perKmPrice ??
        service.pricePerKm ??
        0

      const distanceCost = distanceKm * perKm

      breakdown.push(
        {
          label: "Base Fare",
          amount: base,
        },
        {
          label: `Distance (${distanceKm.toFixed(1)} km)`,
          amount: distanceCost,
        }
      )

      subtotal = base + distanceCost
      break
    }

    /**
     * ======================================
     * HOURLY (Event Shuttle)
     * ======================================
     */
    case "HOURLY": {

      if (!hours || hours <= 0) {
        throw new Error("Hours required for hourly booking")
      }

      const hourlyRate =
        vehicle.perDayPrice ??
        service.pricePerDay ??
        0

      const total = hourlyRate * hours

      breakdown.push({
        label: `Hourly Hire (${hours} hrs)`,
        amount: total,
      })

      subtotal = total
      durationMinutes = hours * 60
      break
    }

    /**
     * ======================================
     * DAILY / LONG DISTANCE
     * ======================================
     */
    case "DAILY_TRIP":
    case "HALF_DAY_TRIP": {

      const dailyRate =
        vehicle.perDayPrice ??
        service.pricePerDay ??
        0

      const total = dailyRate * days

      breakdown.push({
        label: `Vehicle Hire (${days} day${days > 1 ? "s" : ""})`,
        amount: total,
      })

      subtotal = total
      break
    }

    default:
      throw new Error(`Unsupported pricing model: ${pricingModel}`)
  }

  // --------------------------------------------------
  // 5. Business Rules
  // --------------------------------------------------

  // Minimum transport charge
  const MINIMUM_CHARGE = 500

  if (subtotal < MINIMUM_CHARGE) {
    breakdown.push({
      label: "Minimum Service Charge Adjustment",
      amount: MINIMUM_CHARGE - subtotal,
    })

    subtotal = MINIMUM_CHARGE
  }

  // Passenger transport VAT exempt
  const taxAmount = 0

  const total = subtotal + taxAmount

  // 30% deposit
  const deposit = Math.round(total * 0.3)

  // --------------------------------------------------
  // 6. Final Result
  // --------------------------------------------------
  return {
    success: true,

    pricingModel,
    currency: "ZAR",

    breakdown,

    subtotal,
    total,
    deposit,

    distanceKm,

    durationHours: durationMinutes / 60,
    days,
  }
}