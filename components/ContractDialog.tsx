"use client";

import { useState } from "react";
import { submitContract } from "@/app/actions/charterContract";

export default function ContractDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Request Contract
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <form
            action={submitContract}
            className="bg-white p-6 rounded-xl space-y-3 w-[450px]"
          >
            <h2 className="text-xl font-bold">
              Charter Agreement Details
            </h2>

            <input name="hotelName" placeholder="Hotel Name" required className="input"/>
            <textarea name="hotelAddress" placeholder="Hotel Address" required className="input"/>

            <input name="contactPerson" placeholder="Contact Person" required className="input"/>
            <input name="title" placeholder="Title / Position" required className="input"/>

            <input name="email" type="email" placeholder="Email" required className="input"/>
            <input name="phone" placeholder="Phone" required className="input"/>

            <label>Contract Start Date</label>
            <input name="contractStartDate" type="date" required className="input"/>

            <label>Signing Date</label>
            <input name="signingDate" type="date" required className="input"/>

            <button className="bg-green-600 text-white w-full py-2 rounded">
              Generate Contract
            </button>
          </form>
        </div>
      )}
    </>
  );
}