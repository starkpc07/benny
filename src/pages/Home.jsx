import { motion } from "framer-motion";
import { RiCalendarCheckLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import logoImg from "../assets/logo.png"; // Kept the logo import

const Home = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Successful Events", val: "65000+" },
    { label: "Years of Excellence", val: "40+" },
    { label: "South India Presence", val: "All Over" },
    { label: "Service Quality", val: "Premium" },
  ];

  const handleBookClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate("/login");
  };

  return (
    <main className="relative w-full text-black pt-24 md:pt-36 overflow-hidden flex flex-col items-center selection:bg-red-600 selection:text-white min-h-screen">
      {/* ATMOSPHERIC LAYERS */}
      <div className="absolute top-[-5%] right-[-5%] size-75 md:size-200 rounded-full bg-slate-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] size-62.5 md:size-150 rounded-full bg-red-50/30 blur-[80px] pointer-events-none" />

      {/* --- HERO SECTION WRAPPER --- */}
      <section className="relative z-10 px-4 md:px-10 max-w-400 w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* LEFT SIDE: SLIDER */}
        <div className="w-full lg:w-1/2 order-1">
          <Slider />
        </div>

        {/* RIGHT SIDE: LOGO + TEXT CONTENT + CENTERED BUTTON */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center order-2">
          {/* Replaced Benny Events text with Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-2"
          >
            <img 
              src={logoImg} 
              alt="Logo" 
              className="w-64 md:w-80 lg:w-md h-auto object-contain drop-shadow-2xl pointer-events-none select-none" 
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-lg lg:text-xl text-zinc-500 mb-5 max-w-2xl font-light uppercase tracking-[0.3em] leading-relaxed mx-auto"
          >
            Crafting{" "}
            <span className="text-zinc-800 font-bold">Exquisite Flavors</span> &
            <span className="text-red-700 font-bold"> Iconic Moments</span>
          </motion.p>

          {/* BUTTON CONTAINER - Forced Center */}
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleBookClick}
              className="group relative w-auto overflow-hidden py-4 px-10 rounded-full font-black uppercase text-[16px] md:text-[18px] tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95 flex justify-center items-center gap-3 cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] transition-all duration-700 group-hover:bg-position-[100%_0%]" />
              <span className="relative flex items-center justify-center gap-3">
                Book Events <RiCalendarCheckLine className="text-2xl md:text-3xl" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="relative z-10 px-6 w-full max-w-400  mx-auto mt-12 border-t border-black/5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group cursor-default flex flex-col items-center"
            >
              <div className="text-3xl md:text-5xl font-black text-[#0f172a] group-hover:text-red-700 transition-colors duration-500 leading-none">
                {stat.val}
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-zinc-600 mt-3">
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