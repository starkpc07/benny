import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiExpandLeftRightLine,
} from "react-icons/ri";
import popImg from "../assets/stalls/pop.webp";
import PappadImg from "../assets/stalls/pappad.webp";
import jigarImg from "../assets/stalls/jigar.webp";
import candyImg from "../assets/stalls/candy.webp";
import cauliImg from "../assets/stalls/cauli.webp";
import spiralImg from "../assets/stalls/spiral.webp";
import saladImg from "../assets/stalls/salad.webp";
import beedaImg from "../assets/stalls/beeda.webp";
import iceImg from "../assets/stalls/ice.webp";
import paaniImg from "../assets/stalls/paani.webp";
import sugarImg from "../assets/stalls/sugar.webp";

const stallsData = [
  { id: 1, title: "Popcorn", image: popImg },
  { id: 2, title: "Delhi Pappad", image: PappadImg },
  { id: 3, title: "Cotton Candy", image: candyImg },
  { id: 4, title: "Cauliflower 65", image: cauliImg },
  { id: 5, title: "Spiral Potato & French Fries", image: spiralImg },
  { id: 6, title: "Jigarthanda", image: jigarImg },
  { id: 7, title: "Fruit Salad", image: saladImg },
  { id: 8, title: "Sweet Beeda", image: beedaImg },
  { id: 9, title: "Sugar Cane Juice", image: sugarImg },
  { id: 10, title: "Paani & Masala Poori", image: paaniImg },
  { id: 11, title: "Ice cream", image: iceImg },
];

const Stalls = () => {
  const [positionIndex, setPositionIndex] = useState(0);

  const handleNext = () =>
    setPositionIndex((prev) => (prev + 1) % stallsData.length);
  const handlePrev = () =>
    setPositionIndex(
      (prev) => (prev - 1 + stallsData.length) % stallsData.length,
    );

  const onDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) handleNext();
    else if (info.offset.x > threshold) handlePrev();
  };

  const getCardVariant = (index) => {
    const diff =
      (index - positionIndex + stallsData.length) % stallsData.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === stallsData.length - 1) return "left";
    return "hidden";
  };

  const variants = {
    center: { x: "0%", scale: 1.1, zIndex: 10, opacity: 1, rotateY: 0, z: 0 },
    left: {
      x: "-75%",
      scale: 0.8,
      zIndex: 5,
      opacity: 0.8,
      rotateY: 45,
      z: -200,
    },
    right: {
      x: "75%",
      scale: 0.8,
      zIndex: 5,
      opacity: 0.8,
      rotateY: -45,
      z: -200,
    },
    hidden: { x: "0%", scale: 0.5, zIndex: 0, opacity: 0, rotateY: 0, z: -400 },
  };

  return (
    <section className="py-16 md:py-24 overflow-hidden selection:bg-red-600 selection:text-white">
      {/* HEADER SECTION - ANIMATES EVERY TIME YOU SCROLL UP OR DOWN */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          // once: false (default) makes it repeat every time it enters view
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // Custom "Expo" ease for a more premium feel
          }}
          className="flex flex-col items-center gap-2"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-red-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
              Specialized
            </span>
            <span className="h-px w-6 bg-red-600" />
          </div>
          <h2 className="text-6xl font-black uppercase leading-[1.1] tracking-tighter text-[#020617] ">
            <span className="text-red-700 italic">Stalls</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative max-w-250 mx-auto flex items-center justify-center px-4 md:px-12">
        {/* DESKTOP LEFT ARROW */}
        <div className="hidden md:block absolute left-4 lg:left-10 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="size-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 flex items-center justify-center shadow-xl hover:bg-black hover:text-white transition-all"
          >
            <RiArrowLeftSLine size={32} />
          </motion.button>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div className="relative h-130 md:h-137.5 w-full flex flex-col items-center justify-center touch-pan-y">
          <motion.div
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ willChange: "transform", transformStyle: "preserve-3d" }}
            className="relative w-full h-105 md:h-120 flex items-center justify-center perspective-[1500px] cursor-grab active:cursor-grabbing"
          >
            {stallsData.map((stall, index) => (
              <motion.div
                key={stall.id}
                initial="hidden"
                animate={getCardVariant(index)}
                variants={variants}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className="absolute w-67.5 md:w-90 h-full rounded-[3rem] overflow-hidden shadow-2xl bg-white pointer-events-none border border-white/20 p-2.5 md:p-3"
              >
                <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
                  <img
                    src={stall.image}
                    alt={stall.title}
                    className="w-full h-full object-cover select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-center">
                    <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                      {stall.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* MOBILE CONTROLS */}
          <div className="flex md:hidden gap-8 mt-16 pb-4">
            <button
              onClick={handlePrev}
              className="size-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <RiArrowLeftSLine size={28} className="text-zinc-800" />
            </button>
            <button
              onClick={handleNext}
              className="size-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <RiArrowRightSLine size={28} className="text-zinc-800" />
            </button>
          </div>
        </div>

        {/* DESKTOP RIGHT ARROW */}
        <div className="hidden md:block absolute right-4 lg:right-10 z-30">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="size-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 flex items-center justify-center shadow-xl hover:bg-black hover:text-white transition-all"
          >
            <RiArrowRightSLine size={32} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Stalls;
