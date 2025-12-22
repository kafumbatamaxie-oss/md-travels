"use client"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import { Plane, Briefcase, MapPin, Heart, Compass, Truck } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Plane,
    titleKey: "services.airportTransfers",
    desc: "Reliable and comfortable transfers to and from Cape Town International Airport with flight monitoring.",
    features: ["Flight monitoring", "Meet and greet", "Fixed pricing", "24/7 availability"],
  },
  {
    icon: Briefcase,
    titleKey: "services.corporateTravel",
    desc: "Professional transportation for business meetings, conferences, and corporate events.",
    features: ["Executive travel", "Client transfers", "Corporate accounts", "Professional drivers"],
  },
  {
    icon: MapPin,
    titleKey: "services.cityTours",
    desc: "Explore Cape Town with our knowledgeable drivers. From Table Mountain to V&A Waterfront.",
    features: ["Best tours", "Peninsula tours", "Half & full day", "Custom itineraries"],
  },
  {
    icon: Heart,
    titleKey: "services.weddings",
    desc: "Specialized wedding transportation with attention to detail for your special day.",
    features: ["Wedding vehicles", "Professional drivers", "Event coordination", "Custom packages"],
  },
  {
    icon: Compass,
    titleKey: "services.tours",
    desc: "Adventure experiences including shark cage diving, skydiving, hiking, and safari tours.",
    features: ["Wine tours", "Adventure activities", "Game reserves", "Guided experiences"],
  },
  {
    icon: Truck,
    titleKey: "services.events",
    desc: "Complete event transportation solutions for conferences, parties, and gatherings.",
    features: ["Event shuttles", "Large groups", "Flexible scheduling", "Coordination support"],
  },
]

export default function Services() {
  const { t, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
    

      {/* Hero */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("services.title")}</h1>
          <p className="text-lg text-text-secondary">{t("services.subtitle")}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="p-8 glass rounded-xl border border-border hover:border-secondary transition group hover:shadow-lg"
              >
                <service.icon className="w-12 h-12 text-secondary mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold mb-3">{t(service.titleKey)}</h3>
                <p className="text-text-secondary mb-6">{service.desc}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/quote"
                  className="inline-block px-6 py-2 bg-secondary hover:opacity-90 text-primary rounded-lg font-semibold transition-all"
                >
                  Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">Why Choose MD Travels for Services?</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { title: "24/7 Availability", desc: "Round-the-clock service for your convenience" },
                { title: "Licensed & Insured", desc: "Fully licensed with comprehensive coverage" },
                { title: "Professional Team", desc: "Experienced and courteous drivers" },
                { title: "Flexible Booking", desc: "Easy scheduling and cancellation options" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-xl border border-border p-8 aspect-video flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&q=80"
                alt="Service showcase"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <FloatingElements />
    </main>
  )
}
