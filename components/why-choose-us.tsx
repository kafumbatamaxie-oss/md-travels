"use client"

import type React from "react"

import { motion,  type Variants  } from "framer-motion"
import { useState } from "react"

interface WhyChooseItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

interface WhyChooseMarqueeProps {
  items: WhyChooseItem[]
  title: string
}

export function WhyChooseUs({ items, title }: WhyChooseMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)

  const firstRow = items.slice(0, Math.ceil(items.length / 2))
  const secondRow = items.slice(Math.ceil(items.length / 2))

  const marqueeVariants : Variants = {
    animate: {
      x: [-1000, 0],
      transition: {
        duration: 30,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
    paused: {
      transition: {}, // ⬅️ required
    },
  }

  const marqueeVariantsReverse : Variants = {
    animate: {
      x: [0, -1000],
      transition: {
        duration: 30,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
     paused: {
      transition: {}, // ⬅️ required
    },
  }

  return (
    <div className="relative py-8  bg-sky-20  px-4 sm:px-6  bg-sky-10 overflow-hidden">
      <div className="max-w-7xl flex flex-col items-center bg-transparent justify-center mx-auto mb-12 sm:mb-16 md:mb-20">
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-sky-800 max-w-prose italic">
              Our promise to you
            </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase  italic tracking-tight text-sky-950">
            Why Choose Us
          </h2>
      </div>

      {/* First Marquee - Left to Right */}
      <div
        className="mb-8 md:mb-12 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex gap-6 md:gap-8 w-max"
          variants={marqueeVariants}
          animate={isPaused ? "paused" : "animate"}
        >
          {[...firstRow, ...firstRow].map((item, idx) => (
            <div
              key={idx}
              className=" w-full sm:w-96 p-6 sm:p-8 bg-linear-to-br from-white to-gray-50 rounded-xl border border-sky-200 hover:border-secondary hover:shadow-lg transition-all group cursor-pointer"
            >
              <item.icon className="w-10 sm:w-12 h-10 sm:h-12 text-sky-950 mb-3 sm:mb-4 group-hover:scale-110 transition transform" />
              <h3 className="text-lg sm:text-xl text-sky-950 font-bold mb-2 sm:mb-3 group-hover:secondary transition">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-sky-800 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Marquee - Right to Left */}
      <div className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <motion.div
          className="flex gap-6 md:gap-8 w-max"
          variants={marqueeVariantsReverse}
          animate={isPaused ? "paused" : "animate"}
        >
          {[...secondRow, ...secondRow].map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full sm:w-96 p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-secondary hover:shadow-lg transition-all group cursor-pointer"
            >
              <item.icon className="w-10 sm:w-12 h-10 sm:h-12 text-secondary mb-3 sm:mb-4 group-hover:scale-110 transition transform" />
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-secondary transition">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
