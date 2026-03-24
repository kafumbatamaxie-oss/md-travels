"use client"

import { motion } from "framer-motion"
import {
  Building,
  Bus,
  GraduationCap,
  Briefcase,
  CalendarDays,
  MapPin,
  FileText,
  ArrowUpRight,
} from "lucide-react"

const services = [
  {
    icon: Building,
    title: "Government & Municipal",
    description: "Reliable transport solutions for institutions and municipal operations.",
  },
  {
    icon: GraduationCap,
    title: "School Transport",
    description: "Safe and compliant student transport for schools across the Western Cape.",
  },
  {
    icon: Bus,
    title: "College & University",
    description: "Dependable daily transport for higher education students and staff.",
  },
  {
    icon: Briefcase,
    title: "Corporate & Staff",
    description: "Executive and staff shuttle services for businesses and organisations.",
  },
  {
    icon: MapPin,
    title: "Shuttle & Charter",
    description: "Flexible shuttle and charter options for any destination or schedule.",
  },
  {
    icon: CalendarDays,
    title: "Events & Conferences",
    description: "Group transport for events, conferences, team-building, and tours.",
  },
  {
    icon: FileText,
    title: "Contract-Based",
    description: "Custom arrangements tailored to your schedule and route requirements.",
  },
]

export function TransServices() {
  return (
    <section id="services" className="bg-[#050506] py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Section */}
        <div className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[11px] font-black uppercase tracking-[0.5em] text-secondary"
            >
              Exclusive Services
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-black tracking-tighter text-white md:text-6xl"
            >
              Services <span className="text-white/40">Portfolio</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-md text-lg font-medium text-slate-400 lg:pb-2"
          >
            Bespoke logistics and transport solutions engineered for reliability, safety, and comfort.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between rounded-[2.5rem] border border-white/5 bg-[#0d0d0f] p-8 transition-all duration-500 hover:bg-[#121215] hover:border-secondary/30 hover:-translate-y-2 shadow-2xl"
            >
              {/* Card Decoration - Large Ghost Number */}
              <div className="absolute top-6 right-8 text-5xl font-black text-white/[0.02] transition-all duration-500 group-hover:text-secondary/5 group-hover:scale-110">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="space-y-6 relative z-10">
                {/* Icon Container */}
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-secondary/5 text-secondary border border-secondary/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary group-hover:text-black group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                  <service.icon className="h-6 w-6" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-secondary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 font-medium">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Interaction Hint */}
              <div className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/60 transition-all duration-300 group-hover:text-secondary group-hover:translate-x-1">
                Enquire Service <ArrowUpRight className="h-3 w-3" />
              </div>
            </motion.div>
          ))}
          
          {/* Custom Final "Call" Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-white/5 bg-transparent p-8 text-center transition-all duration-500 hover:border-secondary/40 hover:bg-secondary/[0.02]"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-secondary/40 transition-colors">
                <FileText className="w-5 h-5 text-white/20 group-hover:text-secondary transition-colors" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2 tracking-tight">Custom Route?</h4>
            <p className="text-xs text-slate-500 mb-8 max-w-[180px]">Tailored solutions for unique institutional requirements.</p>
            <a 
              href="#contact" 
              className="w-full py-4 bg-white text-black rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-secondary transition-all active:scale-95 shadow-lg"
            >
              Contact Specialist
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
