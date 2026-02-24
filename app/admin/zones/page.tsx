import {prisma} from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function ZonesAdmin() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const zones = await prisma.zone.findMany()

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Total Available Zones: {zones.length}
      </h1>

      <div className="space-y-4">
        {zones.map(z => (
          <div
            key={z.id}
            className="border rounded-lg p-4 bg-white"
          >
            <h2 className="font-semibold">
              {z.name}
            </h2>

            <p>Multiplier: {z.multiplier}</p>
            <p>Extra Fee: R {z.extraFee}</p>

            <p className="text-sm text-gray-500">
              {z.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}