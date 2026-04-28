"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Award, Users, CarFront, Zap } from "lucide-react"

export function StatsDashboardSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const stats = [
    { number: "5+", label: "Years Experience", icon: Award },
    { number: "1000+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Fleet Vehicles", icon: CarFront },
    { number: "24/7", label: "Service Available", icon: Zap },
  ]

  return (
    <section ref={containerRef} className="relative py-24 bg-primary overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 md:p-12 bg-primary-dark backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center transition-all hover:bg-white/[0.07] hover:border-secondary/30"
            >
              {/* Animated Icon Orb */}
              <div className="mb-6 w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary transition-transform group-hover:scale-110 group-hover:bg-secondary group-hover:text-black">
                <stat.icon className="w-6 h-6" />
              </div>

              {/* Number with Shimmer Effect */}
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary bg-[length:200%_auto] animate-shimmer">
                  {stat.number}
                </span>
              </div>

              {/* Label */}
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors">
                {stat.label}
              </p>

              {/* Decorative Corner Highlight */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[2.5rem] pointer-events-none">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
      `}</style>
    </section>
  )
}
