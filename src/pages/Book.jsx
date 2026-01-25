import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  RiArrowLeftLine, 
  RiDoubleQuotesL, 
  RiUserLine, 
  RiCalendarLine, 
  RiLayoutMasonryLine, 
  RiChat3Line, 
  RiSendPlaneLine 
} from "react-icons/ri";

const Book = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    event: "",
    message: ""
  });

  // Prevent past dates
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API logic
    setTimeout(() => {
      console.log("Booking Request:", formData);
      setIsSubmitting(false);
      alert("Booking request sent successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col items-center justify-center p-4 pt-24 md:pt-36 selection:bg-red-100">
      <div className="w-full max-w-200">
        
        {/* MOBILE ONLY BACK BUTTON (Same as Login) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex justify-between items-center px-4 md:hidden"
        >
          <Link to="/" className="flex items-center gap-2 text-[17px] font-black uppercase tracking-widest text-zinc-500">
            <RiArrowLeftLine size={14} /> Back
          </Link>
        </motion.div>

        {/* MAIN COMPACT CONTAINER (Same size/shadow as Login) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row overflow-hidden border border-zinc-100"
        >
          
          {/* LEFT SIDE: BRANDING (Compact Version) */}
          <div className="hidden md:flex w-[40%] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] p-10 flex-col justify-between text-white relative">
            <div className="absolute inset-0 bg-black/5" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">
                Book <br /> An Event
              </h2>
              <div className="h-1 w-8 bg-white/40 rounded-full" />
            </div>

            <div className="relative z-10">
              <RiDoubleQuotesL className="text-4xl opacity-20 mb-3" />
              <p className="text-lg font-medium tracking-tight italic opacity-90 leading-snug">
                The first step towards an unforgettable occasion.
              </p>
            </div>

            <div className="absolute -bottom-10 -left-10 size-48 bg-white/10 blur-[60px] rounded-full" />
          </div>

          {/* RIGHT SIDE: BOOKING FORM */}
          <div className="w-full md:w-[60%] p-6 md:p-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-black uppercase tracking-[0.4em] text-zinc-900 mb-1">Inquiry</h2>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Reserve Your Date</p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="space-y-1">
                <div className="relative">
                  <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all" 
                    placeholder="Enter your name" 
                  />
                </div>
              </div>

              {/* DATE */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Event Date</label>
                <div className="relative">
                  <RiCalendarLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input 
                    type="date" 
                    name="date"
                    min={today}
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all" 
                  />
                </div>
              </div>

              {/* EVENTS DROPDOWN */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Service</label>
                <div className="relative">
                  <RiLayoutMasonryLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <select 
                    name="event"
                    required
                    value={formData.event}
                    onChange={handleChange}
                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Event Type</option>
                    <option value="Wedding">Wedding Events</option>
                    <option value="Catering">Catering Services</option>
                    <option value="Corporate">Corporate Events</option>
                    <option value="Birthday">Birthday Parties</option>
                    <option value="Stage">Stage & Sound</option>
                    <option value="Decor">Theme & Decor</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE BOX */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Requirements</label>
                <div className="relative">
                  <RiChat3Line className="absolute left-4 top-4 text-zinc-400" />
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all resize-none" 
                    placeholder="Tell us about your requirements..." 
                  />
                </div>
              </div>

              {/* BOOK BUTTON */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-linear-to-r from-[#8B0000] to-[#FF8C00] text-white hover:brightness-110 disabled:opacity-50 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all active:scale-[0.98] flex justify-center items-center mt-4 shadow-lg shadow-red-900/10"
              >
                {isSubmitting ? (
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Book Now <RiSendPlaneLine className="text-[14px]" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Book;