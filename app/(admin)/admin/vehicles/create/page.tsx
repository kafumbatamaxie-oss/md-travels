"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateVehiclePage() {

  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    type: "",
    capacity: 1,
    basePrice: "",
    perKmPrice: "",
    perDayPrice: "",
    status: "ACTIVE"
  })

  const submit = async () => {

    await fetch("/api/admin/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        capacity: Number(form.capacity),
        basePrice: Number(form.basePrice) || null,
        perKmPrice: Number(form.perKmPrice) || null,
        perDayPrice: Number(form.perDayPrice) || null
      })
    })

    router.push("/admin/vehicles")
  }

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Add Vehicle
      </h1>

      <input
        placeholder="Vehicle name"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Type (Van / Sedan)"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Capacity"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, capacity: Number(e.target.value) })
        }
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Vehicle
      </button>

    </div>
  )
}
