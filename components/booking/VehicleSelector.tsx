"use client"

import Image from "next/image"

interface Vehicle {
  id: string
  name: string
  type: string
  capacity: number

  luggageCapacity?: number

  wifi?: boolean
  executive?: boolean

  basePrice?: number

  images?: {
    url: string
  }[]
}

interface Props {
  vehicles: Vehicle[]
  selected?: string

  onSelect: (
    vehicleId: string
  ) => void
}

export default function VehicleSelector({
  vehicles,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="space-y-4">

      {vehicles.map((vehicle) => {

        const image =
          vehicle.images?.[0]?.url

        const active =
          selected === vehicle.id

        return (
          <button
            key={vehicle.id}
            onClick={() =>
              onSelect(vehicle.id)
            }
            className={`
              w-full
              overflow-hidden
              rounded-3xl
              border
              transition-all
              duration-300

              ${
                active
                  ? "border-blue-600 ring-4 ring-blue-100"
                  : "border-gray-200"
              }
            `}
          >

            <div className="relative h-52">

              {image ? (
                <Image
                  src={image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100">
                  No Image
                </div>
              )}

            </div>

            <div className="p-5 text-left">

              <h3 className="font-black text-xl">
                {vehicle.name}
              </h3>

              <p className="text-gray-500">
                {vehicle.type}
              </p>

              <div className="flex gap-4 mt-3 text-sm">

                <span>
                  👤 {vehicle.capacity}
                </span>

                <span>
                  🧳 {vehicle.luggageCapacity ?? "-"}
                </span>

              </div>

              <div className="flex gap-2 mt-3 flex-wrap">

                {vehicle.executive && (
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    Executive
                  </span>
                )}

                {vehicle.wifi && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    Wifi
                  </span>
                )}

              </div>

              <div className="mt-4 font-black text-lg">
                From R
                {vehicle.basePrice ?? 0}
              </div>

            </div>

          </button>
        )
      })}
    </div>
  )
}