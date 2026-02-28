"use client"

import { updateZone } from "./actions"

export default function EditZoneModal({
  zone,
  onClose,
}: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow space-y-4">

        <h2 className="text-lg font-semibold">
          Edit {zone.name}
        </h2>

        <form action={updateZone.bind(null, zone.id)} className="space-y-4">

          <input
            name="name"
            defaultValue={zone.name}
            required
            className="w-full border rounded-xl p-3"
          />

          <input
            name="multiplier"
            type="number"
            step="0.01"
            defaultValue={zone.multiplier}
            required
            className="w-full border rounded-xl p-3"
          />

          <input
            name="extraFee"
            type="number"
            step="0.01"
            defaultValue={zone.extraFee}
            required
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="description"
            defaultValue={zone.description || ""}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}