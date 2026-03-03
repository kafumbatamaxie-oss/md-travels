"use client";

import { useState, useTransition } from "react";
import { submitContract } from "@/app/actions/charterContract";

export default function ContractDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await submitContract(formData);
    });
  }

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
      >
        Request Contract
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

          {/* LOADING OVERLAY */}
          {isPending && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white px-6 py-4 rounded-xl shadow-lg text-center">
                <p className="font-semibold">
                  Generating contract & sending email...
                </p>
              </div>
            </div>
          )}

          {/* DIALOG */}
          <form
            action={handleSubmit}
            className="
              bg-white w-full max-w-lg
              rounded-2xl shadow-xl
              p-6 space-y-4
              max-h-[90vh] overflow-y-auto
            "
          >
            <h2 className="text-xl font-bold text-center">
              Charter Agreement Details
            </h2>

            {/* HOTEL */}
            <input
              name="hotelName"
              placeholder="Hotel Name"
              required
              className="input"
            />

            <textarea
              name="hotelAddress"
              placeholder="Hotel Address"
              required
              className="input min-h-[80px]"
            />

            {/* CONTACT */}
            <input
              name="contactPerson"
              placeholder="Contact Person"
              required
              className="input"
            />

            <input
              name="title"
              placeholder="Title / Position"
              required
              className="input"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              required
              className="input"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              required
              className="input"
            />

            {/* DATES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">
                  Contract Start Date
                </label>
                <input
                  name="contractStartDate"
                  type="date"
                  required
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Signing Date
                </label>
                <input
                  name="signingDate"
                  type="date"
                  required
                  className="input"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button
              disabled={isPending}
              className="
                bg-green-600 text-white w-full py-3 rounded-xl
                font-semibold
                disabled:opacity-50
              "
            >
              {isPending ? "Processing..." : "Generate Contract"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full text-sm text-gray-500"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}