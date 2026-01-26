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

  const y = useTransform(smoothProgress, [0, 1], [60, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [0.6, 1]);
  const scale = useTransform(smoothProgress, [0, 0.5], [0.95, 1]);

  return (
    <div className="perspective-distant h-60 sm:h-80 md:h-112.5">
      <motion.div
        ref={cardRef}
        style={{
          y,
          opacity,
          scale,
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.7,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="relative h-full w-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="group relative h-full w-full overflow-hidden rounded-3xl bg-zinc-200 shadow-xl sm:rounded-4xl">
            {/* Image with improved visibility */}
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Lightened Overlays */}
            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/10" />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
              <div className="mb-1 text-xl text-red-500 drop-shadow-md sm:mb-2 sm:text-4xl">
                {service.icon}
              </div>
              <h3 className="text-lg font-black uppercase leading-[0.9] tracking-tighter text-white drop-shadow-lg sm:text-2xl md:text-3xl">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 z-20 h-full w-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-red-600/30 bg-zinc-950 p-6 text-center shadow-2xl sm:rounded-4xl">
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-600/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-red-600/20 text-2xl text-red-500 sm:size-14 sm:rounded-2xl sm:text-3xl">
                {service.icon}
              </div>
              <h3 className="mb-2 text-base font-black uppercase tracking-tighter text-white sm:text-xl md:text-2xl">
                {service.title}
              </h3>
              <p className="line-clamp-6 text-[11px] leading-relaxed text-zinc-300 sm:text-sm md:text-base">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Events = () => {
  const services = [
    {
      title: "Wedding Events",
      icon: <RiHeartsFill />,
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      description:
        "Expert planning for all wedding styles, from traditional South Indian ceremonies to grand destination weddings and modern receptions. We manage every ritual with cultural precision and elegance.",
    },
    {
      title: "Catering Services",
      icon: <RiRestaurantFill />,
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      description:
        "A culinary journey featuring authentic Veg and Non-Veg delicacies. From traditional leaf-service meals to global multi-cuisine buffets, we deliver tastes that stay on your guests' palates forever.",
    },
    {
      title: "Corporate Events",
      icon: <RiBuilding2Fill />,
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
      description:
        "Seamless execution of high-profile seminars, product launches, and annual meets. We provide the professional polish and sophisticated atmosphere your corporate brand deserves.",
    },
    {
      title: "Birthday Parties",
      icon: <RiCake3Fill />,
      image:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=800", // New Birthday Image
      description:
        "Bringing joy to creative themes, vibrant balloons, and custom cakes. From first birthdays to milestone celebrations, we turn simple moments into lasting family memories.",
    },
    {
      title: "Stage & Sound",
      icon: <RiMicFill />,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
      description:
        "State-of-the-art acoustics and dynamic lighting rigs. Our technical team ensures crystal-clear audio and concert-quality visual effects for performances and speeches alike.",
    },
    {
      title: "Corporate Events",
      icon: <RiBuilding2Fill />,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      description:
        "Seamless execution of high-profile seminars, product launches, and executive retreats. We integrate your brand identity into every detail, providing the sophisticated atmosphere required for professional excellence.",
    },
  ];

  return (
    <section
      id="events"
      className="relative overflow-hidden px-4 pt-24 pb-10 sm:px-6 md:pt-32 md:pb-16"
    >
      <div className="absolute top-0 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-red-100/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-6 bg-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                Services
              </span>
              <span className="h-px w-6 bg-red-600" />
            </div>
            <h2 className="text-3xl font-black uppercase leading-[1.1] tracking-tighter text-[#020617] sm:text-4xl md:text-5xl lg:text-6xl">
              Our <span className="text-red-700 italic">Specialties</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
