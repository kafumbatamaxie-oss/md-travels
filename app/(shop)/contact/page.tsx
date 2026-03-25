"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import CustomHero from "@/components/CustomHero"
import { useLanguage } from "@/hooks/use-language"

const springConfig = {
  type: "spring",
  stiffness: 100,
  damping: 20,
} as const

export default function Contact() {
  const { t, mounted } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground w-full">
      <CustomHero 
        title="Connect With Us" 
        subTitle="Experience gold-standard support. Our team is dedicated to providing you with the ultimate luxury experience in Cape Town."
      />

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* LEFT SIDE: CONTACT INFO CARDS */}
            <div className="lg:col-span-5 space-y-12">
              <ScrollReveal>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Get In Touch</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">How can we assist you?</h2>
                </div>
              </ScrollReveal>

              <div className="space-y-6">
                {[
                  { 
                    icon: Phone, 
                    title: "Direct Lines", 
                    links: [
                      { label: "+27 606 411 703", href: "tel:+27606411703" },
                      { label: "+27 678 142 490", href: "tel:+27678142490" },
                      { label: "+27 71 945 5941", href: "tel:+27719455941" }
                    ]
                  },
                  { 
                    icon: Mail, 
                    title: "Email Support", 
                    links: [{ label: "info@mdtravels.co.za", href: "mailto:info@mdtravels.co.za" }] 
                  },
                  { 
                    icon: MapPin, 
                    title: "Our Location", 
                    links: [{ label: "44 Wrench Street, Parow West, 7500", href: "#" }] 
                  },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="group flex gap-6 p-6 rounded-[2rem] hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 border border-transparent hover:border-slate-100">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.title}</h4>
                        <div className="flex flex-col gap-1">
                          {item.links.map((link, j) => (
                            <a key={j} href={link.href} className="text-lg font-bold text-slate-900 hover:text-secondary transition-colors">
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: THE PREMIUM FORM */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.2}>
                <div className="bg-white border border-slate-100 p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-slate-200/60 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <FormInput label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
                      <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <FormInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                      <FormInput label="Subject" name="subject" type="text" value={formData.subject} onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all duration-300 font-medium resize-none text-slate-900"
                        placeholder="Tell us about your travel requirements..."
                      />
                    </div>

                    <div className="relative">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:bg-black hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 group overflow-hidden"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </button>
                    </div>

                    <AnimatePresence>
                      {success && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-6 bg-green-50 border border-green-100 rounded-[2rem] flex items-center gap-4"
                        >
                          <div className="bg-green-500 p-2 rounded-full shrink-0">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-green-900">Message Received</h4>
                            <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function FormInput({ label, ...props }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">{label}</label>
      <input
        {...props}
        required
        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-full focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all duration-300 font-bold text-slate-900"
      />
    </div>
  )
}
