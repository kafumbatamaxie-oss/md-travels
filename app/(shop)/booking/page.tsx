"use client"

import { useState } from "react"

export default function BookPage() {
  const [packageType, setPackageType] = useState("FULL_PACKAGE")

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        MD Shuttles Booking
      </h1>

      <form
        action="/api/booking"
        method="POST"
        className="space-y-4"
      >
        <input name="clientName" placeholder="Full Name" required className="w-full border p-2" />
        <input name="clientEmail" type="email" placeholder="Email" required className="w-full border p-2" />
        <input name="clientPhone" placeholder="Phone" required className="w-full border p-2" />

        <input type="date" name="startDate" required className="w-full border p-2" />

        {packageType !== "AIRPORT_ONLY" && (
          <select name="numberOfDays" className="w-full border p-2">
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
          </select>
        )}

        <select
          name="packageType"
          onChange={(e) => setPackageType(e.target.value)}
          className="w-full border p-2"
        >
          <option value="AIRPORT_ONLY">Airport Only</option>
          <option value="DAILY_ONLY">Daily Only</option>
          <option value="FULL_PACKAGE">Airport + Daily</option>
        </select>

        <button className="bg-black text-white px-4 py-2 rounded">
          Complete Booking
        </button>
      </form>
    </div>
  )
}