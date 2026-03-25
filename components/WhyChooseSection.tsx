"use client"

import { motion } from "framer-motion"
import { Clock, ShieldCheck, Users, CalendarCheck, Sparkles } from "lucide-react"

export function WhyChooseSection() {
  const reasons = [
    { 
      title: "24/7 Availability", 
      desc: "Round-the-clock logistics for absolute convenience.",
      icon: Clock 
    },
    { 
      title: "Licensed & Insured", 
      desc: "Comprehensive coverage for institutional peace of mind.",
      icon: ShieldCheck 
    },
    { 
      title: "Professional Team", 
      desc: "Vetted, courteous drivers with expert local knowledge.",
      icon: Users 
    },
    { 
      title: "Flexible Booking", 
      desc: "Dynamic scheduling tailored to your unique itinerary.",
      icon: CalendarCheck 
    },
  ]

  return (
    <section className="relative py-24 md:py-40 bg-[#fcfcfd] overflow-hidden">
      {/* Background Brand Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black leading-none uppercase tracking-tighter text-slate-900">
          Trust
        </h2>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: TEXT & INTERACTIVE LIST */}
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary"
              >
                The MD Advantage
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]"
              >
                Why Choose <br />
                <span className="text-slate-400">MD Travels?</span>
              </motion.h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-1">
              {reasons.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-500"
                >
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-secondary transition-all duration-500 group-hover:scale-110 group-hover:bg-secondary group-hover:text-black">
                    <item.icon className="h-6 w-6" />
                    <div className="absolute -top-2 -left-2 text-[40px] font-black text-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: CINEMATIC SHOWCASE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-6 relative group"
          >
            {/* Decorative Glow Behind Image */}
            <div className="absolute -inset-4 bg-secondary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl shadow-slate-200">
              <img
                src="/p1.jpg"
                alt="Luxury Fleet Showcase"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              {/* Image Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              
              {/* Floating Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-white/20 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
                      Verified Safety
                    </p>
                    <p className="text-sm font-black text-slate-900 leading-none">
                      Gold Standard
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
