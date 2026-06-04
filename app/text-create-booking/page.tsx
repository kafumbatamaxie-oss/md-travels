"use client"

export default function TestBooking() {
  async function createBooking() {
    const res = await fetch(
      "/api/booking/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          serviceId:
            "REAL_SERVICE_ID",

          vehicleId:
            "REAL_VEHICLE_ID",

          customerName:
            "John Smith",

          customerEmail:
            "john@test.com",

          customerPhone:
            "0812345678",

          pickupAddress:
            "Cape Town Airport",

          destinationAddress:
            "V&A Waterfront",

          passengers: 2,

          price: 450,
        }),
      }
    )

    console.log(
      await res.json()
    )
  }

  return (
    <button
      onClick={
        createBooking
      }
      className="
        bg-black
        text-white
        px-6
        py-3
      "
    >
      Create Booking
    </button>
  )
}