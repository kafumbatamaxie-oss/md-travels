"use client"

import { motion } from "framer-motion"
import { Shield, Clock, CheckCircle, ArrowRight, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function ProfessionalHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75 // Cinematic slow-mo
    }
  }, [])

  return (
    <section className="relative flex min-h-[90dvh] items-center justify-center overflow-hidden bg-primary">
      {/* --- CINEMATIC VIDEO ENGINE --- */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: videoLoaded ? 1 : 1.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-60" : "opacity-0"
          }`}
        >
          <source src="/video-collection.mp4" type="video/mp4" />
        </video>
        {/* Pro Overlay System */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-transparent to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,6,0.4)_100%)]" />
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-10"
        >
          {/* Animated Location Badge */}
          <span className="glass-pill inline-flex items-center gap-2 rounded-full px-5 py-2 mt-20 text-[10px] font-black uppercase tracking-[0.3em] text-secondary shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Western Cape Transport Specialists
          </span>

          {/* Headline with Metallic Shimmer */}
          <h1 className="max-w-5xl text-balance text-5xl font-black leading-[1.1] tracking-tighter text-white md:text-7xl lg:text-8xl">
            Professional Transport <br />
            <span className="text-transparent bg-clip-text animate-shimmer">
              Services Proposal
            </span>
          </h1>

          {/* Action Hub */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <a
              href="/quote"
              className="group flex items-center justify-center gap-3 rounded-2xl bg-secondary px-10 py-5 text-bold font-black uppercase tracking-widest text-primary transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(234,179,8,0.3)]"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/fleet"
              className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md px-10 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 active:scale-95"
            >
              View Our Fleet
            </a>
          </div>

          {/* Floating Trust Dock */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl md:gap-2"
          >
            {[
              { icon: Shield, text: "Fully Insured" },
              { icon: Clock, text: "24/7 Operations" },
              { icon: CheckCircle, text: "Licensed Drivers" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 px-6 py-3">
                <item.icon className="h-4 w-4 text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{item.text}</span>
                {idx < 2 && <div className="ml-4 hidden h-4 w-px bg-white/10 md:block" />}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-6 w-6 text-white/20" />
      </motion.div>
    </section>
  )
}
