"use client";

import { useState, useTransition } from "react";
import { submitProposal } from "@/app/actions/proposalBooking";

export default function ProposalDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await submitProposal(formData);
    });
  }

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Request Proposal
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center">

          {/* DIALOG */}
          <div className="bg-white w-full md:max-w-xl rounded-t-2xl md:rounded-2xl shadow-xl max-h-[95vh] overflow-y-auto">

            <form
              action={handleSubmit}
              className="p-6 space-y-5"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold">
                  Transport Proposal Request
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
                Tell us about your transport needs and we’ll prepare a
                customized partnership proposal.
              </p>

              {/* COMPANY INFO */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Contact Information
                </h3>

                <input
                  name="clientName"
                  placeholder="Company / Organization Name"
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

              {/* CONTRACT */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Contract Details
                </h3>

                <select name="contractType" className="input">
                  <option>Short-term</option>
                  <option>Long-term</option>
                  <option>Custom Solution</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="busCount"
                    type="number"
                    min={1}
                    placeholder="Number of Buses"
                    required
                    className="input"
                  />

                  <input
                    name="passengers"
                    type="number"
                    min={1}
                    placeholder="Passengers"
                    required
                    className="input"
                  />
                </div>
              </div>

              {/* ROUTE */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Route Information
                </h3>

                <input
                  name="pickup"
                  placeholder="Pickup Location"
                  required
                  className="input"
                />

                <input
                  name="destination"
                  placeholder="Destination"
                  required
                  className="input"
                />
              </div>

              {/* DATES */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">
                  Schedule
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    name="startDate"
                    type="date"
                    required
                    className="input"
                  />

                  <input
                    name="endDate"
                    type="date"
                    required
                    className="input"
                  />
                </div>
              </div>

              {/* NOTES */}
              <textarea
                name="notes"
                rows={3}
                placeholder="Additional details (routes, frequency, special requirements...)"
                className="input"
              />

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
                {isPending ? "Submitting Request..." : "Submit Request"}
              </button>
            </form>
          </div>

          {/* LOADING OVERLAY */}
          {isPending && (
            <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-[60] text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4" />
              <p className="text-lg font-medium">
                Preparing proposal...
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}