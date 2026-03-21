"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import cloudinaryLoader from "@/lib/cloudinary-loader"
import { Users, Info, ArrowRight, CarFront } from "lucide-react"
import Link from "next/link"

// Types (Unchanged Business Logic)
type VehicleImage = { url: string }
type Vehicle = { id: string; name: string; type: string; capacity: number; images?: VehicleImage[] }
type Service = { id: string; name: string; description?: string | null; pricingModel: string; vehicles?: Vehicle[] }

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

  const visibleServices = useMemo(() => 
    services.filter((s) => s.vehicles && s.vehicles.length > 0), 
  [services])

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#fcfcfd] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center lg:text-left lg:flex lg:items-end lg:justify-between gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 block">
              Premium Fleet
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Transport Services
            </h2>
            <p className="text-slate-500 mt-4 text-lg font-medium leading-relaxed">
              Explore a curated selection of vehicles tailored for every Cape Town journey.
            </p>
          </div>
          <div className="hidden lg:block pb-2">
            <Link href="/quote" className="flex items-center gap-2 font-bold text-sm group">
              VIEW FULL PRICING <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {loading ? <SkeletonServices /> : <ServicesList services={visibleServices} />}
      </div>
    </section>
  )
}

function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="space-y-24">
      {services.map((service, idx) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Service Header with Accent */}
          <div className="mb-10 flex items-start gap-6">
            <div className="w-1 h-12 bg-black rounded-full mt-1 shrink-0" />
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                {service.name}
              </h3>
              {service.description && (
                <p className="text-slate-500 mt-2 max-w-2xl font-medium">
                  {service.description}
                </p>
              )}
            </div>
          </div>

          <VehicleCarousel vehicles={service.vehicles || []} />
        </motion.div>
      ))}
    </div>
  )
}

function VehicleCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.15, spacing: 16 }, // Mobile peek-ahead
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2.1, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 30 } },
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider !overflow-visible">
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="keen-slider__slide">
          <VehicleCard vehicle={vehicle} />
        </div>
      ))}
    </div>
  )
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter()
  const image = vehicle.images?.[0]?.url

  return (
    <motion.div
      onClick={() => router.push(`/vehicles/${vehicle.id}`)}
      whileHover={{ y: -10 }}
      className="group relative cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
        {image ? (
          <Image
            loader={cloudinaryLoader}
            src={image}
            alt={vehicle.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <CarFront className="w-12 h-12 text-slate-300" />
          </div>
        )}
        
        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm border border-white/20">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <Users className="w-3.5 h-3.5" />
            {vehicle.capacity} PAX
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="font-bold text-xl text-slate-900 group-hover:text-black transition-colors">
              {vehicle.name}
            </h4>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">
              {vehicle.type}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <Info className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SkeletonServices() {
  return (
    <div className="space-y-24">
      {[1, 2].map((i) => (
        <div key={i}>
          <div className="flex gap-6 mb-10">
            <div className="w-1 h-12 bg-slate-100 rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
              <div className="h-4 w-72 bg-slate-100 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-96 rounded-[2.5rem] bg-slate-50 animate-pulse border border-slate-100" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
