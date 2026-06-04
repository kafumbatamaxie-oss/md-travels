"use client"

interface Props {
  current: number
  total: number
}

export default function BookingProgress({
  current,
  total,
}: Props) {
  const percentage = ((current + 1) / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-zinc-500 mb-2">
        <span>
          Step {current + 1}
        </span>

        <span>
          {total}
        </span>
      </div>

      <div className="h-1 rounded-full bg-zinc-200 overflow-hidden">
        <div
          className="h-full bg-black transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}