export function confirmationEmailTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background-color:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:10px 5px;">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td align="center" >
                    <img
                      src="https://mdtravels.co.za/logo.png"
                      alt="MD Travels"
                      width="160"
                      style="display:block;"
                    />
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:30px;color:#1f2937;font-size:15px;line-height:1.7;">
                    <p style="margin-top:0;">Hi <strong>${name}</strong>,</p>

                    <p>
                      Thank you for connecting with <strong>MD Travels</strong>!
                      We’ve received your message successfully.
                    </p>

                    <p>
                      Our amazing team is already reviewing your enquiry and will
                      get back to you promptly with the assistance you need.
                    </p>

                    <p>
                      If your request is urgent, don’t hesitate to contact us directly —
                      we’re available <strong>24/7</strong>.
                    </p>

                    <!-- CTA Button -->
                    <p style="text-align:center;margin:35px 0;">
                      <a
                        href="https://mdtravels.co.za"
                        style="background:#f5b301;color:#0b2e4f;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:bold;display:inline-block;"
                      >
                        Visit Our Website
                      </a>
                    </p>

                    <p>
                      Warm regards,<br />
                      <strong style="color:#0b2e4f;">MD Travels Team</strong><br />
                      Luxury Transport • Reliable • Professional Service
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#0b2e4f;padding:20px 30px;color:#e5e7eb;font-size:12px;text-align:center;">
                    <p style="margin:0;">
                      📞 +27 71 945 5941 &nbsp;|&nbsp;
                      ✉️ info@mdtravels.co.za
                    </p>
                    <p style="margin:0;">
                      📞 +27 606 411 703 &nbsp;|&nbsp;
                      ✉️ info@mdtravels.co.za
                    </p>
                    <p style="margin:8px 0 0;color:#9ca3af;">
                      © ${new Date().getFullYear()} MD Travels. All rights reserved.
                    </p>
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
