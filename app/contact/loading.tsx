"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
          className="p-6 rounded-full border border-border"
        >
          <Loader2 className="w-12 h-12 text-secondary" />
        </motion.div>

        <div className="text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground font-bold">
            MD Travels
          </p>
          <h2 className="text-2xl font-black tracking-tight mt-2">
            Preparing Concierge Support
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we connect you…
          </p>
        </div>
      </motion.div>
    </div>
  )
}
