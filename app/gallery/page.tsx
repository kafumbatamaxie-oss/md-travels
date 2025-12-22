"use client"

import { Navbar } from "@/components/navbar"
import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"

const galleryImages = [
  {
    category: "Fleet",
    image: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&q=80",
    title: "Luxury Fleet",
  },
  {
    category: "Views",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
    title: "Cape Town Views",
  },
  {
    category: "Fleet",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=80",
    title: "Group Transport",
  },
  {
    category: "Views",
    image: "https://images.unsplash.com/photo-1507672492031-44a72e44d995?w=600&q=80",
    title: "Mountain Scenery",
  },
  {
    category: "Fleet",
    image: "https://images.unsplash.com/photo-1533473359331-35b8a4c58712?w=600&q=80",
    title: "Premium Vehicles",
  },
  {
    category: "Views",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    title: "Coastal Beauty",
  },
  {
    category: "Fleet",
    image: "https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=600&q=80",
    title: "Professional Service",
  },
  {
    category: "Views",
    image: "https://images.unsplash.com/photo-1500595046891-9049f5edfaf5?w=600&q=80",
    title: "Urban Exploration",
  },
]

export default function Gallery() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Our Gallery</h1>
          <p className="text-lg text-text-secondary">Explore our fleet, services, and beautiful destinations</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer hover:shadow-lg transition-all"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-secondary text-sm">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingElements />
    </main>
  )
}
