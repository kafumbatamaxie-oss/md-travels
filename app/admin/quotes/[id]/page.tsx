import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { QuoteStatusForm } from "./status-form"

export default async function QuoteDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const quote = await prisma.quote.findUnique({
    where: { id: params.id },
    include: {
      service: true,
      vehicle: true,
    },
  })

  if (!quote) notFound()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quote Details</h1>

      {/* Client */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Client</h2>
        <p>{quote.firstName} {quote.lastName}</p>
        <p className="text-muted-foreground">{quote.email}</p>
        <p className="text-muted-foreground">{quote.phone}</p>
      </section>

      {/* Service */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Service</h2>
        <p>{quote.service.name}</p>
        {quote.vehicle && (
          <p className="text-muted-foreground">
            Vehicle: {quote.vehicle.name}
          </p>
        )}
      </section>

      {/* Schedule */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-2">Schedule</h2>
        <p>Pickup: {new Date(quote.pickupDate).toLocaleString()}</p>
        <p>Passengers: {quote.passengers}</p>
      </section>

      {/* Notes */}
      {quote.notes && (
        <section className="border rounded p-4">
          <h2 className="font-semibold mb-2">Notes</h2>
          <p className="text-muted-foreground">{quote.notes}</p>
        </section>
      )}

      {/* Status */}
      <section className="border rounded p-4">
        <h2 className="font-semibold mb-4">Status</h2>
        <QuoteStatusForm id={quote.id} status={quote.status} />
      </section>
    </div>
  )
}
