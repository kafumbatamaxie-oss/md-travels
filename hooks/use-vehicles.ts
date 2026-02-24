// hooks/useServices.ts
import { useEffect, useState } from "react"

type Service = {
  id: string
  name: string
  description?: string
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    fetch("/api/services")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load services")
        return res.json()
      })
      .then(data => {
        if (mounted) setServices(data)
      })
      .catch(() => {
        if (mounted) setError("Unable to load services")
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  return { services, loading, error }
}
