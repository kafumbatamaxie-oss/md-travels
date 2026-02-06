"use client"

import type React from "react"

import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { useEffect, useState } from "react"
import { Send, CheckCircle, ChevronLeft } from "lucide-react"
import { format, addMonths } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuoteLoadingModal } from "@/components/quote-loading-modal"
import { QuoteLoadingOverlay } from "@/components/quote-loading-overlay"
import { QuoteClientSchema } from "@/lib/validators/quote-client"
import { useServices } from "@/hooks/use-services"


type FormStep = 1 | 2

type QuoteRequest = {
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupAddress: string
  destination: string
  pickupDate: string
  dropoffDate: string
  pickupTime: string
  passengers: string
  serviceId: string
  additionalRequirements?: string
}

export default function Quote() {
  const { mounted } = useLanguage()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState<FormStep>(1)

  const { services, loading: servicesLoading } = useServices()



  const [formData, setFormData] = useState<QuoteRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pickupAddress: "",
    destination: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "",
    passengers: "",
    serviceId: "",
    additionalRequirements: "",
  })

  const updateField = (name: keyof QuoteRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    updateField(name as keyof QuoteRequest, value)
  }

  const today = new Date()
  const maxDate = addMonths(today, 6)

  const handleNextStep = () => {
    if (!formData.serviceId) return
    setStep(2)
  }

  const handleBackStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    const parsed = QuoteClientSchema.safeParse(formData)
    if (!parsed.success) {
      alert("Please complete all required fields correctly.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          pickupAddress: "",
          destination: "",
          pickupDate: "",
          dropoffDate: "",
          pickupTime: "",
          passengers: "",
          serviceId: "",
          additionalRequirements: "",
        })
        setStep(1)
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setLoading(false)
    }
  }

  const progressValue = step === 1 ? 50 : 100

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [loading])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-sky-950/10 py-10 text-foreground">
      <FloatingElements />

      <QuoteLoadingOverlay open={loading} />
      <QuoteLoadingModal open={loading} />

      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:px-10 mx-auto">
          <div className="grid md:grid-cols-6 gap-8 md:gap-12 items-start">
            <div className="md:col-span-2">
              <p className="text-secondary text-sm font-semibold mb-2 uppercase">
                Ready to go?
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-sky-950">
                Request A Quote Now
              </h1>
            </div>

            <div className="bg-card border md:col-span-4 rounded-xl p-6 md:p-8 shadow-lg">
              <div className="mb-6">
                <p className="text-sm text-sky-950 mb-2">
                  Step {step} of 2 – {step === 1 ? "Rental Information" : "Contact Information"}
                </p>
                <div className="relative">
                  <Progress value={progressValue} className="h-8 rounded-full" />
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white"
                    style={{ width: `${progressValue}%` }}
                  >
                    {progressValue}%
                  </span>
                </div>
              </div>

              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 text-sm">
                    Quote request sent! We'll contact you soon.
                  </span>
                </div>
              )}

              {step === 1 && (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNextStep() }}>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                       <div>
                          <label className="block text-xs font-semibold mb-2 uppercase">
                            Select Service <span className="text-red-500">*</span>
                          </label>

                          {servicesLoading ? (
                            <div className="w-full h-[46px] rounded-lg bg-muted animate-pulse" />
                          ) : (
                            <select
                              name="serviceId"
                              value={formData.serviceId}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border rounded-lg text-sm"
                            >
                              <option value="">Select a service</option>
                              {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                  {service.name}
                                </option>
                              ))}
                            </select>
                          )}
                       </div>
                       <div>
                            <label className="block text-xs font-semibold mb-2 uppercase">
                              Number of Passengers <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              min="1"
                              name="passengers"
                              value={formData.passengers}
                              onChange={handleChange}
                              required
                              placeholder="5"
                              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                            />
                        </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Pick-up Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pickupAddress"
                        placeholder="Enter pick-up address"
                        value={formData.pickupAddress}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Destination <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="destination"
                        placeholder="Enter destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Pick-up Date <span className="text-red-500">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            {formData.pickupDate ? format(new Date(formData.pickupDate), "dd/MM/yyyy") : "dd/mm/yyyy"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.pickupDate ? new Date(formData.pickupDate) : undefined}
                            onSelect={(date) =>{
                              if (!date) return
                              updateField("pickupDate", date.toISOString())
                            }}
                            disabled={(date) => date < today || date > maxDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Drop-off Date <span className="text-red-500">*</span>
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            {formData.dropoffDate ? format(new Date(formData.dropoffDate), "dd/MM/yyyy") : "dd/mm/yyyy"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dropoffDate ? new Date(formData.dropoffDate) : undefined}
                            onSelect={(date) => {
                                if (!date) return
                                updateField("dropoffDate", date.toISOString())
                            }
                              
                            }
                            disabled={(date) =>
                              date < today ||
                              date > maxDate 
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Pick-up Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={servicesLoading || !formData.serviceId}
                    className="w-full px-8 py-4 bg-sky-950 text-white rounded-lg font-bold uppercase disabled:opacity-50"
                  >
                    Next Step
                  </button>
                </form>
              )}

              {step === 2 && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Your First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>

                    <div className="flex items-end">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Your Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+27"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid">
                    

                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase">Additional Requirements</label>
                      <textarea
                        name="additionalRequirements"
                        placeholder="Do you have any special requests or requirements?"
                        value={formData.additionalRequirements}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition resize-none text-sm"
                      />
                    </div>
                  </div>
                  {/* Step 2 unchanged – already correct */}
                  <div className="flex items-center justify-center gap-4">
                    <button type="button" onClick={handleBackStep} className="px-6 py-4 text-center bg-muted rounded-lg">
                      <ChevronLeft className="w-4 h-4" /> 
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-8 py-4 bg-secondary text-white rounded-lg flex-2 font-bold uppercase"
                    >
                      {loading ? "Sending..." : <>Send Request <Send className="w-4 h-4" /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
