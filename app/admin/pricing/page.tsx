import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {prisma} from "@/lib/prisma"

export default async function AdminPricingPage() {
  const { userId } = await auth()

  if (!userId) redirect("/sign-in")

  const vehicles = await prisma.vehicle.findMany()
  const services = await prisma.service.findMany()
  const zones = await prisma.zone.findMany()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <h1 className="text-3xl font-bold">Admin Pricing Dashboard</h1>

      {/* VEHICLES */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {vehicles.map(v => (
            <div key={v.id} className="border p-4 rounded-lg bg-white shadow">
              <h3 className="font-semibold">{v.name}</h3>
              <p>Per KM: R {v.perKmRate ?? 0}</p>
              <p>Hourly: R {v.hourlyRate ?? 0}</p>
              <p>Daily: R {v.dailyRate ?? 0}</p>
              <p>Status: {v.status}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.id} className="border p-4 rounded-lg bg-white shadow">
              <h3 className="font-semibold">{s.name}</h3>
              <p>Pricing Type: {s.pricingType}</p>
              <p>Base Price: R {s.basePrice ?? 0}</p>
              <p>Active: {s.active ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ZONES */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Zones</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {zones.map(z => (
            <div key={z.id} className="border p-4 rounded-lg bg-white shadow">
              <h3 className="font-semibold">{z.name}</h3>
              <p>Multiplier: {z.multiplier}</p>
              <p>Extra Fee: R {z.extraFee}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}