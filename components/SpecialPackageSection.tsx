"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function SpecialPackageSection() {

  const [open, setOpen] = useState(false)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-10 text-center">
          65-Seater Cape Town Special Package
        </h2>

        {/* CARD */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2"
        >

          {/* IMAGE */}
          <div className="relative h-72 md:h-auto">
            <Image
              src="/images/toyota36seater.png" // put image in public folder
              alt="65 Seater Bus"
              fill
              className="object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="p-8 space-y-4">

            <h3 className="text-2xl font-bold">
              Luxury 65-Seater Bus
            </h3>

            <ul className="list-disc list-inside text-gray-600">
              <li>Airport Transfer (Arrival + Return)</li>
              <li>Daily Trips Around Cape Town</li>
              <li>Professional Driver</li>
              <li>Fuel & Tolls Included</li>
              <li>Air-Conditioned & Comfortable</li>
            </ul>

            <p className="text-3xl font-bold mt-4">
              From R 5,500
            </p>

            <button
              onClick={() => setOpen(true)}
              className="bg-black text-white px-6 py-3 rounded-xl mt-4"
            >
              Book This Package
            </button>

          </div>
        </motion.div>
      </div>

      {/* POPUP DIALOG */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md relative"
            >

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold mb-6">
                Complete Your Booking
              </h3>

              <form
                action="/api/book"
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="packageType" value="FULL_PACKAGE" />
                <input type="hidden" name="numberOfDays" value="3" />

                <input
                  name="clientName"
                  placeholder="Full Name"
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  name="clientEmail"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  name="clientPhone"
                  placeholder="Phone Number"
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="numberOfPeople"
                  placeholder="Number of People"
                  required
                  className="w-full border p-2 rounded"
                />

                <button className="bg-black text-white w-full py-3 rounded-xl">
                  Confirm Booking
                </button>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}