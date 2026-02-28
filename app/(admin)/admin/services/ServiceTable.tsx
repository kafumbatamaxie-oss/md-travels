"use client"

import { deleteService } from "./actions"

interface Service {
  id: string
  name: string
  description: string | null
  pricingType: string
  basePrice: number | null
  active: boolean
}

export default function ServiceTable({
  services,
}: {
  services: Service[]
}) {
  if (!services.length)
    return <div className="text-gray-500">No services yet.</div>

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      {/* Mobile */}
      <div className="md:hidden space-y-4 p-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-xl p-4 space-y-2"
          >
            <p className="font-semibold">
              {service.name}
            </p>

            <p className="text-sm text-gray-500">
              {service.pricingType}
            </p>

            {service.basePrice && (
              <p className="text-sm">
                R{service.basePrice.toFixed(2)}
              </p>
            )}

            <div className="flex justify-between items-center">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  service.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {service.active ? "Active" : "Inactive"}
              </span>

              <form action={deleteService.bind(null, service.id)}>
                <button className="text-red-600 text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">Name</th>
            <th>Type</th>
            <th>Base Price</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t">
              <td className="p-4">{service.name}</td>
              <td>{service.pricingType}</td>
              <td>
                {service.basePrice
                  ? `R${service.basePrice.toFixed(2)}`
                  : "-"}
              </td>
              <td>
                {service.active ? "Active" : "Inactive"}
              </td>
              <td>
                <form action={deleteService.bind(null, service.id)}>
                  <button className="text-red-600">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}