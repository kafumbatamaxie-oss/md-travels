"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation";
export default function Inquiry() {
  const { t, mounted } = useLanguage()
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    router.push('/hacker')

    try {
      // Send inquiry and SMS notification
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          name: "",
          phone: "",
          email: "",
          inquiryType: "",
          message: "",
        })
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
    <main className="min-h-screen bg-background text-foreground">
   

      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Send an Inquiry</h1>
          <p className="text-lg text-text-secondary">
            Have questions about our services? We're ready to help. Submit your inquiry and we'll respond promptly.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-secondary outline-none transition"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (for SMS updates)"
                value={formData.phone}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-surface border border-border rounded-lg focus:border-secondary outline-none transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 bg-surface border border-border rounded-lg focus:border-secondary outline-none transition"
              />
            </div>

            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-secondary outline-none transition"
            >
              <option value="">Select Inquiry Type</option>
              <option value="general">General Inquiry</option>
              <option value="pricing">Pricing Question</option>
              <option value="service">Service Request</option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Partnership</option>
            </select>

            <textarea
              name="message"
              placeholder="Your Message (Required for SMS notification)"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-secondary outline-none transition resize-none"
            />

            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-400">Inquiry submitted! You'll receive an SMS confirmation shortly.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-secondary hover:opacity-90 text-primary rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Submit Inquiry
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-text-secondary">
              We'll send you an SMS confirmation when we receive your inquiry.
            </p>
          </form>
        </div>
      </section>

      <FloatingElements />
    </main>
  )
}
