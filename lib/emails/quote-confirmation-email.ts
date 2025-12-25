export function QuoteConfirmationEmailTemplate(
  firstName: string,
  service: string,
  pickupAddress: string,
  destination: string,
) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#e0f2fe;font-family:Inter,Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table width="100%" max-width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td align="center" style="padding:32px;border-bottom:1px solid #e5e7eb;">
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
              <td style="padding:34px;color:#111827;font-size:15px;line-height:1.7;">
                <h2 style="margin-top:0;color:#0b2e4f;">
                  Thank you for requesting a quote 🚘
                </h2>

                <p>
                  Hi <strong>${firstName}</strong>,
                </p>

                <p>
                  Thank you for choosing <strong>MD Travels</strong>.
                  We’ve successfully received your quote request and one of our
                  friendly team members will contact you shortly with pricing
                  and availability.
                </p>

                <!-- Quote Summary -->
                <div style="margin:26px 0;padding:22px;background:#f8fafc;border-left:5px solid #f5b301;border-radius:10px;">
                  <h4 style="margin-top:0;color:#0b2e4f;">Your Request Summary</h4>
                  <p><strong>Service:</strong> ${service}</p>
                  <p><strong>Pickup:</strong> ${pickupAddress}</p>
                  <p><strong>Destination:</strong> ${destination}</p>
                </div>

                <p>
                  If you have additional details to share or need urgent assistance,
                  feel free to contact us anytime — we’re available
                  <strong>24/7</strong>.
                </p>

                <!-- CTA -->
                <p style="text-align:center;margin:38px 0;">
                  <a
                    href="https://mdtravels.co.za"
                    style="background:#f5b301;color:#0b2e4f;text-decoration:none;padding:14px 30px;border-radius:10px;font-weight:700;display:inline-block;"
                  >
                    Visit Our Website
                  </a>
                </p>

                <p>
                  We look forward to serving you,<br />
                  <strong style="color:#0b2e4f;">MD Travels Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#0b2e4f;padding:20px 24px;text-align:center;color:#e5e7eb;font-size:12px;">
                <p style="margin:0;">
                  📞 +27 606 411 703 &nbsp;|&nbsp;
                  ✉️ info@mdtravels.coza
                </p>
                <p style="margin:0;">
                  📞 +27 71 945 5941 &nbsp;|&nbsp;
                  ✉️ kafumbatamaxie@gmail.com
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
