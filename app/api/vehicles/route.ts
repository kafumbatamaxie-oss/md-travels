import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const vehicles =
      await prisma.vehicle.findMany({
        where: {
          status: "ACTIVE",
        },

        include: {
          images: true,
        },

        orderBy: {
          sortOrder: "asc",
        },
      })

    return NextResponse.json(
      vehicles
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to load vehicles",
      },
      {
        status: 500,
      }
    )
  }
}