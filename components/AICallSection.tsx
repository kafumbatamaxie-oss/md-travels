"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X, Mic, Crown, Sparkles } from "lucide-react"
// 1. Import Retell Client
import { RetellWebClient } from "retell-client-js-sdk"

const retellWebClient = new RetellWebClient();

export default function LuxuryAICall() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  
  // 2. Handle the Call Logic
  const handleStartCall = async () => {
  try {
    // 1. Request mic IMMEDIATELY to 'lock in' the user gesture
    // Do this BEFORE the fetch or any other logic
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // 2. Now that we have permission, trigger the UI and backend call
    setIsOpen(true);
    const response = await fetch("/api/retell/web-call", { method: "POST" });
    const data = await response.json();
    
    // 3. Start Retell call using the existing stream if possible or let SDK handle it
    await retellWebClient.startCall({ accessToken: data.access_token });
    setIsCalling(true);
  } catch (err) {
    // If this hits, the browser/OS is blocking before Retell even starts
    console.error("Mic blocked by browser/OS:", err);
  }
};


  const handleEndCall = () => {
    retellWebClient.stopCall();
    setIsCalling(false);
    setIsOpen(false);
  };

  // Listen for call end from the AI side
  useEffect(() => {
    retellWebClient.on("call_ended", () => {
      setIsCalling(false);
      setIsOpen(false);
    });
  }, []);

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-primary border-primary-dark border rounded-tl-4xl rounded-br-4xl rounded-tr-[5rem] rounded-bl-[5rem] md:rounded-tr-[12rem] md:rounded-bl-[12rem] p-8 md:p-24 overflow-hidden shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)]">
          
          <div className="relative z-10  grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20">
                <Crown className="w-3.5 h-3.5 text-[#EAB308]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAB308]">Priority Voice Booking</span>
              </motion.div>

              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
                Speak to our <br />
                <span className="text-secondary">Gold Agent</span>
              </h2>
              <p className="text-white/50 text-lg font-medium max-w-md italic">Skip the typing. Experience luxury concierge.</p>
            </div>

            {/* PULSE TRIGGER */}
            <div className="flex justify-center lg:justify-end">
              <button onClick={handleStartCall} className="group relative flex items-center justify-center scale-75 md:scale-100">
                {[...Array(3)].map((_, i) => (
                  <motion.div key={i} animate={{ scale: 2.2, opacity: 0 }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }} className="absolute w-24 h-24 bg-[#EAB308] rounded-full" />
                ))}
                <div className="relative w-28 h-28 bg-secondary/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-10 h-10 text-secondary-dark fill-secondary" />
                </div>
                <span className="absolute -bottom-14 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Initialize Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI CALL DIALOG */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleEndCall} className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-xl" />

            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-[#1E293B] border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl">
              <div className="p-10 text-center space-y-10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#EAB308] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-widest">
                      {isCalling ? "AI Concierge Live" : "Connecting..."}
                    </span>
                  </div>
                  <button onClick={handleEndCall} className="p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5 text-slate-400" /></button>
                </div>

                <div className="py-10 flex flex-col items-center justify-center space-y-8">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-tr from-[#EAB308] to-[#FDE047] flex items-center justify-center">
                       <Mic className="w-10 h-10 text-[#0F172A]" />
                    </div>
                    {/* Animated Gold Soundwaves - Height now pulses based on connection */}
                    <div className="absolute -inset-6 flex items-center justify-center gap-1.5 pointer-events-none">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <motion.div 
                                key={i}
                                animate={isCalling ? { height: [15, i % 2 === 0 ? 50 : 35, 15] } : { height: 10 }}
                                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                                className="w-1.5 bg-[#EAB308]/30 rounded-full"
                            />
                        ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-black text-white italic tracking-tight">
                      {isCalling ? "I'm listening..." : "Waking Agent..."}
                    </h3>
                  </div>
                </div>

                <button onClick={handleEndCall} className="w-full py-5 bg-[#EF4444]/10 hover:bg-[#EF4444] hover:text-white text-[#EF4444] rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-[#EF4444]/20">
                    <Phone className="w-4 h-4 rotate-[135deg] fill-current" />
                    End Booking
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
