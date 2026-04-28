"use client"

import { useEffect, useState } from "react"

export function useNavbarVisibility() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const navbar = document.getElementById("navbar")
    if (!navbar) return

    const handleScroll = () => {
      const rect = navbar.getBoundingClientRect()

      // visible if any part of navbar is in viewport
      const isVisible =
        rect.top < window.innerHeight && rect.bottom > 0

      setVisible(isVisible)
    }

    // run once on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return visible
}