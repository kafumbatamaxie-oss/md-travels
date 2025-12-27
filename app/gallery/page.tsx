"use client"

import { FloatingElements } from "@/components/floating-elements"
import { useLanguage } from "@/hooks/use-language"
import CustomHero from "@/components/CustomHero"

const galleryImages = [
  {
    category: "Fleet",
    image: "/p1.jpg",
    title: "Luxury Fleet",
  },
  {
    category: "Views",
    image: "/p2.jpg",
    title: "Cape Town Views",
  },
  {
    category: "Fleet",
    image: "/p5.jpg",
    title: "Group Transport",
  },
  {
    category: "Views",
    image: "/p4.jpg",
    title: "Mountain Scenery",
  },
  {
    category: "Fleet",
    image: "/p5.jpg",
    title: "Premium Vehicles",
  },
  {
    category: "Views",
    image: "/hero-mobile-3.jpg",
    title: "Coastal Beauty",
  },
  {
    category: "Fleet",
    image: "/hero-mobile-2.jpg",
    title: "Professional Service",
  },
  {
    category: "Views",
    image: "/hero-mobile-1.jpg",
    title: "Urban Exploration",
  },
]

export default function Gallery() {
  const { t, mounted } = useLanguage()

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
  

      {/* Hero */}
      <CustomHero title="Our Gallery" subTitle="Explore our fleet, services, and beautiful destinations" />

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
