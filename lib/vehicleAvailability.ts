import {prisma }from "@/lib/prisma"

export async function isVehicleAvailable(
  vehicleId: string,
  startDate: Date,
  endDate: Date
) {

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      vehicleId,
      status: {
        in: ["RESERVED", "CONFIRMED"]
      },
      AND: [
        { startDate: { lte: endDate } },
        { endDate: { gte: startDate } }
      ]
    }
  })

  return !conflictingBooking
}