export const dynamic = "force-dynamic"
import { prisma } from "@/lib/prisma"
import { deleteVehicle } from "./actions"
import Link from "next/link"

export default async function VehiclesPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { images: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          Vehicles
        </h1>

        <Link
          href="/admin/vehicles/new"
          className="bg-black text-white px-4 py-2 rounded-xl text-sm"
        >
          + Add Vehicle
        </Link>
      </div>

      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white p-4 rounded-2xl shadow-sm border"
          >
            <div className="flex justify-between items-start">

              <div>
                <h2 className="font-semibold">
                  {vehicle.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {vehicle.brand} • {vehicle.category}
                </p>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">
                {vehicle.status}
              </span>
            </div>

            <p className="text-sm mt-2 text-gray-600">
              👥 {vehicle.passengers} passengers
            </p>

            <div className="flex gap-2 mt-4">
              <Link
                href={`/admin/vehicles/${vehicle.id}`}
                className="text-blue-600 text-sm"
              >
                Edit
              </Link>

              <form action={deleteVehicle.bind(null, vehicle.id)}>
                <button className="text-red-600 text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}