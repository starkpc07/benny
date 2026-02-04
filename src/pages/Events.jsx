import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiHeartsFill,
  RiBuilding2Fill,
  RiCake3Fill,
  RiMicFill,
  RiRestaurantFill,
  RiMagicFill,
} from "react-icons/ri";

/* ===================== CARD ===================== */

const ServiceCard = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative perspective-distant h-40 sm:h-48 md:h-56 will-change-[transform,opacity]"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative h-full w-full cursor-pointer transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 ${isFlipped ? "z-0" : "z-20"}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
              <div className="mb-1 text-xl text-red-500 sm:text-3xl">
                {service.icon}
              </div>
              <h3 className="text-base font-black uppercase tracking-tighter text-white sm:text-xl md:text-2xl">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 ${isFlipped ? "z-20" : "z-0"}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-red-600/30 bg-zinc-950 p-4 text-center shadow-2xl">
            <h3 className="mb-2 text-sm font-black uppercase text-white sm:text-lg">
              {service.title}
            </h3>
            <p className="text-[10px] text-zinc-300 sm:text-xs md:text-sm line-clamp-3">
              {service.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ===================== EVENTS ===================== */

const Events = () => {
  const services = [
    {
      title: "Wedding Events",
      icon: <RiHeartsFill />,
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
      description:
        "Expert planning for all wedding styles, from traditional South Indian ceremonies to grand destination weddings.",
    },
    {
      title: "Catering Services",
      icon: <RiRestaurantFill />,
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      description:
        "Authentic delicacies ranging from traditional leaf meals to global multi-cuisine buffets.",
    },
    {
      title: "Corporate Events",
      icon: <RiBuilding2Fill />,
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800",
      description:
        "Professional execution of conferences, seminars, and annual corporate meets.",
    },
    {
      title: "Birthday Parties",
      icon: <RiCake3Fill />,
      image:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=800",
      description:
        "Creative themes, vibrant decorations, and custom cakes for joyful celebrations.",
    },
    {
      title: "Stage & Sound",
      icon: <RiMicFill />,
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
      description:
        "High-quality sound systems and dynamic lighting for stunning stage presence.",
    },
    {
      title: "Premium Branding",
      icon: <RiMagicFill />,
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
      description:
        "Elegant brand integration that elevates corporate and luxury events.",
    },
  ];

  return (
    <section
      id="events"
      className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 md:pt-32"
    >
      <div className="mx-auto max-w-5xl">
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
