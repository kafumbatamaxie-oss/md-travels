"use client"

import { motion } from "framer-motion"
import { Building2, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react"

export function TransAbout() {
  const industries = [
    { 
      icon: Building2, 
      title: "Government", 
      desc: "Municipal transport",
      delay: 0.1 
    },
    { 
      icon: GraduationCap, 
      title: "Education", 
      desc: "Schools & universities",
      delay: 0.2 
    },
    { 
      icon: Briefcase, 
      title: "Corporate", 
      desc: "Staff & executive",
      delay: 0.3 
    },
  ]

  const compliance = [
    "Fully insured fleet of modern vehicles",
    "Drivers hold valid PDP / PrDP licenses",
    "Compliance with all transport regulations",
    "Strict safety & maintenance standards",
    "Licensed & professional drivers",
    "24/7 availability for all transport needs",
  ]

  return (
    <section id="about" className="relative bg-[#fcfcfd] py-24 md:py-32 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com')]" />

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          
          {/* LEFT CONTENT: THE STORY */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/50"
              >
                Company Overview
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl font-black tracking-tighter text-primary md:text-5xl lg:text-6xl leading-[1.1]"
              >
                Your Trusted Transport <br />
                <span className="text-secondary">Partner in Cape Town.</span>
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-lg leading-relaxed text-primary/50 font-medium max-w-2xl"
            >
              MD Travels is a Western Cape-based professional transport service provider offering safe, insured, and reliable passenger solutions. We are committed to strict compliance and reliability standards required by Government institutions and corporate giants.
            </motion.p>

            {/* Industry Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {industries.map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay }}
                  whileHover={{ y: -5 }}
                  className="group flex flex-col items-center gap-3 rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-secondary transition-transform group-hover:scale-110">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-sm font-black uppercase tracking-widest text-primary">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold text-primary/50 uppercase">
                      {item.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTENT: THE COMPLIANCE CARD */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-[3rem] bg-primary p-10 md:p-14 text-white shadow-2xl overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight">Why MD Travels?</h3>
                  <div className="h-1.5 w-12 bg-secondary rounded-full" />
                </div>

                <ul className="flex flex-col gap-5">
                  {compliance.map((item, idx) => (
                    <motion.li 
                      key={item} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 group-hover:bg-secondary transition-colors">
                        <CheckCircle2 className="h-3.5 w-3.5 text-secondary group-hover:text-black" />
                      </div>
                      <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Micro CTA */}
                <div className="pt-6">
                  <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-secondary transition-colors active:scale-95">
                    View Full Compliance Docs
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
