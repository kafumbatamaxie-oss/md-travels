"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export function QuoteLoadingModal({ open }: { open: boolean }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="bg-card rounded-2xl p-10 shadow-2xl text-center max-w-sm w-full"
      >
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-secondary mb-4" />
        <h3 className="text-xl font-bold mb-2">Sending your quote</h3>
        <p className="text-muted-foreground text-sm">
          Please wait while we submit your request…
        </p>
      </motion.div>
    </div>
  )
}
