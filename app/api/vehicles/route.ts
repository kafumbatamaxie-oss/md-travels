import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
   const vehicles = await prisma.vehicle.findMany({
    where: { status: "AVAILABLE" },
    orderBy: { passengers: "asc" }
  })

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error("[VIHICLES_GET_ERROR]:", error)
  
    return NextResponse.json(
      { message: "Failed to load vehicles" },
      { status: 500 }
    )
  }
}
