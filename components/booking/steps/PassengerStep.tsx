"use client"

import { useState } from "react"
import Confetti from "react-confetti"
import { motion, AnimatePresence } from "framer-motion"

import { useBooking } from "../BookingProvider"

type Props = {
  onSuccess?: () => void
}

export default function PassengerStep({
  onSuccess,
}: Props) {
  const { draft, resetDraft } =
    useBooking()

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [passengers,
    setPassengers] =
    useState(1)

  const [notes,
    setNotes] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const [success,
    setSuccess] =
    useState(false)

  async function submit() {
    try {
      setLoading(true)

      const res =
        await fetch(
          "/api/booking/create",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              ...draft,

              customerName:
                name,

              customerEmail:
                email,

              customerPhone:phone,

              passengers,
              notes,
              pickupDate:
              draft.pickupDate,

              pickupTime: draft.pickupTime,
            }),
          }
        )

      const data =
        await res.json()

      if (!res.ok) {
        throw new Error(
          data.error
        )
      }

      setSuccess(true)

      resetDraft()

      setTimeout(() => {
        onSuccess?.()
      }, 4000)

    } catch (error) {
      console.error(error)

      alert(
        "Booking failed"
      )
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <Confetti />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
          p-8
          text-center
          flex
          flex-col
          items-center
          justify-center
          min-h-[500px]
        "
        >
          <div
            className="
            w-24
            h-24
            rounded-full
            bg-green-500
            text-white
            flex
            items-center
            justify-center
            text-5xl
          "
          >
            ✓
          </div>

          <h2 className="mt-6 text-4xl font-black">
            Booking Confirmed
          </h2>

          <p className="mt-3 text-slate-500">
            We received your booking.
          </p>
        </motion.div>
      </>
    )
  }

  return (
    <div className="p-6">

      <h2 className="text-3xl font-black">
        Passenger Details
      </h2>

      <p className="text-slate-500 mt-2">
        Just a few final details
      </p>

      <div className="mt-8 space-y-4">

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Full Name"
          className="
          w-full
          rounded-2xl
          border
          p-4
        "
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Email"
          type="email"
          className="
          w-full
          rounded-2xl
          border
          p-4
        "
        />

        <input
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          placeholder="Phone"
          className="
          w-full
          rounded-2xl
          border
          p-4
        "
        />

        <input
          type="number"
          value={passengers}
          onChange={(e) =>
            setPassengers(
              Number(
                e.target.value
              )
            )
          }
          className="
          w-full
          rounded-2xl
          border
          p-4
        "
        />

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          rows={4}
          placeholder="Special Requests"
          className="
          w-full
          rounded-2xl
          border
          p-4
        "
        />

      </div>

      <div
        className="
        mt-8
        rounded-[32px]
        border
        p-5
        bg-slate-50
      "
      >
        <h3 className="font-bold">
          Booking Summary
        </h3>

        <div className="mt-4 space-y-2 text-sm">

          <p>
            {draft.pickupAddress}
          </p>

          <p>
            →
          </p>

          <p>
            {
              draft.destinationAddress
            }
          </p>

          <p>
                Date:
                {" "}
                {draft.pickupDate}
                </p>

        <p>
                Time:
                {" "}
                {draft.pickupTime}
         </p>

          <hr />

          <p>
            Estimated Fare:
          </p>

          <h4 className="text-3xl font-black">
            R
            {draft.estimate?.price.toFixed(
              0
            )}
          </h4>

        </div>
      </div>

      <button
        disabled={
          loading ||
          !name ||
          !email ||
          !phone
        }
        onClick={submit}
        className="
        mt-8
        w-full
        rounded-2xl
        bg-black
        text-white
        py-4
        font-bold
        disabled:opacity-50
      "
      >
        {loading
          ? "Creating Booking..."
          : "Confirm Booking"}
      </button>

    </div>
  )
}