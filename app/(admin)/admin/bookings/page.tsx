import { prisma } from "@/lib/prisma"

export default async function BookingsPage() {
  const bookings =
    await prisma.booking.findMany({
      include: {
        customer: true,
        service: true,
        vehicle: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-black">
          Bookings
        </h1>

        <p className="text-gray-500">
          Manage customer bookings
        </p>
      </div>

      <div className="rounded-3xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Ref
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Service
              </th>

              <th className="p-4 text-left">
                Vehicle
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.map(
              (booking) => (
                <tr
                  key={booking.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {booking.bookingRef}
                  </td>

                  <td className="p-4">
                    {booking.customer.name}
                  </td>

                  <td className="p-4">
                    {booking.service.name}
                  </td>

                  <td className="p-4">
                    {booking.vehicle.name}
                  </td>

                  <td className="p-4">

                    <select
                      defaultValue={
                        booking.status
                      }
                      className="
                        border
                        rounded-xl
                        p-2
                      "
                    >
                      <option>
                        NEW
                      </option>

                      <option>
                        RESERVED
                      </option>

                      <option>
                        CONFIRMED
                      </option>

                      <option>
                        COMPLETED
                      </option>

                      <option>
                        CANCELLED
                      </option>

                    </select>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}