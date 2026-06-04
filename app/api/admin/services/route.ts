import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serviceSchema } from "@/lib/validators/service"

export async function GET() {
  const services = await prisma.service.findMany({
  include: {
    _count: {
      select: {
        vehicles: true,
      },
    },
  },
})

  return NextResponse.json(services)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = serviceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

  const service = await prisma.service.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,

      description: parsed.data.description,

      category: parsed.data.category,

      pricingModel: parsed.data.pricingModel,

      basePrice: parsed.data.basePrice,

      perKmPrice: parsed.data.perKmPrice,

      perHourPrice: parsed.data.perHourPrice,

      perDayPrice: parsed.data.perDayPrice,

      minimumCharge: parsed.data.minimumCharge,

      active: parsed.data.active,

      featured: parsed.data.featured,

      vehicles: {
        create:
          body.vehicleIds?.map((id: string) => ({
            vehicleId: id,
          })) || [],
      },
    },

    include: {
      vehicles: true,
    },
  })

    return NextResponse.json(service)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    )
  }
}
