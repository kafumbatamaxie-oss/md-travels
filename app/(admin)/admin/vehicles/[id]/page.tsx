"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function VehiclePage() {
  const params = useParams()

  const id = params.id as string

  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVehicle() {
      try {
        const res = await fetch(
          `/api/admin/vehicles/${id}`
        )

        const data = await res.json()

        setVehicle(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadVehicle()
  }, [id])

  if (loading) {
    return (
      <div className="p-6">
        Loading vehicle...
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="p-6">
        Vehicle not found
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      <div>
        <h1 className="text-4xl font-black">
          {vehicle.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {vehicle.type}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="border rounded-2xl p-6">
          <h2 className="font-bold mb-4">
            Vehicle Information
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Capacity:</strong>{" "}
              {vehicle.capacity}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {vehicle.status}
            </p>

            <p>
              <strong>Executive:</strong>{" "}
              {vehicle.executive
                ? "Yes"
                : "No"}
            </p>

            <p>
              <strong>Wifi:</strong>{" "}
              {vehicle.wifi
                ? "Yes"
                : "No"}
            </p>

          </div>
        </div>

        <div className="border rounded-2xl p-6">

          <h2 className="font-bold mb-4">
            Pricing
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Base Price:</strong>{" "}
              R
              {vehicle.basePrice ??
                "-"}
            </p>

            <p>
              <strong>Per KM:</strong>{" "}
              R
              {vehicle.perKmPrice ??
                "-"}
            </p>

            <p>
              <strong>Per Day:</strong>{" "}
              R
              {vehicle.perDayPrice ??
                "-"}
            </p>

          </div>

        </div>

      </div>

      <div className="flex flex-wrap gap-3">

  <Link
    href={`/admin/vehicles/${id}/edit`}
    className="bg-black text-white px-5 py-3 rounded-xl"
  >
    Edit Vehicle
  </Link>

  <Link
    href={`/admin/vehicles/${id}/images`}
    className="bg-blue-600 text-white px-5 py-3 rounded-xl"
  >
    Manage Images
  </Link>

  <Link
    href={`/admin/vehicles/${id}/services`}
    className="bg-green-600 text-white px-5 py-3 rounded-xl"
  >
    Assign Services
  </Link>

</div>

      {vehicle.images?.length > 0 && (
        <div>

          <h2 className="font-bold text-xl mb-4">
            Images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {vehicle.images.map(
              (image: any) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt=""
                  className="rounded-xl border"
                />
              )
            )}

          </div>

        </div>
      )}

    </div>
  )
}