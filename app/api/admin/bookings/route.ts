import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const bookings =
      await prisma.booking.findMany({
        include: {
          customer: true,
          service: true,
          vehicle: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error: "Failed to load bookings",
      },
      {
        status: 500,
      }
    )
  }
}