"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then(setServices)
  }, [])

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Services
        </h1>

        <Link
          href="/admin/services/create"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Service
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Pricing Model</th>
              <th className="p-3">Base Price</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-t">

                <td className="p-3">
                  {service.name}
                </td>

                <td className="p-3">
                  {service.pricingModel}
                </td>

                <td className="p-3">
                  {service.basePrice ?? "-"}
                </td>

                <td className="p-3">
                  <Link
                    href={`/admin/services/${service.id}`}
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

    </div>
  )
}
