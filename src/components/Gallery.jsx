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

const GALLERY_IMAGES = [
  { id: 1, asset: img1 },
  { id: 2, asset: img2 },
  { id: 3, asset: img3 },
  { id: 4, asset: img4 },
  { id: 5, asset: img5 },
  { id: 6, asset: img6 },
  { id: 7, asset: img7 },
];

function ScrollingRow({ images, direction = "left", speed = 0.5, size }) {
  const baseX = useMotionValue(0);
  
  // Total width of ONE set of images + gaps
  const setWidth = images.length * (size.width + size.gap);

  // Math to handle the infinite wrap-around
  const x = useTransform(baseX, (v) => {
    const wrappedX = ((v % setWidth) - setWidth) % setWidth;
    return wrappedX;
  });

  useAnimationFrame((t, delta) => {
    const moveBy = speed * (delta / 16); // Normalized for 60fps
    if (direction === "left") {
      baseX.set(baseX.get() - moveBy);
    } else {
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <div className="relative overflow-visible py-4">
      <motion.div
        style={{ x }}
        // Removed all drag props and listeners
        className="flex flex-row items-center w-max"
      >
        {/* We use 4 sets to ensure the loop is seamless even on large monitors */}
        {[...images, ...images, ...images, ...images].map((img, i) => {
          const imagePath = img.asset?.src || img.asset;
          
          return (
            <div
              key={`${img.id}-${i}`}
              className="shrink-0 rounded-2xl border border-black/5 shadow-md"
              style={{
                width: size.width,
                height: size.width * 0.8,
                marginRight: size.gap,
                backgroundImage: `url(${imagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
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

  // Split images for variety in rows
  const row1 = GALLERY_IMAGES.slice(0, 3);
  const row2 = GALLERY_IMAGES.slice(4, 7);

  return (
    <section className="relative w-full py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
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

      <div className="max-w-5xl mx-auto px-4 overflow-hidden flex flex-col gap-4">
        {/* Adjusted speed to 1.5 for a nice "cinematic" crawl */}
        <ScrollingRow images={row1} direction="left" speed={1.5} size={size} />
        <ScrollingRow images={row2} direction="right" speed={1.5} size={size} />
      </div>
    </section>
  );
}