"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "/staria/staria.png",
  "/staria/staria.png",
  "/staria/staria.png",
];

export default function StariaSlider() {
  const [i, setI] = useState(0);

  return (
    <div className="relative">
      <Image
        src={images[i]}
        alt="Hyundai Staria"
        width={600}
        height={400}
        className="rounded-xl"
      />

      <button
        onClick={() => setI((i + 1) % images.length)}
        className="absolute right-2 top-1/2 bg-black text-white px-3"
      >
        →
      </button>
    </div>
  );
}