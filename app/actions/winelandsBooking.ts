"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateWinelandsPDF } from "@/lib/generateWinelandsPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitWinelands(formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    people: Number(formData.get("people")),
    shuttlePickup: formData.get("shuttlePickup"),
    shuttleDropoff: formData.get("shuttleDropoff"),
    tourType: formData.get("tourType"),
  };

  const pdf = await generateWinelandsPDF(data);

  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: "Winelands Booking Confirmation",
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