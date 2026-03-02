"use client";

import Image from "next/image";
import { useState } from "react";

const fleet = [
  "/mini/fleet1.png",
  "/mini/fleet2.png",
  "/mini/fleet3.png",
  "/mini/fleet4.png",
 
];

export default function FleetSlider() {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative">
      <Image
        src={fleet[index]}
        alt="Fleet"
        width={600}
        height={400}
        className="rounded-xl"
      />

      <button
        onClick={() =>
          setIndex((index + 1) % fleet.length)
        }
        className="absolute right-2 top-1/2 bg-black text-white px-3 py-1"
      >
        →
      </button>
    </div>
  );
}