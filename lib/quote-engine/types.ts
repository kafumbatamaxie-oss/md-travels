export type QuoteBreakdownItem = {
  label: string
  amount: number
}

export type QuoteCalculationResult = {
  success: boolean

  pricingModel: string

  currency: "ZAR"

  breakdown: QuoteBreakdownItem[]

  subtotal: number
  total: number
  deposit: number

  distanceKm?: number
  durationHours?: number
  days?: number
}