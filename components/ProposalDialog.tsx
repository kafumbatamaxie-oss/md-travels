"use client";

import { useState } from "react";
import { submitProposal } from "@/app/actions/proposalBooking";

export default function ProposalDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Request Proposal
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <form
            action={submitProposal}
            className="bg-white p-6 rounded-xl space-y-3 w-[420px]"
          >
            <h2 className="text-xl font-bold">
              Transport Request
            </h2>

            <input name="clientName" placeholder="Company / Name" required className="input" />
            <input name="email" type="email" placeholder="Email" required className="input" />
            <input name="phone" placeholder="Phone" required className="input" />

            <select name="contractType" className="input">
              <option>Short-term</option>
              <option>Long-term</option>
              <option>Custom</option>
            </select>

            <input name="busCount" type="number" placeholder="Number of Buses" required className="input"/>
            <input name="passengers" type="number" placeholder="Passengers" required className="input"/>

            <input name="pickup" placeholder="Pickup Location" required className="input"/>
            <input name="destination" placeholder="Destination" required className="input"/>

            <input name="startDate" type="date" required className="input"/>
            <input name="endDate" type="date" required className="input"/>

            <textarea name="notes" placeholder="Additional details" className="input"/>

            <button className="bg-green-600 text-white w-full py-2 rounded">
              Submit Request
            </button>
          </form>
        </div>
      )}
    </>
  );
}