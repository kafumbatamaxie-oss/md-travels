import React from 'react'

interface TextComponentProps {
  title: string
  desc1: string
  desc2?: string
}
export default function TextComponent({title, desc1, desc2} : TextComponentProps) {
  return (
    
        <div className="max-w-3xl bg-transparent">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight uppercase  italic tracking-tight text-sky-50">
                {title}
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-sky-100 max-w-prose">
                {desc1}
            </p>

            {desc2 && <p className="mt-4 text-sm sm:text-base leading-relaxed text-sky-100 max-w-prose">
            {desc2}
            </p>}
        </div>
   

  )
}
