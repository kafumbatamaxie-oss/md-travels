"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Phone, CheckCircle2, ArrowRight, Shield, Fuel, Wind } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const vehicles = [
  {
    name: "Mercedes",
    seats: "4 Seater",
    seatCount: 4,
    image: "/images/mercedes-4seater.avif",
    description: "Luxury executive transport for VIP and corporate clients.",
    longDescription:
      "Our Mercedes sedan offers premium comfort and elegance, perfect for executive airport transfers, corporate events, and VIP transport. Enjoy leather seating, climate control, and a smooth, quiet ride.",
    features: ["Air Conditioning", "Leather Seats", "USB Charging", "Tinted Windows"],
    idealFor: ["Airport Transfers", "Corporate Travel", "VIP Transport", "Wedding Transport"],
  },
  {
    name: "Honda",
    seats: "9 Seater",
    seatCount: 9,
    image: "/images/honda-9-seater.avif",
    description: "Comfortable mid-size shuttle for small groups and families.",
    longDescription:
      "The Honda 9-seater is a versatile and comfortable mid-size shuttle, ideal for small group transfers, family outings, and day tours around the Western Cape. Spacious interior with ample luggage room.",
    features: ["Air Conditioning", "Spacious Interior", "Luggage Space", "Sliding Doors"],
    idealFor: ["Family Outings", "Small Group Tours", "Hotel Shuttles", "Day Trips"],
  },
  {
    name: "Toyota HiAce",
    seats: "11 Seater",
    seatCount: 11,
    image: "/images/toyota-hicae-11-seater.avif",
    description: "Versatile people-mover for daily and contract transport.",
    longDescription:
      "The Toyota HiAce 11-seater is a proven and reliable people-mover, ideal for daily shuttle services, contract transport, and medium-sized group transfers throughout the Western Cape region.",
    features: ["Air Conditioning", "Comfortable Seating", "Large Luggage Bay", "Easy Access"],
    idealFor: ["Daily Shuttles", "Contract Transport", "Group Transfers", "Staff Transport"],
  },
  {
    name: "Toyota Quantum",
    seats: "14 Seater",
    seatCount: 14,
    image: "/images/toyota-qunatum-14-seater.avif",
    description: "Reliable workhorse for school and staff shuttle services.",
    longDescription:
      "The Toyota Quantum 14-seater is our most popular vehicle for school transport and staff shuttle services. Known for its durability, safety, and comfort, it handles daily routes with ease.",
    features: ["Air Conditioning", "Safety Belts", "High Roof", "Wide Entry Door"],
    idealFor: ["School Transport", "Staff Shuttles", "Church Groups", "Sports Teams"],
  },
  {
    name: "Toyota Bus",
    seats: "36 Seater",
    seatCount: 36,
    image: "/images/toyota-bus-36-seater.avif",
    description:
      "Full-size bus for large groups, events, conferences, and tours.",
    longDescription:
      "Our 36-seater Toyota bus is the ideal solution for large group transport, including conferences, events, school excursions, and long-distance tours. Comfortable seating, air conditioning, and professional drivers ensure a premium experience.",
    features: ["Air Conditioning", "Reclining Seats", "PA System", "Large Luggage Compartment"],
    idealFor: ["Conferences", "School Excursions", "Long-Distance Tours", "Large Events"],
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
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-muted/60 to-muted">
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={`${vehicle.name} - ${vehicle.seats}`}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
          <Users className="h-3.5 w-3.5" />
          {vehicle.seats}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">
            {vehicle.name}
          </h3>
          <span className="flex items-center gap-1 text-xs font-medium text-accent-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {vehicle.description}
        </p>
      </div>
    </article>
  )
}

export function TransFleet() {
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof vehicles)[0] | null
  >(null)

  return (
    <section id="fleet" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
            Our Fleet
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            We Maintain a Modern Vehicle Fleet
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From executive sedans to full-size buses, we have the right vehicle
            for every transport requirement.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.name}
              vehicle={vehicle}
              onClick={() => setSelectedVehicle(vehicle)}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedVehicle}
        onOpenChange={(open) => {
          if (!open) setSelectedVehicle(null)
        }}
      >
        {selectedVehicle && (
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                {selectedVehicle.name}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2 pt-1">
                <Users className="h-4 w-4" />
                {selectedVehicle.seats} Capacity
              </DialogDescription>
            </DialogHeader>

            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-b from-muted/60 to-muted">
              <Image
                src={selectedVehicle.image || "/placeholder.svg"}
                alt={`${selectedVehicle.name} - ${selectedVehicle.seats}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, 640px"
              />
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {selectedVehicle.longDescription}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Wind className="h-4 w-4 text-accent-foreground" />
                  Vehicle Features
                </h4>
                <ul className="space-y-2">
                  {selectedVehicle.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-foreground" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Shield className="h-4 w-4 text-accent-foreground" />
                  Ideal For
                </h4>
                <ul className="space-y-2">
                  {selectedVehicle.idealFor.map((use) => (
                    <li
                      key={use}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent-foreground" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+27832871907"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" />
                Call to Book
              </a>
              <a
                href="mailto:mdtravels@mweb.co.za"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Fuel className="h-4 w-4" />
                Request a Quote
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
