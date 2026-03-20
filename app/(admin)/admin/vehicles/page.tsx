"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function VehiclesPage() {

  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/vehicles")
      .then(res => res.json())
      .then(setVehicles)
  }, [])

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-bold">
          Vehicles
        </h1>

        <Link
          href="/admin/vehicles/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Vehicle
        </Link>

      </div>

      <table className="w-full border">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Capacity</th>
            <th className="p-3">Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {vehicles.map((vehicle) => (

            <tr key={vehicle.id} className="border-t">

              <td className="p-3">{vehicle.name}</td>
              <td className="p-3">{vehicle.type}</td>
              <td className="p-3">{vehicle.capacity}</td>
              <td className="p-3">{vehicle.status}</td>

              <td className="p-3">
                <Link
                  href={`/admin/vehicles/${vehicle.id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}
