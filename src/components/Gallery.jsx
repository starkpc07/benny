"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, animate } from "framer-motion";

import img1 from "../assets/gallery/elephant.png";
import img2 from "../assets/gallery/orchestra.png";
import img3 from "../assets/gallery/chendamelam.png";
import img4 from "../assets/gallery/bride.png";
import img5 from "../assets/gallery/band.png";
import img6 from "../assets/gallery/balloon.png";
import img7 from "../assets/gallery/90s.png";
import img8 from "../assets/gallery/360.png";
import img9 from "../assets/gallery/micky.png";

const RAW_IMAGES = [
  { id: 1, asset: img1, name: "Welcome Tusker" },
  { id: 2, asset: img2, name: "Singing Orchestra" },
  { id: 3, asset: img3, name: "Chendamelam" },
  { id: 4, asset: img4, name: "Swan Chariot" },
  { id: 5, asset: img5, name: "Live Band" },
  { id: 6, asset: img6, name: "Bouncing Castle" },
  { id: 7, asset: img7, name: "90s Candy Shop" },
  { id: 8, asset: img8, name: "360° Rotator" },
  { id: 9, asset: img9, name: "Clown Dance" },
];

/* ===================== SCROLLING ROW COMPONENT ===================== */
const ScrollingRow = ({ images, speed, size }) => {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  const duplicatedImages = [...images, ...images];
  const singleSetWidth = images.length * (size.width + size.gap);

  const wrap = (v) => {
    return ((((v % singleSetWidth) - singleSetWidth) % singleSetWidth));
  };

  // 1. Auto-scrolling logic
  useAnimationFrame(() => {
    if (isDragging) return;
    const currentX = x.get();
    x.set(wrap(currentX + speed));
  });

  // 2. Drag & Flick logic
  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    animate(x, x.get() + info.velocity.x * 0.2, {
      type: "spring",
      stiffness: 40,
      damping: 20,
      onUpdate: (latest) => x.set(wrap(latest)),
    });
  };

  return (
    <div className="group cursor-grab active:cursor-grabbing overflow-hidden">
      <motion.div
        style={{ x }}
        drag="x"
        // Constraints set to Infinity to allow endless dragging
        dragConstraints={{ left: -Infinity, right: Infinity }}
        onDragStart={() => setIsDragging(true)}
        onDrag={() => {
          // Wrap instantly while dragging so user never hits a "wall"
          x.set(wrap(x.get()));
        }}
        onDragEnd={handleDragEnd}
        className="flex flex-row items-start w-max"
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="flex flex-col items-center shrink-0 select-none"
            style={{ width: size.width, marginRight: size.gap }}
          >
            <div
              className="w-full rounded-3xl shadow-lg overflow-hidden bg-zinc-100 pointer-events-none border border-zinc-200"
              style={{
                height: size.width * 0.7,
                backgroundImage: `url(${img.asset?.src || img.asset})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="mt-4 text-[15px] md:text-lg font-black uppercase tracking-[0.2em] text-zinc-800">
              {img.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ===================== MAIN GALLERY COMPONENT ===================== */
export default function Gallery() {
  const [size, setSize] = useState({ width: 400, gap: 24 });

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth < 768 
        ? { width: 260, gap: 16 } 
        : { width: 400, gap: 32 }
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1 = RAW_IMAGES.slice(0, 5);
  const row2 = RAW_IMAGES.slice(6, 9);

  return (
    <section className="mx-auto max-w-5xl overflow-hidden py-16 flex flex-col gap-12">
      {/* HEADER */}
      <div className="px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-red-600">
            <span className="h-px w-6 bg-zinc-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Memories</span>
            <span className="h-px w-6 bg-zinc-300" />
          </div>
          <h2 className="text-5xl font-black uppercase md:text-7xl tracking-tighter">
            <span className="text-red-700 italic">GALLERY</span>
          </h2>
        </div>
      </div>

      {/* ROWS */}
      <div className="flex flex-col gap-8 md:gap-16">
        <ScrollingRow images={row1} speed={-0.6} size={size} />
        <ScrollingRow images={row2} speed={0.7} size={size} />
      </div>
    </section>
  );
}