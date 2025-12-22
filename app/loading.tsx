"use client"

import Image from "next/image"

export default function Loading() {
  return (
    <div className="app-loading">
      {/* Moving luxury car */}
      <div className="luxury-car" />

      {/* Loader + logo */}
      <div className="loader-container">
        <div className="loader-ring" />
        <Image
          src="/logo.png"
          alt="MD Travels"
          width={80}
          height={80}
          className="loader-logo"
          priority
        />
      </div>
    </div>
  )
}
