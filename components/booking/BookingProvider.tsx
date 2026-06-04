"use client"

import {
  createContext,
  useContext,
  useState,
} from "react"

type Estimate = {
  distanceKm: number
  durationMinutes: number
  price: number
}

export type BookingDraft = {
  serviceId?: string

  pickupAddress?: string
  pickupPlaceId?: string

  destinationAddress?: string
  destinationPlaceId?: string

  vehicleId?: string

  passengers?: number

  customerName?: string
  customerEmail?: string
  customerPhone?: string

  pickupLat?: number
  pickupLng?: number

  destinationLat?: number
  destinationLng?: number

  notes?: string

  pickupDate?: string
  pickupTime?: string

  estimate?: Estimate
}

type BookingContextType = {
  draft: BookingDraft

  updateDraft: (
    data: Partial<BookingDraft>
  ) => void

  resetDraft: () => void
}

const BookingContext =
  createContext<BookingContextType | null>(
    null
  )

export function BookingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [draft, setDraft] =
    useState<BookingDraft>({})

  function updateDraft(
    data: Partial<BookingDraft>
  ) {
    setDraft((prev) => ({
      ...prev,
      ...data,
    }))
  }

  function resetDraft() {
    setDraft({})
  }

  return (
    <BookingContext.Provider
      value={{
        draft,
        updateDraft,
        resetDraft,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context =
    useContext(BookingContext)

  if (!context) {
    throw new Error(
      "useBooking must be used inside BookingProvider"
    )
  }

  return context
}