"use client"

import { useState } from "react"
import { deleteZone } from "./actions"
import EditZoneModal from "./EditZoneModal"

interface Zone {
  id: string
  name: string
  multiplier: number
  extraFee: number
  description: string | null
}

export default function ZoneTable({ zones }: { zones: Zone[] }) {
  const [editing, setEditing] = useState<Zone | null>(null)

  if (!zones.length)
    return <div className="text-gray-500">No zones yet.</div>

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      {/* MOBILE */}
      <div className="md:hidden space-y-4 p-4">
        {zones.map((zone) => (
          <div key={zone.id} className="border rounded-xl p-4 space-y-2">

            <p className="font-semibold">{zone.name}</p>

            <p className="text-sm text-gray-500">
              Multiplier: {zone.multiplier}
            </p>

            <p className="text-sm text-gray-500">
              Extra Fee: R{zone.extraFee.toFixed(2)}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setEditing(zone)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>

              <form action={deleteZone.bind(null, zone.id)}>
                <button className="text-red-600 text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">Name</th>
            <th>Multiplier</th>
            <th>Extra Fee</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {zones.map((zone) => (
            <tr key={zone.id} className="border-t">
              <td className="p-4">{zone.name}</td>
              <td>{zone.multiplier}</td>
              <td>R{zone.extraFee.toFixed(2)}</td>
              <td className="space-x-4">
                <button
                  onClick={() => setEditing(zone)}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <form
                  className="inline"
                  action={deleteZone.bind(null, zone.id)}
                >
                  <button className="text-red-600">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditZoneModal
          zone={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}