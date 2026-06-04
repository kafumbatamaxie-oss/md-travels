"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { useBooking } from "../BookingProvider"

type Props = {
  onNext: () => void
}

type Vehicle = {
  id: string
  name: string
  type: string

  capacity: number

  luggageCapacity: number | null

  executive: boolean

  wifi: boolean

  images: {
    url: string
  }[]

  basePrice: number | null
}

export default function VehicleStep({
  onNext,
}: Props) {
  const {
    draft,
    updateDraft,
  } = useBooking()

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([])

  const [selectedVehicle,
    setSelectedVehicle] =
    useState<string>()

  const [loading,
    setLoading] =
    useState(true)

  useEffect(() => {
    async function loadVehicles() {
      try {
        const res = await fetch(
          `/api/services/${draft.serviceId}/vehicles`
        )

        const data =
          await res.json()

        setVehicles(
          data.map(
            (item: any) =>
              item.vehicle
          )
        )
      } finally {
        setLoading(false)
      }
    }

    if (draft.serviceId) {
      loadVehicles()
    }
  }, [draft.serviceId])

  function selectVehicle(
    vehicle: Vehicle
  ) {
    setSelectedVehicle(
      vehicle.id
    )

    updateDraft({
      vehicleId:
        vehicle.id,
    })
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading vehicles...
      </div>
    )
  }

  return (
    <div className="p-6">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Select Vehicle
        </h2>

        <p className="text-slate-500 mt-2">
          Choose the perfect ride
        </p>

      </div>

      <div className="space-y-5">

        {vehicles.map(
          (vehicle) => {
            const active =
              selectedVehicle ===
              vehicle.id

            return (
              <motion.button
                key={vehicle.id}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  selectVehicle(
                    vehicle
                  )
                }
                className={`
                  w-full
                  overflow-hidden
                  rounded-[32px]
                  border
                  bg-white
                  text-left
                  transition-all
                  duration-300
                  shadow-lg

                  ${
                    active
                      ? "border-blue-600 ring-2 ring-blue-600"
                      : "border-slate-200"
                  }
                `}
              >

                <div className="relative h-48">

                  <Image
                    src={
                      vehicle.images?.[0]
                        ?.url ||
                      "/placeholder-car.jpg"
                    }
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-5">

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-black text-xl">
                        {vehicle.name}
                      </h3>

                      <p className="text-slate-500">
                        {vehicle.type}
                      </p>

                    </div>

                    {active && (
                      <div
                        className="
                        w-8 h-8
                        rounded-full
                        bg-blue-600
                        text-white
                        flex items-center
                        justify-center
                      "
                      >
                        ✓
                      </div>
                    )}

                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">

                    <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                      👥 {vehicle.capacity}
                    </span>

                    {vehicle.luggageCapacity && (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                        🧳{" "}
                        {
                          vehicle.luggageCapacity
                        }
                      </span>
                    )}

                    {vehicle.executive && (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                        Executive
                      </span>
                    )}

                    {vehicle.wifi && (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                        WiFi
                      </span>
                    )}

                  </div>

                </div>

              </motion.button>
            )
          }
        )}

      </div>

      {draft.estimate && (
        <div
          className="
          mt-8
          rounded-[32px]
          bg-slate-50
          p-5
          border
        "
        >
          <p className="text-slate-500">
            Estimated Fare
          </p>

          <h3 className="text-4xl font-black mt-1">
            R
            {draft.estimate.price.toFixed(
              0
            )}
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            {
              draft.estimate.distanceKm
            }
            km •{" "}
            {
              draft.estimate
                .durationMinutes
            }
            min
          </p>
        </div>
      )}

      <button
        disabled={!selectedVehicle}
        onClick={onNext}
        className="
          mt-8
          w-full
          rounded-2xl
          bg-black
          py-4
          text-white
          font-bold
          disabled:opacity-40
        "
      >
        Continue
      </button>

    </div>
  )
}