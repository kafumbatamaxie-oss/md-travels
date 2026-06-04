"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function VehiclesPage() {
  const [vehicles, setVehicles] =
    useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then((res) => res.json())
      .then(setVehicles)
  }, [])

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-black">
          Vehicles
        </h1>

        <Link
          href="/admin/vehicles/create"
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Create Vehicle
        </Link>
        

      </div>

      <div className="border rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">
                Vehicle
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Capacity
              </th>

              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {vehicles.map(
              (vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-t"
                >
                  <td className="p-3">
                    <Link
                      href={`/admin/vehicles/${vehicle.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {vehicle.name}
                    </Link>
                  </td>

                  <td className="p-3">
                    {vehicle.type}
                  </td>

                  <td className="p-3">
                    {
                      vehicle.capacity
                    }
                  </td>

                  <td className="p-3">
                    {
                      vehicle.status
                    }
                  </td>
                  
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}