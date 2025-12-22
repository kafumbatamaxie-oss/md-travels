"use client"

import type React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Using higher spring tension for more "physics" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  })

  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.75])
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [120, 0, 0, -120])
  const blur = useTransform(smoothProgress, [0, 0.2, 0.8, 1], ["8px", "0px", "0px", "12px"])

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        y,
        filter: `blur(${blur})`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
