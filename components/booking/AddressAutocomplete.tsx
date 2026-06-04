"use client"

import {
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api"

import { useState } from "react"

export default function AddressAutocomplete({
  label,
  onSelect,
}: {
  label: string

  onSelect: (data: {
    address: string
    placeId: string
    lat: number
    lng: number
  }) => void
}) {
  const { isLoaded } =
    useJsApiLoader({
      googleMapsApiKey:
        process.env
          .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,

      libraries: ["places"],
    })
    const [pickup, setPickup] =
  useState<any>(null)

const [destination, setDestination] =
  useState<any>(null)
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(
      null
    )

  if (!isLoaded)
    return null

  return (
    <div>

      <label className="font-semibold">
        {label}
      </label>

      <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={() => {
          if (!autocomplete)
            return

          const place =
            autocomplete.getPlace()

          onSelect({
            address:
              place.formatted_address ||
              "",

            placeId:
              place.place_id || "",

            lat:
              place.geometry
                ?.location?.lat() || 0,

            lng:
              place.geometry
                ?.location?.lng() || 0,
          })
        }}
      >
        <input
          placeholder={`Search ${label}`}
          className="
            w-full
            border
            rounded-2xl
            p-4
            mt-2
          "
        />
      </Autocomplete>
      <AddressAutocomplete
        label="Pick-up Location"
        onSelect={setPickup}
        />

        <AddressAutocomplete
        label="Destination"
        onSelect={setDestination}
        />

    </div>
  )
}