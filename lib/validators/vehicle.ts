import { z } from "zod"

export const vehicleStatusEnum = z.enum([
  "ACTIVE",
  "MAINTENANCE",
  "DISABLED"
])

export const vehicleSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  capacity: z.number().min(1),

  basePrice: z.number().nullable().optional(),
  perKmPrice: z.number().nullable().optional(),
  perDayPrice: z.number().nullable().optional(),

  status: vehicleStatusEnum
})

export type VehicleInput = z.infer<typeof vehicleSchema>
