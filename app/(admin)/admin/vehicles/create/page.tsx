"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateVehiclePage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",

    type: "",
    capacity: "",
    luggageCapacity: "",

    basePrice: "",
    perKmPrice: "",
    perDayPrice: "",

    airConditioning: true,
    wifi: false,
    executive: false,

    featured: false,
    active: true,

    status: "ACTIVE",
  })

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

  async function submit() {
    const res = await fetch(
      "/api/admin/vehicles",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...form,

          capacity:
            Number(form.capacity),

          luggageCapacity:
            Number(
              form.luggageCapacity
            ) || null,

          basePrice:
            Number(form.basePrice) ||
            null,

          perKmPrice:
            Number(form.perKmPrice) ||
            null,

          perDayPrice:
            Number(form.perDayPrice) ||
            null,
        }),
      }
    )

    if (!res.ok) {
      const error =
        await res.json()

      alert(
        error.error ??
          "Failed to create vehicle"
      )

      return
    }

    router.push("/admin/vehicles")
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-black mb-8">
        Create Vehicle
      </h1>

      <div className="space-y-5">

        <input
          placeholder="Vehicle Name"
          className="border rounded-xl p-3 w-full"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: generateSlug(
                e.target.value
              ),
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
          rows={4}
          className="border rounded-xl p-3 w-full"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Vehicle Type"
          className="border rounded-xl p-3 w-full"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
        />

        <input
          placeholder="Passenger Capacity"
          type="number"
          className="border rounded-xl p-3 w-full"
          value={form.capacity}
          onChange={(e) =>
            setForm({
              ...form,
              capacity:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Luggage Capacity"
          type="number"
          className="border rounded-xl p-3 w-full"
          value={form.luggageCapacity}
          onChange={(e) =>
            setForm({
              ...form,
              luggageCapacity:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Base Price"
          type="number"
          className="border rounded-xl p-3 w-full"
          value={form.basePrice}
          onChange={(e) =>
            setForm({
              ...form,
              basePrice:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Price Per KM"
          type="number"
          className="border rounded-xl p-3 w-full"
          value={form.perKmPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perKmPrice:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Price Per Day"
          type="number"
          className="border rounded-xl p-3 w-full"
          value={form.perDayPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perDayPrice:
                e.target.value,
            })
          }
        />

        <div className="grid grid-cols-2 gap-4">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                form.airConditioning
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  airConditioning:
                    e.target.checked,
                })
              }
            />
            Air Conditioning
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.wifi}
              onChange={(e) =>
                setForm({
                  ...form,
                  wifi:
                    e.target.checked,
                })
              }
            />
            Wifi
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                form.executive
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  executive:
                    e.target.checked,
                })
              }
            />
            Executive
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                form.featured
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  featured:
                    e.target.checked,
                })
              }
            />
            Featured
          </label>

        </div>

        <select
          className="border rounded-xl p-3 w-full"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
          }
        >
          <option value="ACTIVE">
            Active
          </option>

          <option value="MAINTENANCE">
            Maintenance
          </option>

          <option value="DISABLED">
            Disabled
          </option>
        </select>

        <button
          onClick={submit}
          className="w-full bg-black text-white py-4 rounded-xl font-bold"
        >
          Save Vehicle
        </button>

      </div>
    </div>
  )
}