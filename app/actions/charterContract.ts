"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateContractPDF } from "@/lib/generateContractPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContract(formData: FormData) {
  const data = {
    hotelName: formData.get("hotelName") as string,
    hotelAddress: formData.get("hotelAddress") as string,
    contactPerson: formData.get("contactPerson") as string,
    title: formData.get("title") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    contractStartDate: formData.get("contractStartDate") as string,
    signingDate: formData.get("signingDate") as string,
  };

  /* ✅ Generate PDF */
  const pdfBuffer = await generateContractPDF(data);

  /* ✅ Send Email */
  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: `New Charter Contract — ${data.hotelName}`,
    html: `
      <h2>New Charter Contract Request</h2>
      <p><strong>Hotel:</strong> ${data.hotelName}</p>
      <p><strong>Contact:</strong> ${data.contactPerson}</p>
      <p><strong>Email:</strong> ${data.email}</p>
    `,
    attachments: [
      {
        filename: "charter-contract.pdf",
        content: pdfBuffer,
      },
    ],
  });

  redirect("/success");
}