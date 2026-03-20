import { z } from "zod"

export const QuoteClientSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(7, "Phone is required")
.transform((val) => val.replace(/\s+/g, ""))
  .refine((val) => /^[+0-9]+$/.test(val), {
    message: "Invalid phone number",
  }),

    serviceId: z.string().min(1),
    vehicleId: z.string().min(1),

    passengers: z.string().regex(/^\d+$/),

    pickupAddress: z.string().optional(),
    destinationAddress: z.string().optional(),

    pickupLat: z.number().optional(),
    pickupLng: z.number().optional(),
    destinationLat: z.number().optional(),
    destinationLng: z.number().optional(),

    pickupDate: z.string().min(1),
    dropoffDate: z.string().optional(),

    pickupTime: z.string().min(1),

    hours: z.string().optional(),

    additionalRequirements: z.string().optional(),

    // 🔥 critical for validation logic
    pricingModel: z.string(),
  })
  .superRefine((data, ctx) => {
    const model = data.pricingModel

    const isDistanceBased =
      model === "SINGLE_TRIP" ||
      model === "AIRPORT_TRANSFER"

    const isDaily =
      model === "DAILY_TRIP" ||
      model === "HALF_DAY_TRIP"

    const isHourly = model === "HOURLY"

    if (!data.pickupTime) {
      ctx.addIssue({
        path: ["pickupTime"],
        code: z.ZodIssueCode.custom,
        message: "Pickup time is required",
      })
    }

    // ✅ DISTANCE BASED
    if (isDistanceBased) {
      if (!data.pickupAddress || data.pickupAddress.length < 3) {
        ctx.addIssue({
          path: ["pickupAddress"],
          code: z.ZodIssueCode.custom,
          message: "Pickup address is required",
        })
      }

      if (!data.destinationAddress || data.destinationAddress.length < 3) {
        ctx.addIssue({
          path: ["destinationAddress"],
          code: z.ZodIssueCode.custom,
          message: "Destination is required",
        })
      }
    }

    // ✅ DAILY
    if (isDaily) {
      if (!data.dropoffDate) {
        ctx.addIssue({
          path: ["dropoffDate"],
          code: z.ZodIssueCode.custom,
          message: "Drop-off date is required",
        })
      }
    }

    // ✅ HOURLY
    if (isHourly) {
      if (!data.hours || isNaN(Number(data.hours))) {
        ctx.addIssue({
          path: ["hours"],
          code: z.ZodIssueCode.custom,
          message: "Hours are required",
        })
      }
    }
  })