import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Send SMS notification to customer confirming receipt
    await fetch(new URL("/api/send-sms", request.url).toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: data.phone,
        message: `Hi ${data.name}, we've received your inquiry. Our team will contact you shortly. MD Travels`,
        type: "inquiry_confirmation",
      }),
    })

    // Send SMS to business
    await fetch(new URL("/api/send-sms", request.url).toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: "+27719455941",
        message: `New Inquiry from ${data.name} (${data.inquiryType}). Phone: ${data.phone}. Message: ${data.message.substring(0, 50)}...`,
        type: "inquiry_notification",
      }),
    })

    console.log("Inquiry Submission:", data)

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received. SMS confirmation sent to your phone.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Inquiry Error:", error)
    return NextResponse.json({ success: false, message: "Error processing request" }, { status: 500 })
  }
}
