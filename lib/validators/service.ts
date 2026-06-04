import { z } from "zod"

export const serviceSchema = z.object({
  name: z.string().min(2),

  slug: z.string().min(2),

  description: z.string().optional(),

  category: z.enum([
    "AIRPORT_TRANSFER",
    "CORPORATE",
    "EVENT",
    "WEDDING",
    "VIP",
    "TOUR",
    "SHUTTLE",
    "STAFF",
    "SCHOOL",
    "CHAUFFEUR",
  ]),

  pricingModel: z.enum([
    "FIXED",
    "DISTANCE",
    "HOURLY",
    "HALF_DAY",
    "FULL_DAY",
    "CUSTOM",
  ]),

  basePrice: z.number().nullable().optional(),

  perKmPrice: z.number().nullable().optional(),

  perHourPrice: z.number().nullable().optional(),

  perDayPrice: z.number().nullable().optional(),

  minimumCharge: z.number().nullable().optional(),

  active: z.boolean(),
  featured: z.boolean().default(false),
  vehicleIds: z.array(z.string()).optional(),
})