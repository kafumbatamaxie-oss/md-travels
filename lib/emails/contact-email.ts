export function contactEmailTemplate(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; padding: 32px; color: #111;">
      <h2 style="color: #c9a227;">New Contact Inquiry</h2>

      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

      <p style="white-space: pre-wrap;">${data.message}</p>
    </div>
  `
}
