"use client";
import React, { useEffect, useState, useMemo, useRef, memo } from "react";
import { motion, useAnimationFrame, useMotionValue, animate } from "framer-motion";

// ASSETS
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
const ScrollingRow = memo(({ images, speed, size }) => {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const isAnimating = useRef(false);
  const controls = useRef(null); // Ref to store the current animation controls

  const duplicatedImages = useMemo(() => [...images, ...images, ...images], [images]);
  const singleSetWidth = images.length * (size.width + size.gap);

  const wrap = (v) => {
    const range = singleSetWidth;
    return ((((v % range) - range) % range));
  };

  useAnimationFrame((_, delta) => {
    // Disable auto-scroll completely during interaction to prevent "fighting" the user's finger
    if (isDragging || isAnimating.current) return;
    const moveBy = speed * (delta / 16); 
    x.set(wrap(x.get() + moveBy));
  });

  const handleDragStart = () => {
    // Stop any active momentum animation immediately on touch
    if (controls.current) controls.current.stop();
    setIsDragging(true);
    isAnimating.current = false;
  };

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    
    // Check if there is enough velocity for momentum
    if (Math.abs(info.velocity.x) > 20) {
      isAnimating.current = true;
      controls.current = animate(x, x.get() + info.velocity.x * 0.15, {
        type: "spring",
        stiffness: 60, // Higher stiffness for a more "connected" feel
        damping: 25,
        restDelta: 0.5,
        onUpdate: (latest) => x.set(wrap(latest)),
        onComplete: () => { isAnimating.current = false; }
      });
    }
  };

  return (
    <div 
      className="group overflow-hidden py-2 touch-pan-y" 
      style={{ overscrollBehaviorX: 'none' }} // Prevents mobile "back/forward" browser lag
    >
      <motion.div
        style={{ 
          x, 
          touchAction: "pan-y",
          willChange: "transform" // Optimizes GPU rendering
        }}
        drag="x"
        dragDirectionLock
        // Providing wide constraints prevents the "stuck" feeling on mobile
        dragConstraints={{ left: -singleSetWidth, right: singleSetWidth }}
        dragElastic={0.02}
        onDragStart={handleDragStart}
        onDrag={() => {
          // Manual wrap during drag ensures the slider never hits a "wall"
          const currentX = x.get();
          x.set(wrap(currentX));
        }}
        onDragEnd={handleDragEnd}
        className="flex flex-row items-start w-max cursor-grab active:cursor-grabbing"
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="flex flex-col items-center shrink-0 select-none px-2"
            style={{ width: size.width, marginRight: size.gap }}
          >
            <div
              className="w-full rounded-4xl md:rounded-[3rem] shadow-xl overflow-hidden bg-zinc-100 border border-zinc-200 transition-transform duration-500 group-hover:scale-[0.98]"
              style={{
                height: size.width * 0.75,
                backgroundImage: `url(${img.asset?.src || img.asset})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <p className="mt-4 text-[15px] md:text-lg font-black uppercase tracking-[0.4em] text-zinc-600">
              {img.name}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

/* ===================== MAIN GALLERY COMPONENT ===================== */
export default function Gallery() {
  const [size, setSize] = useState({ width: 400, gap: 24 });

  useEffect(() => {
    const handleResize = () => {
      const iw = window.innerWidth;
      if (iw < 768) {
        setSize({ width: 280, gap: 16 });
      } else if (iw < 1280) {
        setSize({ width: 360, gap: 24 }); 
      } else {
        setSize({ width: 440, gap: 32 }); 
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const row1 = useMemo(() => RAW_IMAGES.slice(0, 5), []);
  const row2 = useMemo(() => RAW_IMAGES.slice(6, 9), []);

  return (
    <section className="w-full py-16 md:py-32 flex flex-col items-center overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Header Container */}
      <div className="w-full max-w-7xl px-6 text-center mb-12 md:mb-20">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-red-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">
              Capturing Moments
            </span>
            <span className="h-px w-10 bg-red-600" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950">
            Event <span className="text-red-700 italic underline decoration-zinc-100 underline-offset-8">Gallery</span>
          </h2>
        </div>
      </div>

      <div className="relative w-full max-w-screen-2xl lg:px-12">
        <div className="flex flex-col gap-6 md:gap-14">
          <ScrollingRow images={row1} speed={-0.5} size={size} />
          <ScrollingRow images={row2} speed={0.5} size={size} />
        </div>
      </div>
    </section>
  );
}