"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createZone(formData: FormData) {
  await prisma.zone.create({
    data: {
      name: formData.get("name") as string,
      multiplier: Number(formData.get("multiplier")),
      extraFee: Number(formData.get("extraFee")),
      description: formData.get("description") as string,
    },
  })

  revalidatePath("/admin/zones")
}

export async function updateZone(id: string, formData: FormData) {
  await prisma.zone.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      multiplier: Number(formData.get("multiplier")),
      extraFee: Number(formData.get("extraFee")),
      description: formData.get("description") as string,
    },
  })

  revalidatePath("/admin/zones")
}

export async function deleteZone(id: string) {
  await prisma.zone.delete({
    where: { id },
  })

  revalidatePath("/admin/zones")
}