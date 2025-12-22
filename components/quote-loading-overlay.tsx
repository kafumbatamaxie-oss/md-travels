"use client"

import Image from "next/image"

export function QuoteLoadingOverlay({ open }: { open: boolean }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-hidden">
      {/* Moving luxury car */}
      <div className="absolute bottom-20 left-[-30%] animate-car-drive">
        <img
          src="/luxury-car.png"
          alt="Luxury car"
          className="h-24 md:h-32 opacity-90"
        />
      </div>

      {/* Loader content */}
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-white/20" />
          <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin" />

          {/* Logo */}
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl">
            <Image
              src="/logo.png"
              alt="MD Travels"
              width={60}
              height={60}
              priority
            />
          </div>
        </div>

        <p className="mt-6 text-white text-sm uppercase tracking-widest">
          Sending your quote request…
        </p>
      </div>
    </div>
  )
}
