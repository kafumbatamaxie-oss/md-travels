// lib/validators/booking-estimate.ts

import { z } from "zod"

export const bookingEstimateSchema = z.object({
  serviceId: z.string(),
  vehicleId: z.string(),

  pickup: z.string(),
  destination: z.string(),

  passengers: z.number().min(1),

  startDate: z.string(),
})