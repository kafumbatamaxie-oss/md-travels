import { z } from "zod"

export const vehicleSchema = z.object({
  name: z.string().min(2),

  slug: z.string().min(2),

  description: z.string().optional(),

  type: z.string(),

  capacity: z.number(),

  luggageCapacity: z.number().nullable().optional(),

  basePrice: z.number().nullable().optional(),

  perKmPrice: z.number().nullable().optional(),

  perDayPrice: z.number().nullable().optional(),

  airConditioning: z.boolean(),

  wifi: z.boolean(),

  executive: z.boolean(),

  featured: z.boolean(),

  active: z.boolean(),

  status: z.enum([
    "ACTIVE",
    "MAINTENANCE",
    "DISABLED",
  ]),
})