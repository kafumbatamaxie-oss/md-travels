"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateCorollaInvoicePDF } from "@/components/pdf/generateCorollaInvoicePDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function corollaBooking(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const pickupDate = formData.get("pickupDate") as string;
  const pickupTime = formData.get("pickupTime") as string;
  const dropoffDate = formData.get("dropoffDate") as string;
  const dropoffTime = formData.get("dropoffTime") as string;

  const days = Number(formData.get("days"));

  // =============================
  // PRICE CALCULATION
  // =============================

  const HALF_DAY = 1800;
  const FULL_DAY = 3600;

  const total = days === 0.5 ? HALF_DAY : days * FULL_DAY;

  const booking = {
    name,
    email,
    phone,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    days,
    total,
  };

  // =============================
  // GENERATE PDF
  // =============================

  const pdfBuffer = await generateCorollaInvoicePDF(booking);

  const ref = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  // =============================
  // EMAIL CLIENT
  // =============================

  console.log("Sending email to ->> ", email);

  const firstEmail = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: email,
    subject: `Toyota Corolla Booking - ${ref}`,
    html: `
      <p>Dear ${name},</p>

      <p>Thank you for booking the <b>Toyota Corolla 4 Seater</b>.</p>

      <p>Your invoice is attached to this email.</p>

      <p>Pickup Date: ${pickupDate}</p>
      <p>Pickup Time: ${pickupTime}</p>

      <p>Total: <b>R${total}</b></p>

      <p>We look forward to serving you.</p>

      <br/>

      <p>MD Travel</p>
      <p>Cape Town</p>
    `,
    attachments: [
      {
        filename: `Corolla-Booking-${ref}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (!firstEmail.error) {
    console.log("Email sent successfully");
  }

  // =============================
  // EMAIL ADMIN
  // =============================

  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: [
      "info@mdtravels.co.za",
      "malipheze@mdtravels.co.za",
      "iviwedlunge111@gmail.com",
    ],
    subject: `🚨 New Corolla Booking - ${ref}`,
    html: `
      <h3>New Toyota Corolla Booking</h3>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>

      <p><b>Pickup:</b> ${pickupDate} ${pickupTime}</p>
      <p><b>Dropoff:</b> ${dropoffDate} ${dropoffTime}</p>

      <p><b>Days:</b> ${days}</p>

      <p><b>Total:</b> R${total}</p>
    `,
    attachments: [
      {
        filename: `Corolla-Booking-${ref}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  redirect("/success");
}