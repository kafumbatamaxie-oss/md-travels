"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateStariaInvoicePDF } from "@/lib/generateStariaInvoicePDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitStariaQuote(formData: FormData) {
  const data = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    phone: String(formData.get("phone")),
    tripDate: String(formData.get("tripDate")),
    pickupLocation: String(formData.get("pickupLocation")),
    pickupTime: String(formData.get("pickupTime")),
    destination: String(formData.get("destination")),
    eveningPickupLocation: String(
      formData.get("eveningPickupLocation")
    ),
    eveningPickupTime: String(
      formData.get("eveningPickupTime")
    ),
    eveningDropoffLocation: String(
      formData.get("eveningDropoffLocation")
    ),
  };

  /* ✅ CREATE INVOICE PDF */
  const invoicePDF = await generateStariaInvoicePDF(data);

  /* ✅ SEND EMAIL WITH INVOICE */
  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: "New Hyundai Staria Booking",
    html: `
      <h2>New Staria Booking</h2>
      <p><strong>Client:</strong> ${data.name}</p>
      <p><strong>Date:</strong> ${data.tripDate}</p>
      <p>${data.pickupLocation} → ${data.destination}</p>
    `,
    attachments: [
      {
        filename: "staria-invoice.pdf",
        content: invoicePDF,
      },
    ],
  });

  redirect("/success");
}