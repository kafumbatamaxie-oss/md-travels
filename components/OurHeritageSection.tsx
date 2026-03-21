"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { AnimatedStats } from "@/components/animated-stats"
import TextComponent from "./Text-Component"

export function OurHeritageSection({ t }: { t: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle Parallax for the Image
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-32 overflow-hidden bg-[#0a0a0c]"
    >
      {/* HERITAGE BACKGROUND OVERLAY */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none bg-fixed bg-cover bg-center grayscale contrast-125"
        style={{
          backgroundImage: "url('/Flag_of_South_Africa.gif')",
        }}
      />
      
      {/* VIGNETTE GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c] z-0" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* IMAGE BLOCK: Leads on Mobile for better storytelling */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 group"
          >
            {/* Outer Glow Decoration */}
            <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
            
            <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[650px] border-[10px] border-white/5 shadow-2xl">
              <motion.img
                style={{ scale: imageScale }}
                src="/heritage.png"
                alt="Our Heritage"
                className="w-full h-full object-cover transition-all duration-700"
              />
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Badge (South African Excellence) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 md:left-auto md:-right-6 bg-white p-6 rounded-3xl shadow-2xl hidden sm:block"
            >
              <p className="text-black font-black text-xs tracking-widest uppercase mb-1">Born in</p>
              <p className="text-black font-extrabold text-xl">Cape Town</p>
            </motion.div>
          </motion.div>

          {/* CONTENT BLOCK */}
          <motion.div 
            style={{ y: textY }}
            className="order-2 lg:order-1 space-y-10"
          >
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
              {/* Subtle inner highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="space-y-6">
                <TextComponent 
                  title={t.about.title} 
                  desc1={t.about.description2}
                  // Assuming internal styles: ensure titles are White and descriptions are Slate-400
                />
              </div>

              {/* STATS DIVIDER */}
              <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="relative z-10">
                <AnimatedStats 
                  experienceLabel={t.about.experience} 
                  clientsLabel={t.about.customers} 
                  // Pass a theme prop if your component supports it, otherwise wrap in class
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
