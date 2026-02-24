import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()

  const vehicle = await prisma.vehicle.create({
  data: {
    name: data.name,
    brand: data.brand,
    category: data.category,
    passengers: data.passengers,
    perKmRate: data.perKmRate,
    hourlyRate: data.hourlyRate,
    dailyRate: data.dailyRate,

    imageUrl: data.imageUrl || "/vehicles/default.jpg",

    status: "AVAILABLE",
    description: data.description,
    fuelType: data.fuelType || "Petrol",
  },
})

  return NextResponse.json(vehicle)
}

export async function GET() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(vehicles)
}