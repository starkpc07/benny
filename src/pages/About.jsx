import { motion } from "framer-motion";
import { RiDoubleQuotesL, RiFocus3Line, RiUserStarFill } from "react-icons/ri";

const About = () => {
  // Enhanced variants with hidden (initial), visible, and exit states
  const fadeInRight = {
    hidden: {
      opacity: 0,
      x: 30,
      transition: { duration: 0.5 },
    },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="about"
      className="relative w-full py-20 md:py-32 overflow-hidden selection:bg-red-600 selection:text-white"
    >
      {/* ATMOSPHERIC LAYERS */}
      <div className="absolute top-[10%] left-[-10%] w-75 h-75 md:w-175 md:h-175 rounded-full bg-red-50/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-62.5 h-62.5 md:w-150 md:h-150 rounded-full bg-slate-200/40 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* HEADER SECTION - REVERSES ON SCROLL UP */}
        <div className="mb-12 md:mb-20 flex flex-col items-center overflow-hidden">
          {/* Subtitle - Center Fade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // Triggers easily
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-red-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                Our Story
              </span>
              <span className="h-px w-6 bg-red-600" />
            </div>
          </motion.div>

          {/* Main Title - Split Animation that reverses */}
          <h2 className="flex flex-wrap justify-center gap-x-4 text-4xl font-black uppercase leading-[1.1] tracking-tighter text-[#020617] sm:text-5xl md:text-6xl lg:text-7xl text-center">
            {/* Left Side: Crafting (Comes from Left) */}
            <motion.span
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Custom luxury cubic-bezier
              }}
              className="inline-block"
            >
              Crafting
            </motion.span>

            {/* Right Side: Legacy (Comes from Right) */}
            <motion.span
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05, // Tiny stagger for a more dynamic feel
              }}
              className="text-red-700 italic inline-block"
            >
              Legacy
            </motion.span>
          </h2>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          {/* LEFT: IMAGE - REVERSES ON SCROLL UP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 relative group"
          >
            <div className="aspect-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
                alt="Grand Event Celebration"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-red-700 size-24 md:size-32 rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-[#FAF9F6] z-20">
              <div className="text-3xl md:text-4xl font-black leading-none">
                40+
              </div>
              <div className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-80 mt-1 text-center px-4 leading-tight">
                Years of <br /> Excellence
              </div>
            </div>
          </motion.div>

          {/* RIGHT: TEXT CONTENT - ALL REVERSE ON SCROLL UP */}
          <div className="md:col-span-7 space-y-8">
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              variants={fadeInRight}
              className="relative"
            >
              <RiDoubleQuotesL className="text-6xl text-red-600 opacity-10 absolute -top-8 -left-4" />
              <p className="text-xl md:text-2xl text-zinc-800 font-bold leading-tight relative z-10">
                At Benny Events, we believe an occasion is more than just a
                gathering. It’s a symphony of moments designed to leave an
                indelible mark on the soul.
              </p>
            </motion.div>

            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              variants={fadeInRight}
              className="text-zinc-500 text-sm md:text-base leading-relaxed uppercase tracking-widest font-medium"
            >
              From the heart of South India, we have revolutionized event
              management by blending tradition with contemporary luxury.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInRight}
              className="flex flex-col sm:grid sm:grid-cols-2 gap-4 md:gap-6 pt-4"
            >
              <div className="flex items-center sm:items-start gap-4 p-5 md:p-6 rounded-4xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/3 hover:border-red-600/10 transition-colors">
                <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <RiFocus3Line className="text-2xl text-red-600" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest mb-1 text-black">
                    The Mission
                  </h4>
                  <p className="text-[11px] text-zinc-500 leading-snug">
                    Transforming visions into masterpieces.
                  </p>
                </div>
              </div>

              <div className="flex items-center sm:items-start gap-4 p-5 md:p-6 rounded-4xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/3 hover:border-red-600/10 transition-colors">
                <div className="size-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <RiUserStarFill className="text-2xl text-red-600" />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest mb-1 text-black">
                    Our Quality
                  </h4>
                  <p className="text-[11px] text-zinc-500 leading-snug">
                    Exceeding standards of excellence.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
