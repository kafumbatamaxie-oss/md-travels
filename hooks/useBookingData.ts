"use client"

import { useEffect, useState } from "react"

export function useBookingData() {
  const [services, setServices] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      const res =
        await fetch(
          "/api/booking/services"
        )

      const data =
        await res.json()

      setServices(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    services,
    loading,
  }
}