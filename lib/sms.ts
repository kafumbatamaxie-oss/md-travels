import twilio from "twilio"

const client = twilio(
 
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)


type SendSMSParams = {
  to: string
  message: string
}

export async function sendSMS({ to, message }: SendSMSParams) {
  if (!process.env.TWILIO_FROM) {
    console.warn("TWILIO_FROM not configured")
    return
  }

  try {
    await client.messages.create({
      to:'+27815116234',
      body: message,
    })
  } catch (error) {
    console.error("SMS failed:", error)
  }
}
