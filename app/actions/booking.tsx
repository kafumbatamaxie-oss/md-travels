"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { renderToBuffer } from "@react-pdf/renderer";

import PackageInvoicePDF from "@/components/pdf/PackageInvoicePDF";
import { calculatePackage } from "@/lib/package/calculatePackage";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function bookSpecialPackage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const people = formData.get("people") as string;
  const pickupDate = formData.get("pickupDate") as string;
  const days = Number(formData.get("days"));

  // ✅ CALCULATE PRICE
  const pricing = calculatePackage(days);

  const booking = {
    name,
    email,
    phone,
    people,
    pickupDate,
    days,
    pricing,
  };

  // ✅ GENERATE PDF
  const bookingId = Math.random()
  .toString(36)
  .substring(2, 8)
  .toUpperCase();

const pdfBuffer = await renderToBuffer(
  <PackageInvoicePDF
    booking={{ ...booking, id: bookingId }}
  />
);

  const ref = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  // =============================
  // EMAIL CLIENT
  // =============================
  console.log("Sending email to ->> ", email)
  const firstEmail = await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: email,
    subject: `Your Package Booking - ${ref}`,
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for booking the Cape Town Special Package.</p>
      <p>Your invoice is attached.</p>
    `,
    attachments: [
      {
        filename: `Package-${ref}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (!firstEmail.error){
    console.log("Email sent successfully")
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
    subject: `🚨 New Package Booking - ${ref}`,
    html: `
      <h3>New Package Booking</h3>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Days: ${days}</p>
      <p>Total: R${pricing.total}</p>
    `,
    attachments: [
      {
        filename: `Package-${ref}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  redirect("/success");
}