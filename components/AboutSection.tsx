"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
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
  const videoCardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10])
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, -30])

  const videoScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.8, 0.3])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  const videoY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, -200])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 md:px-8 bg-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1920&h=1080&fit=crop')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-0 items-center">
          {/* Left Content */}
          <div className="space-y-8 md:col-span-2">
            <div>
              <TextComponent  title={title}  desc1={description1} />
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg text-center"
              >
                {contactLabel}
              </Link>
              <Link
                href="/quote"
                className="px-6 py-3 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white rounded-lg font-semibold transition-all hover:scale-105 text-center"
              >
                {quoteLabel}
              </Link>
            </div>
          </div>

          {/* Right Video Card with 3D Rotation and Shrink Effect */}
          <div className="lg:grid-col md:col-span-4 flex items-center justify-center">
            <motion.div
              ref={videoCardRef}
              style={{
                rotateX,
                rotateY,
                z,
                scale: videoScale,
                opacity: videoOpacity,
                y: videoY,
              }}
              className="w-full h-96 md:h-full"
            >
              <div
                className="relative w-full h-96 md:h-[500px] bg-black rounded-3xl  overflow-hidden border-8 border-gray-900 group"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* TV Bezel Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 z-0" /> */}

                <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                  <source src="/views.mp4" type="video/mp4" />
                </video>

                {/* Glass Reflection Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20 pointer-events-none" />

                {/* Bezel Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 bg-linear-to-b from-gray-800 to-gray-900" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
