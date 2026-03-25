"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function ServicesShowroom({ services, t }: { services: any[], t: any }) {
  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-8 bg-[#fcfcfd] overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com')]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 space-y-4 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary"
          >
            Excellence in Motion
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter text-slate-900 md:text-6xl"
          >
            Our Core <span className="text-slate-400">Offerings.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-white rounded-[3rem] border border-slate-100 p-10 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden"
            >
              {/* Animated Icon Orb */}
              <div className="mb-8 relative w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-secondary transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                <service.icon className="w-7 h-7" />
                <Sparkles className="absolute -top-2 -right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {service.desc}
                </p>

                {/* Refined Feature List */}
                <ul className="space-y-3 pt-4">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <span className="uppercase tracking-widest opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Action Button */}
              <div className="mt-10">
                <Link
                  href="/quote"
                  className="group/btn flex items-center justify-center gap-3 w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-950 hover:text-white active:scale-95"
                >
                  Get Quote
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

              {/* Card Decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
