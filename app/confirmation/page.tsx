"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

export default function ConfirmationPage() {
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    // Fire confetti once
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0ea5e9", "#0284c7", "#38bdf8", "#ffffff"],
    })
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100 flex items-center justify-center">
      
      {/* 🌊 Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-sky-300/30 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-10rem] right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-sky-400/20 blur-3xl animate-float-fast" />
      </div>

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-md border border-sky-100 rounded-2xl shadow-xl px-8 py-10 max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-sky-900 mb-4">
          🎉 Request Received
        </h1>

        <p className="text-sm text-sky-700 leading-relaxed">
          Thank you for reaching out to us.  
          Our team will review your request and contact you shortly.
        </p>

        <div className="mt-6 text-xs text-muted-foreground">
          You may safely close this page.
        </div>
      </div>
    </main>
  )
}
