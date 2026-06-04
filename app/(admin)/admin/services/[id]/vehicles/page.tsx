"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Vehicle = {
  id: string
  name: string
  type: string
  capacity: number
}

export default function ServiceVehiclesPage() {
  const params = useParams()

  const serviceId = params.id as string

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [assigned, setAssigned] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    const [vehiclesRes, serviceRes] = await Promise.all([
      fetch("/api/admin/vehicles"),
      fetch(`/api/admin/services/${serviceId}/vehicles`),
    ])

    const vehiclesData = await vehiclesRes.json()
    const assignedData = await serviceRes.json()

    setVehicles(vehiclesData)

    setAssigned(
      assignedData.map((v: Vehicle) => v.id)
    )

    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [serviceId])

  async function toggleVehicle(vehicleId: string) {
    const selected = assigned.includes(vehicleId)

    await fetch(
      `/api/admin/services/${serviceId}/vehicles`,
      {
        method: selected ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vehicleId,
        }),
      }
    )

    loadData()
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">

      <h1 className="text-3xl font-black mb-8">
        Assign Vehicles
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

        {vehicles.map((vehicle) => {
          const selected =
            assigned.includes(vehicle.id)

          return (
            <button
              key={vehicle.id}
              onClick={() =>
                toggleVehicle(vehicle.id)
              }
              className={`
                p-5
                rounded-2xl
                border
                text-left
                transition

                ${
                  selected
                    ? "bg-black text-white border-black"
                    : "bg-white hover:border-black"
                }
              `}
            >
              <h3 className="font-bold text-lg">
                {vehicle.name}
              </h3>

              <p className="text-sm opacity-70">
                {vehicle.type}
              </p>

              <p className="text-sm mt-2">
                {vehicle.capacity} passengers
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}