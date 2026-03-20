import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        name: true,
        description: true,
        pricingModel: true,

        vehicles: {
          where: {
            vehicle: {
              status: "ACTIVE",
            },
          },
          select: {
            vehicle: {
              select: {
                id: true,
                name: true,
                type: true,
                capacity: true,

                images: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const formattedServices = services.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description,
      pricingModel: service.pricingModel,

      vehicles: service.vehicles.map((sv) => sv.vehicle),
    }))

    return NextResponse.json(formattedServices)
  } catch (error) {
    console.error("[SHOP_SERVICES_GET]", error)

    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    )
  }
}