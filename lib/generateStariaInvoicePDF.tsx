import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import StariaInvoicePDF from "@/components/pdf/StariaInvoicePDF";

export async function generateStariaInvoicePDF(data: any) {
  const buffer = await renderToBuffer(
    <StariaInvoicePDF booking={data} />
  );

  return buffer;
}