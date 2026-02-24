"use client"

import { useState } from "react"

export default function AdminServicesPage() {
  const [serviceName, setServiceName] = useState("")
  const [description, setDescription] = useState("")
  const [pricingType, setPricingType] = useState("DISTANCE")
  const [basePrice, setBasePrice] = useState("")

  const [vehicleName, setVehicleName] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [passengers, setPassengers] = useState("")
  const [perKmRate, setPerKmRate] = useState("")

  const handleAddService = async () => {
    await fetch("/api/admin/services", {
      method: "POST",
      body: JSON.stringify({
        name: serviceName,
        description,
        pricingType,
        basePrice: Number(basePrice) || null,
      }),
    })

    alert("Service added")
    setServiceName("")
    setDescription("")
    setBasePrice("")
  }

  const handleAddVehicle = async () => {
    await fetch("/api/admin/vehicles", {
      method: "POST",
      body: JSON.stringify({
        name: vehicleName,
        brand,
        category,
        passengers: Number(passengers),
        perKmRate: Number(perKmRate),
      }),
    })

    alert("Vehicle added")
    setVehicleName("")
    setBrand("")
    setCategory("")
    setPassengers("")
    setPerKmRate("")
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">

      {/* ===== ADD SERVICE ===== */}
      <div className="border p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Add Service</h2>

        <input
          placeholder="Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <select
          value={pricingType}
          onChange={(e) => setPricingType(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="DISTANCE">Distance Based</option>
          <option value="HOURLY">Hourly</option>
          <option value="DAILY">Daily</option>
          <option value="PACKAGE">Package</option>
        </select>

        <input
          type="number"
          placeholder="Base Price"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleAddService}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Service
        </button>
      </div>

      {/* ===== ADD VEHICLE ===== */}
      <div className="border p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Add Vehicle Type</h2>

        <input
          placeholder="Vehicle Name"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Category (SEDAN / MINIBUS / COACH)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Passengers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Per KM Rate"
          value={perKmRate}
          onChange={(e) => setPerKmRate(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleAddVehicle}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Vehicle
        </button>
      </div>

    </div>
  )
}