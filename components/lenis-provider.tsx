"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Note: For true "section by section", we use CSS snap-type on a container
    // or manually scroll to sections.

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
