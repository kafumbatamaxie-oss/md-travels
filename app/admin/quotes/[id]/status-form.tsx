"use client"

import { useTransition } from "react"
import { updateQuoteStatus } from "./status-action"

export function QuoteStatusForm({
  id,
  status,
}: {
  id: string
  status: string
}) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex gap-3">
      {["APPROVED", "REJECTED"].map((s) => (
        <button
          key={s}
          disabled={pending || status === s}
          onClick={() =>
            startTransition(() =>
              updateQuoteStatus(id, "APPROVED")
            )
          }
          className={`px-4 py-2 rounded text-sm border ${
            status === s
              ? "bg-primary text-primary-foreground"
              : "bg-background"
          }`}
        >
          {pending ? "Saving..." : s}
        </button>
      ))}
    </div>
  )
}
