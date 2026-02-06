import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiDashboardLine, 
  RiCalendarEventLine, 
  RiUserSettingsLine, 
  RiLogoutBoxRLine, 
  RiSettings4Line, 
  RiFlashlightFill 
} from "react-icons/ri";

// Import separate components
import Dashboard from "./Dashboard";
import Events from "./Events";
import FloatingMenu from "./FloatingMenu";

const Admin = ({ user, handleLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: "Dashboard", icon: RiDashboardLine },
    { id: "Events", icon: RiCalendarEventLine },
    { id: "Clients", icon: RiUserSettingsLine },
    { id: "Settings", icon: RiSettings4Line },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col overflow-x-hidden relative">
      
      {/* 1. BACKDROP OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-[400] md:hidden"
          />
        )}
      </AnimatePresence>

      <main className="flex-grow pt-24 md:pt-36 pb-10 px-4 max-w-[1440px] md:px-6 md:mx-auto w-full transition-all duration-300">
        
        {/* MOBILE BRAND HEADER */}
        <div className="flex md:hidden bg-white p-5 rounded-[2rem] border border-zinc-100 shadow-sm items-center gap-4 mb-8">
          <div className="size-11 rounded-xl bg-gradient-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] flex items-center justify-center text-white shadow-lg shrink-0">
            <RiFlashlightFill size={22} />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-black uppercase tracking-tighter text-zinc-900 leading-none truncate">
              BENNY<span className="text-[#8B0000]">EVENTS</span>
            </h2>
            <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest truncate mt-1">Master Control Panel</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
          
          {/* LEFT SIDEBAR - Reduced width to 260px for tablet, 350px for large desktop */}
          <aside className="hidden md:block md:w-[260px] lg:w-[350px] shrink-0 space-y-6 sticky top-36">
            <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm flex items-center gap-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] flex items-center justify-center text-white shadow-lg shrink-0">
                <RiFlashlightFill size={26} />
              </div>
              <div className="min-w-0">
                <h2 className="text-base lg:text-lg font-black uppercase tracking-tighter text-zinc-900 leading-none truncate">
                  BENNY<span className="text-[#8B0000]">EVENTS</span>
                </h2>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest truncate mt-1">Master Control Panel</p>
              </div>
            </div>

            <nav className="bg-white p-4 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-2">
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4 mt-2 ml-4">Management</p>
              {navItems.map((Item) => (
                <button
                  key={Item.id}
                  onClick={() => setActiveTab(Item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-200 ${
                    activeTab === Item.id ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200" : "text-zinc-400 hover:bg-zinc-50"
                  }`}
                >
                  <Item.icon className="text-xl" /> {Item.id}
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[12px] font-black text-red-600 uppercase mt-4 border-t border-zinc-50 pt-6 hover:bg-red-50 transition-colors">
                <RiLogoutBoxRLine className="text-xl" /> Sign Out
              </button>
            </nav>
          </aside>

          {/* RIGHT CONTENT AREA */}
          <div className="flex-1 min-w-0 w-full space-y-4 md:space-y-8 md:pt-5">
            <div className="flex flex-row items-center justify-between border-b border-zinc-100 pb-3 md:pb-6 gap-2">
              {/* Increased font sizes: md:text-5xl (Tablet) and lg:text-7xl (Desktop) */}
              <h1 className="text-2xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                {activeTab}
              </h1>
              
              <div className="flex items-center gap-1.5 bg-zinc-100 px-3 py-1.5 rounded-full w-fit">
                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Live
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "Dashboard" && <Dashboard />}
                {activeTab === "Events" && <Events />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <FloatingMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Admin;