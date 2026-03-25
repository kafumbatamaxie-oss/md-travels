"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, Mic, Smartphone, Bot, ChevronRight, Waves } from "lucide-react"

export default function AICallSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-slate-900 rounded-[3rem] p-8 md:p-20 overflow-hidden shadow-2xl">
          
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Next-Gen Booking</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                Book via <span className="text-blue-500 italic">Voice AI</span>
              </h2>
              
              <p className="text-slate-400 text-lg font-medium max-w-md">
                Skip the forms. Tap the button below to speak directly with our AI Travel Agent. Secure your luxury transport in under 60 seconds.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">Agent Online</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Smartphone className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Mobile Ready</span>
                </div>
              </div>
            </div>

            {/* CALL TRIGGER BUTTON */}
            <div className="flex justify-center lg:justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center justify-center"
              >
                {/* Pulsing Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut"
                    }}
                    className="absolute w-24 h-24 bg-blue-500 rounded-full"
                  />
                ))}
                
                <div className="relative w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-500">
                  <Phone className="w-8 h-8 text-white fill-white group-hover:rotate-12 transition-transform" />
                </div>
                
                <span className="absolute -bottom-10 whitespace-nowrap text-xs font-black uppercase tracking-[0.3em] text-blue-400 group-hover:text-white transition-colors">
                  Tap to Start Call
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI CALL DIALOG (Retell Placeholder) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 text-center space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Concierge</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* AI Visualizer Placeholder */}
                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                       <Mic className="w-10 h-10 text-white" />
                    </div>
                    {/* Simulated Voice Waves */}
                    <div className="absolute -inset-4 flex items-center justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <motion.div 
                                key={i}
                                animate={{ height: [10, 40, 10] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                className="w-1 bg-blue-400/40 rounded-full"
                            />
                        ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white italic">"How can I help you today?"</h3>
                    <p className="text-slate-500 text-sm">Listening for your request...</p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="grid grid-cols-1 gap-4 pb-4">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <Phone className="w-4 h-4 rotate-[135deg] fill-current" />
                        End Call
                    </button>
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest">Powered by Retell AI</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
