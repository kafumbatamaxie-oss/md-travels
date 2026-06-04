"use client"

import { useEffect, useState } from "react"

export function useServiceVehicles(
  serviceId?: string
) {
  const [vehicles, setVehicles] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    if (!serviceId) {
      setVehicles([])
      return
    }

    loadVehicles()
  }, [serviceId])

  async function loadVehicles() {
    try {
      setLoading(true)

      const res =
        await fetch(
          `/api/booking/service/${serviceId}/vehicles`
        )

      const data =
        await res.json()

      setVehicles(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    vehicles,
    loading,
  }
}