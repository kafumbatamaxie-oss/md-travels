"use client";

import { useState } from "react";
import { submitCorollaBooking } from "@/app/actions/corollaBooking";

export default function CorollaDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl w-full md:w-auto"
      >
        Book Now
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xl">
              Generating Invoice...
            </div>
          )}

          <form
            action={async (formData) => {
              setLoading(true);
              await submitCorollaBooking(formData);
            }}
            className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold">
              Toyota Corolla Booking
            </h2>

            <input
              name="name"
              placeholder="Full Name"
              required
              className="input"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="input"
            />

            <input
              name="phone"
              placeholder="Phone"
              required
              className="input"
            />

            <input
              name="pickupLocation"
              placeholder="Pickup Location"
              required
              className="input"
            />

            <input
              name="dropoffLocation"
              placeholder="Dropoff Location"
              required
              className="input"
            />

            <label className="text-sm font-medium">
              Pickup Date
            </label>

            <input
              name="pickupDate"
              type="date"
              required
              className="input"
            />

            <label className="text-sm font-medium">
              Pickup Time
            </label>

            <input
              name="pickupTime"
              type="time"
              required
              className="input"
            />

            <label className="text-sm font-medium">
              Number of Days
            </label>

            <input
              name="days"
              type="number"
              min="1"
              required
              className="input"
            />

            <label className="text-sm font-medium">
              Package
            </label>

            <select
              name="package"
              className="input"
            >
              <option value="half">Half Day (R1800)</option>
              <option value="full">Full Day (R3600)</option>
            </select>

            <button
              disabled={loading}
              className="bg-green-600 text-white w-full py-3 rounded-xl disabled:opacity-50"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </>
  );
}