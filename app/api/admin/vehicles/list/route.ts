// app/api/admin/vehicles/list/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      type: true,
      capacity: true,
    },
  })

  return NextResponse.json(vehicles)
}