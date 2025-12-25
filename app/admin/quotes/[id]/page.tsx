import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type Service = {
  id: string
  name: string
}

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

  if (!quote) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quote Details</h1>

      <section>
        <h2 className="font-semibold">Service</h2>
        <p>{"Unknown service"}</p>
      </section>

      <section>
        <h2 className="font-semibold">Vehicle</h2>
        <p>{ "Not assigned"}</p>
      </section>
    </div>
  )
}
