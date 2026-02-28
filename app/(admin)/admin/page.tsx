import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminHome() {
  const { userId } = await auth()

  if (!userId) redirect("/sign-in")

  const links = [
    {
      title: "Vehicles",
      description: "Manage vehicles & pricing",
      href: "/admin/vehicles",
    },
    {
      title: "Services",
      description: "Pricing strategies & packages",
      href: "/admin/services",
    },
    {
      title: "Zones",
      description: "Location pricing modifiers",
      href: "/admin/zones",
    },
    {
      title: "Bookings",
      description: "View & manage customer bookings",
      href: "/admin/bookings",
    },
    {
      title: "Quotes",
      description: "View generated quotes",
      href: "/admin/quotes",
    },
    {
      title: "Inquiries",
      description: "Customer contact messages",
      href: "/admin/inquiries",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage your system data & pricing engine
        </p>
      </div>

      {/* Mobile First Layout */}
      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">

        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition active:scale-[0.98]"
          >
            <h2 className="text-lg font-semibold">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {item.description}
            </p>
          </Link>
        ))}

      </div>
    </div>
  )
}