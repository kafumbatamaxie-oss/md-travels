"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createVehicle(formData: FormData) {
  const name = formData.get("name") as string
  const brand = formData.get("brand") as string
  const category = formData.get("category") as string
  const passengers = Number(formData.get("passengers"))

  const perKmRate = formData.get("perKmRate")
  const hourlyRate = formData.get("hourlyRate")
  const dailyRate = formData.get("dailyRate")

  const description = formData.get("description") as string
  const fuelType = formData.get("fuelType") as string

  const imageUrls = formData.getAll("images") as string[]

  const vehicle = await prisma.vehicle.create({
    data: {
      name,
      brand,
      category,
      passengers,
      perKmRate: perKmRate ? Number(perKmRate) : null,
      hourlyRate: hourlyRate ? Number(hourlyRate) : null,
      dailyRate: dailyRate ? Number(dailyRate) : null,
      description,
      fuelType,
      images: {
        create: imageUrls.map((url) => ({ url })),
      },
    },
  })

  revalidatePath("/admin/vehicles")
}


export async function updateVehicle(id: string, formData: FormData) {
  const imageUrls = formData.getAll("images") as string[]

  await prisma.vehicle.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      passengers: Number(formData.get("passengers")),
      description: formData.get("description") as string,
      fuelType: formData.get("fuelType") as string,
      perKmRate: Number(formData.get("perKmRate")) || null,
      hourlyRate: Number(formData.get("hourlyRate")) || null,
      dailyRate: Number(formData.get("dailyRate")) || null,

      images: {
        deleteMany: {},
        create: imageUrls.map((url) => ({ url })),
      },
    },
  })

  revalidatePath("/admin/vehicles")
}


export async function deleteVehicle(id: string) {
  await prisma.vehicle.delete({
    where: { id },
  })

  revalidatePath("/admin/vehicles")
}