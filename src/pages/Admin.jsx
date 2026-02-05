import React from "react";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { 
  RiDashboardLine, RiCalendarEventLine, RiGroupLine, 
  RiMoneyDollarCircleLine, RiLogoutCircleRLine, RiVerifiedBadgeFill 
} from "react-icons/ri";

const Admin = ({ user }) => {
  const handleLogout = () => signOut(auth);

  const stats = [
    { label: "Total Revenue", value: "$12,840", icon: <RiMoneyDollarCircleLine />, color: "text-green-600" },
    { label: "Active Events", value: "14", icon: <RiCalendarEventLine />, color: "text-blue-600" },
    { label: "New Clients", value: "32", icon: <RiGroupLine />, color: "text-purple-600" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#fafafa] flex flex-col md:flex-row"
    >
      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-zinc-900 p-6 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <div className="size-8 bg-[#8B0000] rounded-lg flex items-center justify-center font-black">B</div>
            <h2 className="font-black uppercase tracking-tighter">Benny Admin</h2>
          </div>
          
          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-white/10 rounded-xl text-sm font-bold">
              <RiDashboardLine className="text-[#FF8C00]" /> Dashboard
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm font-bold transition-all opacity-60">
              <RiCalendarEventLine /> Manage Events
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-sm font-bold transition-all opacity-60">
              <RiGroupLine /> User List
            </button>
          </nav>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 font-bold text-sm hover:bg-red-500/10 rounded-xl transition-all">
          <RiLogoutCircleRLine size={18} /> Sign Out
        </button>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-zinc-900 uppercase">Executive Overview</h1>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Welcome back, Chief</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 pr-5 rounded-full shadow-sm border border-zinc-100">
            <img src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} className="size-10 rounded-full" alt="admin" />
            <div>
              <p className="text-[10px] font-black uppercase text-zinc-900 leading-none">Admin</p>
              <p className="text-[9px] font-bold text-[#8B0000] uppercase">{user?.email}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl shadow-sm border border-zinc-100">
              <div className={`size-10 rounded-xl bg-zinc-50 flex items-center justify-center text-xl mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-zinc-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
          <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-2">
            <RiVerifiedBadgeFill className="text-[#FF8C00]" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="size-10 bg-zinc-100 rounded-full" />
                  <div>
                    <p className="text-xs font-black text-zinc-800">New Booking: Wedding Ceremony</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">2 mins ago</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Completed</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Admin;