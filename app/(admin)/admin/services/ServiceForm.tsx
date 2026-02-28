"use client"

import { createService } from "./actions"

export default function ServiceForm() {
  return (
    <form
      action={createService}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold">
        Add Service
      </h2>

      <input
        name="name"
        placeholder="Service name"
        required
        className="w-full border rounded-xl p-3"
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full border rounded-xl p-3"
      />

      <select
        name="pricingType"
        required
        className="w-full border rounded-xl p-3"
      >
        <option value="">Select pricing type</option>
        <option value="DISTANCE">Distance Based</option>
        <option value="DAILY">Daily Rate</option>
        <option value="HOURLY">Hourly Rate</option>
        <option value="PACKAGE">Package Price</option>
      </select>

      <input
        name="basePrice"
        type="number"
        step="0.01"
        placeholder="Base Price (optional)"
        className="w-full border rounded-xl p-3"
      />

      <button className="bg-black text-white px-6 py-3 rounded-xl w-full md:w-auto">
        Create Service
      </button>
    </form>
  )
}