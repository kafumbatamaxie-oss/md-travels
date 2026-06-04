"use client"

import Confetti from "react-confetti"
import { CheckCircle2 } from "lucide-react"

type Props = {
  bookingRef: string
  onClose: () => void
}

export default function LuxurySuccessScreen({
  bookingRef,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-xl flex items-center justify-center p-5">

      <Confetti
        recycle={false}
        numberOfPieces={300}
      />

      <div
        className="
          w-full
          max-w-md
          rounded-[40px]
          bg-white
          shadow-2xl
          overflow-hidden
        "
      >

        <div className="p-8">

          <div className="flex justify-center">

            <div
              className="
                h-24
                w-24
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
              "
            >
              <CheckCircle2
                size={60}
                className="text-green-600"
              />
            </div>

          </div>

          <h2
            className="
              text-center
              text-3xl
              font-black
              mt-6
            "
          >
            Booking Confirmed
          </h2>

          <p
            className="
              text-center
              text-gray-500
              mt-2
            "
          >
            Your reservation has been received.
          </p>

          <div
            className="
              mt-8
              rounded-3xl
              bg-black
              text-white
              p-6
            "
          >
            <p className="opacity-70">
              Booking Reference
            </p>

            <h3
              className="
                text-2xl
                font-black
                mt-2
              "
            >
              {bookingRef}
            </h3>

          </div>

          <button
            onClick={onClose}
            className="
              w-full
              mt-8
              h-14
              rounded-2xl
              bg-black
              text-white
              font-bold
            "
          >
            Done
          </button>

        </div>

      </div>

    </div>
  )
}