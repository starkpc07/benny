import React from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { 
  RiUserHeartLine, 
  RiFileList3Line, 
  RiLogoutBoxRLine, 
  RiCalendarEventLine,
  RiShieldCheckLine,
  RiCalendarCheckLine,
  RiUser3Fill 
} from "react-icons/ri";

const UserPanel = ({ user }) => {
  const handleLogout = () => signOut(auth);
  
  const handleBookClick = () => {
    console.log("Navigating to booking...");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-32 px-4 md:px-10 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        
        {/* TOP PROFILE SECTION */}
        <div className="bg-white rounded-4xl p-6 md:p-10 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-10" />
              <div className="size-24 rounded-full bg-zinc-900 border-2 border-white shadow-lg relative z-10 flex items-center justify-center text-white">
                <RiUser3Fill size={40} />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
                {user?.displayName || "Guest Explorer"}
              </h1>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={handleLogout}
               className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl transition-colors text-[10px] font-black uppercase tracking-widest"
             >
               <RiLogoutBoxRLine size={16} /> Logout
             </button>
          </div>
        </div>

        {/* DESKTOP/TABLET BOOK EVENTS */}
        {/* Added mb-16 for tablet spacing and changed w-full to w-auto with px-4 */}
        <div className="hidden md:flex items-center justify-center w-full mb-16">
          <button
            onClick={handleBookClick}
            className="group relative w-auto overflow-hidden py-5 px-10 md:px-14 rounded-full font-black uppercase text-[16px] md:text-[18px] tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95 flex justify-center items-center gap-3 cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] transition-all duration-700 group-hover:bg-position-[100%_0%]" />
            <span className="relative flex items-center justify-center gap-3 px-4">
              Book Events <RiCalendarCheckLine className="text-2xl md:text-3xl" />
            </span>
          </button>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 ">
          
          {/* My Bookings Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                    <RiCalendarEventLine className="text-orange-500" /> My Bookings
                </h3>
            </div>
            
            <div className="grid gap-4">
                {["Wedding", "Corporate"].map((type, index) => (
                    <div key={index} className="bg-white p-6 rounded-3xl border border-zinc-100 flex items-center justify-between group hover:shadow-md transition-all">
                        <div className="flex items-center gap-5">
                            <div className="size-14 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center text-white font-black text-[10px] leading-tight">
                                <span className="text-orange-500">FEB</span>
                                <span>24</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-zinc-900 uppercase tracking-tight">{type} Events</h4>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Status: Processing</p>
                            </div>
                        </div>
                        <RiFileList3Line className="text-zinc-200 group-hover:text-orange-500 transition-colors" size={20} />
                    </div>
                ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* FLOATING BOOKING BUTTON (Mobile Only) */}
      <div className="md:hidden fixed bottom-8 left-0 right-0 z-50 px-6 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBookClick}
          className="relative px-4 max-w-md overflow-hidden py-4 rounded-full font-black uppercase text-[14px] tracking-[0.15em] text-white shadow-[0_20px_50px_rgba(139,0,0,0.3)] flex justify-center items-center gap-3 cursor-pointer"
        >
          <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] animate-gradient-x" />
          <span className="relative flex items-center justify-center gap-2">
            Book Events <RiCalendarCheckLine size={24} />
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default UserPanel;