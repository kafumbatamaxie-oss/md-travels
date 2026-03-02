"use client";

import { useState } from "react";
import { submitWinelands } from "@/app/actions/winelandsBooking";
import TourSelector from "./TourSelector";

export default function WinelandsDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Select Tour & Book
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <form
            action={submitWinelands}
            className="bg-white p-6 rounded-xl space-y-3 w-[420px]"
          >
            <h2 className="text-xl font-bold">
              Winelands Booking
            </h2>

            <input name="name" placeholder="Full Name" required className="input"/>
            <input name="email" type="email" placeholder="Email" required className="input"/>
            <input name="phone" placeholder="Phone" required className="input"/>

            <input name="people" type="number" placeholder="Number of People" required className="input"/>

            <label>Airport Shuttle Dates</label>
            <input name="shuttlePickup" type="date" required className="input"/>
            <input name="shuttleDropoff" type="date" required className="input"/>

            <TourSelector onChange={() => {}} />

            <button className="bg-green-600 text-white w-full py-2 rounded">
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </>
  );
}