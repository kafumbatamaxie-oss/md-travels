import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serviceSchema } from "@/lib/validators/service"



export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params

    const service = await prisma.service.findUnique({
      where: {
        id
      },
      include: {
        vehicles: {
          include: {
            vehicle: true
          }
        }
      }
    })

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(service)

  } catch (error) {

    console.error("SERVICE_GET_ERROR:", error)

    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    )

  }

}



export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params
    const body = await req.json()

    const parsed = serviceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const updated = await prisma.service.update({
      where: {
        id
      },
      data: parsed.data
    })

    return NextResponse.json(updated)

  } catch (error) {

    console.error("SERVICE_UPDATE_ERROR:", error)

    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    )

  }

}



export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params

    await prisma.service.delete({
      where: {
        id
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {

    console.error("SERVICE_DELETE_ERROR:", error)

    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )

  }

}