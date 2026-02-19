"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Zap, MapPin, Users } from "lucide-react"

interface CarProps {
  id: number
  name: string
  category: string
  price: number
  image: string
  badge?: string
  type?: string
}

interface FeaturedCarsProps {
  title: string
  subtitle: string
  cars?: CarProps[]
}

export function FeaturedCarsSection({
  title = "THE PERFECT CAR FOR YOUR NEXT TRIP",
  subtitle = "In Cape Town, we've got you covered",
  cars,
}: FeaturedCarsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // Mock data - top 10 cars
  const defaultCars: CarProps[] = [
    {
      id: 4,
      name: "Honda H1 Minibus",
      category: "9 Seater",
      price: 2200,
      image: "/images/honda-9-seater.png",
    },
    {
      id: 123,
      name: "Toyota HiAce",
      category: "11 Seater",
      price: 2200,
      image: "/images/toyota-hicae-11-seater.png"
    },
    {
      id: 1,
      name: "Mercedes CLA200",
      category: "Luxury Benz",
      price: 2500,
      image: "images/mercedes-4seater.png",
      type: "Premium",
    },
    {
      id: 2,
      name: "Toyota Quantum",
      category: "14 Seater",
      price: 2300,
      image: "images/toyota-qunatum-14-seater.png",
      type: "Premium",
    },
     {
      id: 30,
      name: "Toyota Bus",
      category: "36 Seater",
      price: 2800,
      image: "images/toyota36seater.png",
      badge: "Popular",
    }
  ]

  const carsList = cars || defaultCars

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
            <span className="text-xs md:text-sm font-semibold text-secondary uppercase tracking-wider">
              Western Cape Transport Specialists
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 text-balance uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="max-w-7xl mx-auto">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-6 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            onMouseEnter={() => setIsScrolling(true)}
            onMouseLeave={() => setIsScrolling(false)}
          >
            {carsList.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex-shrink-0 w-full sm:w-96 md:w-[420px] snap-center"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="group relative h-96 md:h-[480px] bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-600 hover:border-secondary/50 transition-colors cursor-pointer"
                >
                  {/* Image Background */}
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                  {/* Badge */}
                  {car.badge && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 flex items-center gap-1 bg-secondary text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold"
                    >
                      <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      {car.badge}
                    </motion.div>
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end pointer-events-none">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-secondary transition-colors">
                      {car.name}
                    </h3>
                    {/* <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6">{car.category}</p> */}
                    <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                      <Users className="h-3.5 w-3.5" />
                      {car.category}
                    </span>
                    {/* <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">FROM</p>
                        <p className="text-2xl md:text-3xl font-bold text-white">
                          R{(car.price * 1.5).toLocaleString()}
                          <span className="text-xs md:text-sm text-gray-400"> / day</span>
                        </p>
                      </div>
                    </div> */}
                  </div>

                  {/* Hover Button */}
                  <motion.div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-auto">
                    <Link
                      href="/quote"
                      className="px-6 md:px-8 py-2.5 md:py-3 bg-secondary hover:bg-secondary/90 text-white rounded-lg font-bold text-sm md:text-base transition-all"
                    >
                      Book Now
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="flex justify-center mt-6 md:mt-8">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-gray-400 text-xs md:text-sm flex items-center gap-2"
            >
              <span>Scroll →</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
