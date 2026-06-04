import { cn } from "@/lib/utils"

interface LuxuryCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function LuxuryCard({
  children,
  className,
  ...props
}: LuxuryCardProps) {
  return (
    <div
      className={cn(
        "rounded-[2.5rem] bg-white border border-slate-100 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}