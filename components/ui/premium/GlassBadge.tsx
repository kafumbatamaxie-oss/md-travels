"use client"

export default function GlassBadge({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      backdrop-blur-xl
      bg-white/70
      border
      border-white/40
      shadow-lg
    "
    >
      {children}
    </div>
  )
}