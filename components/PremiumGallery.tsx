"use client"

import React from "react"
import { motion, Variants } from "framer-motion"
import { ExternalLink, Search } from "lucide-react"

// Assuming galleryImages is passed as a prop or imported
export default function PremiumGallery({ galleryImages }: { galleryImages: any[] }) {
  
  // Animation Variants for the Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Elements pop in one after another
      },
    },
  }

  // Animation Variants for Individual Item
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100 
    }
  },
};


  return (
    <section className="py-24 md:py-40 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-primary mb-6">
              OUR <span className="text-secondary italic">FLEET</span> & EXPERIENCE
            </h2>
            <p className="text-lg text-primary/50 font-medium">
              Explore our premium collection of vehicles and past journey highlights.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-slate-100 mx-12 mb-4" />
        </div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {galleryImages.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }} // Pro move: Subtle lift on hover
              className={`group relative overflow-hidden rounded-[2rem] bg-slate-100 cursor-pointer 
                ${idx % 5 === 0 ? "col-span-2 row-span-2 aspect-video lg:aspect-square" : "aspect-square"}
              `}
            >
              {/* Image with smooth scaling */}
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33, 1, 0.68, 1)] group-hover:scale-110"
              />

              {/* Sophisticated Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-4 md:p-6 rounded-[1.5rem] shadow-2xl">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-white text-lg md:text-xl font-bold leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="bg-white text-black p-2 rounded-full hidden sm:block">
                      <Search className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Accent (Optional Pro touch) */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
