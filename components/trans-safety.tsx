"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Award, Wrench, BadgeCheck, FileCheck, ShieldAlert } from "lucide-react"

const safetyItems = [
  {
    icon: BadgeCheck,
    title: "Licensed Drivers",
    text: "All drivers hold valid PDP / PrDP licenses and are vetted professionals.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    text: "Every vehicle is comprehensively insured for maximum passenger protection.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    text: "Full adherence to national and provincial transport safety regulations.",
  },
  {
    icon: Wrench,
    title: "Maintenance Excellence",
    text: "Strict mechanical audit schedules to keep our fleet in showroom condition.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    text: "Continuous driver assessments to maintain our gold-standard service.",
  },
]

export function TransSafety() {
  return (
    <section id="safety" className="relative bg-primary py-24 md:py-32 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none">
        <ShieldAlert className="w-full h-full stroke-[0.5]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-secondary shadow-[0_0_20px_rgba(251,191,36,0.1)]"
          >
            <ShieldCheck className="w-3 h-3" />
            Safety Protocol
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-6 text-balance text-4xl font-black tracking-tighter text-white md:text-6xl"
          >
            Safety & Compliance <br className="hidden md:block" /> Standards
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mx-auto mt-6 max-w-2xl text-lg font-medium text-slate-400"
          >
            Your safety is our non-negotiable priority. We adhere to the highest institutional standards of transport logistics and vehicle maintenance.
          </motion.p>
        </div>

        {/* Safety Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {safetyItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col items-center rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 text-center transition-all duration-500 hover:bg-white/[0.05] hover:border-secondary/30 hover:-translate-y-2"
            >
              {/* Icon Orb */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-white/5 text-secondary shadow-xl transition-all duration-500 group-hover:bg-secondary group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                <item.icon className="h-7 w-7" />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest text-white transition-colors group-hover:text-secondary">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed font-sm text-white/80 transition-colors group-hover:text-slate-300">
                  {item.text}
                </p>
              </div>

              {/* Decorative Card Detail */}
              <div className="absolute bottom-4 h-1 w-8 rounded-full bg-white transition-all group-hover:w-16 group-hover:bg-secondary" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center text-center gap-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-secondary/80">
            Certified Western Cape Operator
          </p>
          <div className="flex gap-4">
             <div className="h-px w-12 bg-white/30 self-center" />
             <ShieldCheck className="w-6 h-6 text-white/30" />
             <div className="h-px w-12 bg-white/30 self-center" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
