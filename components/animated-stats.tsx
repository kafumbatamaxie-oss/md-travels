"use client"

import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface StatItemProps {
  end: number
  suffix?: string
  label: string
}

function StatItem({ end, suffix = "", label }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <div ref={ref} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
      <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">{label}</p>
    </div>
  )
}

export function AnimatedStats({ experienceLabel, clientsLabel }: { experienceLabel: string; clientsLabel: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
      <StatItem end={10} suffix="+" label={experienceLabel} />
      <StatItem end={5000} suffix="+" label={clientsLabel} />
    </div>
  )
}
