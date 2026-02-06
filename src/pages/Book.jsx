import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { 
  RiArrowLeftLine, RiDoubleQuotesL, RiUserLine, 
  RiCalendarLine, RiLayoutMasonryLine, RiChat3Line, RiSendPlaneLine 
} from "react-icons/ri";

const Book = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", event: "", message: "" });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Improved auth check: only redirect if we are sure the user is null
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.event) return;

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Authentication required.");

      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        userEmail: user.email,
        clientName: formData.name,
        eventDate: formData.date,
        eventType: formData.event,
        requirements: formData.message,
        status: "Processing",
        createdAt: serverTimestamp(), // Dashboard depends on this!
      });

      // Redirect with 'replace' so they can't go back to the form with the back button
      navigate("/dashboard", { replace: true }); 

    } catch (error) {
      console.error("Submission Error:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col items-center justify-center p-4 pt-10 md:pt-36 selection:bg-red-100">
      <div className="w-full max-w-200">
        <div className="hidden md:block mb-6 px-4">
           <Link to="/dashboard" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors">
            <RiArrowLeftLine size={14} /> Back to Dashboard
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-white rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row overflow-hidden border border-zinc-100">
          <div className="hidden md:flex w-[40%] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] p-10 flex-col justify-between text-white relative">
            <div className="absolute inset-0 bg-black/5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">Book <br /> An Event</h2>
              <div className="h-1 w-8 bg-white/40 rounded-full" />
            </div>
            <div className="relative z-10">
              <RiDoubleQuotesL className="text-4xl opacity-20 mb-3" />
              <p className="text-lg font-medium tracking-tight italic opacity-90 leading-snug">The first step towards an unforgettable occasion.</p>
            </div>
          </div>

          <div className="w-full md:w-[60%] p-6 md:p-8">
            <div className="text-center mb-4">
              <h2 className="text-xl font-black uppercase tracking-[0.4em] text-zinc-900 mb-1">Inquiry</h2>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Reserve Your Date</p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="relative">
                <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all" placeholder="Enter your name" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Event Date</label>
                <div className="relative">
                  <RiCalendarLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input type="date" name="date" min={today} required value={formData.date} onChange={handleChange} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Service</label>
                <div className="relative">
                  <RiLayoutMasonryLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <select name="event" required value={formData.event} onChange={handleChange} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all appearance-none cursor-pointer">
                    <option value="" disabled>Select Event Type</option>
                    <option value="Wedding">Wedding Events</option>
                    <option value="Catering">Catering Services</option>
                    <option value="Corporate">Corporate Events</option>
                    <option value="Birthday">Birthday Parties</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Requirements</label>
                <div className="relative">
                  <RiChat3Line className="absolute left-4 top-4 text-zinc-400" />
                  <textarea name="message" required value={formData.message} onChange={handleChange} rows="3" className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all resize-none" placeholder="Tell us about your requirements..." />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-linear-to-r from-[#8B0000] to-[#FF8C00] text-white hover:brightness-110 disabled:opacity-50 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all active:scale-[0.98] flex justify-center items-center mt-4 shadow-lg">
                {isSubmitting ? <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span className="flex items-center gap-2">Book Now <RiSendPlaneLine size={14} /></span>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Book;