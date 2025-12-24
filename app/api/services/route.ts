import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
      },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error("[SERVICES_GET_ERROR]", error)
    return NextResponse.json(
      { message: "Failed to load services" },
      { status: 500 }
    )
  }
}
