import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  const { id } = await context.params

  const vehicles =
    await prisma.serviceVehicle.findMany({
      where: {
        serviceId: id,
      },

      include: {
        vehicle: {
          include: {
            images: true,
          },
        },
      },
    })

  return NextResponse.json(
    vehicles.map((v) => v.vehicle)
  )
}