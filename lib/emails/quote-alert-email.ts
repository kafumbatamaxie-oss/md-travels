export function QuoteAlertEmailTemplate(
  firstName: string,
  lastName: string,
  phone: string,
  service: string ,
  pickupAddress: string,
  destination: string
) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#ffffff;font-family:Inter,Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:24px;">
          <table width="100%" max-width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="padding:24px 32px;border-bottom:1px solid #e5e7eb;">
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
                    <td align="right" style="color:#6b7280;font-size:12px;">
                      New Quote Request
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px;color:#111827;">
                <h2 style="margin-top:0;color:#0b2e4f;">
                  🚘 New Quote Submission
                </h2>

                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-size:14px;">
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;width:160px;">Customer Name</td>
                    <td style="padding:10px 0;font-weight:600;">
                      ${firstName} ${lastName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Phone</td>
                    <td style="padding:10px 0;font-weight:600;">
                      <a href="tel:${phone}" style="color:#0b2e4f;text-decoration:none;">
                        ${phone}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Service</td>
                    <td style="padding:10px 0;font-weight:600;">
                      ${service}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Pickup Location</td>
                    <td style="padding:10px 0;font-weight:600;">
                      ${pickupAddress}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#6b7280;">Destination</td>
                    <td style="padding:10px 0;font-weight:600;">
                      ${destination}
                    </td>
                  </tr>
                </table>

                <!-- CTA -->
                <div style="margin-top:30px;text-align:center;">
                  <a
                    href="tel:${phone}"
                    style="background:#f5b301;color:#0b2e4f;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block;margin-right:10px;"
                  >
                    Call Customer
                  </a>

                  <a
                    href="https://mdtravels.co.za/admin"
                    style="background:#0b2e4f;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block;"
                  >
                    View in Dashboard
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 24px;border-top:1px solid #e5e7eb;text-align:center;color:#9ca3af;font-size:11px;">
                Quote submitted via MD Travels website<br />
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
