import { prisma } from "@/lib/prisma"

export async function getZoneMultiplier(address: string) {
  const zones = await prisma.zone.findMany()

  const lower = address.toLowerCase()

  for (const zone of zones) {
    if (lower.includes(zone.name.toLowerCase())) {
      return zone.multiplier
    }
  }

  return 1 // default
}