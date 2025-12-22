"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Search, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/i18n"

const CAPE_TOWN_LOCATIONS = [
  "Cape Town International Airport",
  "V&A Waterfront",
  "Table Mountain Cableway",
  "Camps Bay",
  "Kirstenbosch Botanical Garden",
  "Robben Island Ferry (Gateway)",
  "Cape of Good Hope",
  "Boulders Beach",
  "Constantia Wine Route",
  "Sea Point Promenade",
]

export function SearchForm() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    pickup: "",
    destination: "",
    date: "",
    passengers: "1",
  })
  const [showError, setShowError] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.pickup || !formData.destination || !formData.date) {
      setShowError(true)
      return
    }

    setIsSearching(true)
    // Simulate loading/searching experience
    setTimeout(() => {
      router.push(
        `/search?pickup=${encodeURIComponent(formData.pickup)}&destination=${encodeURIComponent(formData.destination)}&date=${formData.date}`,
      )
    }, 800)
  }

  return (
    <div className="relative z-30 w-full">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-4 items-end border border-gray-100"
      >
        <div className="w-full md:flex-1 space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <MapPin className="w-3 h-3 text-secondary" /> {t.nav.fleet} - Pickup
          </label>
          <select
            className="w-full bg-gray-50 border-2 border-transparent focus:border-secondary/20 rounded-2xl p-4 text-sm transition-all outline-none appearance-none"
            value={formData.pickup}
            onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
          >
            <option value="">Select Location</option>
            {CAPE_TOWN_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:flex-1 space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <MapPin className="w-3 h-3 text-secondary" /> Destination
          </label>
          <select
            className="w-full bg-gray-50 border-2 border-transparent focus:border-secondary/20 rounded-2xl p-4 text-sm transition-all outline-none appearance-none"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          >
            <option value="">Select Destination</option>
            {CAPE_TOWN_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-48 space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <Calendar className="w-3 h-3 text-secondary" /> Date
          </label>
          <input
            type="date"
            className="w-full bg-gray-50 border-2 border-transparent focus:border-secondary/20 rounded-2xl p-4 text-sm transition-all outline-none"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isSearching}
          className="w-full md:w-auto bg-black text-white p-4 h-[56px] px-8 rounded-2xl hover:bg-secondary transition-all active:scale-95 flex items-center justify-center gap-3 font-bold group"
        >
          {isSearching ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5 group-hover:scale-110 transition" />
              <span className="md:hidden">Search</span>
            </>
          )}
        </button>
      </form>
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md animate-in fade-in zoom-in duration-300">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              Incomplete Information
            </DialogTitle>
            <DialogDescription className="pt-2">
              Please fill in all search fields (Pick-up, Destination, Date, and Passengers) to find the best luxury
              transport options for your trip.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <button
              onClick={() => setShowError(false)}
              className="bg-gray-100 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Got it
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
