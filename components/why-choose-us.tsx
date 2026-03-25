"use client"

import React, { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Sparkles, Trophy, Star, ShieldCheck, Clock, Crown } from "lucide-react"

interface WhyChooseItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export function WhyChooseUs({ items, title }: { items: WhyChooseItem[], title: string }) {
  const [isPaused, setIsPaused] = useState(false)

  // Split items for two rows
  const firstRow = items.slice(0, Math.ceil(items.length / 2))
  const secondRow = items.slice(Math.ceil(items.length / 2))

  const marqueeVariants: Variants = {
    animate: {
      x: ["0%", "-50%"],
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    },
  }

  const marqueeVariantsReverse: Variants = {
    animate: {
      x: ["-50%", "0%"],
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    },
  }

  return (
    <section className="relative py-24 bg-[#0F172A] overflow-hidden"> 
      {/* Deep Slate Blue Base */}
      
      {/* Gold Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EAB308]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EAB308]/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20">
            <Crown className="w-3.5 h-3.5 text-[#EAB308]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#EAB308]">Excellence Defined</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Why Choose <span className="text-[#EAB308] drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Us</span>
          </h2>
          <p className="text-slate-400 font-medium italic text-lg tracking-wide">Premium Standards. Golden Service.</p>
        </motion.div>
      </div>

      <div className="relative">
        {/* Edge Fades for Slate Blue background */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />

        <div 
          className="space-y-8 md:space-y-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Row 1 */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 md:gap-10 pr-10"
              variants={marqueeVariants}
              animate={isPaused ? { x: 0, transition: { duration: 0 } } : "animate"}
            >
              {[...firstRow, ...firstRow].map((item, idx) => (
                <LuxuryCard key={`row1-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 md:gap-10 pr-10"
              variants={marqueeVariantsReverse}
              animate={isPaused ? { x: 0, transition: { duration: 0 } } : "animate"}
            >
              {[...secondRow, ...secondRow].map((item, idx) => (
                <LuxuryCard key={`row2-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LuxuryCard({ item }: { item: WhyChooseItem }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[420px] p-8 md:p-12 bg-[#1E293B]/40 rounded-[3rem] border border-white/5 backdrop-blur-sm hover:border-[#EAB308]/40 hover:bg-[#1E293B]/60 transition-all duration-700 group cursor-pointer">
      <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(234,179,8,0.2)] transition-all duration-500">
        <item.icon className="w-8 h-8 text-[#EAB308]" />
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-500">
        {item.title}
      </h3>
      <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed italic group-hover:text-slate-200 transition-colors">
        {item.description}
      </p>
      
      {/* Decorative Gold Corner */}
      <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <Star className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" />
      </div>
    </div>
  )
}
