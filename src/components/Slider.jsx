import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import cateringImg from "../assets/catering.webp"
import weddingImg from "../assets/wedding.webp"
import corporateImg from "../assets/Corporate.webp"
import birthdayImg from "../assets/birthday.webp"
import djImg from "../assets/dj.webp"
import stallImg from "../assets/stall.webp"

const Slider = () => {
  const heroSlides = [
    { title: "Catering Services", img: cateringImg },
    { title: "Wedding Events", img: weddingImg  },
    { title: "Corporate Events", img: corporateImg },
    { title: "Birthday & Private Parties", img: birthdayImg },
    { title: "Stage & Sound Setup", img: djImg },
    { title: "Stalls", img: stallImg },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { nextStep(); }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1 }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (direction) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0, scale: 0.9, zIndex: 0 }),
  };

  return (
    <div className="relative w-full max-w-5xl h-64 sm:h-80 md:h-100 lg:h-112.5 rounded-3xl md:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 shadow-2xl bg-black group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "tween", duration: 0.8, ease: [0.4, 0, 0.2, 1] },
            opacity: { duration: 0.4 },
            scale: { duration: 0.8 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50) nextStep();
            else if (offset.x > 50) prevStep();
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-4000 ease-out scale-105 group-hover:scale-100"
            style={{ backgroundImage: `url(${heroSlides[index].img})` }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-6">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white font-black text-lg sm:text-2xl md:text-4xl uppercase tracking-[0.2em] md:tracking-[0.4em] mb-4 text-center leading-tight"
            >
              {heroSlides[index].title}
            </motion.h2>
            
            <div className="flex gap-1.5 md:gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${i === index ? "w-6 md:w-10 bg-orange-500" : "w-1.5 md:w-2 bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevStep} className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500">
        <RiArrowLeftSLine size={32} />
      </button>
      <button onClick={nextStep} className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500">
        <RiArrowRightSLine size={32} />
      </button>
    </div>
  );
};

export default Slider;