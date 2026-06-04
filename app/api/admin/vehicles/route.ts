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
        slug: parsed.data.slug,
        description:  parsed.data.description,
        type:  parsed.data.type,
        capacity:
          parsed.data.capacity,

        luggageCapacity:
          parsed.data.luggageCapacity,

        basePrice:
          parsed.data.basePrice,

        perKmPrice:
          parsed.data.perKmPrice,

        perDayPrice:
          parsed.data.perDayPrice,

        airConditioning:
          parsed.data.airConditioning,

        wifi:
          parsed.data.wifi,

        executive:
          parsed.data.executive,

        featured:
          parsed.data.featured,

        active:
          parsed.data.active,

        status:
          parsed.data.status,
      },
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
