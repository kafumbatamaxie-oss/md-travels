"use client"

import { useEffect, useRef } from "react"

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

declare global {
  interface Window {
    google: any
  }
}

export default function GooglePlacesInput({
  value,
  onChange,
  placeholder,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!window.google || !inputRef.current) return

    const autocomplete =
      new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: {
            country: "za",
          },

          fields: [
            "formatted_address",
            "geometry",
            "name",
          ],
        }
      )

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()

      onChange(
        place.formatted_address ||
        place.name ||
        ""
      )
    })
  }, [onChange])

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      className="
        w-full
        h-16
        px-5
        rounded-3xl
        bg-zinc-100
        border
        border-zinc-200
        outline-none
        text-base
      "
    />
  )
}