import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function AdminHome() {
  const { userId } = await auth()

  if (!userId) redirect("/sign-in")

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p className="text-gray-600">
        Manage pricing and quote engine settings
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <a
          href="/admin/vehicles"
          className="p-6 border rounded-lg hover:shadow bg-white"
        >
          <h2 className="text-xl font-semibold">Vehicles</h2>
          <p className="text-sm text-gray-500">
            Pricing per vehicle
          </p>
        </a>

        <a
          href="/admin/services"
          className="p-6 border rounded-lg hover:shadow bg-white"
        >
          <h2 className="text-xl font-semibold">Services</h2>
          <p className="text-sm text-gray-500">
            Pricing strategies
          </p>
        </a>

        <a
          href="/admin/zones"
          className="p-6 border rounded-lg hover:shadow bg-white"
        >
          <h2 className="text-xl font-semibold">Zones</h2>
          <p className="text-sm text-gray-500">
            Location modifiers
          </p>
        </a>

      </div>
    </div>
  )
}