"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateServicePage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    slug: "",

    description: "",

    category: "AIRPORT_TRANSFER",

    pricingModel: "DISTANCE",

    basePrice: "",
    perKmPrice: "",
    perHourPrice: "",
    perDayPrice: "",
    minimumCharge: "",

    active: true,
  })

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

  async function submit() {
    await fetch("/api/admin/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,

        basePrice: Number(form.basePrice) || null,
        perKmPrice: Number(form.perKmPrice) || null,
        perHourPrice: Number(form.perHourPrice) || null,
        perDayPrice: Number(form.perDayPrice) || null,
        minimumCharge: Number(form.minimumCharge) || null,
      }),
    })

    router.push("/admin/services")
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">

      <h1 className="text-3xl font-black mb-8">
        Create Service
      </h1>

      <div className="space-y-5">

        <input
          placeholder="Service Name"
          className="border rounded-xl p-3 w-full"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: generateSlug(e.target.value),
            })
          }
        />

        <input
          placeholder="Slug"
          className="border rounded-xl p-3 w-full"
          value={form.slug}
          readOnly
        />

        <textarea
          placeholder="Description"
          className="border rounded-xl p-3 w-full"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <select
          className="border rounded-xl p-3 w-full"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        >
          <option value="AIRPORT_TRANSFER">Airport Transfer</option>
          <option value="CORPORATE">Corporate</option>
          <option value="EVENT">Events</option>
          <option value="WEDDING">Wedding</option>
          <option value="VIP">VIP</option>
          <option value="TOUR">Tour</option>
          <option value="SHUTTLE">Shuttle</option>
          <option value="STAFF">Staff Transport</option>
          <option value="SCHOOL">School Transport</option>
          <option value="CHAUFFEUR">Chauffeur</option>
        </select>

        <select
          className="border rounded-xl p-3 w-full"
          value={form.pricingModel}
          onChange={(e) =>
            setForm({
              ...form,
              pricingModel: e.target.value,
            })
          }
        >
          <option value="FIXED">Fixed</option>
          <option value="DISTANCE">Distance</option>
          <option value="HOURLY">Hourly</option>
          <option value="HALF_DAY">Half Day</option>
          <option value="FULL_DAY">Full Day</option>
          <option value="CUSTOM">Custom</option>
        </select>

        <input
          placeholder="Base Price"
          className="border rounded-xl p-3 w-full"
          value={form.basePrice}
          onChange={(e) =>
            setForm({
              ...form,
              basePrice: e.target.value,
            })
          }
        />

        <input
          placeholder="Price Per KM"
          className="border rounded-xl p-3 w-full"
          value={form.perKmPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perKmPrice: e.target.value,
            })
          }
        />

        <input
          placeholder="Price Per Hour"
          className="border rounded-xl p-3 w-full"
          value={form.perHourPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perHourPrice: e.target.value,
            })
          }
        />

        <input
          placeholder="Price Per Day"
          className="border rounded-xl p-3 w-full"
          value={form.perDayPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perDayPrice: e.target.value,
            })
          }
        />

        <input
          placeholder="Minimum Charge"
          className="border rounded-xl p-3 w-full"
          value={form.minimumCharge}
          onChange={(e) =>
            setForm({
              ...form,
              minimumCharge: e.target.value,
            })
          }
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm({
                ...form,
                active: e.target.checked,
              })
            }
          />
          Active Service
        </label>

        <button
          onClick={submit}
          className="w-full bg-black text-white rounded-xl py-4 font-bold"
        >
          Save Service
        </button>

      </div>
    </div>
  )
}