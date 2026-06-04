import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      vehicleId,
      startDate,
      endDate,
    } = body

    if (
      !vehicleId ||
      !startDate
    ) {
      return NextResponse.json(
        {
          available: false,
        },
        {
          status: 400,
        }
      )
    }

    const bookingStart =
      new Date(startDate)

    const bookingEnd =
      endDate
        ? new Date(endDate)
        : new Date(
            bookingStart.getTime() +
              4 * 60 * 60 * 1000
          )

    const conflictingBooking =
      await prisma.booking.findFirst({
        where: {
          vehicleId,

          status: {
            notIn: [
              "CANCELLED",
              "COMPLETED",
            ],
          },

          AND: [
            {
              startDate: {
                lt: bookingEnd,
              },
            },
            {
              OR: [
                {
                  endDate: null,
                },
                {
                  endDate: {
                    gt: bookingStart,
                  },
                },
              ],
            },
          ],
        },
      })

    return NextResponse.json({
      available:
        !conflictingBooking,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        available: false,
      },
      {
        status: 500,
      }
    )
  }
}