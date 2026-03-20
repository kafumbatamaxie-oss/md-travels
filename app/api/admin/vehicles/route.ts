import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { vehicleSchema } from "@/lib/validators/vehicle"

export async function GET() {

  const vehicles = await prisma.vehicle.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return NextResponse.json(vehicles)
}



export async function POST(req: Request) {

  try {

    const body = await req.json()

    const parsed = vehicleSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name: parsed.data.name,
        type: parsed.data.type,
        capacity: parsed.data.capacity,

        basePrice: parsed.data.basePrice ?? null,
        perKmPrice: parsed.data.perKmPrice ?? null,
        perDayPrice: parsed.data.perDayPrice ?? null,

        status: parsed.data.status
      }
    })

    return NextResponse.json(vehicle)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Vehicle creation failed" },
      { status: 500 }
    )

  }

}
