"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, Mic, Smartphone, Bot, Sparkles, Crown } from "lucide-react"

export default function LuxuryAICall() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Theme Constants
  const GOLD = "#EAB308"
  const SLATE_DARK = "#0F172A"

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* WAVE SHAPED CONTAINER */}
        <div className="relative bg-[#0F172A] rounded-tr-[5rem] rounded-bl-[5rem] md:rounded-tr-[12rem] md:rounded-bl-[12rem] p-8 md:p-24 overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)]">
          
          {/* Internal Gold Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAB308]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20"
              >
                <Crown className="w-3.5 h-3.5 text-[#EAB308]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAB308]">Priority Voice Booking</span>
              </motion.div>

              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
                Speak to our <br />
                <span className="text-[#EAB308]">Gold Agent</span>
              </h2>
              
              <p className="text-slate-400 text-lg font-medium max-w-md italic">
                Skip the typing. Experience seamless luxury by speaking directly to our AI concierge. Secure your journey in seconds.
              </p>

              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Sparkles className="w-4 h-4 text-[#EAB308]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Instant Quotes</span>
                </div>
              </div>
            </div>

            {/* LUXURY PULSE TRIGGER */}
            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center justify-center scale-75 md:scale-100"
              >
                {/* Gold Pulsing Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 1, opacity: 0.4 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeOut"
                    }}
                    className="absolute w-24 h-24 bg-[#EAB308] rounded-full"
                  />
                ))}
                
                {/* Main Button */}
                <div className="relative w-28 h-28 bg-[#EAB308] rounded-full flex items-center justify-center shadow-[0_0_60px_-12px_rgba(234,179,8,0.5)] group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-10 h-10 text-[#0F172A] fill-[#0F172A] group-hover:rotate-12 transition-transform" />
                </div>
                
                <span className="absolute -bottom-14 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.4em] text-[#EAB308] group-hover:text-white transition-colors">
                  Initialize Call
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI CALL DIALOG (Retell Interface) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-sm bg-[#1E293B] border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 text-center space-y-10">
                {/* Top Status */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest">AI Concierge Live</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Golden Voice Visualizer */}
                <div className="py-10 flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-linear-to-tr from-[#EAB308] to-[#FDE047] flex items-center justify-center shadow-lg shadow-[#EAB308]/20">
                       <Mic className="w-10 h-10 text-[#0F172A]" />
                    </div>
                    {/* Animated Gold Soundwaves */}
                    <div className="absolute -inset-6 flex items-center justify-center gap-1.5 pointer-events-none">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <motion.div 
                                key={i}
                                animate={{ height: [15, i % 2 === 0 ? 50 : 35, 15] }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                                className="w-1.5 bg-[#EAB308]/30 rounded-full"
                            />
                        ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white italic tracking-tight leading-none">
                      "I'm listening..."
                    </h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">State your travel needs</p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="space-y-4">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full py-5 bg-[#EF4444]/10 hover:bg-[#EF4444] hover:text-white text-[#EF4444] rounded-4xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-[#EF4444]/20"
                    >
                        <Phone className="w-4 h-4 rotate-135 fill-current" />
                        End Booking
                    </button>
                    <p className="text-[8px] text-slate-600 font-bold uppercase tracking-[0.3em]">Retell Encrypted Audio Stream</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
