import { DbVehicle, UiVehicle } from "@/lib/types"

export function mapDbVehicleToUi(vehicle: DbVehicle): UiVehicle {
  return {
    id: vehicle.id,
    name: vehicle.name,
    category: vehicle.category,
    imageUrl: vehicle.imageUrl,
    pricePerDay: vehicle.pricePerDay,
    status: vehicle.status,
    passengers: vehicle.passengers,
    fuelType: vehicle.fuelType ?? "Petrol",
    transmission: "Automatic", // default until DB supports it
    features: [
      "Air Conditioning",
      "Bluetooth",
      "GPS Navigation",
    ],
  }
}
