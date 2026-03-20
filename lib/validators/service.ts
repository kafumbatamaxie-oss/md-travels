import { z } from "zod"

export const pricingModelEnum = z.enum([
  "AIRPORT_TRANSFER",
  "SINGLE_TRIP",
  "DAILY_TRIP",
  "HALF_DAY_TRIP",
  "HOURLY"
])

export const serviceSchema = z.object({
  name: z.string().min(2, "Service name required"),
  description: z.string().optional(),
  pricingModel: pricingModelEnum,

  basePrice: z.number().nullable().optional(),
  pricePerKm: z.number().nullable().optional(),
  pricePerDay: z.number().nullable().optional()
})

export type ServiceInput = z.infer<typeof serviceSchema>
