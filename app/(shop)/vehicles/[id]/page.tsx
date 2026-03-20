"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import cloudinaryLoader from "@/lib/cloudinary-loader"
import { motion } from "framer-motion"

type VehicleImage = { url: string }

type Vehicle = {
  id: string
  name: string
  type: string
  capacity: number
  description?: string
  images?: VehicleImage[]
  pricingModel?: string
}

export default function VehicleDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [quoteData, setQuoteData] = useState({ name: "", email: "", message: "" })
  const [quoteSent, setQuoteSent] = useState(false)
  const [error, setError] = useState("")

  // Fetch vehicle details
  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`/api/vehicles/${id}`)
        if (!res.ok) throw new Error("Failed to fetch vehicle")
        const data = await res.json()
        setVehicle(data)
      } catch (err) {
        console.error(err)
        setError("Failed to load vehicle")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [id])

  // Handle quote form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId: id, ...quoteData }),
      })
      if (!res.ok) throw new Error("Failed to submit quote")
      setQuoteSent(true)
    } catch (err) {
      console.error(err)
      setError("Failed to submit quote")
    }
  }

  if (loading) return <p className="text-center py-20">Loading...</p>
  if (!vehicle) return <p className="text-center py-20">{error || "Vehicle not found"}</p>

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 md:px-8">
      {/* Vehicle Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-sky-950 mb-4"
      >
        {vehicle.name}
      </motion.h1>

      {/* Vehicle Type & Capacity */}
      <p className="text-sky-700 mb-6">
        Type: {vehicle.type} | Capacity: {vehicle.capacity} passengers
      </p>

      {/* Vehicle Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {vehicle.images?.map((img, i) => (
          <div key={i} className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              loader={cloudinaryLoader}
              src={img.url}
              alt={vehicle.name}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={img.url.replace("/upload/", "/upload/e_blur:1000,q_1,w_50/")}
            />
          </div>
        ))}
      </div>

      {/* Vehicle Description */}
      {vehicle.description && (
        <p className="text-sky-700 mb-8">{vehicle.description}</p>
      )}

      {/* Quote Request Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold mb-4 text-sky-950">Request a Quote</h2>

        {quoteSent ? (
          <p className="text-green-600">Your quote request has been submitted! We will contact you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sky-950">Name</label>
              <input
                type="text"
                required
                value={quoteData.name}
                onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-950">Email</label>
              <input
                type="email"
                required
                value={quoteData.email}
                onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-sky-950">Message</label>
              <textarea
                required
                rows={4}
                value={quoteData.message}
                onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              className="bg-sky-950 text-white px-6 py-2 rounded-md hover:bg-sky-800 transition"
            >
              Submit Quote
            </button>
          </form>
        )}
      </div>
    </div>
  )
}