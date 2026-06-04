import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {
  try {
    const { id } = await context.params

    const body = await req.json()

    const image =
      await prisma.vehicleImage.create({
        data: {
          vehicleId: id,

          url: body.url,

          publicId:
            body.publicId,

          order: 0,
        },
      })

    return NextResponse.json(image)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to save image",
      },
      {
        status: 500,
      }
    )
  }
}