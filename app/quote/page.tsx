"use client"

import type React from "react"

import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { LoadScript, Autocomplete } from "@react-google-maps/api"
import { useEffect, useState, useRef } from "react"
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
import { usePathname } from "next/navigation";
import HideOnQuote from "@/components/HideOnQuote"

type FormStep = 1 | 2

type QuoteRequest = {
  firstName: string
  lastName: string
  email: string
  phone: string

  pickupAddress: string
  pickupLat?: number
  pickupLng?: number

  destinationAddress: string
  destinationLat?: number
  destinationLng?: number

  pickupDate: string
  dropoffDate: string
  pickupTime: string

  passengers: string

  serviceId: string
  vehicleCategory: string

  additionalRequirements?: string
}


export default function Quote() {
  const { mounted } = useLanguage()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState<FormStep>(1)

  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null)
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null)


  const { services, loading: servicesLoading } = useServices()



  const [formData, setFormData] = useState<QuoteRequest>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",

      pickupAddress: "",
      pickupLat: undefined,
      pickupLng: undefined,

      destinationAddress: "",
      destinationLat: undefined,
      destinationLng: undefined,

      pickupDate: "",
      dropoffDate: "",
      pickupTime: "",

      passengers: "",

      serviceId: "",
      vehicleCategory: "",

      additionalRequirements: "",
    })


  const updateField = (
    name: keyof QuoteRequest,
    value: string | number | undefined
  ) => {
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
      console.log(parsed.error.flatten())
      alert("Please complete all required fields correctly.")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,

          pickupAddress: formData.pickupAddress,
          pickupLat: formData.pickupLat ?? 0,
          pickupLng: formData.pickupLng ?? 0,

          destinationAddress: formData.destinationAddress,
          destinationLat: formData.destinationLat ?? 0,
          destinationLng: formData.destinationLng ?? 0,

          pickupDate: formData.pickupDate,
          dropoffDate: formData.dropoffDate,
          pickupTime: formData.pickupTime,

          passengers: Number(formData.passengers),

          serviceId: formData.serviceId,
          vehicleCategory: formData.vehicleCategory ?? "STANDARD",

          additionalRequirements: formData.additionalRequirements,
        }),
      })


      if (response.ok) {
        setSuccess(true)
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        pickupAddress: "",
        pickupLat: undefined,
        pickupLng: undefined,

        destinationAddress: "",
        destinationLat: undefined,
        destinationLng: undefined,

        pickupDate: "",
        dropoffDate: "",
        pickupTime: "",

        passengers: "",
        serviceId: "",
        vehicleCategory: "",

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
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      {/* existing page JSX */}
      <main className="min-h-screen bg-sky-950/10 py-1 text-foreground">
        
   
        <HideOnQuote Component={FloatingElements } />

        <QuoteLoadingOverlay open={loading} />
        <QuoteLoadingModal open={loading} />

        <section className="relative py-2 px-4 sm:px-6 lg:px-8">
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
                              <div className="w-full h-[11.5] rounded-lg bg-muted animate-pulse" />
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
                              Vehicle Type <span className="text-red-500">*</span>
                            </label>

                            <select
                              name="vehicleCategory"
                              value={formData.vehicleCategory}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border rounded-lg text-sm"
                            >
                              <option value="">Select vehicle</option>
                              <option value="SEDAN">Sedan (1–3 pax)</option>
                              <option value="MINIBUS">Minibus (4–13 pax)</option>
                              <option value="COACH_65">Coach 65-Seater</option>
                            </select>
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

                        <Autocomplete
                          onLoad={(auto) => (pickupRef.current = auto)}
                          onPlaceChanged={() => {
                            const place = pickupRef.current?.getPlace()
                            if (!place?.geometry) return

                            updateField("pickupAddress", place.formatted_address || "")
                            updateField("pickupLat", place.geometry.location?.lat())
                            updateField("pickupLng", place.geometry.location?.lng())
                            
                          }}
                          options={{
                            componentRestrictions: { country: "za" }, // South Africa
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Enter pick-up address"
                            value={formData.pickupAddress}
                            onChange={(e) => updateField("pickupAddress", e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-background border rounded-lg text-sm"
                          />
                        </Autocomplete>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-2 uppercase">
                            Destination <span className="text-red-500">*</span>
                          </label>

                          <Autocomplete
                            onLoad={(auto) => (destinationRef.current = auto)}
                            onPlaceChanged={() => {
                              const place = destinationRef.current?.getPlace()
                              if (!place?.geometry) return

                              updateField("destinationAddress", place.formatted_address || "")
                              updateField("destinationLat", place.geometry.location?.lat())
                              updateField("destinationLng", place.geometry.location?.lng())
                            }}
                            options={{
                              componentRestrictions: { country: "za" },
                            }}
                          >
                            <input
                              type="text"
                              placeholder="Enter destination"
                              value={formData.destinationAddress}
                              onChange={(e) => updateField("destinationAddress", e.target.value)}
                              required
                              className="w-full px-4 py-3 bg-background border rounded-lg text-sm"
                            />
                          </Autocomplete>
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
    </LoadScript>

  )
}
