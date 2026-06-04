"use client"

import { useEffect, useRef } from "react"
import { useJsApiLoader } from "@react-google-maps/api"

type Props = {
  value: string
  onSelect: (data: {
    address: string
    placeId: string
  }) => void
  placeholder: string
}

const libraries: ("places")[] = ["places"]

export default function PlacesInput({
  value,
  onSelect,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  })

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    const autocomplete =
      new google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: {
            country: "za",
          },
          fields: [
            "formatted_address",
            "place_id",
          ],
        }
      )

    autocomplete.addListener(
      "place_changed",
      () => {
        const place =
          autocomplete.getPlace()

        onSelect({
          address:
            place.formatted_address || "",
          placeId:
            place.place_id || "",
        })
      }
    )
  }, [isLoaded, onSelect])

  return (
    <input
      ref={inputRef}
      defaultValue={value}
      placeholder={placeholder}
      className="
        w-full
        rounded-3xl
        bg-white
        border
        border-slate-200
        px-5
        py-4
        text-base
        shadow-sm
        focus:outline-none
      "
    />
  )
}