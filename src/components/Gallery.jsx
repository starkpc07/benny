"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

// IMPORT ALL ASSETS
import img1 from "../assets/gallery/elephant.png";
import img2 from "../assets/gallery/orchestra.png";
import img3 from "../assets/gallery/chendamelam.png";
import img4 from "../assets/gallery/bride.png";
import img5 from "../assets/gallery/band.png";
import img6 from "../assets/gallery/balloon.png";
import img7 from "../assets/gallery/90s.png";
import img8 from "../assets/gallery/360.png";
import img9 from "../assets/gallery/micky.png";

// ADD NAMES TO YOUR IMAGES HERE
const GALLERY_IMAGES = [
  { id: 1, asset: img1, name: "Welcome Tusker " },
  { id: 2, asset: img2, name: "Singing Orchestra" },
  { id: 3, asset: img3, name: "Chendamelam" },  
  { id: 4, asset: img4, name: "Swan Chariot" },
  { id: 5, asset: img5, name: "Live Band" },
  { id: 6, asset: img6, name: "Bouncing Castle" },
  { id: 7, asset: img7, name: "90s Candy Shop" },
  { id: 8, asset: img8, name: "360° Rotator" },
  { id: 9, asset: img9, name: "Clown Dance" },
];

function ScrollingRow({ images, direction = "left", speed = 1, size }) {
  const baseX = useMotionValue(0);
  const setWidth = images.length * (size.width + size.gap);

  const x = useTransform(baseX, (v) => {
    const wrappedX = ((v % setWidth) - setWidth) % setWidth;
    return `${wrappedX}px`;
  });

  useAnimationFrame((t, delta) => {
    let moveBy = direction === "left" ? -speed : speed;
    baseX.set(baseX.get() + moveBy * (delta / 10));
  });

  return (
    <div className="relative overflow-visible py-4">
      <motion.div
        style={{ x, willChange: "transform" }}
        className="flex flex-row items-start w-max"
      >
        {[...images, ...images, ...images, ...images].map((img, i) => {
          const imagePath = img.asset?.src || img.asset;
          
          return (
            <div
              key={`${img.id}-${i}`}
              className="flex flex-col items-center shrink-0"
              style={{ width: size.width, marginRight: size.gap }}
            >
              {/* IMAGE BOX */}
              <div
                className="w-full rounded-2xl border border-black/5 shadow-md overflow-hidden"
                style={{
                  height: size.width * 0.8,
                  backgroundImage: `url(${imagePath})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              {/* NAME LABEL BELOW */}
              <p className="mt-3 text-sm font-bold uppercase tracking-widest text-zinc-500">
                {img.name}
              </p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const [size, setSize] = useState({ width: 350, gap: 20 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSize({ width: 220, gap: 15 });
      } else {
        setSize({ width: 340, gap: 30 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1 = GALLERY_IMAGES.slice(0, 5);
  const row2 = GALLERY_IMAGES.slice(6, 9);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-red-600">
            <span className="h-px w-6 bg-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Memories</span>
            <span className="h-px w-6 bg-current" />
          </div>
          <h2 className="text-4xl font-black uppercase md:text-6xl tracking-tighter">
            <span className="text-red-700 italic">GALLERY</span>
          </h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 overflow-hidden flex flex-col gap-10">
        <ScrollingRow images={row1} direction="left" speed={0.8} size={size} />
        <ScrollingRow images={row2} direction="right" speed={0.8} size={size} />
      </div>
    </section>
  );
}