import {prisma} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function VehiclesAdmin() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Vehicles available {vehicles.length}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {vehicles.map(v => (
          <div
            key={v.id}
            className="border rounded-lg p-5 bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {v.name}
            </h2>

            <p>Passengers: {v.passengers}</p>

            {v.perKmRate && (
              <p>Per Km: R {v.perKmRate}</p>
            )}

            {v.hourlyRate && (
              <p>Hourly: R {v.hourlyRate}</p>
            )}

            {v.dailyRate && (
              <p>Daily: R {v.dailyRate}</p>
            )}

            <p className="text-sm text-gray-500">
              Status: {v.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}