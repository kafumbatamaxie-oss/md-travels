import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await context.params

  const services =
    await prisma.service.findMany({
      orderBy: {
        name: "asc",
      },
    })

  const assigned =
    await prisma.serviceVehicle.findMany({
      where: {
        vehicleId: id,
      },
    })

  return NextResponse.json({
    services,
    assigned,
  })
}

export async function POST(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await context.params

  const body = await req.json()

  await prisma.serviceVehicle.deleteMany({
    where: {
      vehicleId: id,
    },
  })

  if (body.serviceIds?.length) {
    await prisma.serviceVehicle.createMany({
      data: body.serviceIds.map(
        (serviceId: string) => ({
          vehicleId: id,
          serviceId,
        })
      ),
    })
  }

  return NextResponse.json({
    success: true,
  })
}