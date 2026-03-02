"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateContractPDF } from "@/lib/generateContractPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContract(formData: FormData) {
  const data = {
    hotelName: formData.get("hotelName"),
    hotelAddress: formData.get("hotelAddress"),
    contactPerson: formData.get("contactPerson"),
    title: formData.get("title"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    contractStartDate: formData.get("contractStartDate"),
    signingDate: formData.get("signingDate"),
  };

  const pdf = await generateContractPDF(data);

  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: "New Charter Contract Request",
    html: `<h2>New Hotel Contract Submitted</h2>
           Hotel: ${data.hotelName}`,
    attachments: [
      {
        filename: "charter-contract.pdf",
        content: pdf,
      },
    ],
  });

  redirect("/success");
}