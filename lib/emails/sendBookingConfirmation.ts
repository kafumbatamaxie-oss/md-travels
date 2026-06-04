import { resend } from "@/lib/resend"

export async function sendBookingConfirmation({
  email,
  bookingRef,
}: {
  email: string
  bookingRef: string
}) {
  await resend.emails.send({
    from:
      "MD Travels <bookings@mdtravels.co.za>",

    to: email,

    subject:
      `Booking ${bookingRef} Confirmed`,

    html: `
      <h2>
        Thank you for booking
      </h2>

      <p>
        Booking Ref:
        <strong>
          ${bookingRef}
        </strong>
      </p>
    `,
  })
}