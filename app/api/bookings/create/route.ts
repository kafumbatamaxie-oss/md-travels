import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const formData = await req.formData()
  const vehicleId = formData.get("vehicleId") as string
  const pickupDate = formData.get("pickupDate") as string

  // Simple booking creation logic
  await prisma.booking.create({
    data: {
      userId,
      vehicleId,
      pickupDate: new Date(pickupDate),
      dropoffDate: new Date(pickupDate), // Simplified for now
      status: "PENDING",
      totalAmount: 0, // Should be calculated
    },
  })

  return redirect("/dashboard")
}
