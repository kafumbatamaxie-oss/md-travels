import { PrismaClient, PricingModel } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

  await prisma.service.createMany({
    data: [
      {
        name: "Airport Transfer",
        description: "Airport pickup and drop-off service",
        pricingModel: PricingModel.AIRPORT_TRANSFER,
        basePrice: 450
      },

      {
        name: "City Point to Point",
        description: "Transport between locations within the city",
        pricingModel: PricingModel.SINGLE_TRIP
      },

      {
        name: "Event Shuttle",
        description: "Hourly shuttle service for events",
        pricingModel: PricingModel.HOURLY,
        basePrice: 650
      },

      {
        name: "Long Distance Transfer",
        description: "Inter-city long distance travel",
        pricingModel: PricingModel.SINGLE_TRIP,
        pricePerKm: 12
      }
    ],
    skipDuplicates: true
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })