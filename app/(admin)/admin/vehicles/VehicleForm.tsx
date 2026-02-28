"use client"

export default function VehicleForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void
  defaultValues?: any
}) {
  return (
    <form action={action} className="space-y-4 max-w-xl">

      <input
        name="name"
        defaultValue={defaultValues?.name}
        placeholder="Vehicle Name"
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        name="brand"
        defaultValue={defaultValues?.brand}
        placeholder="Brand"
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        name="category"
        defaultValue={defaultValues?.category}
        placeholder="Category"
        className="w-full border p-3 rounded-xl"
        required
      />

      <input
        type="number"
        name="passengers"
        defaultValue={defaultValues?.passengers}
        placeholder="Passengers"
        className="w-full border p-3 rounded-xl"
        required
      />

      <textarea
        name="description"
        defaultValue={defaultValues?.description}
        placeholder="Description"
        className="w-full border p-3 rounded-xl"
      />

      <input
        name="images"
        placeholder="Image URL"
        className="w-full border p-3 rounded-xl"
      />

      <button className="w-full bg-black text-white p-3 rounded-xl">
        Save Vehicle
      </button>
    </form>
  )
}