"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateServicePage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    description: "",
    pricingModel: "AIRPORT_TRANSFER",
    basePrice: "",
    pricePerKm: "",
    pricePerDay: ""
  })

  const submit = async () => {
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        basePrice: Number(form.basePrice) || null,
        pricePerKm: Number(form.pricePerKm) || null,
        pricePerDay: Number(form.pricePerDay) || null
      })
    })

    router.push("/admin/services")
  }

  return (
    <div className="p-6 max-w-xl">

      <h1 className="text-2xl font-bold mb-6">
        Create Service
      </h1>

      <input
        placeholder="Service name"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <select
        className="border p-2 w-full mb-4"
        onChange={(e) =>
          setForm({ ...form, pricingModel: e.target.value })
        }
      >
        <option value="AIRPORT_TRANSFER">Airport Transfer</option>
        <option value="SINGLE_TRIP">Single Trip</option>
        <option value="DAILY_TRIP">Daily Trip</option>
        <option value="HALF_DAY_TRIP">Half Day Trip</option>
        <option value="HOURLY">Hourly</option>
      </select>

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>

    </div>
  )
}
