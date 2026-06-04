import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {
  try {
    const { id } = await context.params

    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },

      include: {
        images: true,

        services: {
          include: {
            service: true,
          },
        },
      },
    })

    if (!vehicle) {
      return NextResponse.json(
        {
          error: "Vehicle not found",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(vehicle)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to fetch vehicle",
      },
      {
        status: 500,
      }
    )
  }
}