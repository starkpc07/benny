import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  RiHeartsFill,
  RiBuilding2Fill,
  RiCake3Fill,
  RiMicFill,
  RiRestaurantFill,
  RiMagicFill,
} from "react-icons/ri";

const ServiceCard = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "end 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [40, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 0.4], [0.95, 1]);

  return (
    <div className="perspective-distant h-40 sm:h-48 md:h-56 will-change-[transform,opacity]">
      <motion.div
        ref={cardRef}
        style={{
          y,
          opacity,
          scale,
          transformStyle: "preserve-3d",
        }}
        initial={false} // Prevents initial animation on mount
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        className="relative h-full w-full cursor-pointer transform-gpu"
        onClick={(e) => {
          e.stopPropagation();
          setIsFlipped(!isFlipped);
        }}
      >
        {/* FRONT SIDE (IMAGE) - Higher Z-index when not flipped */}
        <div
          className={`absolute inset-0 ${isFlipped ? 'z-0' : 'z-20'}`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)", // Force front to stay flat
          }}
        >
          <div className="group relative h-full w-full overflow-hidden rounded-3xl shadow-xl sm:rounded-4xl bg-zinc-800">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
              <div className="mb-1 text-xl text-red-500 drop-shadow-md sm:mb-2 sm:text-3xl">
                {service.icon}
              </div>
              <h3 className="text-base font-black uppercase leading-[0.9] tracking-tighter text-white drop-shadow-lg sm:text-xl md:text-2xl">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK SIDE (DETAILS) - Only visible when parent is rotated */}
        <div
          className={`absolute inset-0 ${isFlipped ? 'z-20' : 'z-0'}`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)", // Mirrors the back initially so it flips correctly
          }}
        >
          <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-red-600/30 bg-zinc-950 p-4 sm:p-6 text-center shadow-2xl sm:rounded-4xl transform-gpu">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-red-600/10 blur-2xl pointer-events-none" />
            
            <div className="relative z-10 w-full">
              <h3 className="mb-2 text-sm font-black uppercase tracking-tighter text-white sm:text-lg md:text-xl">
                {service.title}
              </h3>
              <p className="line-clamp-3 text-[10px] leading-tight text-zinc-300 sm:text-xs md:text-sm">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// The Events component remains the same as before...
const Events = () => {
  const services = [
    { title: "Wedding Events", icon: <RiHeartsFill />, image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", description: "Expert planning for all wedding styles, from traditional South Indian ceremonies to grand destination weddings." },
    { title: "Catering Services", icon: <RiRestaurantFill />, image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800", description: "A culinary journey featuring authentic delicacies. From traditional leaf-service meals to global multi-cuisine buffets." },
    { title: "Corporate Events", icon: <RiBuilding2Fill />, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800", description: "Seamless execution of high-profile seminars and annual meets. Professional polish for your brand." },
    { title: "Birthday Parties", icon: <RiCake3Fill />, image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=800", description: "Creative themes, vibrant balloons, and custom cakes to turn simple moments into lasting family memories." },
    { title: "Stage & Sound", icon: <RiMicFill />, image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", description: "State-of-the-art acoustics and dynamic lighting rigs ensuring crystal-clear audio and concert-quality visual effects." },
    { title: "Premium Branding", icon: <RiMagicFill />, image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", description: "We integrate your brand identity into every detail, providing the sophisticated atmosphere required for excellence." },
  ];

  return (
    <section id="events" className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 md:pt-32 md:pb-16">
      <div className="absolute top-0 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-red-100/20 blur-[100px] pointer-events-none transform-gpu" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-6 bg-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Services</span>
              <span className="h-px w-6 bg-red-600" />
            </div>
            <h2 className="text-3xl font-black uppercase leading-[1.1] tracking-tighter text-[#020617] sm:text-4xl md:text-5xl">
              Our <span className="text-red-700 italic">Specialties</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;