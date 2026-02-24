import { z } from "zod"

export const QuoteClientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),

  pickupAddress: z.string().min(3),
  destinationAddress: z.string().min(3),

  pickupLat: z.number(),
  pickupLng: z.number(),
  destinationLat: z.number(),
  destinationLng: z.number(),

  pickupDate: z.string().min(1),
  dropoffDate: z.string().min(1),
  pickupTime: z.string().min(1),

  passengers: z.string().regex(/^\d+$/),

  serviceId: z.string().min(1),

  // 🔥 THIS is the correct field
  vehicleId: z.string().min(1),

  additionalRequirements: z.string().optional(),
})