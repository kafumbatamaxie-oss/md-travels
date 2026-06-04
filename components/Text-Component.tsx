import React from "react"

interface TextComponentProps {
  title: string
  desc1: string
  desc2?: string
}

export default function TextComponent({
  title,
  desc1,
  desc2,
}: TextComponentProps) {
  return (
    <div className="max-w-3xl">

      {/* Premium Eyebrow */}
      <div className="mb-5">
        <span
          className="
            text-secondary
            text-xs
            md:text-sm
            uppercase
            tracking-[0.35em]
            font-black
          "
        >
          MD TRAVELS
        </span>
      </div>

      {/* Heading */}
      <h2
        className="
          text-white
          text-4xl
          sm:text-5xl
          lg:text-6xl
          font-black
          tracking-tight
          leading-[0.95]
          max-w-4xl
        "
      >
        {title}
      </h2>

      {/* Divider */}
      <div
        className="
          mt-8
          h-[3px]
          w-24
          rounded-full
          bg-secondary
        "
      />

      {/* Description */}
      <p
        className="
          mt-8
          text-white/80
          text-lg
          md:text-xl
          leading-relaxed
          max-w-2xl
        "
      >
        {desc1}
      </p>

      {desc2 && (
        <p
          className="
            mt-6
            text-white/60
            text-base
            md:text-lg
            leading-relaxed
            max-w-2xl
          "
        >
          {desc2}
        </p>
      )}
    </div>
  )
}