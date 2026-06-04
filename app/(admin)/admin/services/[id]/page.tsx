"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditServicePage() {
  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    fetch(`/api/admin/services/${id}`)
      .then((res) => res.json())
      .then((service) => {
        setForm({
          name: service.name || "",
          slug: service.slug || "",
          description: service.description || "",

          category: service.category,
          pricingModel: service.pricingModel,

          basePrice: service.basePrice?.toString() || "",
          perKmPrice: service.perKmPrice?.toString() || "",
          perHourPrice: service.perHourPrice?.toString() || "",
          perDayPrice: service.perDayPrice?.toString() || "",
          minimumCharge: service.minimumCharge?.toString() || "",

          active: service.active,
        })

        setLoading(false)
      })
  }, [id])

  async function save() {
    await fetch(`/api/admin/services/${id}`, {
      method: "PUT",
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

    alert("Service updated")
  }

  async function deleteService() {
    if (!confirm("Delete this service?")) return

    await fetch(`/api/admin/services/${id}`, {
      method: "DELETE",
    })

    router.push("/admin/services")
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black">
          Edit Service
        </h1>

        <button
          onClick={deleteService}
          className="px-4 py-2 bg-red-500 text-white rounded-xl"
        >
          Delete
        </button>
      </div>

      <div className="bg-white rounded-2xl border p-6 space-y-4">

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
        />

        <input
          value={form.basePrice}
          onChange={(e) =>
            setForm({
              ...form,
              basePrice: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Base Price"
        />

        <input
          value={form.perKmPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perKmPrice: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Per KM Price"
        />

        <input
          value={form.perHourPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perHourPrice: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Per Hour Price"
        />

        <input
          value={form.perDayPrice}
          onChange={(e) =>
            setForm({
              ...form,
              perDayPrice: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Per Day Price"
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
          onClick={save}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Save Changes
        </button>

      </div>
    </div>
  )
}