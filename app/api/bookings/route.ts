import { isVehicleAvailable } from "@/lib/vehicleAvailability"
import {prisma }from "@/lib/prisma"

export async function createBooking(data: any) {

  const available = await isVehicleAvailable(
    data.vehicleId,
    data.startDate,
    data.endDate
  )

  if (!available) {
    throw new Error("Vehicle already booked for this time")
  }

  return prisma.booking.create({
    data
  })
}