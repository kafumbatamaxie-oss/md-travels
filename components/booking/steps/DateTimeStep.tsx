"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useBooking } from "../BookingProvider"

type Props = {
  onNext: () => void
}

export default function DateTimeStep({
  onNext,
}: Props) {
  const { updateDraft } =
    useBooking()

  const today =
    new Date()
      .toISOString()
      .split("T")[0]

  const [date, setDate] =
    useState(today)

  const [time, setTime] =
    useState("09:00")

  function continueStep() {
    updateDraft({
      pickupDate: date,
      pickupTime: time,
    })

    onNext()
  }

  return (
    <div className="p-6">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Pickup Schedule
        </h2>

        <p className="text-slate-500 mt-2">
          Choose your collection date and time
        </p>

      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-[32px]
          border
          bg-white
          p-6
          shadow-lg
        "
      >

        <div className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Pickup Date
            </label>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                p-4
              "
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Pickup Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) =>
                setTime(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                p-4
              "
            />

          </div>

        </div>

      </motion.div>

      <button
        onClick={continueStep}
        className="
          mt-8
          w-full
          rounded-2xl
          bg-black
          py-4
          text-white
          font-bold
        "
      >
        Continue
      </button>

    </div>
  )
}