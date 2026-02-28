"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { PricingType } from "@prisma/client"

export async function createService(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const pricingType = formData.get("pricingType") as PricingType
  const basePriceRaw = formData.get("basePrice")

  try {
    await prisma.service.create({
      data: {
        name,
        description,
        pricingType,
        basePrice: basePriceRaw
          ? Number(basePriceRaw)
          : null,
      },
    })
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Service name already exists")
    }
    throw error
  }

  revalidatePath("/admin/services")
}

export async function updateService(
  id: string,
  formData: FormData
) {
  const pricingType = formData.get("pricingType") as PricingType
  const basePriceRaw = formData.get("basePrice")

  await prisma.service.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      pricingType,
      basePrice: basePriceRaw
        ? Number(basePriceRaw)
        : null,
      active: formData.get("active") === "on",
    },
  })

  revalidatePath("/admin/services")
}

export async function deleteService(id: string) {
  await prisma.service.delete({
    where: { id },
  })

  revalidatePath("/admin/services")
}