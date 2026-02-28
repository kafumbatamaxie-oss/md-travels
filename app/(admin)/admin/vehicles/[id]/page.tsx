import { prisma } from "@/lib/prisma"

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditVehiclePage({ params }: PageProps) {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: params.id, // make sure your Prisma id is string
    },
  })

  if (!vehicle) return <div>Vehicle not found</div>

  return <div>Edit {vehicle.name}</div>
}