import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params
    const body = await req.json()

    const { serviceId } = body

    if (!serviceId) {
      return NextResponse.json(
        { error: "serviceId is required" },
        { status: 400 }
      )
    }

    const assignment = await prisma.serviceVehicle.create({
      data: {
        vehicleId: id,
        serviceId
      }
    })

    return NextResponse.json(assignment)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to assign service" },
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
    const { searchParams } = new URL(req.url)

    const serviceId = searchParams.get("serviceId")

    if (!serviceId) {
      return NextResponse.json(
        { error: "serviceId required" },
        { status: 400 }
      )
    }

    await prisma.serviceVehicle.delete({
      where: {
        serviceId_vehicleId: {
          serviceId,
          vehicleId: id
        }
      }
    })

    return NextResponse.json({ success: true })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to remove service" },
      { status: 500 }
    )
  }

}