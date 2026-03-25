"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, ExternalLink, MessageSquare } from "lucide-react"

export function ContactConciergeSection() {
  const contactDetails = [
    { 
      icon: Phone, 
      label: "Direct Support", 
      lines: ["+27 67 8142 490", "+27 606 411 703", "+27 71 945 5941"],
      href: "tel:+27678142490" 
    },
    { 
      icon: Mail, 
      label: "Official Correspondence", 
      lines: ["info@mdtravels.co.za", "malipheze@mdtravels.co.za"],
      href: "mailto:info@mdtravels.co.za" 
    },
  ]

  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-[#fcfcfd]">
      <div className="max-w-5xl mx-auto">
        
        {/* --- MAIN CONTACT BENTO CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-slate-950 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl overflow-hidden group"
        >
          {/* Background Brand Decoration */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <MessageSquare className="w-64 h-64 text-secondary" />
          </div>

          <div className="relative z-10 space-y-12">
            {/* Header */}
            <div className="text-center md:text-left space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
                24/7 Operations
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Secure Your <br />
                <span className="text-slate-400">Luxury Transfer.</span>
              </h2>
              <p className="text-slate-500 font-medium text-lg">
                For bookings or customized corporate quotes, our concierge is available 24/7.
              </p>
            </div>

            {/* Contact Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {contactDetails.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-6 p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] hover:bg-white/[0.07] hover:border-secondary/30 transition-all group/item"
                >
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary transition-transform group-hover/item:scale-110 group-hover/item:bg-secondary group-hover/item:text-black">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                    <div className="space-y-1">
                      {item.lines.map((line, i) => (
                        <p key={i} className="text-lg font-bold text-white group-hover/item:text-secondary transition-colors">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Bottom Logistics Info */}
            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-secondary" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Corporate HQ</p>
                   <p className="font-bold text-sm">129 Beaufort Street, Goodwood, Cape Town</p>
                </div>
              </div>
              
              <button 
                onClick={() => window.location.href = "https://wa.me"}
                className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-secondary transition-colors active:scale-95"
              >
                Instant WhatsApp Quote <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
