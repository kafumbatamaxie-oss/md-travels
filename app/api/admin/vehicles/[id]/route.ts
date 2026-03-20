import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { vehicleSchema } from "@/lib/validators/vehicle"



export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },

    include: {
      images: true,
      services: {
        include: {
          service: true
        }
      }
    }
  })

  if (!vehicle) {
    return NextResponse.json(
      { error: "Vehicle not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(vehicle)
}



export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params
    const body = await req.json()

    const parsed = vehicleSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: parsed.data
    })

    return NextResponse.json(vehicle)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Vehicle update failed" },
      { status: 500 }
    )

  }

}



export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  await prisma.vehicle.delete({
    where: { id }
  })

  return NextResponse.json({ success: true })
}