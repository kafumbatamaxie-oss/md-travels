"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateQuotePDF } from "@/lib/generateStariaQuotePDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitStariaQuote(formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    tripDate: formData.get("tripDate"),
    pickupLocation: formData.get("pickupLocation"),
    pickupTime: formData.get("pickupTime"),
    destination: formData.get("destination"),
    eveningPickupLocation: formData.get("eveningPickupLocation"),
    eveningPickupTime: formData.get("eveningPickupTime"),
    eveningDropoffLocation: formData.get("eveningDropoffLocation"),
  };

  const pdf = await generateQuotePDF(data);

  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: "New Hyundai Staria Booking",
    html: `<h2>New Booking Request</h2>
           Client: ${data.name}`,
    attachments: [
      {
        filename: "quotation.pdf",
        content: pdf,
      },
    ],
  });

  redirect("/success");
}