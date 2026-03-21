"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle,  Car } from "lucide-react"
import TextComponent from "./Text-Component"

interface AboutSectionProps {
  title: string
  description1: string
  description2?: string
  contactLabel: string
  quoteLabel: string
}

export function AboutSection({
  title,
  description1,
  contactLabel,
  quoteLabel,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Smooth Parallax & Scaling
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.8, 1, 0.9])
  const videoRotate = useTransform(scrollYProgress, [0, 0.5], [5, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[90vh] flex items-center py-20 md:py-32 px-4 md:px-12 bg-[#0a0a0c] overflow-hidden"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Content: Text & CTAs */}
          <motion.div 
            style={{ y: contentY, opacity }}
            className="lg:col-span-6 space-y-10 order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Subtle accent line */}
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-white/40 to-transparent hidden md:block" />
              
              <TextComponent 
                title={title} 
                desc1={description1}
                // Assuming TextComponent handles its own colors, otherwise wrap in a div
              />
            </div>

            {/* Premium CTA Block */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-bold transition-all hover:bg-slate-200 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {quoteLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-white/60" />
                {contactLabel}
              </Link>
            </div>
          </motion.div>

          {/* Right Content: The Cinematic "TV" Card */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <motion.div
              style={{ 
                scale: videoScale,
                rotateZ: videoRotate,
                opacity
              }}
              className="relative w-full max-w-[550px] aspect-[4/5] md:aspect-square lg:aspect-[4/5]"
            >
              {/* Outer Glow Decoration */}
              <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full opacity-50" />

              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-[12px] border-slate-900/80 shadow-2xl bg-black group">
                
                {/* Video Layer */}
                <video 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                  autoPlay muted loop playsInline
                >
                  <source src="/video-collection.mp4" type="video/mp4" />
                </video>

                {/* Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-white/10 pointer-events-none" />
                
                {/* Bezel "Glass" Highlight */}
                <div className="absolute inset-0 border border-white/20 rounded-[2rem] pointer-events-none" />

                {/* Bottom Status Bar (Pro UX Touch) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase">Cinematic Experience</p>
                </div>
              </div>

              {/* Floating Floating Elements (Optional 3D effect) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hidden md:flex"
              >
                <Car className="w-8 h-8 text-white/60" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
