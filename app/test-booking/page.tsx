// app/test-booking/page.tsx

"use client"

export default function TestBookingPage() {
  async function test() {
    const res = await fetch("/api/booking/estimate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId: "b1e9f95e-f0b1-4960-a515-b1d45fe1ac5b",
        distanceKm: 25,
      }),
    })

    const data = await res.json()

    console.log(data)
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="p-10">
      <button
        onClick={test}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Test Estimate
      </button>
    </div>
  )
}