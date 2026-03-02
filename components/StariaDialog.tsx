"use client";

import { useState } from "react";
import { submitStariaQuote } from "@/app/actions/stariaQuote";

export default function StariaDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Accept Quote
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <form
            action={submitStariaQuote}
            className="bg-white p-6 rounded-xl space-y-3 w-[420px]"
          >
            <h2 className="font-bold text-xl">
              Confirm Booking
            </h2>

            <input name="name" placeholder="Full Name" required className="input"/>
            <input name="email" type="email" placeholder="Email" required className="input"/>
            <input name="phone" placeholder="Phone" required className="input"/>

            <input name="tripDate" type="date" required className="input"/>

            <input name="pickupLocation" placeholder="Pickup Location" required className="input"/>
            <input name="pickupTime" type="time" required className="input"/>

            <input name="destination" placeholder="Destination" required className="input"/>

            <input name="eveningPickupLocation" placeholder="Evening Pickup" required className="input"/>
            <input name="eveningPickupTime" type="time" required className="input"/>

            <input name="eveningDropoffLocation" placeholder="Evening Dropoff" required className="input"/>

            <button className="bg-green-600 text-white w-full py-2 rounded">
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </>
  );
}