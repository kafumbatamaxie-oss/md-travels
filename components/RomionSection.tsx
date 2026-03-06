"use client";

import { useState } from "react";
import RomionDialog from "./RomionDialog";

export default function RomionSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 md:p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center px-6">

        {/* LEFT IMAGE */}

        <div className="w-full md:w-1/2">
          <img
            src="/romion.png"
            alt="Toyota Romion"
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}

        <div className="w-full md:w-1/2 space-y-3">
          <h2 className="text-2xl font-bold">
            Toyota Romion – 7 Seater
          </h2>

          <p className="text-sm text-gray-600">
            Spacious and comfortable transport ideal for families
            and small groups exploring Cape Town. Professional
            driver included.
          </p>

          <div className="text-sm">
            <p>Half Day: <strong>R2100</strong></p>
            <p>Full Day: <strong>R4200</strong></p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-black text-white px-5 py-3 rounded-lg w-full md:w-auto"
          >
            Book Now
          </button>
        </div>
      </div>

      {open && <RomionDialog close={() => setOpen(false)} />}
    </div>
  );
}