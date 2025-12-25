import { prisma } from "@/lib/prisma"
import Link from "next/link"

const TABS = ["ALL", "NEW", "APPROVED", "REJECTED"] as const

export default async function QuotesPage({
  searchParams,
}: {
  searchParams?: { status?: string }
}) {
  const status = searchParams?.status

  const quotes = await prisma.quote.findMany({
    where:
      status && status !== "ALL"
        ? { status }
        : undefined,
    include: {
      service: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quotes</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {TABS.map((tab) => (
          <Link
            key={tab}
            href={`/admin/quotes${tab === "ALL" ? "" : `?status=${tab}`}`}
            className={`px-4 py-2 rounded border text-sm ${
              status === tab || (!status && tab === "ALL")
                ? "bg-primary text-primary-foreground"
                : "bg-background"
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3">Service</th>
              <th className="p-3">Passengers</th>
              <th className="p-3">Pickup Date</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t">
                <td className="p-3">
                  <div className="font-medium">
                    {quote.firstName} {quote.lastName}
                  </div>
                  <div className="text-muted-foreground">
                    {quote.email}
                  </div>
                </td>

                <td className="p-3 text-center">
                  {quote.service.name}
                </td>

                <td className="p-3 text-center">
                  {quote.passengers}
                </td>

                <td className="p-3 text-center">
                  {new Date(quote.pickupDate).toLocaleDateString()}
                </td>

                <td className="p-3 text-center">
                  <span className="px-2 py-1 rounded bg-muted text-xs">
                    {quote.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <Link
                    href={`/admin/quotes/${quote.id}`}
                    className="text-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {quotes.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  No quotes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
