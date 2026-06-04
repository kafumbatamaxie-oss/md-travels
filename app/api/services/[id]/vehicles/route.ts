import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } =
      await params

    const service =
      await prisma.service.findUnique({
        where: {
          id,
        },

        include: {
          vehicles: {
            include: {
              vehicle: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      })

    return NextResponse.json(
      service?.vehicles ?? []
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to load service vehicles",
      },
      {
        status: 500,
      }
    )
  }
}