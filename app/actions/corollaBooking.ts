"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateCorollaInvoicePDF } from "@/lib/generateCorollaInvoicePDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitCorollaBooking(formData: FormData) {

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    pickupLocation: formData.get("pickupLocation"),
    dropoffLocation: formData.get("dropoffLocation"),
    pickupDate: formData.get("pickupDate"),
    pickupTime: formData.get("pickupTime"),
    days: Number(formData.get("days")),
    package: formData.get("package"),
  };

  const pdf = await generateCorollaInvoicePDF(data);

  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: "Toyota Corolla Booking",
    html: `<h2>New Booking</h2>
           Client: ${data.name}`,
    attachments: [
      {
        filename: "invoice.pdf",
        content: pdf,
      },
    ],
  });

  redirect("/success");
}