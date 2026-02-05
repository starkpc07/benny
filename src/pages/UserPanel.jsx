import React from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { RiUserHeartLine, RiSettings4Line, RiFileList3Line, RiLogoutBoxRLine } from "react-icons/ri";

const UserPanel = ({ user }) => {
  const handleLogout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-10 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900">My Dashboard</h2>
          <button onClick={handleLogout} className="text-[10px] font-black uppercase tracking-widest text-[#8B0000] flex items-center gap-2">
            <RiLogoutBoxRLine size={16} /> Logout
          </button>
        </div>

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-zinc-100 flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF8C00] rounded-full blur-2xl opacity-20" />
            <img 
              src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
              className="size-32 rounded-full border-4 border-white shadow-2xl relative z-10"
              alt="user"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-zinc-900 uppercase leading-none mb-2">
              {user?.displayName || "Event Guest"}
            </h1>
            <p className="text-sm font-bold text-zinc-400 mb-6">{user?.email}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-4 py-1.5 bg-zinc-900 text-white text-[9px] font-black uppercase rounded-full tracking-widest">Gold Member</span>
              <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-[9px] font-black uppercase rounded-full tracking-widest">3 Bookings</span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:border-[#FF8C00] transition-all text-left">
            <RiFileList3Line className="text-3xl text-zinc-300 group-hover:text-[#FF8C00] mb-4 transition-colors" />
            <h4 className="font-black uppercase text-xs text-zinc-900">View Tickets</h4>
            <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Manage your events</p>
          </button>
          
          <button className="group bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:border-[#FF8C00] transition-all text-left">
            <RiUserHeartLine className="text-3xl text-zinc-300 group-hover:text-[#FF8C00] mb-4 transition-colors" />
            <h4 className="font-black uppercase text-xs text-zinc-900">Saved Events</h4>
            <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Your wishlist</p>
          </button>

          <button className="group bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:border-[#FF8C00] transition-all text-left">
            <RiSettings4Line className="text-3xl text-zinc-300 group-hover:text-[#FF8C00] mb-4 transition-colors" />
            <h4 className="font-black uppercase text-xs text-zinc-900">Settings</h4>
            <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">Profile & Privacy</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPanel;