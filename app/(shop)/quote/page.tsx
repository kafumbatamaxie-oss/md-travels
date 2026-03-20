"use client"

import type React from "react"
import { useEffect, useState, useRef, useMemo } from "react"
import { LoadScript, Autocomplete } from "@react-google-maps/api"
import { motion, AnimatePresence } from "framer-motion"
import { useServices } from "@/hooks/use-services"
import { QuoteClientSchema } from "@/lib/validators/quote-client"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import HideOnQuote from "@/components/HideOnQuote"
import Link from "next/link"
import { 
  ChevronRight, ChevronLeft, CheckCircle2, Loader2, 
  Calendar, MapPin, User, Car, Clock, Phone, Mail, Info, Home
} from "lucide-react"

type QuoteRequest = {
  firstName: string; lastName: string; email: string; phone: string;
  pickupAddress: string; destinationAddress: string;
  pickupDate: string; dropoffDate: string; pickupTime: string;
  passengers: string; hours?: string;
  serviceId: string; vehicleId: string;
  additionalRequirements?: string;
}

const LIBRARIES: ("places")[] = ["places"]

export default function Quote() {
  const { mounted } = useLanguage()
  const { services } = useServices()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(0)

  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null)
  const destinationRef = useRef<google.maps.places.Autocomplete | null>(null)

  const today = useMemo(() => new Date().toISOString().split("T")[0], [])

  const [formData, setFormData] = useState<QuoteRequest>({
    firstName: "", lastName: "", email: "", phone: "",
    pickupAddress: "", destinationAddress: "",
    pickupDate: today, dropoffDate: today, pickupTime: "09:00",
    passengers: "", hours: "", serviceId: "", vehicleId: "",
    additionalRequirements: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Stable Derived State
  const selectedService = useMemo(() => services.find((s) => s.id === formData.serviceId), [services, formData.serviceId])
  const vehicles = useMemo(() => selectedService?.vehicles || [], [selectedService])
  const selectedVehicle = useMemo(() => vehicles.find(v => v.id === formData.vehicleId), [vehicles, formData.vehicleId])
  const pricingModel = selectedService?.pricingModel

  const isDistanceBased = pricingModel === "SINGLE_TRIP" || pricingModel === "AIRPORT_TRANSFER"
  const isHourly = pricingModel === "HOURLY"

  useEffect(() => {
    setFormData(prev => ({ ...prev, vehicleId: "", pickupAddress: "", destinationAddress: "" }))
  }, [formData.serviceId])

  const updateField = (name: keyof QuoteRequest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isStepValid = () => {
    if (step === 1) return formData.serviceId && formData.vehicleId
    if (step === 2) return (!isDistanceBased || (formData.pickupAddress && formData.destinationAddress)) && formData.pickupDate
    if (step === 3) return formData.firstName && formData.email && formData.phone && formData.passengers
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== 4) return
    setLoading(true)
    
    const cleanedData = { ...formData, pricingModel, phone: formData.phone.trim() }
    const parsed = QuoteClientSchema.safeParse(cleanedData)
    
    if (!parsed.success) {
      alert("Please check your input.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      })
      if (res.ok) setSuccess(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={LIBRARIES}>
      <main className="relative min-h-[100dvh] flex items-center justify-center py-10 px-4 overflow-hidden">
        
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        </div>

        <HideOnQuote Component={FloatingElements} hidePath="/quote" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* PROGRESS */}
          <div className="h-1.5 w-full bg-slate-100">
            <motion.div className="h-full bg-black" animate={{ width: `${(step / 4) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>

          <div className="p-8 md:p-12">
            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Request Sent!</h2>
                <p className="text-slate-500 mt-4 mb-10 text-lg leading-relaxed px-4 text-center">Your request has been received. <br/>Check your email for a response shortly.</p>
                <Link href="/" className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                  <Home className="w-5 h-5" /> Back to Home
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-[460px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction < 0 ? 40 : -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-1"
                  >
                    {/* STEP 1: SERVICE & VEHICLE */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <header><h1 className="text-3xl font-extrabold text-slate-900">Start Your Journey</h1></header>
                        <div className="space-y-4">
                          <select required value={formData.serviceId} onChange={e => updateField("serviceId", e.target.value)} className="w-full px-6 py-5 bg-slate-50 rounded-2xl font-semibold border-none outline-none appearance-none cursor-pointer">
                            <option value="">Select Service Type</option>
                            {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                          
                          <select required disabled={!selectedService} value={formData.vehicleId} onChange={e => updateField("vehicleId", e.target.value)} className="w-full px-6 py-5 bg-slate-50 rounded-2xl font-semibold border-none outline-none appearance-none cursor-pointer disabled:opacity-40">
                            <option value="">Choose Your Vehicle</option>
                            {vehicles.map(v => <option key={v.id} value={v.id}>{v.name} ({v.capacity} pax)</option>)}
                          </select>

                          {selectedVehicle && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                              <div className="w-32 h-20 bg-white rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-1">
                                <img 
                                  src={selectedVehicle.images?.[0] || "https://placehold.co"} 
                                  alt={selectedVehicle.name} 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 text-lg leading-tight">{selectedVehicle.name}</p>
                                <p className="text-xs text-slate-500 font-medium mt-1">Comfortable for up to {selectedVehicle.capacity} passengers</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: TRIP */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <header><h1 className="text-3xl font-extrabold text-slate-900">Route & Date</h1></header>
                        <div className="space-y-4">
                          {isDistanceBased && (
                            <>
                              <Autocomplete onLoad={a => (pickupRef.current = a)} onPlaceChanged={() => updateField("pickupAddress", pickupRef.current?.getPlace()?.formatted_address || "")}>
                                <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input defaultValue={formData.pickupAddress} placeholder="Pickup Location" className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl font-semibold border-none outline-none" /></div>
                              </Autocomplete>
                              <Autocomplete onLoad={a => (destinationRef.current = a)} onPlaceChanged={() => updateField("destinationAddress", destinationRef.current?.getPlace()?.formatted_address || "")}>
                                <div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input defaultValue={formData.destinationAddress} placeholder="Destination" className="w-full pl-12 pr-6 py-5 bg-slate-50 rounded-2xl font-semibold border-none outline-none" /></div>
                              </Autocomplete>
                            </>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            <input type="date" value={formData.pickupDate} onChange={e => updateField("pickupDate", e.target.value)} className="px-6 py-5 bg-slate-50 rounded-2xl font-semibold border-none outline-none text-sm" />
                            <input type="time" value={formData.pickupTime} onChange={e => updateField("pickupTime", e.target.value)} className="px-6 py-5 bg-slate-50 rounded-2xl font-semibold border-none outline-none text-sm" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: CONTACT */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <header><h1 className="text-3xl font-extrabold text-slate-900">Personal Info</h1></header>
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="First Name" value={formData.firstName} onChange={e => updateField("firstName", e.target.value)} className="px-6 py-4 bg-slate-50 rounded-2xl font-semibold border-none outline-none" />
                          <input placeholder="Last Name" value={formData.lastName} onChange={e => updateField("lastName", e.target.value)} className="px-6 py-4 bg-slate-50 rounded-2xl font-semibold border-none outline-none" />
                        </div>
                        <input type="email" placeholder="Email Address" value={formData.email} onChange={e => updateField("email", e.target.value)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-semibold border-none outline-none" />
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="Phone Number" value={formData.phone} onChange={e => updateField("phone", e.target.value)} className="px-6 py-4 bg-slate-50 rounded-2xl font-semibold border-none outline-none" />
                          <input type="number" placeholder="Pax" value={formData.passengers} onChange={e => updateField("passengers", e.target.value)} className="px-6 py-4 bg-slate-50 rounded-2xl font-semibold border-none outline-none" />
                        </div>
                        <textarea placeholder="Special Requirements (e.g. luggage, baby seats)" value={formData.additionalRequirements} onChange={e => updateField("additionalRequirements", e.target.value)} className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-semibold border-none outline-none h-24 resize-none" />
                      </div>
                    )}

                    {/* STEP 4: REVIEW */}
                    {step === 4 && (
                      <div className="space-y-8">
                        <header><h1 className="text-3xl font-extrabold text-slate-900">Final Summary</h1></header>
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
                           <div className="pb-4 border-b border-white/10">
                              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-1">Service & Vehicle</p>
                              <p className="text-xl font-bold">{selectedService?.name}</p>
                              <p className="text-white/60 text-sm italic">{selectedVehicle?.name}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-6 text-sm">
                              <div><p className="text-white/40 font-bold mb-1 uppercase text-[10px]">Pickup</p><p className="font-semibold">{formData.pickupDate} @ {formData.pickupTime}</p></div>
                              <div><p className="text-white/40 font-bold mb-1 uppercase text-[10px]">Group</p><p className="font-semibold">{formData.passengers} Passengers</p></div>
                           </div>
                           <div className="pt-4 border-t border-white/10 flex gap-3 items-center">
                              <Info className="w-5 h-5 text-white/30 shrink-0" />
                              <p className="text-[11px] text-white/50 leading-relaxed font-medium">Please review carefully. No payment will be taken at this stage.</p>
                           </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* NAV */}
                <div className="flex items-center justify-between pt-10 mt-auto">
                  {step > 1 ? (
                    <button type="button" onClick={() => { setDirection(-1); setStep(s => s - 1); }} className="px-6 py-4 text-slate-400 font-bold hover:text-black transition-all">
                      <ChevronLeft className="w-6 h-6" /> Back
                    </button>
                  ) : <div />}

                  <button
                    type={step === 4 ? "submit" : "button"}
                    disabled={loading || !isStepValid()}
                    onClick={() => { if (step < 4) { setDirection(1); setStep(s => s + 1); }}}
                    className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-bold shadow-xl hover:bg-zinc-800 transition-all disabled:opacity-20"
                  >
                    {step === 4 ? (loading ? <Loader2 className="animate-spin" /> : "Submit Request") : "Continue"}
                    {step < 4 && <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </main>
    </LoadScript>
  )
}
