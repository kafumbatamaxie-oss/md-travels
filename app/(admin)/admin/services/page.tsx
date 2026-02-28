import { prisma } from "@/lib/prisma"
import ServiceForm from "./ServiceForm"
import ServiceTable from "./ServiceTable"

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-semibold">
          Services
        </h1>
        <p className="text-gray-500 text-sm">
          Manage pricing logic for quotes
        </p>
      </div>

      <ServiceForm />

      <ServiceTable services={services} />

    </div>
  )
}