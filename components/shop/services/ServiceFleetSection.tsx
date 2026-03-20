"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import cloudinaryLoader from "@/lib/cloudinary-loader"

type VehicleImage = { url: string }

type Vehicle = {
  id: string
  name: string
  type: string
  capacity: number
  images?: VehicleImage[]
}

type Service = {
  id: string
  name: string
  description?: string | null
  pricingModel: string
  vehicles?: Vehicle[]
}

export default function ServiceFleetSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services")
        if (!res.ok) throw new Error("Failed to fetch services")
        const data = await res.json()
        setServices(data)
      } catch (err) {
        console.error("Services fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const visibleServices = services.filter(
    (s) => s.vehicles && s.vehicles.length > 0
  )

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-sky-950">
            Our Transport Services
          </h2>
          <p className="text-sky-700 mt-3 max-w-2xl mx-auto">
            Explore our premium fleet tailored for every journey in Cape Town.
          </p>
        </motion.div>

        {loading ? <SkeletonServices /> : <ServicesList services={visibleServices} />}
      </div>
    </section>
  )
}

// Services List with carousel
function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-16">
      {services.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Service Header */}
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-sky-950">
              {service.name}
            </h3>
            {service.description && (
              <p className="text-sky-700 mt-2 max-w-xl">{service.description}</p>
            )}
          </div>

          {/* Swipeable Carousel */}
          <VehicleCarousel vehicles={service.vehicles || []} />
        </motion.div>
      ))}
    </div>
  )
}

// Carousel Component
function VehicleCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter()
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.3, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2.2, spacing: 16 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="keen-slider__slide">
          <VehicleCard vehicle={vehicle} onClick={() => router.push(`/vehicles/${vehicle.id}`)} />
        </div>
      ))}
    </div>
  )
}

// Vehicle Card clickable
function VehicleCard({
  vehicle,
  onClick,
}: {
  vehicle: Vehicle
  onClick?: () => void
}) {
  const image = vehicle.images?.[0]?.url

  return (
    <motion.div
      onClick={onClick}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="cursor-pointer rounded-xl overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 w-full bg-gray-200">
        {image ? (
          <Image
            loader={cloudinaryLoader}
            src={image}
            alt={vehicle.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={image.replace("/upload/", "/upload/e_blur:1000,q_1,w_50/")}
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-lg text-sky-950">{vehicle.name}</h4>
        <p className="text-sm text-sky-700">{vehicle.type}</p>
        <p className="text-sm text-sky-700">Capacity: {vehicle.capacity} passengers</p>
      </div>
    </motion.div>
  )
}

// Skeleton Loader remains the same
function SkeletonServices() {
  return (
    <div className="space-y-16">
      {[1, 2].map((section) => (
        <div key={section}>
          <div className="h-6 w-40 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}