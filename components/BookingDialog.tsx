"use client";

import { useState } from "react";
import { bookSpecialPackage } from "@/app/actions/booking";
import SubmitButton from "@/components/SubmitButton";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        View Package & Book
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Complete Booking
            </h2>

            <form
              action={async (formData) => {
                setLoading(true);
                await bookSpecialPackage(formData);
              }}
              className="space-y-3"
            >
              <input
                name="name"
                placeholder="Full Name"
                required
                className="w-full border p-2 rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full border p-2 rounded"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full border p-2 rounded"
              />

              <input
                name="people"
                type="number"
                placeholder="Number of People"
                required
                className="w-full border p-2 rounded"
              />

              <input
                name="pickupDate"
                type="date"
                required
                className="w-full border p-2 rounded"
              />

              <input
                name="days"
                type="number"
                min={1}
                placeholder="Number of Days"
                required
                className="w-full border p-2 rounded"
              />

              <div className="flex gap-3 pt-3">
                <SubmitButton />

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Loading Overlay */}
      <LoadingOverlay show={loading} />
    </>
  );
}