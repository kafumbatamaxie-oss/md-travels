import { AlertCircle } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { SearchResults } from "@/components/search-results"
import { mapDbVehicleToUi } from "@/lib/mappers/vehicle"
import type { UiVehicle } from "@/lib/types"

export const revalidate = 60

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { pickup?: string; destination?: string; date?: string }
}) {
  let vehicles: UiVehicle[] = []
  let error: string | null = null

  try {
    if (process.env.DATABASE_URL) {
      const dbVehicles = await prisma.vehicle.findMany({
        where: { status: "AVAILABLE" },
      })

      vehicles = dbVehicles.map(mapDbVehicleToUi)
    }
  } catch (e) {
    console.error("[SEARCH] Prisma error:", e)
    error =
      "We’re currently showing our featured luxury vehicles while we update live availability."
  }

  const mockVehicles: UiVehicle[] = [
    {
      id: "mock-1",
      name: "Mercedes-Benz V-Class",
      category: "Luxury Multi-Purpose",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 2450,
      status: "AVAILABLE",
      features: ["GPS", "Bluetooth", "Leather Seats", "Climate Control"],
      passengers: 6,
      transmission: "Automatic",
      fuelType: "Diesel",
    },
    {
      id: "mock-2",
      name: "BMW 7 Series",
      category: "Executive Sedan",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 3200,
      status: "AVAILABLE",
      features: ["Massage Seats", "HUD", "Adaptive Cruise"],
      passengers: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
    {
      id: "mock-3",
      name: "Audi A8",
      category: "Luxury Sedan",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 2950,
      status: "AVAILABLE",
      features: ["Quattro AWD", "Virtual Cockpit", "Heated Seats"],
      passengers: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
    {
      id: "mock-4",
      name: "Range Rover Vogue",
      category: "Luxury SUV",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 3800,
      status: "AVAILABLE",
      features: ["Air Suspension", "Panoramic Roof", "Terrain Response"],
      passengers: 5,
      transmission: "Automatic",
      fuelType: "Diesel",
    },
    {
      id: "mock-5",
      name: "Porsche Cayenne",
      category: "Performance SUV",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 4100,
      status: "AVAILABLE",
      features: ["Sport Mode", "Adaptive Suspension", "BOSE Audio"],
      passengers: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
    {
      id: "mock-6",
      name: "Mercedes-Benz S-Class",
      category: "Ultra Luxury Sedan",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 4500,
      status: "AVAILABLE",
      features: ["Rear Executive Seats", "Ambient Lighting", "Massage"],
      passengers: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
    {
      id: "mock-7",
      name: "Toyota Land Cruiser VX",
      category: "Premium SUV",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 3300,
      status: "AVAILABLE",
      features: ["4x4", "Multi-Terrain Select", "Leather Interior"],
      passengers: 7,
      transmission: "Automatic",
      fuelType: "Diesel",
    },
    {
      id: "mock-8",
      name: "Lexus LX 600",
      category: "Luxury SUV",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 3900,
      status: "AVAILABLE",
      features: ["Mark Levinson Audio", "Adaptive Suspension"],
      passengers: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
    {
      id: "mock-9",
      name: "Bentley Flying Spur",
      category: "Ultra Luxury",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 7200,
      status: "AVAILABLE",
      features: ["Handcrafted Interior", "Rear Entertainment"],
      passengers: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
    {
      id: "mock-10",
      name: "Rolls-Royce Ghost",
      category: "Prestige Luxury",
      imageUrl: "/luxury-car-profile.jpg",
      pricePerDay: 9800,
      status: "AVAILABLE",
      features: ["Starlight Headliner", "Silent Cabin"],
      passengers: 4,
      transmission: "Automatic",
      fuelType: "Petrol",
    },
  ]

  const results: UiVehicle[] =
    vehicles.length > 0 ? vehicles : mockVehicles

  return (
    <main className="min-h-screen bg-background">
      {error && (
        <div className="container px-4 mx-auto pt-24">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-4 rounded-2xl flex items-center gap-4">
            <AlertCircle className="w-6 h-6" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      )}

      <SearchResults vehicles={results} searchParams={searchParams} />
    </main>
  )
}
