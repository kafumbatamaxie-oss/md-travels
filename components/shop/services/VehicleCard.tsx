"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type VehicleImage = {
  url: string
}

type Vehicle = {
  id: string
  name: string
  type: string
  capacity: number
  images?: VehicleImage[]
}

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const imageUrl = vehicle.images?.[0]?.url || "/placeholder-car.jpg"

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={imageUrl}
          alt={vehicle.name}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="/placeholder-blur.png"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-sky-950">{vehicle.name}</h3>
        <p className="text-sm text-gray-500">{vehicle.type}</p>
        <p className="text-sm text-gray-500">Seats: {vehicle.capacity}</p>
      </div>
    </motion.div>
  )
}