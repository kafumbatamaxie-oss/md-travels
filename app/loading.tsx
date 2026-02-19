"use client"

import Image from "next/image"

export default function Loading() {
  return (
    <div className="app-loading bg-white">
      {/* Loader + logo */}
      <div className="loader-container">
        <div className="loader-ring" />
      </div>
    </div>
  )
}
