function ServiceSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="h-12 w-full rounded-md bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  )
}
