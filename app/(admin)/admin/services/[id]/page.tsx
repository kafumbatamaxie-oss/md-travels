"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function EditServicePage() {

  const params = useParams()
  const id = params.id as string

  const [service, setService] = useState<any>(null)

  useEffect(() => {

    fetch(`/api/admin/services/${id}`)
      .then(res => res.json())
      .then(data => setService(data))

  }, [id])


  if (!service) {
    return <div className="p-6">Loading...</div>
  }

  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Edit Service
      </h1>

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <p>
          <strong>Name:</strong> {service.name}
        </p>

        <p>
          <strong>Pricing Model:</strong> {service.pricingModel}
        </p>

        <p>
          <strong>Base Price:</strong> {service.basePrice}
        </p>

        <p>
          <strong>Price Per KM:</strong> {service.pricePerKm}
        </p>

        <p>
          <strong>Price Per Day:</strong> {service.pricePerDay}
        </p>

      </div>

      <Link href={`/admin/services/${service.id}/vehicles`}
        className="bg-black text-white px-4 py-2 rounded"
        >
        Manage Vehicles
      </Link>

    </div>

  )
}