import { motion } from "framer-motion";
import { useState, memo, useMemo, useCallback } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

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
  { id: 5, title: "Spiral Potato", image: spiralImg },
  { id: 6, title: "Jigarthanda", image: jigarImg },
  { id: 7, title: "Fruit Salad", image: saladImg },
  { id: 8, title: "Sweet Beeda", image: beedaImg },
  { id: 9, title: "Sugar Cane", image: sugarImg },
  { id: 10, title: "Masala Poori", image: paaniImg },
  { id: 11, title: "Ice cream", image: iceImg },
];

const variants = {
  center: {
    x: "0%",
    scale: 1.05,
    zIndex: 10,
    opacity: 1,
    rotateY: 0,
    pointerEvents: "auto",
  },
  left: {
    x: "-55%",
    scale: 0.85,
    zIndex: 5,
    opacity: 0.85,
    rotateY: 25,
    pointerEvents: "none",
  },
  right: {
    x: "55%",
    scale: 0.85,
    zIndex: 5,
    opacity: 0.85,
    rotateY: -25,
    pointerEvents: "none",
  },
  hidden: { x: "0%", scale: 0.5, zIndex: 0, opacity: 0, pointerEvents: "none" },
};

const StallCard = memo(({ stall, variant }) => (
  <motion.div
    initial="hidden"
    animate={variant}
    variants={variants}
    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.8 }}
    className="absolute w-60 md:w-80 lg:w-96 h-95 md:h-137.5 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] bg-white p-2.5 md:p-3 will-change-transform transform-gpu"
  >
    <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
      <img
        src={stall.image}
        alt={stall.title}
        className="w-full h-full object-cover select-none"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-center">
        <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
          {stall.title}
        </h3>
      </div>
    </div>
  </motion.div>
));

const Stalls = () => {
  const [positionIndex, setPositionIndex] = useState(0);

  const handleNext = useCallback(
    () => setPositionIndex((prev) => (prev + 1) % stallsData.length),
    [],
  );
  const handlePrev = useCallback(
    () =>
      setPositionIndex(
        (prev) => (prev - 1 + stallsData.length) % stallsData.length,
      ),
    [],
  );

  const onDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) handleNext();
    else if (info.offset.x > threshold) handlePrev();
  };

  return (
    <section className="py-16 md:py-32 overflow-hidden selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 space-y-4 md:space-y-8 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className="h-px w-6 bg-red-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400">
                Premium Live Counters
              </span>
              <span className="h-px w-6 bg-red-600" />
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-slate-950 max-lg:whitespace-nowrap">
              Unique <br className="hidden lg:block" />
              <span className="text-red-700 italic"> Stalls</span>
            </h2>

            <div className="space-y-4 md:space-y-6 text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p>
                From{" "}
                <span className="text-slate-900 font-bold">
                  traditional savories
                </span>{" "}
                to
                <span className="text-slate-900 font-bold">
                  {" "}
                  refreshing desserts
                </span>
                , we bring the authentic taste of street festivals to your
                premium events.
              </p>
            </div>
          </motion.div>

          <div className="w-full lg:w-3/5 relative h-112.5 md:h-162.5 flex flex-col items-center justify-center">
            {/* DESKTOP ARROWS */}
            <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 z-30">
              <button
                onClick={handlePrev}
                className="size-14 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <RiArrowLeftSLine size={32} />
              </button>
            </div>

            <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 z-30">
              <button
                onClick={handleNext}
                className="size-14 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:translate-x-1 transition-all cursor-pointer"
              >
                <RiArrowRightSLine size={32} />
              </button>
            </div>

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full h-full flex items-center justify-center perspective-distant transform-gpu"
            >
              {stallsData.map((stall, index) => {
                const diff =
                  (index - positionIndex + stallsData.length) %
                  stallsData.length;
                let variant = "hidden";
                if (diff === 0) variant = "center";
                else if (diff === 1) variant = "right";
                else if (diff === stallsData.length - 1) variant = "left";

                return (
                  <StallCard key={stall.id} stall={stall} variant={variant} />
                );
              })}
            </motion.div>

            {/* MOBILE/TABLET NAVIGATION */}
            <div className="flex lg:hidden mt-10 items-center gap-10">
              <button
                onClick={handlePrev}
                className="size-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100 active:scale-95 transition-transform"
              >
                <RiArrowLeftSLine size={28} className="text-slate-900" />
              </button>
              <button
                onClick={handleNext}
                className="size-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100 active:scale-95 transition-transform"
              >
                <RiArrowRightSLine size={28} className="text-slate-900" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stalls;
