import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiDashboardLine,
  RiCalendarEventLine,
  RiUserSettingsLine,
  RiLogoutBoxRLine,
  RiSettings4Line,
  RiPieChartLine,
  RiStackLine,
  RiFlashlightFill,
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";

const Admin = ({ user, handleLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "Dashboard", icon: RiDashboardLine },
    { id: "Events", icon: RiCalendarEventLine },
    { id: "Clients", icon: RiUserSettingsLine },
    { id: "Settings", icon: RiSettings4Line },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] selection:bg-red-100 isolate">
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#8B0000" offset="0%" />
          <stop stopColor="#FF8C00" offset="50%" />
          <stop stopColor="#8B0000" offset="100%" />
        </linearGradient>
      </svg>

      <main className="pt-32 pb-40 md:pt-44 md:pb-24 px-4 max-w-7xl lg:px-10 md:px-5 md:mx-auto transition-all duration-300">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm flex items-center gap-4">
              <div className="size-10 rounded-xl bg-gradient-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] flex items-center justify-center text-white shadow-lg shadow-red-900/20">
                <RiFlashlightFill size={22} />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-tighter text-zinc-900 leading-none">
                  BENNY<span className="text-[#8B0000]">EEVENTS</span>
                </h2>
                <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Master Control</p>
              </div>
            </div>

            <nav className="hidden lg:block bg-white p-4 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-2">
              <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4 mt-2 ml-4">Management</p>
              {navItems.map((Item) => (
                <button
                  key={Item.id}
                  onClick={() => setActiveTab(Item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeTab === Item.id
                      ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200"
                      : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <span className="text-xl"><Item.icon /></span>
                  {Item.id}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-zinc-50 pt-6"
              >
                <RiLogoutBoxRLine className="text-xl" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* --- CONTENT AREA --- */}
          <div className="flex-1 min-w-0 space-y-8">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                {activeTab} <span className="text-[#8B0000]">Overview</span>
              </h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">Data Statistics</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-[2rem] border border-zinc-100">
                    <RiPieChartLine className="text-[#8B0000] text-xl mb-3" />
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Active Bookings</p>
                    <h3 className="text-2xl font-black text-zinc-900 mt-1">124</h3>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-zinc-100">
                    <RiStackLine className="text-[#FF8C00] text-xl mb-3" />
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Pending Requests</p>
                    <h3 className="text-2xl font-black text-zinc-900 mt-1">18</h3>
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[10px] font-bold">
                      <thead>
                        <tr className="bg-zinc-50">
                          <th className="px-8 py-5 font-black uppercase tracking-widest text-zinc-400">Event ID</th>
                          <th className="px-8 py-5 font-black uppercase tracking-widest text-zinc-400">Client Name</th>
                          <th className="px-8 py-5 font-black uppercase tracking-widest text-zinc-400">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                            <td className="px-8 py-5 text-zinc-900 font-black">#BE-00{i}</td>
                            <td className="px-8 py-5 text-zinc-500 uppercase">Premium Guest {i}</td>
                            <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-red-50 text-[#8B0000] text-[8px] font-black uppercase rounded-lg">Luxury</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* --- MOBILE FLOATING ACTION NAV --- */}
      <div className="lg:hidden fixed bottom-8 right-6 z-[300] flex flex-col items-end gap-4">
        {/* Expanded Menu Items */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 mb-2"
            >
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex justify-between gap-3 px-5 py-3 rounded-full shadow-xl border border-white/20 transition-all active:scale-95 ${
                    activeTab === item.id 
                    ? "bg-zinc-900 text-white" 
                    : "bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] text-white"
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.id}</span>
                  <item.icon size={20} />
                </motion.button>
              ))}
              
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Main Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="size-12 rounded-full bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] flex items-center justify-center text-white shadow-2xl border-2 border-white/30 active:scale-90 transition-transform"
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <RiCloseLine size={32} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <RiMenu3Fill size={28} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;