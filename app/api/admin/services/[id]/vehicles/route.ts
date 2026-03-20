import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      vehicles: {
        include: {
          vehicle: true
        }
      }
    }
  })

  const vehicles = await prisma.vehicle.findMany({
    orderBy: { name: "asc" }
  })

  return NextResponse.json({
    service,
    vehicles
  })
}



export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params
  const body = await req.json()

  const { vehicleIds } = body

  await prisma.serviceVehicle.deleteMany({
    where: { serviceId: id }
  })

  await prisma.serviceVehicle.createMany({
    data: vehicleIds.map((vehicleId: string) => ({
      serviceId: id,
      vehicleId
    }))
  })

  return NextResponse.json({ success: true })
}