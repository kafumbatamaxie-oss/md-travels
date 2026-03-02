"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateProposalPDF } from "@/lib/generateProposalPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitProposal(formData: FormData) {
  const data = {
    clientName: formData.get("clientName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    contractType: formData.get("contractType"),
    busCount: formData.get("busCount"),
    passengers: formData.get("passengers"),
    pickup: formData.get("pickup"),
    destination: formData.get("destination"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    notes: formData.get("notes"),
  };

  // ✅ Generate PDF
  const pdfBuffer = await generateProposalPDF(data);

  // ✅ Send Email with Attachment
  await resend.emails.send({
    from: "MD Shuttles <onboarding@resend.dev>",
    to: ["Info@mdshuttles.co.za"],
    subject: "New Transport Proposal Request",
    html: `<h2>New Proposal Request</h2>
           Client: ${data.clientName}`,
    attachments: [
      {
        filename: "proposal.pdf",
        content: pdfBuffer,
      },
    ],
  });

  redirect("/success");
}