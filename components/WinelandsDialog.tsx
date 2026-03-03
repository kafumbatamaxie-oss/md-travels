"use client";

import { useState, useTransition } from "react";
import { submitWinelands } from "@/app/actions/winelandsBooking";
import TourSelector from "./TourSelector";

export default function WinelandsDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [total, setTotal] = useState(5100);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await submitWinelands(formData);
    });
  }

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Select Tour & Book
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center">

          {/* DIALOG */}
          <div className="bg-white w-full md:max-w-xl rounded-t-2xl md:rounded-2xl shadow-xl max-h-[95vh] overflow-y-auto">

            <form action={handleSubmit} className="p-6 space-y-6">

              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold">
                  Winelands Experience Booking
                </h2>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-black text-xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Book your airport transfer and wine tour experience.
                Our team will confirm your schedule shortly.
              </p>

              {/* CLIENT DETAILS */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Guest Information
                </h3>

                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  className="input"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                </div>

                <input
                  name="people"
                  type="number"
                  min={1}
                  placeholder="Number of Guests"
                  required
                  className="input"
                />
              </div>

              {/* AIRPORT SHUTTLE */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Airport Shuttle Dates
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    name="shuttlePickup"
                    type="date"
                    required
                    className="input"
                  />

                  <input
                    name="shuttleDropoff"
                    type="date"
                    required
                    className="input"
                  />
                </div>
              </div>

              {/* TOUR SELECTOR */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Choose Tour Package
                </h3>

                <TourSelector
                  onChange={(type, price) => {
                    setTotal(price);
                  }}
                />
              </div>

              {/* SUMMARY */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">
                  Final pricing will be confirmed via invoice
                </p>
                <p className="font-semibold">
                  Airport Shuttle + Winelands Experience
                </p>
              </div>

              {/* SUBMIT */}
              <button
                disabled={isPending}
                className={`w-full py-3 rounded-xl text-white font-semibold transition
                ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isPending
                  ? "Processing Booking..."
                  : "Confirm Booking"}
              </button>
            </form>
          </div>

          {/* LOADING OVERLAY */}
          {isPending && (
            <div className="fixed inset-0 z-[60] bg-black/70 flex flex-col items-center justify-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4" />
              <p className="text-lg font-medium">
                Creating your invoice...
              </p>
              <p className="text-sm opacity-80">
                Please wait a moment
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}