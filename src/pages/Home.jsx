import { motion } from "framer-motion";
import { RiCalendarCheckLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; // 1. Added useNavigate
import Slider from "../components/Slider";

const Home = () => {
  const navigate = useNavigate(); // 2. Initialize Navigate

  const stats = [
    { label: "Successful Events", val: "1000+" },
    { label: "Years of Excellence", val: "12+" },
    { label: "South India Presence", val: "All Over" },
    { label: "Service Quality", val: "Premium" },
  ];

  // 3. Handle Navigation + Scroll to Top
  const handleBookClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/book");
  };

  return (
    <main className="relative w-full bg-[#FAF9F6] text-black pt-32 md:pt-46 overflow-hidden flex flex-col items-center selection:bg-red-600 selection:text-white">
      {/* ATMOSPHERIC LAYERS */}
      <div className="absolute top-[-5%] right-[-5%] size-75 md:size-200 rounded-full bg-slate-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] size-62.5 md:size-150 rounded-full bg-red-50/30 blur-[80px] pointer-events-none" />

      <section className="relative z-10 px-4 md:px-6 max-w-7xl w-full mx-auto text-center flex flex-col items-center">
        <Slider />

        {/* --- TEXT CONTENT --- */}
        <div className="w-full flex flex-col items-center px-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] sm:text-[10vw] lg:text-[7.5rem] xl:text-[8.5rem] font-black leading-[0.85] tracking-tighter mb-8"
          >
            <span className="text-[#0f172a] drop-shadow-sm">Benny Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-xl lg:text-2xl text-zinc-500 mb-10 max-w-3xl font-light uppercase tracking-[0.3em] leading-relaxed"
          >
            The Art of{" "}
            <span className="text-red-700 font-bold">Unforgettable</span>{" "}
            Occasions
          </motion.p>

          <div className="flex items-center justify-center gap-6 w-full sm:w-auto">
            {/* 4. BUTTON WITH SCROLL LOGIC */}
            <button
              onClick={handleBookClick}
              className="group relative w-full sm:w-auto overflow-hidden py-5 px-10 rounded-full font-black uppercase text-[10px] tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95 flex justify-center items-center gap-3 cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] transition-all duration-700 group-hover:bg-position-[100%_0%]" />
              <span className="relative flex items-center justify-center gap-3">
                Book Events <RiCalendarCheckLine className="text-xl" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="relative z-10 px-6 max-w-5xl w-full mx-auto py-10 mt-10 border-t border-black/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group cursor-default flex flex-col items-center"
            >
              <div className="text-3xl md:text-5xl font-black text-[#0f172a] group-hover:text-red-700 transition-colors duration-500 leading-none">
                {stat.val}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mt-3 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;