// lib/quote/types.ts

export type QuoteBreakdownItem = {
  serviceId: string
  serviceName: string

  vehicleId?: string
  vehicleName?: string

  pricingModel: string

  passengers: number

  distanceKm?: number
  durationHours?: number
  days?: number

  unitPrice: number
  quantity: number

  subtotal: number
}

export type QuoteCalculationResult = {
  success: boolean

  currency: string

  items: QuoteBreakdownItem[]

  subtotal: number
  taxAmount: number
  totalPrice: number

  notes?: string[]

  warnings?: string[]
}