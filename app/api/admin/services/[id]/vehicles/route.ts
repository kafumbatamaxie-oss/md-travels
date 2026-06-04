import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const service = await prisma.service.findUnique({
    where: {
      id,
    },

    include: {
      vehicles: {
        include: {
          vehicle: true,
        },
      },
    },
  })

  return NextResponse.json(
    service?.vehicles.map(
      (sv) => sv.vehicle
    ) || []
  )
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const body = await req.json()

  await prisma.serviceVehicle.create({
    data: {
      serviceId: id,
      vehicleId: body.vehicleId,
    },
  })

  return NextResponse.json({
    success: true,
  })
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const body = await req.json()

  await prisma.serviceVehicle.delete({
    where: {
      serviceId_vehicleId: {
        serviceId: id,
        vehicleId: body.vehicleId,
      },
    },
  })

  return NextResponse.json({
    success: true,
  })
}