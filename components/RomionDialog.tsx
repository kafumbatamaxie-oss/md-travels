"use client";

import { useState } from "react";
import { submitRomionBooking } from "@/app/actions/submitRomionBooking";

export default function RomionDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Book Romion
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
          <form
            action={submitRomionBooking}
            className="bg-white p-6 rounded-xl space-y-3 w-full max-w-md"
            onSubmit={() => setLoading(true)}
          >
            <h2 className="text-xl font-bold">Romion 7-Seater Booking</h2>

            <input name="name" placeholder="Full Name" required className="input"/>
            <input name="email" type="email" placeholder="Email" required className="input"/>
            <input name="phone" placeholder="Phone" required className="input"/>
            <input name="people" type="number" placeholder="Number of Passengers" required className="input"/>

            <label>Pickup Date & Time</label>
            <input name="pickupDate" type="date" required className="input"/>
            <input name="pickupTime" type="time" required className="input"/>

            <label>Dropoff Date & Time</label>
            <input name="dropoffDate" type="date" required className="input"/>
            <input name="dropoffTime" type="time" required className="input"/>

            <label>Days of Hire</label>
            <input name="days" type="number" min={1} defaultValue={1} required className="input"/>

            <textarea name="notes" placeholder="Additional Notes" className="input"/>

            <button
              disabled={loading}
              className="bg-green-600 text-white w-full py-2 rounded"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}