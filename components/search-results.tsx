import type { UiVehicle } from "@/lib/types"

interface SearchResultsProps {
  vehicles: UiVehicle[]
  searchParams: {
    pickup?: string
    destination?: string
    date?: string
  }
}

export function SearchResults({
  vehicles,
  searchParams,
}: SearchResultsProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="rounded-2xl border p-4">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.name}
              className="rounded-xl mb-4"
            />
            <h3 className="font-semibold">{vehicle.name}</h3>
            <p className="text-sm text-muted-foreground">
              {vehicle.category}
            </p>
            <p className="mt-2 font-bold">
              R {vehicle.pricePerDay} / day
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
