"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { renderToBuffer } from "@react-pdf/renderer";
import generateRomionInvoicePDF from "@/lib/generateRomionInvoicePDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function corollaBooking(formData: FormData) {

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const people = formData.get("people") as string;

  const pickupDate = formData.get("pickupDate") as string;
  const pickupTime = formData.get("pickupTime") as string;

  const dropoffDate = formData.get("dropoffDate") as string;
  const dropoffTime = formData.get("dropoffTime") as string;

  const days = Number(formData.get("days"));

  const booking = {
    name,
    email,
    phone,
    people,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    days,
  };

  const bookingId = Math.random().toString(36).substring(2,8).toUpperCase();

  const pdfBuffer = await renderToBuffer(
    generateRomionInvoicePDF({
      booking: { ...booking, id: bookingId },
    })
  );

  const ref = Math.random().toString(36).substring(2,8).toUpperCase();

  /* CLIENT EMAIL */

  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: email,
    subject: `Your Romion Booking - ${ref}`,
    html: `
      <p>Dear ${name}</p>
      <p>Thank you for booking with MD Travels.</p>
      <p>Your invoice is attached.</p>
    `,
    attachments: [
      {
        filename: `Romion-${ref}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  /* ADMIN EMAIL */

  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: [
      "info@mdtravels.co.za",
      "malipheze@mdtravels.co.za",
      "iviwedlunge111@gmail.com",
    ],
    subject: `🚨 New Romion Booking - ${ref}`,
    html: `
      <h3>New Romion Booking</h3>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Days: ${days}</p>
    `,
    attachments: [
      {
        filename: `Romion-${ref}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  redirect("/success");
}