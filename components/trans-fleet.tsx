"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Users, ArrowRight, Shield, Wind, CheckCircle2, CarFront, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const vehicles = [
  {
    name: "Mercedes Benz Executive",
    seats: "4 Seater",
    image: "/images/mercedes-4seater.avif",
    description: "Luxury executive transport for VIP and corporate clients.",
    longDescription: "Our Mercedes sedan offers premium comfort and elegance, perfect for executive airport transfers, corporate events, and VIP transport. Enjoy leather seating, climate control, and a smooth ride.",
    features: ["Air Conditioning", "Leather Seats", "USB Charging", "Tinted Windows"],
    idealFor: ["Airport Transfers", "Corporate Travel", "VIP Transport", "Weddings"],
  },
  {
    name: "Honda Mid-Size",
    seats: "9 Seater",
    image: "/images/honda-9-seater.avif",
    description: "Comfortable mid-size shuttle for small groups and families.",
    longDescription: "The Honda 9-seater is a versatile shuttle, ideal for small group transfers, family outings, and day tours. Spacious interior with ample luggage room for comfort.",
    features: ["Climate Control", "Spacious Interior", "Luggage Space", "Sliding Doors"],
    idealFor: ["Family Outings", "Small Group Tours", "Hotel Shuttles", "Day Trips"],
  },
  {
    name: "Toyota HiAce",
    seats: "11 Seater",
    image: "/images/toyota-hicae-11-seater.avif",
    description: "Versatile people-mover for daily and contract transport.",
    longDescription: "A proven workhorse, ideal for daily shuttle services, contract transport, and medium-sized group transfers throughout the Western Cape region.",
    features: ["Air Conditioning", "Comfortable Seating", "Large Luggage Bay", "Safety Belts"],
    idealFor: ["Daily Shuttles", "Contract Transport", "Group Transfers", "Staffing"],
  },
  {
    name: "Toyota Quantum GL",
    seats: "14 Seater",
    image: "/images/toyota-qunatum-14-seater.avif",
    description: "Reliable workhorse for school and staff shuttle services.",
    longDescription: "The most popular choice for school transport and staff shuttle services. Known for durability and high-roof comfort for daily routes.",
    features: ["High Roof", "Safety Belts", "Wide Entry Door", "Rear AC Vents"],
    idealFor: ["School Transport", "Staff Shuttles", "Church Groups", "Sports Teams"],
  },
  {
    name: "Toyota Commuter Bus",
    seats: "36 Seater",
    image: "/images/toyota-bus-36-seater.avif",
    description: "Full-size bus for large groups, events, and conferences.",
    longDescription: "The ideal solution for large group transport, including conferences, school excursions, and long-distance tours with professional drivers.",
    features: ["PA System", "Reclining Seats", "Under-Bus Storage", "Dual AC"],
    idealFor: ["Conferences", "School Excursions", "Long-Distance", "Events"],
  },
]

function VehicleCard({
  vehicle,
  onClick,
}: {
  vehicle: (typeof vehicles)[0]
  onClick: () => void
}) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]" />
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={500}
          height={300}
          className="object-contain transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2 text-white font-bold text-[10px] uppercase tracking-widest">
            <Users className="h-3 w-3 text-secondary" />
            {vehicle.seats}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-black text-secondary tracking-tight leading-tight">
            {vehicle.name}
          </h3>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-secondary transition-all">
            <ArrowRight className="h-5 w-5 text-primary group-hover:text-primary/50" />
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-primary/80 leading-relaxed">
          {vehicle.description}
        </p>
      </div>
    </motion.article>
  )
}

export function TransFleet() {
  const [selectedVehicle, setSelectedVehicle] = useState<(typeof vehicles)[0] | null>(null)

  return (
    <section id="fleet" className="bg-[#fcfcfd] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        <div className="mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white"
          >
            <CarFront className="h-3 w-3 text-secondary" />
            The MD Fleet
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter text-primary md:text-6xl"
          >
            Modern Vehicles <br className="hidden md:block" /> for Every Journey<span className="text-6xl text-secondary">.</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.name}
              vehicle={vehicle}
              onClick={() => setSelectedVehicle(vehicle)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
        <DialogContent className="max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none bg-white shadow-2xl">
          {selectedVehicle && (
            <div className="flex flex-col">
              <div className="relative h-72 md:h-96 bg-slate-50 flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)]" />
                <Image
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  fill
                  className="object-contain p-12"
                />
              </div>

              <div className="p-8 md:p-12 space-y-8">
                <DialogHeader className="space-y-2">
                  <div className="flex items-center gap-2 text-secondary">
                    <Shield className="w-4 h-4 fill-secondary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vehicle Specification</span>
                  </div>
                  <DialogTitle className="text-4xl font-black tracking-tighter text-slate-900">
                    {selectedVehicle.name}
                  </DialogTitle>
                </DialogHeader>

                <p className="text-lg font-medium text-slate-500 leading-relaxed">
                  {selectedVehicle.longDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                      <Wind className="h-4 w-4 text-secondary" />
                      Interior Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedVehicle.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                      <CarFront className="h-4 w-4 text-secondary" />
                      Ideal Usage
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedVehicle.idealFor.map((item) => (
                        <span key={item} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pax Capacity</p>
                        <p className="font-bold text-slate-900">{selectedVehicle.seats}</p>
                      </div>
                   </div>
                   <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-95">
                      Check Availability
                   </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
