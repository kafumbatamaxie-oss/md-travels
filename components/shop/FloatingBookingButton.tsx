"use client"

import { useState } from "react"
import BookingDialog from "@/components/booking/BookingDialog"

export default function FloatingBookingButton() {
  const [open, setOpen] =
    useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-6
          right-6
          z-50

          px-6
          py-4

          rounded-full

          bg-black
          text-white

          shadow-xl

          font-semibold
        "
      >
        Book Now
      </button>

      <BookingDialog
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}