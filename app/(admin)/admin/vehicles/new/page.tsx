import VehicleForm from "../VehicleForm"
import { createVehicle } from "../actions"

export default function NewVehiclePage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-6">Create Vehicle</h1>
      <VehicleForm action={createVehicle} />
    </div>
  )
}