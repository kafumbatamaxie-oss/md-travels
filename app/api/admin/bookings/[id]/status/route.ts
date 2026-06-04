import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
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

    const body =
      await req.json()

    const booking =
      await prisma.booking.update({
        where: {
          id,
        },
        data: {
          status:
            body.status,
        },
      })

    return NextResponse.json(
      booking
    )
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to update booking",
      },
      {
        status: 500,
      }
    )
  }
}