import { sendBookingConfirmation } from "@/lib/emails/sendBookingConfirmation"
import { prisma } from "@/lib/prisma"
import { resend } from "@/lib/resend"
import { NextResponse } from "next/server"

function generateBookingRef() {
  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `MD-${year}-${random}`
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json()
    console.log("BOOKING BODY", body)
    const {
      serviceId,
      vehicleId,

      customerName,
      customerEmail,
      customerPhone,

      passengers,

      pickupAddress,
      pickupPlaceId,

      destinationAddress,
      destinationPlaceId,

      pickupLat,
      pickupLng,

      destinationLat,
      destinationLng,

      notes,

      estimate,
    } = body

    if (
  !serviceId ||
  !vehicleId ||
  !customerName ||
  !customerEmail ||
  !customerPhone ||
  !pickupAddress ||
  !destinationAddress ||
  !body.pickupDate ||
  !body.pickupTime
) {
  return NextResponse.json(
    {
      error:
        "Please complete all required fields",
    },
    {
      status: 400,
    }
  )
}

    // -----------------------------
    // Customer
    // -----------------------------

    let customer =
      await prisma.customer.findFirst({
        where: {
          email:
            customerEmail,
        },
      })

    if (!customer) {
      customer =
        await prisma.customer.create({
          data: {
            name:
              customerName,

            email:
              customerEmail,

            phone:
              customerPhone,
          },
        })
    }

    // -----------------------------
    // Booking Ref
    // -----------------------------

    const bookingRef =
      generateBookingRef()

    // -----------------------------
    // Booking
    // -----------------------------
    const bookingDate = new Date(`${body.pickupDate}T${body.pickupTime}`)
    const booking =
      await prisma.booking.create({
        data: {
          bookingRef,

          customerId:
            customer.id,

          serviceId,

          vehicleId,

          passengers:
            passengers ?? 1,

          pickup: pickupAddress,

          pickupAddress,

          pickupPlaceId,

          pickupLat,

          pickupLng,

          destination:
            destinationAddress,

          destinationAddress,

          destinationPlaceId,

          destinationLat,

          destinationLng,

          notes,

          startDate: bookingDate,

          price:
            estimate?.price ??
            0,

          distanceKm:
            estimate?.distanceKm,

          durationMinutes:
            estimate?.durationMinutes,

          status: "NEW",
        },
      })

      await sendBookingConfirmation({
        email: customer.email,
        bookingRef:
          booking.bookingRef,
      })

          // 7. Staff email
    try {
      const staffEmails = [
        "altrotechai23@gmail.com",
        "info@mdtravels.co.za",
        "malipheze@mdtravels.co.za",
        "iviwedlunge111@gmail.com",
      ]

      await resend.emails.send({
        from: process.env.RESEND_FROM!,
        to: staffEmails,
        subject: `🚨 New Booking - ${bookingRef}`,
        html: `
          <h3>New Quote Received</h3>
           <p><strong>Customer Name:</strong> ${customer.name}</p>
           <p><strong>Phone Number:</strong> ${customer.phone}</p>
          <p><strong>Pickup Address:</strong> ${pickupAddress}</p>
          <p><strong>Destination Address:</strong> ${destinationAddress}</p>
          <p><strong>Booking Date</strong> ${bookingDate}</p>
        `,

      })
    } catch (err) {
      console.error("STAFF EMAIL ERROR:", err)
    }


    return NextResponse.json({
      success: true,

      bookingId:
        booking.id,

      bookingRef:
        booking.bookingRef,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Booking creation failed",
      },
      {
        status: 500,
      }
    )
  }
}