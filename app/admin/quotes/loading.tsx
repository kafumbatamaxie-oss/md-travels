export default function QuotesLoading() {
  return (
    <div>
      <div className="h-6 w-40 bg-muted animate-pulse rounded mb-6" />

      <div className="flex gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-24 bg-muted animate-pulse rounded"
          />
        ))}
      </div>

      <div className="border rounded">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-14 border-t bg-muted/50 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}
