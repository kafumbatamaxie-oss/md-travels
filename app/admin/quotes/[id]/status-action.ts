"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateQuoteStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
) {
  await prisma.quote.update({
    where: { id },
    data: { status },
  })

  revalidatePath("/admin/quotes")
  revalidatePath(`/admin/quotes/${id}`)
}
