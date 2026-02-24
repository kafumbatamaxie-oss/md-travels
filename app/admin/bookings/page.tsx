import {prisma} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function BookingsAdmin() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const vehicles = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Total Available Vehicles {vehicles.length}
      </h1>  
    </div>
  )
}