"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import {
  Users,
  CarFront,
  ArrowRight,
  MapPin,
  Star,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import PremiumSectionHeader from "@/components/ui/premium/PremiumSectionHeader"
import { LuxuryCard } from "@/components/ui/premium/LuxuryCard"


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
        const data = await res.json()
        setServices(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const visibleServices = useMemo(
  () =>
    Array.isArray(services)
      ? services.filter((s) => s.vehicles?.length)
      : [],
  [services]
)


  return (
    <section className="py-28 bg-white relative overflow-hidden">

      {/* Luxury background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-20"
        >

          <PremiumSectionHeader
              eyebrow="Premium Fleet"
              title="Luxury"
              highlight="Transport Services"
              description="Executive vehicles designed for airport transfers, corporate travel, weddings and private tours across Cape Town."
            />

          <a
            href="/quote"
            className="hidden lg:flex items-center gap-3 font-black text-sm uppercase tracking-widest text-slate-900 hover:text-secondary transition"
          >
            View Pricing <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* CONTENT */}
        {loading ? (
          <Skeleton />
        ) : visibleServices.length > 0 ? (
          <div className="space-y-28">
            {visibleServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                {/* SERVICE HEADER */}
                <div className="mb-10 flex items-start gap-6">
                  <div className="w-1 h-14 bg-secondary rounded-full" />

                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {service.name}
                    </h3>

                    {service.description && (
                      <p className="text-slate-500 mt-2 max-w-2xl">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>

                <VehicleSlider vehicles={service.vehicles || []} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyServicesState />
        )}
      </div>
    </section>
  )
}

/* ================= VEHICLE SLIDER ================= */

function VehicleSlider({ vehicles }: { vehicles: Vehicle[] }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 1.1, spacing: 18 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2.2, spacing: 22 } },
      "(min-width: 1200px)": { slides: { perView: 3, spacing: 28 } },
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

/* ================= VEHICLE CARD ================= */

// function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
//   const router = useRouter()

//   const image = vehicle.images?.[0]?.url

//   return (
//     <LuxuryCard
//       className="cursor-pointer"
//       onClick={() => router.push(`/vehicles/${vehicle.id}`)}
//     >

//       {/* IMAGE */}
//       <div className="relative h-72 w-full bg-slate-100 overflow-hidden">

//         {image ? (
//           <Image
//             src={image}
//             alt={vehicle.name}
//             fill
//             className="object-cover group-hover:scale-110 transition duration-700"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <CarFront className="w-10 h-10 text-slate-300" />
//           </div>
//         )}

//         {/* CAPACITY BADGE */}
//         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-black flex items-center gap-2">
//           <Users className="w-4 h-4" />
//           {vehicle.capacity} PASSENGERS
//         </div>

//         {/* TYPE BADGE */}
//         <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
//           {vehicle.type}
//         </div>

//       </div>

//       {/* CONTENT */}
//       <div className="p-6">

//         <h4 className="text-xl font-black text-slate-900 group-hover:text-secondary transition">
//           {vehicle.name}
//         </h4>

//         <p className="text-sm text-slate-400 mt-1">
//           Luxury Chauffeur Vehicle
//         </p>

//         <div className="flex items-center justify-between mt-6">

//           <div className="flex items-center gap-2 text-xs text-slate-400">
//             <Star className="w-4 h-4 text-secondary" />
//             Premium Fleet
//           </div>

//           <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition">
//             <ArrowRight className="w-5 h-5" />
//           </div>

//         </div>

//       </div>
//     </LuxuryCard>
//   )
// }
function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter()

  const image = vehicle.images?.[0]?.url

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.3 }}
      onClick={() => router.push(`/vehicles/${vehicle.id}`)}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-[3rem]
        bg-white
        border
        border-slate-100
        shadow-sm
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]
        transition-all
        duration-500
      "
    >
      {/* IMAGE */}
      <div className="relative h-[340px] overflow-hidden bg-slate-100">

        {image ? (
          <Image
            src={image}
            alt={vehicle.name}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CarFront className="h-12 w-12 text-slate-300" />
          </div>
        )}

        {/* Luxury Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Vehicle Type */}
        <div
          className="
            absolute
            bottom-5
            left-5
            rounded-full
            border
            border-white/10
            bg-black/40
            backdrop-blur-xl
            px-4
            py-2
          "
        >
          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-white
            "
          >
            {vehicle.type}
          </span>
        </div>

        {/* Capacity Badge */}
        <div
          className="
            absolute
            top-5
            right-5
            rounded-full
            bg-white/95
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-700" />
            <span className="text-xs font-black text-slate-900">
              {vehicle.capacity} PAX
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">

        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-green-500" />

          <span
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.25em]
              text-slate-400
            "
          >
            Available
          </span>
        </div>

        <h4
          className="
            text-2xl
            font-black
            leading-tight
            text-slate-900
            transition-colors
            group-hover:text-secondary
          "
        >
          {vehicle.name}
        </h4>

        <p className="mt-2 text-slate-500">
          Executive Transport Experience
        </p>

        <div className="mt-8 flex items-center justify-between">

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-slate-400
                font-bold
              "
            >
              Capacity
            </p>

            <h5 className="mt-1 text-lg font-black text-slate-900">
              {vehicle.capacity} Passengers
            </h5>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-primary
              text-white
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:bg-secondary
            "
          >
            <ArrowRight className="h-5 w-5" />
          </div>

        </div>
      </div>
    </motion.div>
  )
}

/* ================= SKELETON ================= */

function Skeleton() {
  return (
    <div className="space-y-20">
      {[1, 2].map((i) => (
        <div key={i}>
          <div className="h-10 w-60 bg-slate-100 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="h-96 bg-slate-50 rounded-[2.5rem] animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}


/* =================EMpty Services ============= */
function EmptyServicesState() {
  const whatsappUrl =
    "https://wa.me/27606411703?text=Hello%20MD%20Travels,%20I%20would%20like%20to%20make%20a%20booking%20or%20enquiry."

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-10 md:p-16 shadow-xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-secondary/[0.03]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="inline-flex px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
          Premium Service
        </span>

        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
          No Services Available
          <br />
          <span className="text-secondary">At This Moment</span>
        </h3>

        <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
          Our online fleet catalogue is currently being updated.
          For immediate bookings, quotations, airport transfers,
          corporate travel, events, shuttle services or private transport,
          please contact MD Travels directly.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3
              px-8 py-4
              rounded-2xl
              bg-green-500
              text-white
              font-bold
              shadow-lg
              hover:scale-105
              transition-all
            "
          >
            <FaWhatsapp className="w-6 h-6" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}