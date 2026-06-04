"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function VehicleServicesPage() {
  const params = useParams()

  const id = params.id as string

  const [services, setServices] =
    useState<any[]>([])

  const [selected, setSelected] =
    useState<string[]>([])

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const res = await fetch(
      `/api/admin/vehicles/${id}/services`
    )

    const data = await res.json()

    setServices(data.services)

    setSelected(
      data.assigned.map(
        (x: any) => x.serviceId
      )
    )
  }

  async function save() {
    await fetch(
      `/api/admin/vehicles/${id}/services`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          serviceIds: selected,
        }),
      }
    )

    alert("Saved")
  }

  function toggle(
    serviceId: string
  ) {
    if (
      selected.includes(serviceId)
    ) {
      setSelected(
        selected.filter(
          (x) => x !== serviceId
        )
      )
    } else {
      setSelected([
        ...selected,
        serviceId,
      ])
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-black mb-8">
        Assign Services
      </h1>

      <div className="space-y-3">

        {services.map((service) => (

          <label
            key={service.id}
            className="flex items-center gap-3 border p-4 rounded-xl"
          >
            <input
              type="checkbox"
              checked={selected.includes(
                service.id
              )}
              onChange={() =>
                toggle(service.id)
              }
            />

            <div>
              <div className="font-semibold">
                {service.name}
              </div>

              <div className="text-sm text-gray-500">
                {service.category}
              </div>
            </div>

          </label>

        ))}

      </div>

      <button
        onClick={save}
        className="mt-8 bg-black text-white px-6 py-3 rounded-xl"
      >
        Save Services
      </button>

    </div>
  )
}