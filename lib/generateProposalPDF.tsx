import { renderToBuffer } from "@react-pdf/renderer";
import ProposalPDF from "@/components/pdf/ProposalPDF";

export async function generateProposalPDF(data: any) {
  const id = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  const pdfBuffer = await renderToBuffer(
    <ProposalPDF data={{ ...data, id }} />
  );

  return { pdfBuffer, id };
}