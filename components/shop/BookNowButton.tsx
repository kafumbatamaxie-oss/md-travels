"use client"

import { useState } from "react"
import BookingDialog from "@/components/booking/BookingDialog"

export default function BookNowButton() {
  const [open, setOpen] =
    useState(false)

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          bg-black
          text-white
          px-6
          py-3
          rounded-2xl
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