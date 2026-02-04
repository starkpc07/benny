"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, animate, useTransform } from "framer-motion";

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
  const isDragging = useRef(false);
  
  // Total width of ONE set of images
  const setWidth = images.length * (size.width + size.gap);

  const x = useTransform(baseX, (v) => {
    // Infinite loop math
    const wrappedX = ((v % setWidth) - setWidth) % setWidth;
    return wrappedX;
  });

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      const moveBy = speed * (delta / 16);
      if (direction === "left") {
        baseX.set(baseX.get() - moveBy);
      } else {
        baseX.set(baseX.get() + moveBy);
      }
    }
  });

  return (
    <div className="relative overflow-visible py-4 select-none" style={{ touchAction: "pan-y" }}>
      <motion.div
        drag="x"
        style={{ x }}
        onDragStart={() => (isDragging.current = true)}
        onDrag={(e, info) => {
          baseX.set(baseX.get() + info.delta.x);
        }}
        onDragEnd={(e, info) => {
          isDragging.current = false;
          animate(baseX, baseX.get() + info.velocity.x * 0.5, {
            type: "spring",
            stiffness: 30,
            damping: 25,
          });
        }}
        className="flex flex-row items-center cursor-grab active:cursor-grabbing w-max"
      >
        {/* Render 4 sets to ensure no gaps even on wide screens or fast drags */}
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
                pointerEvents: "none" 
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

  const row1 = GALLERY_IMAGES.slice(0, 3);
  const row2 = GALLERY_IMAGES.slice(4, 7);

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Header section */}
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

      {/* FIXED: Container set to max-w-5xl. 
          overflow-hidden here ensures images don't spill into the page margins.
      */}
      <div className="max-w-5xl mx-auto px-4 overflow-hidden flex flex-col gap-4">
        <ScrollingRow images={row1} direction="left" speed={1.2} size={size} />
        <ScrollingRow images={row2} direction="right" speed={1.2} size={size} />
      </div>
    </section>
  );
}