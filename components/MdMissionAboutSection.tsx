"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Target, Eye, ShieldCheck, Star } from "lucide-react"

export function MissionVisionSection() {
  const coreValues = [
    { title: "Safety First", desc: "Your security is our non-negotiable priority", icon: ShieldCheck },
    { title: "Reliability", desc: "Always on time, every single time, without exception", icon: CheckCircle2 },
    { title: "Excellence", desc: "Uncompromising quality in every vehicle and interaction", icon: Star },
    { title: "Customer Focus", desc: "Tailored logistics designed around your success", icon: Target },
  ]

  return (
    <section className="relative py-24 md:py-32 bg-[#fcfcfd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: MISSION & VISION (The Dark Anchor) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-primaary rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Target className="w-64 h-64" />
            </div>

            <div className="relative z-10 space-y-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <Target className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Our Mission</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-primary  tracking-tighter leading-tight">
                  Exceeding <br /> <span className="text-secondary">Expectations.</span>
                </h2>
                <p className="text-lg text-primary/50 font-medium leading-relaxed max-w-xl">
                  To provide safe, reliable, and luxurious transportation services that redefine professionalism 
                  and set new benchmarks for customer service in the Western Cape.
                </p>
              </div>

              <div className="h-px w-full bg-primary/10" />

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-secondary">
                  <Eye className="w-5 h-5" />
                  <span className="text-[10px] font-black  uppercase tracking-[0.4em]">Our Vision</span>
                </div>
                <h3 className="text-2xl text-primary font-bold tracking-tight">
                  The Leading Choice in Cape Town
                </h3>
                <p className="text-base text-primary/50 font-medium leading-relaxed max-w-xl">
                  To become the definitive transportation partner, known globally for our commitment to excellence, 
                  technological innovation, and absolute customer satisfaction.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CORE VALUES (The Glass Dock) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="px-4 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Core Values</span>
              <h2 className="text-3xl font-black tracking-tighter text-primary uppercase">The MD Pillars</h2>
            </div>

            <div className="grid gap-4">
              {coreValues.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex gap-5 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/50 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-black transition-all">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-primary uppercase tracking-widest text-xs mb-1">
                      {value.title}
                    </h3>
                    <p className="text-sm text-primary/50 font-medium leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
