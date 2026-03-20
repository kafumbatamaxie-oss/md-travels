"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Vehicle {
  id: string
  name: string
  type: string
  capacity: number
}

export default function ServiceVehiclesPage() {

  const params = useParams()
  const id = params.id as string

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [assigned, setAssigned] = useState<string[]>([])
  const [serviceName, setServiceName] = useState("")
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    fetchData()
  }, [])



  async function fetchData() {

    const res = await fetch(`/api/admin/services/${id}/vehicles`)
    const data = await res.json()

    setVehicles(data.vehicles)

    setServiceName(data.service.name)

    const assignedIds =
      data.service.vehicles.map((v:any)=>v.vehicleId)

    setAssigned(assignedIds)

    setLoading(false)
  }



  function toggleVehicle(vehicleId:string) {

    if (assigned.includes(vehicleId)) {

      setAssigned(
        assigned.filter(id => id !== vehicleId)
      )

    } else {

      setAssigned([...assigned, vehicleId])

    }
  }



  async function saveAssignments() {

    await fetch(`/api/admin/services/${id}/vehicles`, {

      method: "POST",

      headers: {
        "Content-Type":"application/json"
      },

      body: JSON.stringify({
        vehicleIds: assigned
      })

    })

    alert("Vehicles updated")
  }



  if (loading) {
    return <div className="p-6">Loading...</div>
  }



  return (

    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Vehicles for {serviceName}
      </h1>



      <div className="bg-white border rounded-xl p-6 space-y-3">

        {vehicles.map(vehicle => (

          <label
            key={vehicle.id}
            className="flex items-center gap-3 border p-3 rounded cursor-pointer hover:bg-gray-50"
          >

            <input
              type="checkbox"
              checked={assigned.includes(vehicle.id)}
              onChange={()=>toggleVehicle(vehicle.id)}
            />

            <div>
              <p className="font-medium">
                {vehicle.name}
              </p>

              <p className="text-sm text-gray-500">
                {vehicle.type} • {vehicle.capacity} seats
              </p>
            </div>

          </label>

        ))}

      </div>



      <button
        onClick={saveAssignments}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Assignments
      </button>

    </div>

  )

}
