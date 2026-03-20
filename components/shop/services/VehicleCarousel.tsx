"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import VehicleCard from "@/components/shop/services/VehicleCard"

type Vehicle = {
id: string
name: string
type: string
capacity: number
images?: { url: string }[]
}

export default function VehicleCarousel({ vehicles }: { vehicles: Vehicle[] }) {
const [emblaRef, emblaApi] = useEmblaCarousel({
align: "start",
dragFree: true,
})

const scrollPrev = useCallback(() => {
emblaApi && emblaApi.scrollPrev()
}, [emblaApi])

const scrollNext = useCallback(() => {
emblaApi && emblaApi.scrollNext()
}, [emblaApi])

return ( <div className="relative">


        <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">

            {vehicles.map((vehicle) => (
                <motion.div
                key={vehicle.id}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                >
                <VehicleCard vehicle={vehicle} />
                </motion.div>
            ))}

            </div>
        </div>

        {/* Navigation buttons (desktop only) */}
        <div className="hidden md:flex absolute -top-12 right-0 gap-2">
            <button
            onClick={scrollPrev}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
            <ChevronLeft size={20} />
            </button>

            <button
            onClick={scrollNext}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
            <ChevronRight size={20} />
            </button>
        </div>

        </div>

    )
}