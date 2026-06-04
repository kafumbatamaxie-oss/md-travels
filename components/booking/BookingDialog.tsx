"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import { useBookingData } from "@/hooks/useBookingData"
import { useServiceVehicles } from "@/hooks/useServiceVehicles"

type BookingData = {
  serviceId?: string
  vehicleId?: string

  customerName?: string
  customerEmail?: string
  customerPhone?: string

  pickupAddress?: string
  destinationAddress?: string

  pickupDate?: string
  pickupTime?: string

  passengers?: number

  notes?: string
}

type BookingDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function BookingDialog({
  open,
  setOpen,
}: BookingDialogProps) {


  const [step, setStep] = useState(1)

  const [loading, setLoading] = useState(false)
  

  const [success, setSuccess] = useState(false)

  const [bookingRef, setBookingRef] =
    useState("")

  const [form, setForm] =
    useState<BookingData>({
      passengers: 1,
    })

  const totalSteps = 6

  const {
  services
} = useBookingData()

const {
  vehicles
} = useServiceVehicles(
  form.serviceId
)

useEffect(() => {
  const timeout = setTimeout(() => {
    if (!form.pickupAddress && !form.destinationAddress) {
      return
    }

    fetch("/api/booking/draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickup: form.pickupAddress,
        destination: form.destinationAddress,
        vehicleId: form.vehicleId,
      }),
    })
  }, 1500)

  return () => clearTimeout(timeout)
}, [form])

  async function submitBooking() {
    if (
      !form.customerName ||
      !form.customerEmail ||
      !form.pickupDate ||
      !form.pickupTime
    ) {
      alert("Please complete all required fields")
      return
    }
    try {
      setLoading(true)

      const response =
        await fetch(
          "/api/booking/create",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(form),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        alert(
          data.error ||
            "Booking failed"
        )
        return
      }

      setBookingRef(
        data.bookingRef ||
          "MD-" +
            Math.random()
              .toString(36)
              .slice(2, 8)
              .toUpperCase()
      )

      setSuccess(true)

      confetti({
        particleCount: 180,
        spread: 120,
        origin: {
          y: 0.6,
        },
      })

    } catch (error) {
      console.error(error)

      alert(
        "Failed to create booking"
      )

    } finally {
      setLoading(false)
    }
  }

  function next() {
    if (step < totalSteps)
      setStep(step + 1)
  }

  function previous() {
    if (step > 1)
      setStep(step - 1)
  }

  return (
    <>
      
      

      <AnimatePresence>

        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[999999]
              bg-black/60
              backdrop-blur-md

              flex
              items-end

              lg:items-center
              lg:justify-center
            "
          >
            <motion.div
  initial={{
    y: "100%",
  }}
  animate={{
    y: 0,
  }}
  exit={{
    y: "100%",
  }}
  transition={{
    type: "spring",
    damping: 30,
    stiffness: 250,
  }}
  className="
  fixed
  top-0
  left-0
  right-0
  bottom-0
  bg-white
  overflow-hidden
"
>
  {success ? (
    <SuccessScreen
      bookingRef={bookingRef}
      onClose={() => {
        setSuccess(false)
        setOpen(false)
      }}
    />
  ) : (
    <>
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-black text-2xl">
              MD Travels
            </h2>

            <p className="text-gray-500">
              Step {step} of {totalSteps}
            </p>
          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-black
              transition-all
            "
            style={{
              width: `${
                (step /
                  totalSteps) *
                100
              }%`,
            }}
          />
        </div>
      </div>

      <div className="p-6 h-[calc(100vh-220px)] overflow-y-auto">

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{
              x: 50,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -50,
              opacity: 0,
            }}
          >
            {step === 1 && (
              <ServiceStep
                form={form}
                setForm={setForm}
                services={services}
              />
            )}

            {step === 2 && (
              <VehicleStep
                form={form}
                setForm={setForm}
                vehicles={vehicles}
              />
            )}

            {step === 3 && (
              <PickupStep
                form={form}
                setForm={setForm}
              />
            )}

            {step === 4 && (
              <DestinationStep
                form={form}
                setForm={setForm}
              />
            )}

            {step === 5 && (
              <DetailsStep
                form={form}
                setForm={setForm}
              />
            )}

            {step === 6 && (
              <ReviewStep
                form={form}
              />
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      <div className="p-6 border-t flex gap-3">

        {step > 1 && (
          <button
            onClick={previous}
            className="
              flex-1
              border
              rounded-2xl
              py-4
            "
          >
            Back
          </button>
        )}

        {step < totalSteps ? (
          <button
            onClick={() => {
              if (
                step === 1 &&
                !form.serviceId
              ) {
                alert(
                  "Please select a service"
                )
                return
              }

              if (
                step === 2 &&
                !form.vehicleId
              ) {
                alert(
                  "Please select a vehicle"
                )
                return
              }

              next()
            }}
            className="
              flex-1
              bg-black
              text-white
              rounded-2xl
              py-4
              font-bold
            "
          >
            Continue
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={submitBooking}
            className="
              flex-1
              bg-green-600
              text-white
              rounded-2xl
              py-4
              font-bold
            "
          >
            {loading
              ? "Creating..."
              : "Confirm Booking"}
          </button>
        )}

      </div>
    </>
  )}
</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ServiceStep({
  form,
  setForm,
  services,
}: any) {
  return (
    <div>

      <h3 className="text-2xl font-black mb-5">
        Select Service
      </h3>

      <div className="space-y-3">

        {services.map(
          (service: any) => (

            <button
              key={service.id}
              onClick={() =>
                setForm({
                  ...form,
                  serviceId:
                    service.id,
                })
              }
              className={`
                w-full
                p-5
                rounded-3xl
                border
                text-left

                ${
                  form.serviceId ===
                  service.id
                    ? "border-black bg-black text-white"
                    : "border-gray-200"
                }
              `}
            >
              <div className="font-bold">
                {service.name}
              </div>

              <div className="text-sm opacity-70">
                {service.category}
              </div>

            </button>

          )
        )}

      </div>

    </div>
  )
}

function VehicleStep({
  form,
  setForm,
  vehicles,
}: any) {
  return (
    <div>

      <h3 className="text-2xl font-black mb-5">
        Select Vehicle
      </h3>

      <div className="space-y-5">

        {vehicles.map(
          (vehicle: any) => {

            const image =
              vehicle.images?.[0]
                ?.url

            return (
              <button
                key={vehicle.id}
                onClick={() =>
                  setForm({
                    ...form,
                    vehicleId:
                      vehicle.id,
                  })
                }
                className={`
                  w-full
                  overflow-hidden
                  rounded-3xl
                  border

                  ${
                    form.vehicleId ===
                    vehicle.id
                      ? "border-black ring-2 ring-black"
                      : "border-gray-200"
                  }
                `}
              >

                {image && (
                  <div className="relative h-52">

                    <Image
                      src={image}
                      alt={
                        vehicle.name
                      }
                      fill
                      className="object-cover"
                    />

                  </div>
                )}

                <div className="p-5 text-left">

  <div className="font-black text-xl">
    {vehicle.name}
  </div>

  <div className="text-gray-500">
    {vehicle.type}
  </div>

  <div className="mt-4 flex flex-wrap gap-2">

    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
      👤 {vehicle.capacity} Seats
    </span>

    {vehicle.luggageCapacity && (
      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
        🧳 {vehicle.luggageCapacity} Bags
      </span>
    )}

    {vehicle.airConditioning && (
      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
        ❄️ Aircon
      </span>
    )}

    {vehicle.wifi && (
      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
        📶 WiFi
      </span>
    )}

    {vehicle.executive && (
      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
        ⭐ Executive
      </span>
    )}

  </div>

  {vehicle.basePrice && (
    <div className="mt-5 text-lg font-black">
      From R{vehicle.basePrice.toLocaleString()}
    </div>
  )}

</div>

              </button>
            )
          }
        )}

      </div>

    </div>
  )
}

function PickupStep({
  form,
  setForm,
}: any) {
  return (
    <div>
      <h3 className="font-black text-2xl mb-5">
        Pick-up Location
      </h3>

      <input
        placeholder="Enter pickup"
        className="
          border
          rounded-2xl
          p-4
          w-full
        "
        value={
          form.pickupAddress || ""
        }
        onChange={(e) =>
          setForm({
            ...form,
            pickupAddress: e.target.value,
          })
        }
      />
    </div>
  )
}

function DestinationStep({
  form,
  setForm,
}: any) {
  return (
    <div>
      <h3 className="font-black text-2xl mb-5">
        Destination
      </h3>

      <input
        placeholder="Enter destination"
        className="
          border
          rounded-2xl
          p-4
          w-full
        "
        value={
          form.destinationAddress ||
          ""
        }
        onChange={(e) =>
          setForm({
            ...form,
            destinationAddress: e.target.value,
          })
        }
      />
    </div>
  )
}

function DetailsStep({
  form,
  setForm,
}: any) {
  return (
    <div className="space-y-4">

      <h3 className="font-black text-2xl">
        Passenger Details
      </h3>

      <input
        placeholder="Full Name"
        className="border rounded-2xl p-4 w-full"
        value={form.customerName || ""}
        onChange={(e) =>
          setForm({
            ...form,
            customerName: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email Address"
        className="border rounded-2xl p-4 w-full"
        value={form.customerEmail || ""}
        onChange={(e) =>
          setForm({
            ...form,
            customerEmail: e.target.value,
          })
        }
      />

      <input
        placeholder="Phone Number"
        className="border rounded-2xl p-4 w-full"
        value={form.customerPhone || ""}
        onChange={(e) =>
          setForm({
            ...form,
            customerPhone: e.target.value,
          })
        }
      />

      <input
        type="date"
        className="border rounded-2xl p-4 w-full"
        value={form.pickupDate || ""}
        onChange={(e) =>
          setForm({
            ...form,
            pickupDate: e.target.value,
          })
        }
      />

      <input
        type="time"
        className="border rounded-2xl p-4 w-full"
        value={form.pickupTime || ""}
        onChange={(e) =>
          setForm({
            ...form,
            pickupTime: e.target.value,
          })
        }
      />

      <input
        type="number"
        min={1}
        className="border rounded-2xl p-4 w-full"
        value={form.passengers || 1}
        onChange={(e) =>
          setForm({
            ...form,
            passengers: Number(
              e.target.value
            ),
          })
        }
      />

      <textarea
        placeholder="Additional Notes"
        rows={4}
        className="border rounded-2xl p-4 w-full"
        value={form.notes || ""}
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
      />

    </div>
  )
}


function ReviewRow({
  label,
  value,
}: {
  label: string
  value: any
}) {
  return (
    <div className="flex justify-between gap-4">

      <span className="text-gray-500">
        {label}
      </span>

      <span className="font-semibold text-right">
        {value || "-"}
      </span>

    </div>
  )
}


function ReviewStep({
  form,
}: any) {
  return (
    <div className="space-y-6">

      <div>
        <h3 className="text-3xl font-black">
          Review Booking
        </h3>

        <p className="text-gray-500 mt-2">
          Please verify all information before confirming.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="space-y-5">

          <ReviewRow
            label="Service"
            value={form.serviceId}
          />

          <ReviewRow
            label="Vehicle"
            value={form.vehicleId}
          />

          <ReviewRow
            label="Passenger Name"
            value={form.customerName}
          />

          <ReviewRow
            label="Email"
            value={form.customerEmail}
          />

          <ReviewRow
            label="Phone"
            value={form.customerPhone}
          />

        </div>

      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <h4 className="font-bold mb-4">
          Journey Details
        </h4>

        <div className="space-y-5">

          <ReviewRow
            label="Pickup Location"
            value={form.pickupAddress}
          />

          <ReviewRow
            label="Destination"
            value={form.destinationAddress}
          />

          <ReviewRow
            label="Travel Date"
            value={form.pickupDate}
          />

          <ReviewRow
            label="Pickup Time"
            value={form.pickupTime}
          />

          <ReviewRow
            label="Passengers"
            value={form.passengers}
          />

        </div>

      </div>

      {form.notes && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

          <h4 className="font-bold mb-3">
            Additional Notes
          </h4>

          <p className="text-gray-700 whitespace-pre-wrap">
            {form.notes}
          </p>

        </div>
      )}

      <div className="rounded-3xl bg-black text-white p-6">

        <div className="text-sm uppercase tracking-wider text-white/70">
          MD Travels
        </div>

        <h4 className="text-2xl font-black mt-2">
          Ready For Confirmation
        </h4>

        <p className="mt-3 text-white/70">
          Your booking request will be submitted
          and our reservations team will contact
          you shortly.
        </p>

      </div>

    </div>
  )
}

function SuccessScreen({
  bookingRef,
  onClose,
}: {
  bookingRef: string
  onClose: () => void
}) {
  return (
    <div
      className="
      h-full
      flex
      flex-col
      items-center
      justify-center
      p-8
      text-center
    "
    >
      <div className="text-7xl">
        🎉
      </div>

      <h2 className="font-black text-4xl mt-6">
        Booking Confirmed
      </h2>

      <p className="text-gray-500 mt-3">
        Reference
      </p>

      <div className="font-black text-2xl mt-2">
        {bookingRef}
      </div>

      <button
        onClick={onClose}
        className="
          mt-8
          bg-black
          text-white
          px-8
          py-4
          rounded-2xl
        "
      >
        Done
      </button>
    </div>
  )
}