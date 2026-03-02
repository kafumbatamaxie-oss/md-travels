"use server";

import { Resend } from "resend";
import { redirect } from "next/navigation";
import { generateProposalPDF } from "@/lib/generateProposalPDF";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitProposal(formData: FormData) {
  const data = {
    clientName: formData.get("clientName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    contractType: formData.get("contractType") as string,
    busCount: formData.get("busCount") as string,
    passengers: formData.get("passengers") as string,
    pickup: formData.get("pickup") as string,
    destination: formData.get("destination") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    notes: formData.get("notes") as string,
  };

  const { pdfBuffer, id } = await generateProposalPDF(data);

  const filename = `Proposal-${id}.pdf`;

  // ✅ CLIENT EMAIL
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: data.email,
    subject: "Your Transport Proposal Request",
    html: `<p>Dear ${data.clientName},</p>
           <p>Please find your transport proposal request attached.</p>`,
    attachments: [{ filename, content: pdfBuffer }],
  });

  // ✅ ADMIN EMAIL
  await resend.emails.send({
    from: process.env.RESEND_FROM!,
    to: [
      "info@mdtravels.co.za",
      "malipheze@mdtravels.co.za",
    ],
    subject: `🚨 New Proposal Request - ${id}`,
    html: `<h3>New Proposal Submitted</h3>
           Client: ${data.clientName}`,
    attachments: [{ filename, content: pdfBuffer }],
  });

  redirect("/success");
}