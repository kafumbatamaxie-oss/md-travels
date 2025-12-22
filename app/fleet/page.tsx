"use client"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { Users, Zap, Shield } from "lucide-react"

const vehicles = [
  {
    name: "Mercedes-Benz C-Class",
    passengers: "5",
    type: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&q=80",
    features: ["Air Conditioning", "Premium Interior", "WiFi", "Phone Charger"],
  },
  {
    name: "Toyota Quantum",
    passengers: "14",
    type: "Group Transport",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80",
    features: ["Spacious Interior", "Air Conditioning", "USB Ports", "Entertainment"],
  },
  {
    name: "Hyundai Staria",
    passengers: "9",
    type: "Mid-Size Van",
    image: "https://images.unsplash.com/photo-1533473359331-35b8a4c58712?w=600&q=80",
    features: ["Comfortable Seating", "Climate Control", "Modern Tech", "Luggage Space"],
  },
]

export default function Fleet() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("fleet.title")}</h1>
          <p className="text-lg text-text-secondary">{t("fleet.subtitle")}</p>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, idx) => (
              <div
                key={idx}
                className="glass rounded-xl border border-border overflow-hidden hover:border-secondary transition group"
              >
                <div className="aspect-video overflow-hidden bg-surface">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <p className="text-secondary text-sm mb-4">{vehicle.type}</p>

                  <div className="flex items-center gap-2 mb-4 text-text-secondary">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{vehicle.passengers} Passengers</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {vehicle.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1 h-1 bg-secondary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/quote"
                    className="block text-center px-6 py-2 bg-secondary hover:opacity-90 text-primary rounded-lg font-semibold transition-all"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Features */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">What Makes Our Fleet Special?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Regular Maintenance",
                desc: "All vehicles undergo rigorous safety checks and maintenance",
              },
              {
                icon: Zap,
                title: "Modern Technology",
                desc: "Latest vehicles equipped with modern amenities and tech",
              },
              {
                icon: Users,
                title: "Professional Drivers",
                desc: "Courteous, experienced drivers trained for excellence",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <item.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingElements />
    </main>
  )
}
