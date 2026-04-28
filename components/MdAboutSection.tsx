"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Users, Clock, CheckCircle, Target, CarFront, Award } from "lucide-react"

export function MdAboutSection() {
  return (
    <section className="relative bg-[#fcfcfd] py-24 md:py-32 overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        
        {/* ===== Header: The Vision ===== */}
        <div className="text-center space-y-6 mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary"
          >
            Corporate Identity
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black italic tracking-tighter text-primary md:text-6xl lg:text-7xl leading-tight"
          >
            Malipheze Dlunge <br />
            <span className="text-primary/50 italic">Logistics & Transport</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mx-auto max-w-2xl text-lg font-medium text-primary/80 leading-relaxed"
          >
            A premier Cape Town-based enterprise providing safe, reliable, and 
            efficient logistics to individuals and global organizations 
            across the Western Cape.
          </motion.p>
        </div>

        {/* ===== Leadership: The Foundation ===== */}
        <div className="space-y-12 mb-32">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black tracking-tight text-primary uppercase">Executive Leadership</h2>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <LeadershipCard 
              image="/ceo.jpeg"
              name="Chief Driver"
              role="Founder & CEO"
              description="A visionary strategist committed to gold-standard safety and long-term client partnerships."
            />
            <LeadershipCard 
              image="/ceo_2.jpg"
              name="Tech Manager"
              role="Systems & Infrastructure"
              description="Engineering seamless digital operations to ensure 24/7 reliability and efficient dispatch."
            />
          </div>
        </div>

        {/* ===== Bento Grid: Mission & Fleet ===== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-7 bg-primary rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
               <Target className="w-32 h-32 text-secondary" />
            </div>
            <div className="relative z-10 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Our Purpose</span>
              <h2 className="text-4xl font-black tracking-tight leading-tight">Driven by <br/> Excellence.</h2>
              <p className="text-white font-medium text-lg leading-relaxed max-w-md">
                To deliver exceptional transportation services that exceed expectations 
                through professional, reliable, and high-compliance solutions.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-5 bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
               <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  <CarFront className="w-6 h-6 text-white" />
               </div>
               <h3 className="text-2xl font-black text-primary tracking-tight">The Modern Fleet</h3>
               <p className="text-sm font-medium text-primary/80 leading-relaxed">
                 Our fleet consists of late-model executive mini-buses engineered 
                 for safety and comfort.
               </p>
            </div>
            <ul className="mt-8 space-y-3">
               {['15 Passenger Capacity', 'Full Safety Certification', 'Climate Controlled', 'Professional PDP Drivers'].map((item) => (
                 <li key={item} className="flex items-center gap-3 text-xs font-bold text-primary/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {item}
                 </li>
               ))}
            </ul>
          </motion.div>
        </div>

        {/* ===== Core Values Grid ===== */}
        <div className="space-y-12">
           <div className="text-center space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-primary">Core Values</h2>
              <p className="text-primary/80 font-medium uppercase text-[10px] tracking-[0.3em]">The Pillars of MD Travels</p>
           </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <ValueCard icon={<Shield className="w-5 h-5" />} title="Safety First" />
            <ValueCard icon={<Clock className="w-5 h-5" />} title="Reliability" />
            <ValueCard icon={<CheckCircle className="w-5 h-5" />} title="Integrity" />
            <ValueCard icon={<Users className="w-5 h-5" />} title="Respect" />
            <ValueCard icon={<Award className="w-5 h-5" />} title="Excellence" />
          </div>
        </div>
      </div>
    </section>
  )
}

function LeadershipCard({ image, name, role, description }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative w-40 h-40 shrink-0">
        <div className="absolute inset-0 bg-secondary rounded-3xl rotate-6 group-hover:rotate-12 transition-transform" />
        <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-lg">
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
      <div className="text-center md:text-left space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-secondary">{role}</p>
        <h3 className="text-2xl font-black text-primary tracking-tight">{name}</h3>
        <p className="text-sm font-medium text-primary/80 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

function ValueCard({ icon, title }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center gap-4 group hover:border-secondary transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-secondary group-hover:text-black transition-all">
        {icon}
      </div>
      <h3 className="text-xs font-black uppercase tracking-widest text-primary">{title}</h3>
    </motion.div>
  )
}
