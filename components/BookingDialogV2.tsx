"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

import BookingProgress from "./BookingProgress"
import GooglePlacesInput from "./GooglePlacesInput"

interface Props {
  open: boolean
  onClose: () => void
}

export default function BookingDialogV2({
  open,
  onClose,
}: Props) {
  const [step, setStep] = useState(0)

  const totalSteps = 4

  const next = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    }
  }

  const prev = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed inset-0
              bg-black/50
              backdrop-blur-xl
              z-[999]
            "
          />

          {/* Sheet */}

          <motion.div
            initial={{
              y: "100%",
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 300,
            }}
            className="
              fixed inset-0
              z-[1000]
              bg-white
              rounded-t-[2rem]
              overflow-hidden
            "
          >
            {/* Handle */}

            <div className="pt-3 flex justify-center">
              <div className="w-16 h-1.5 rounded-full bg-zinc-300" />
            </div>

            {/* Header */}

            <div className="px-5 py-4 border-b">
              <div className="flex items-center justify-between">
                <button onClick={onClose}>
                  <X className="w-6 h-6" />
                </button>

                <h2 className="font-semibold">
                  Book Transport
                </h2>

                <div className="w-6" />
              </div>

              <div className="mt-4">
                <BookingProgress
                  current={step}
                  total={totalSteps}
                />
              </div>
            </div>

            {/* Content */}

            <div className="h-[calc(100vh-180px)] overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{
                    opacity: 0,
                    x: 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="p-5"
                >
                  {step === 0 && (
                    <TripStep />
                  )}

                  {step === 1 && (
                    <VehicleStep />
                  )}

                  {step === 2 && (
                    <ContactStep />
                  )}

                  {step === 3 && (
                    <ReviewStep />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}

            <div className="border-t p-4 flex gap-3">
              {step > 0 && (
                <button
                  onClick={prev}
                  className="
                    flex-1
                    h-14
                    rounded-2xl
                    border
                    font-medium
                  "
                >
                  <ChevronLeft className="w-4 h-4 inline mr-2" />
                  Back
                </button>
              )}

              <button
                onClick={next}
                className="
                  flex-1
                  h-14
                  rounded-2xl
                  bg-black
                  text-white
                  font-semibold
                "
              >
                {step === totalSteps - 1
                  ? "Confirm Booking"
                  : "Continue"}

                <ChevronRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function TripStep() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] =
    useState("")

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold">
        Trip Details
      </h3>

      <GooglePlacesInput
        value={pickup}
        onChange={setPickup}
        placeholder="Pickup location"
      />

      <GooglePlacesInput
        value={destination}
        onChange={setDestination}
        placeholder="Destination"
      />

      <input
        type="date"
        className="
          w-full
          h-16
          px-5
          rounded-3xl
          border
        "
      />

      <input
        type="time"
        className="
          w-full
          h-16
          px-5
          rounded-3xl
          border
        "
      />
    </div>
  )
}

function VehicleStep() {
  const vehicles = [
    {
      name: "Toyota Quantum",
      passengers: 13,
      price: 1800,
    },
    {
      name: "Mercedes V-Class",
      passengers: 7,
      price: 2500,
    },
    {
      name: "BMW 7 Series",
      passengers: 3,
      price: 3200,
    },
  ]

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">
        Select Vehicle
      </h3>

      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.name}
            className="
              w-full
              rounded-3xl
              border
              p-5
              text-left
              hover:border-black
              transition
            "
          >
            <h4 className="font-bold">
              {vehicle.name}
            </h4>

            <p className="text-sm text-zinc-500">
              {vehicle.passengers} Passengers
            </p>

            <div className="mt-4 font-black text-xl">
              R {vehicle.price}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ContactStep() {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        Contact Details
      </h3>
    </div>
  )
}

function ReviewStep() {
  return (
    <div>
      <h3 className="text-2xl font-bold">
        Review Booking
      </h3>
    </div>
  )
}