export function contactEmailTemplate(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" >
          <table width="100%" max-width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:#e5e7eb;padding:24px 32px;">
                <table width="100%">
                  <tr>
                    <td align="left">
                      <img
                        src="https://mdtravels.co.za/logo.png"
                        alt="MD Travels"
                        width="140"
                        style="display:block;"
                      />
                    </td>
                    <td align="right" style="color:#0b2e4f;font-size:12px;">
                      New Website Inquiry
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px;color:#111827;">
                <h2 style="margin-top:0;color:#0b2e4f;">
                  📩 New Contact Submission
                </h2>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-size:14px;">
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;width:140px;">Full Name</td>
                    <td style="padding:10px 0;font-weight:600;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Email</td>
                    <td style="padding:10px 0;">
                      <a href="mailto:${data.email}" style="color:#0b2e4f;text-decoration:none;font-weight:600;">
                        ${data.email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Phone</td>
                    <td style="padding:10px 0;font-weight:600;">
                      <a href="tel:${data.phone}" style="color:#0b2e4f;text-decoration:none;">
                        ${data.phone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Subject</td>
                    <td style="padding:10px 0;font-weight:600;">
                      ${data.subject}
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <div style="margin-top:28px;padding:20px;background:#f9fafb;border-left:4px solid #f5b301;border-radius:8px;">
                  <h4 style="margin-top:0;color:#0b2e4f;">Message</h4>
                  <p style="margin:0;white-space:pre-wrap;line-height:1.6;color:#111827;">
                    ${data.message}
                  </p>
                </div>

                <!-- Actions -->
                <div style="margin-top:30px;text-align:center;">
                  <a
                    href="mailto:${data.email}"
                    style="background:#f5b301;color:#0b2e4f;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block;margin-right:10px;"
                  >
                    Reply to Customer
                  </a>

                  <a
                    href="tel:${data.phone}"
                    style="background:#0b2e4f;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block;"
                  >
                    Call Customer
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#0b2e4f;padding:16px 24px;text-align:center;color:#9ca3af;font-size:11px;">
                This email was generated automatically from the MD Travels website.<br />
                © ${new Date().getFullYear()} MD Travels
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}
