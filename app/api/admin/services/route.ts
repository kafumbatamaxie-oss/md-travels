import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { serviceSchema } from "@/lib/validators/service"

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: {
      createdAt: "asc"
    }
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
        description: parsed.data.description ?? null,
        pricingModel: parsed.data.pricingModel,

        basePrice: parsed.data.basePrice ?? null,
        pricePerKm: parsed.data.pricePerKm ?? null,
        pricePerDay: parsed.data.pricePerDay ?? null
      }
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
