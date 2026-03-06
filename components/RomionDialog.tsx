"use client";

import { useState } from "react";
import { corollaBooking } from "@/app/actions/romionBooking";

export default function RomionDialog({ close }: { close: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await corollaBooking(formData);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-xl w-full max-w-md p-6">

        <h2 className="text-xl font-bold mb-4">
          Romion Booking
        </h2>

        <form action={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Full Name"
            required
            className="border p-3 rounded w-full"
          />

          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            className="border p-3 rounded w-full"
          />

          <input
            name="phone"
            placeholder="Phone"
            required
            className="border p-3 rounded w-full"
          />

          <input
            name="people"
            placeholder="Passengers"
            required
            className="border p-3 rounded w-full"
          />

          <label className="text-sm">Pickup Date</label>
          <input
            name="pickupDate"
            type="date"
            required
            className="border p-3 rounded w-full"
          />

          <label className="text-sm">Pickup Time</label>
          <input
            name="pickupTime"
            type="time"
            required
            className="border p-3 rounded w-full"
          />

          <label className="text-sm">Dropoff Date</label>
          <input
            name="dropoffDate"
            type="date"
            required
            className="border p-3 rounded w-full"
          />

          <label className="text-sm">Dropoff Time</label>
          <input
            name="dropoffTime"
            type="time"
            required
            className="border p-3 rounded w-full"
          />

          <input
            name="days"
            type="number"
            placeholder="How many days"
            required
            className="border p-3 rounded w-full"
          />

          <button
            disabled={loading}
            className="bg-black text-white w-full py-3 rounded"
          >
            {loading ? "Creating Invoice..." : "Book Now"}
          </button>
        </form>

        <button
          onClick={close}
          className="mt-4 text-sm text-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}