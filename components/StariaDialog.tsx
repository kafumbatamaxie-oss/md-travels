"use client";

import { useState, useTransition } from "react";
import { submitStariaQuote } from "@/app/actions/stariaQuote";

export default function StariaDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await submitStariaQuote(formData);
    });
  }

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Accept Quote
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center">

          {/* DIALOG */}
          <div className="bg-white w-full md:max-w-xl rounded-t-2xl md:rounded-2xl shadow-xl max-h-[95vh] overflow-y-auto">

            <form action={handleSubmit} className="p-6 space-y-5">

              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold">
                  Hyundai Staria Booking
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
                Confirm your luxury day trip booking. Our driver will
                contact you after confirmation.
              </p>

              {/* CLIENT DETAILS */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Passenger Information
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
              </div>

              {/* TRIP DATE */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Trip Schedule
                </h3>

                <input
                  name="tripDate"
                  type="date"
                  required
                  className="input"
                />
              </div>

              {/* MORNING TRIP */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Morning Pickup
                </h3>

                <input
                  name="pickupLocation"
                  placeholder="Pickup Location"
                  required
                  className="input"
                />

                <input
                  name="destination"
                  placeholder="Destination (e.g. Franschhoek)"
                  required
                  className="input"
                />

                <input
                  name="pickupTime"
                  type="time"
                  required
                  className="input"
                />
              </div>

              {/* EVENING RETURN */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Evening Return
                </h3>

                <input
                  name="eveningPickupLocation"
                  placeholder="Evening Pickup Location"
                  required
                  className="input"
                />

                <input
                  name="eveningDropoffLocation"
                  placeholder="Drop-off Location"
                  required
                  className="input"
                />

                <input
                  name="eveningPickupTime"
                  type="time"
                  required
                  className="input"
                />
              </div>

              {/* PRICE SUMMARY */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500">
                  Package Price
                </p>
                <p className="text-2xl font-bold">
                  R2,200 / Day
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
                {isPending ? "Confirming Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>

          {/* LOADING OVERLAY */}
          {isPending && (
            <div className="fixed inset-0 z-[60] bg-black/70 flex flex-col items-center justify-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4" />
              <p className="text-lg font-medium">
                Preparing your booking...
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}