"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CustomHeroProps {
  title: string;
  subTitle: string;
}

export default function CarSection({ title, subTitle }: CustomHeroProps) {
  return (
    <section className="relative h-120  w-full flex items-center justify-center overflow-hidden pt-20">
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/heritage.png" 
          className="h-full w-full object-cover opacity-60 grayscale-[30%]"
        >
          <source src="/newvid.mp4" type="video/mp4" />
        </video>
        
        {/* Pro Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,6,0.4)_100%)] z-10" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Animated Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-secondary shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Premium Logistics
          </span>

          {/* Shimmering Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary bg-[length:200%_auto] animate-shimmer">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {subTitle}
          </p>
        </motion.div>
      </div>

      {/* Bottom Mask (Ensures a smooth transition to next section) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
