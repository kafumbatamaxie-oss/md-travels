"use client"

import { useState } from "react"
import PlacesInput from "@/components/booking/PlacesInput"

export default function TestGooglePage() {
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] =
    useState("")

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <PlacesInput
        value={pickup}
        placeholder="Pickup Location"
        onSelect={(place) => {
          console.log(place)

          setPickup(place.address)
        }}
      />

      <PlacesInput
        value={destination}
        placeholder="Destination"
        onSelect={(place) => {
          console.log(place)

          setDestination(place.address)
        }}
      />

    </div>
  )
}