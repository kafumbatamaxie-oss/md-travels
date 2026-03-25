"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle, ArrowRight, Crown } from "lucide-react"

export default function PremiumCTA() {
  // Theme Constants
  const SLATE_BLUE = "#0F172A"
  const GOLD = "#EAB308"

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Subtle Luxury Pattern (Gold opacity at 3%) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Elite Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#EAB308]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0F172A]">
              Cape Town's Finest
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#0F172A] tracking-tighter leading-[0.95] italic uppercase">
            Ready to <span className="text-[#EAB308] block sm:inline">Experience</span> <br className="hidden md:block" />
            <span className="relative">
              Premium
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#EAB308]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span> Transportation?
          </h2>

          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
            Contact us today for a bespoke quote or to secure your luxury journey with the MD Travels concierge team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            {/* Primary Action - Slate Blue & Gold Shimmer */}
            <Link
              href="/quote"
              className="group relative w-full sm:w-auto px-10 py-5 bg-[#0F172A] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-slate-900/20"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Request a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Gold Shimmer Effect */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#EAB308]/10 to-transparent skew-x-12"
              />
            </Link>

            {/* Secondary Action - Gold Outline */}
            <a
              href="https://wa.me" // replace with your whatsappUrl
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 border-2 border-[#EAB308] text-[#0F172A] rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#EAB308] hover:text-white transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Social Proof / Trust */}
          <div className="pt-12 flex items-center justify-center gap-8 opacity-40">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0F172A]">Available 24/7</span>
            <div className="w-1 h-1 bg-[#EAB308] rounded-full" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0F172A]">VIP Support</span>
            <div className="w-1 h-1 bg-[#EAB308] rounded-full" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0F172A]">Global Standards</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
