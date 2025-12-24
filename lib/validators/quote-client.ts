// lib/validators/quote-client.ts
import { z } from "zod"

export const QuoteClientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),

  pickupAddress: z.string().min(3),
  destination: z.string().min(3),

  pickupDate: z.string(),
  dropoffDate: z.string(),
  pickupTime: z.string(),

  passengers: z.string().regex(/^\d+$/),
  serviceId: z.string().min(1),
})
