
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CldUploadWidget } from "next-cloudinary"

interface Vehicle {
  id: string
  name: string
  type: string
  capacity: number
  basePrice?: number
  perKmPrice?: number
  perDayPrice?: number
  status: string
  images: { id: string; url: string; publicId: string }[]
  services: {
    service: { id: string; name: string }
  }[]
}

interface Service {
  id: string
  name: string
}

export default function VehicleDetailsPage() {

  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  const [allServices, setAllServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState("")

  const [form, setForm] = useState({
    name: "",
    type: "",
    capacity: 0,
    basePrice: "",
    perKmPrice: "",
    perDayPrice: "",
    status: "ACTIVE"
  })



  useEffect(() => {
    fetchVehicle()
    fetchServices()
  }, [])



  async function fetchVehicle() {

    const res = await fetch(`/api/admin/vehicles/${id}`)
    const data = await res.json()

    setVehicle(data)

    setForm({
      name: data.name,
      type: data.type,
      capacity: data.capacity,
      basePrice: data.basePrice ?? "",
      perKmPrice: data.perKmPrice ?? "",
      perDayPrice: data.perDayPrice ?? "",
      status: data.status
    })

    setLoading(false)
  }



  async function fetchServices() {

    const res = await fetch("/api/admin/services")
    const data = await res.json()

    setAllServices(data)
  }



  async function updateVehicle() {

    await fetch(`/api/admin/vehicles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        capacity: Number(form.capacity),
        basePrice: form.basePrice ? Number(form.basePrice) : null,
        perKmPrice: form.perKmPrice ? Number(form.perKmPrice) : null,
        perDayPrice: form.perDayPrice ? Number(form.perDayPrice) : null
      })
    })

    alert("Vehicle updated")
    fetchVehicle()
  }



  async function deleteVehicle() {

    const confirmDelete = confirm("Delete this vehicle?")

    if (!confirmDelete) return

    await fetch(`/api/admin/vehicles/${id}`, {
      method: "DELETE"
    })

    router.push("/admin/vehicles")
  }



  async function saveImage(url: string, publicId: string) {

    await fetch(`/api/admin/vehicles/${id}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url,
        publicId
      })
    })

    fetchVehicle()
  }



  async function deleteImage(image: any) {

    await fetch(
      `/api/admin/vehicles/${id}/images?imageId=${image.id}&publicId=${image.publicId}`,
      {
        method: "DELETE"
      }
    )

    fetchVehicle()
  }



  async function assignService() {

    if (!selectedService) return

    await fetch(`/api/admin/vehicles/${id}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        serviceId: selectedService
      })
    })

    setSelectedService("")
    fetchVehicle()
  }



  async function removeService(serviceId: string) {

    await fetch(
      `/api/admin/vehicles/${id}/services?serviceId=${serviceId}`,
      {
        method: "DELETE"
      }
    )

    fetchVehicle()
  }



  if (loading) {
    return <div className="p-6">Loading vehicle...</div>
  }



  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">
        Vehicle Details
      </h1>



      {/* VEHICLE FORM */}

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <h2 className="font-semibold text-lg">
          Edit Vehicle
        </h2>

        <input
          className="border p-2 w-full"
          placeholder="Vehicle Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          className="border p-2 w-full"
          placeholder="Type"
          value={form.type}
          onChange={(e)=>setForm({...form,type:e.target.value})}
        />

        <input
          className="border p-2 w-full"
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e)=>setForm({...form,capacity:Number(e.target.value)})}
        />

        <input
          className="border p-2 w-full"
          placeholder="Base Price"
          value={form.basePrice}
          onChange={(e)=>setForm({...form,basePrice:e.target.value})}
        />

        <input
          className="border p-2 w-full"
          placeholder="Price per KM"
          value={form.perKmPrice}
          onChange={(e)=>setForm({...form,perKmPrice:e.target.value})}
        />

        <input
          className="border p-2 w-full"
          placeholder="Price per Day"
          value={form.perDayPrice}
          onChange={(e)=>setForm({...form,perDayPrice:e.target.value})}
        />

        <select
          className="border p-2 w-full"
          value={form.status}
          onChange={(e)=>setForm({...form,status:e.target.value})}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
          <option value="DISABLED">DISABLED</option>
        </select>

        <button
          onClick={updateVehicle}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>

      </div>



      {/* VEHICLE IMAGES */}

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <h2 className="font-semibold text-lg">
          Vehicle Images
        </h2>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!}
          onSuccess={(result: any) => {
            const url = result.info.secure_url
            const publicId = result.info.public_id
            saveImage(url, publicId)
          }}
        >

          {({ open }) => (
            <button
              onClick={() => open()}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Upload Image
            </button>
          )}

        </CldUploadWidget>

        <div className="grid grid-cols-4 gap-4">

          {vehicle?.images?.map(img => (

            <div key={img.id} className="relative">

              <img
                src={img.url}
                className="rounded border"
              />

              <button
                onClick={() => deleteImage(img)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>

            </div>

          ))}

        </div>

      </div>



      {/* ASSIGN SERVICES */}

      <div className="bg-white border rounded-xl p-6 space-y-4">

        <h2 className="font-semibold text-lg">
          Assign Service
        </h2>

        <div className="flex gap-2">

          <select
            className="border p-2 flex-1"
            value={selectedService}
            onChange={(e)=>setSelectedService(e.target.value)}
          >

            <option value="">
              Select service
            </option>

            {allServices.map(service => (

              <option key={service.id} value={service.id}>
                {service.name}
              </option>

            ))}

          </select>

          <button
            onClick={assignService}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Assign
          </button>

        </div>

      </div>



      {/* SERVICES USING VEHICLE */}

      <div className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Services Using This Vehicle
        </h2>

        {vehicle?.services?.length === 0 && (
          <p className="text-gray-500">
            No services assigned
          </p>
        )}

        {vehicle?.services?.map(s => (

          <div
            key={s.service.id}
            className="flex justify-between items-center border p-2 rounded mb-2"
          >

            <span>{s.service.name}</span>

            <button
              onClick={()=>removeService(s.service.id)}
              className="text-red-600 text-sm"
            >
              Remove
            </button>

          </div>

        ))}

      </div>



      {/* DELETE */}

      <div className="bg-red-50 border border-red-200 p-6 rounded-xl">

        <h2 className="font-semibold text-red-600 mb-2">
          Danger Zone
        </h2>

        <button
          onClick={deleteVehicle}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Vehicle
        </button>

      </div>

    </div>
  )
}

