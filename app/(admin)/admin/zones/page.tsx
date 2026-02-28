import { prisma } from "@/lib/prisma"
import ZoneForm from "./ZoneForm"
import ZoneTable from "./ZoneTable"

export default async function ZonesPage() {
  const zones = await prisma.zone.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-semibold">Zones</h1>
        <p className="text-gray-500 text-sm">
          Manage pricing zones and multipliers
        </p>
      </div>

      <ZoneForm />

      <ZoneTable zones={zones} />

    </div>
  )
}