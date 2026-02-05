"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, animate } from "framer-motion";

// ASSETS - Keep your existing imports
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
  const isAnimating = useRef(false);

  // Triple duplication ensures enough buffer for high-speed flicks
  const duplicatedImages = useMemo(() => [...images, ...images, ...images], [images]);
  const singleSetWidth = images.length * (size.width + size.gap);

  const wrap = (v) => {
    const range = singleSetWidth;
    return ((((v % range) - range) % range));
  };

  useAnimationFrame((time, delta) => {
    // Only move automatically if NOT being touched or flicked
    if (isDragging || isAnimating.current) return;
    
    const moveBy = speed * (delta / 16); 
    x.set(wrap(x.get() + moveBy));
  });

  const handleDragStart = () => {
    setIsDragging(true);
    isAnimating.current = false;
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    // Smooth momentum hand-off
    if (Math.abs(info.velocity.x) > 10) {
      isAnimating.current = true;
      
      animate(x, x.get() + info.velocity.x * 0.2, {
        type: "spring",
        stiffness: 40,
        damping: 20,
        restDelta: 0.1,
        onUpdate: (latest) => x.set(wrap(latest)),
        onComplete: () => {
          isAnimating.current = false;
        }
      });
    }
  };

  return (
    <div className="group overflow-hidden will-change-transform">
      <motion.div
        style={{ 
          x, 
          touchAction: "pan-y" // CRITICAL: Allows vertical page scroll on mobile
        }}
        drag="x"
        dragDirectionLock // Prevents diagonal "stuck" feeling
        dragConstraints={{ left: -Infinity, right: Infinity }}
        onDragStart={handleDragStart}
        onDrag={() => x.set(wrap(x.get()))}
        onDragEnd={handleDragEnd}
        className="flex flex-row items-start w-max cursor-grab active:cursor-grabbing"
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="flex flex-col items-center shrink-0 select-none px-2 md:px-0"
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
            <p className="mt-4 text-[14px] md:text-lg font-black uppercase tracking-[0.2em] text-zinc-800">
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
        ? { width: 280, gap: 16 } 
        : { width: 420, gap: 32 }
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1 = useMemo(() => RAW_IMAGES.slice(0, 5), []);
  const row2 = useMemo(() => RAW_IMAGES.slice(5, 9), []);

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden py-16 flex flex-col gap-12">
      {/* HEADER */}
      <div className="px-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-red-600">
            <span className="h-px w-6 bg-zinc-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Memories</span>
            <span className="h-px w-6 bg-zinc-300" />
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter md:mb-12">
            <span className="text-red-700 italic">GALLERY</span>
          </h2>
        </div>
      </div>

      {/* GALLERY ROWS */}
      <div className="flex flex-col gap-8 md:gap-16">
        <ScrollingRow images={row1} speed={-0.8} size={size} />
        <ScrollingRow images={row2} speed={0.8} size={size} />
      </div>
    </section>
  );
}