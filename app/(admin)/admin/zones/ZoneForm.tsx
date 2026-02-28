"use client"

import { createZone } from "./actions"

export default function ZoneForm() {
  return (
    <form
      action={createZone}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">
        Add Zone
      </h2>

      <input
        name="name"
        placeholder="Zone name"
        required
        className="w-full border rounded-xl p-3"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="multiplier"
          type="number"
          step="0.01"
          defaultValue={1}
          required
          className="w-full border rounded-xl p-3"
          placeholder="Multiplier"
        />

        <input
          name="extraFee"
          type="number"
          step="0.01"
          defaultValue={0}
          required
          className="w-full border rounded-xl p-3"
          placeholder="Extra Fee"
        />
      </div>

      <textarea
        name="description"
        placeholder="Description (optional)"
        className="w-full border rounded-xl p-3"
      />

      <button className="bg-black text-white px-6 py-3 rounded-xl w-full md:w-auto">
        Create Zone
      </button>
    </form>
  )
}