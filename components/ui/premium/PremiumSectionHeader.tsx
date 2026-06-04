"use client"

import { motion } from "framer-motion"

interface PremiumSectionHeaderProps {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  center?: boolean
}

export default function PremiumSectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  center = false,
}: PremiumSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`max-w-4xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      <span className="inline-flex px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-[0.3em]">
        {eyebrow}
      </span>

      <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-none">
        {title}

        {highlight && (
          <>
            <br />
            <span className="text-secondary">
              {highlight}
            </span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </motion.div>
  )
}