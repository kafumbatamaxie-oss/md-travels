"use client";

import { useState } from "react";
import { corollaBooking } from "@/app/actions/romionBooking";

export default function RomionDialog({
  close,
}: {
  close: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await corollaBooking(formData);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60">

      {/* DIALOG */}

      <div className="w-full md:max-w-lg bg-white rounded-t-2xl md:rounded-2xl shadow-xl flex flex-col max-h-[95vh]">

        {/* HEADER */}

        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">
            Toyota Romion Booking
          </h2>

          <button
            onClick={close}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM AREA */}

        <form
          action={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        >
          {/* CLIENT INFO */}

          <div className="space-y-3">
            <input
              name="name"
              required
              placeholder="Full Name"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="email"
              type="email"
              required
              placeholder="Email Address"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="phone"
              required
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <input
              name="people"
              required
              placeholder="Passengers"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PICKUP */}

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Pickup Details
            </p>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="pickupDate"
                type="date"
                required
                className="border rounded-lg p-3 text-sm"
              />

              <input
                name="pickupTime"
                type="time"
                required
                className="border rounded-lg p-3 text-sm"
              />
            </div>
          </div>

          {/* DROPOFF */}

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Dropoff Details
            </p>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="dropoffDate"
                type="date"
                required
                className="border rounded-lg p-3 text-sm"
              />

              <input
                name="dropoffTime"
                type="time"
                required
                className="border rounded-lg p-3 text-sm"
              />
            </div>
          </div>

          {/* DAYS */}

          <div>
            <input
              name="days"
              type="number"
              min={1}
              required
              placeholder="Number of Days"
              className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-black"
            />
          </div>

          {/* PRICE INFO */}

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <p>Half Day: <strong>R2100</strong></p>
            <p>Full Day: <strong>R4200</strong></p>
            <p className="text-xs mt-1">
              Driver included
            </p>
          </div>

          {/* SUBMIT */}

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Creating Invoice..." : "Confirm Booking"}
          </button>
        </form>

        {/* LOADING OVERLAY */}

        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm">
                Generating Invoice...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}