"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import CustomHero from "@/components/CustomHero"


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
    setSuccess(false)

    try {
      const response = await fetch("/api/contacts", {
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
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-secondary selection:text-white">
   

      {/* Hero with Reveal */}
      <CustomHero title="Connect With Us" subTitle="Experience gold-standard support. Our team is dedicated to providing you with the ultimate luxury
              experience in Cape Town."/>

      {/* Contact Section */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row max-w-full mx-auto py-10 gap-10">
          <div className="mt-10">
            {[
            
              { icon: Phone, title: "Call Us on", content: "+27 606 411 703", href: "tel:+27606411703" },
              { icon: Phone, title: "Call Us on", content: "+27 71 945 5941", href: "tel:+27719455941" },
              { icon: Mail, title: "Email Us on", content: "info@mdtravels.co.za", href: "mailto:info@mdtravels.co.za" },
              { icon: MapPin, title: "Visit Us at", content: "44 Wrench Street, Parow West, 7500", href: "#" },
            ].map((item, i) => (
              <p className="border-b py-4">{item.title.toUpperCase()} : <span className="text-underline underline hover:decoration-indigo-500 "><a href={item.href}>{item.content}</a></span></p>
            ))}
          </div>

          {/* Form with physics animations */}
          <div className="max-w-full mx-auto ">
            <ScrollReveal delay={0.3}>
              <div className="bg-card border border-border p-8 md:p-12 rounded-[2.5rem]  relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:border-secondary outline-none transition-all duration-300 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:border-secondary outline-none transition-all duration-300 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:border-secondary outline-none transition-all duration-300 font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:border-secondary outline-none transition-all duration-300 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-6 py-4 bg-background border border-border rounded-2xl focus:border-secondary outline-none transition-all duration-300 font-medium resize-none"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={springConfig}
                        className="p-5 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center gap-4"
                      >
                        <div className="bg-green-500 p-2 rounded-full">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">Thank for reaching out!</h4>
                          <p className="font-bold text-foreground">Message Sent successfully !</p>
                          <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={springConfig}
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-foreground text-background rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition-colors flex items-center justify-center gap-3 disabled:opacity-70 group"
                  >
                    {loading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Dispatch Inquiry
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
