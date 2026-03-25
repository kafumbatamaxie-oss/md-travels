"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, ArrowRight, Sparkles } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import CustomHero from "@/components/CustomHero"
import { useLanguage } from "@/hooks/use-language"

// Reusable animated input component for cleaner code and consistent UI
const FormInput = ({ label, name, type, value, onChange, required = true }: any) => (
  <div className="group space-y-2 w-full">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 group-focus-within:text-blue-600 transition-colors">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all duration-300 font-medium text-slate-900 placeholder:text-slate-300"
    />
  </div>
)

export default function Contact() {
  const { mounted } = useLanguage()
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
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 w-full overflow-x-hidden">
      <CustomHero 
        title="Connect With Us" 
        subTitle="Experience gold-standard support. Our team is dedicated to providing you with the ultimate luxury experience in Cape Town."
      />

      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* CONTACT INFO PANEL */}
            <div className="lg:col-span-5 space-y-10">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Get In Touch</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                  How can we <span className="text-blue-600">assist</span> you?
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { 
                    icon: Phone, 
                    title: "Direct Lines", 
                    links: ["+27 606 411 703", "+27 678 142 490"],
                    href: "tel:+27606411703"
                  },
                  { 
                    icon: Mail, 
                    title: "Email Support", 
                    links: ["info@mdtravels.co.za"],
                    href: "mailto:info@mdtravels.co.za"
                  },
                  { 
                    icon: MapPin, 
                    title: "Our Location", 
                    links: ["44 Wrench Street, Parow West"],
                    href: "#"
                  },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <a 
                      href={item.href}
                      className="group flex items-center gap-6 p-2 pr-6 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
                    >
                      <div className="w-16 h-16 rounded-[1.8rem] bg-slate-900 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-500">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.title}</h4>
                        <p className="text-lg font-bold text-slate-900 group-hover:text-secondary transition-colors italic">
                          {item.links[0]} {item.links.length === 2 &&" / "} {item.links.length === 2 && item.links[1] }
                        </p>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* INTERACTIVE FORM STACK */}
            <div className="lg:col-span-7 relative">
              <ScrollReveal delay={0.2}>
                <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-100 relative">
                  
                  <AnimatePresence mode="wait">
                    {!success ? (
                      <motion.form 
                        key="contact-form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormInput label="Full Name" name="name" type="text" value={formData.name} onChange={handleChange} />
                          <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                          <FormInput label="Subject" name="subject" type="text" value={formData.subject} onChange={handleChange} />
                        </div>

                        <div className="group space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 group-focus-within:text-blue-600 transition-colors">
                            Your Message
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all duration-300 font-medium resize-none text-slate-900"
                            placeholder="How can we help your journey?"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="relative w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 group overflow-hidden"
                        >
                          {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              Send Inquiry
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center space-y-6"
                      >
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                          <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900">Message Received!</h3>
                        <p className="text-slate-500 font-medium max-w-xs mx-auto">
                          Our luxury concierge team will review your request and contact you within 24 hours.
                        </p>
                        <button 
                          onClick={() => setSuccess(false)}
                          className="text-xs font-black uppercase tracking-widest text-primary hover:text-primary transition-colors"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
              
              {/* Decorative background element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
