import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiDashboardLine, 
  RiCalendarEventLine, 
  RiUserSettingsLine, 
  RiLogoutBoxRLine, 
  RiSettings4Line 
} from "react-icons/ri";

import Dashboard from "./Dashboard";
import Events from "./Events";
import FloatingMenu from "./FloatingMenu";
import logoImg from "../assets/logo.png";

const Admin = ({ user, handleLogout }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync scroll lock with mobile menu state
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const onLogoutInternal = async () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset"; 
    
    setTimeout(() => {
      handleLogout(); 
    }, 100);
  };

  const navItems = [
    { id: "Dashboard", icon: RiDashboardLine },
    { id: "Events", icon: RiCalendarEventLine },
    { id: "Clients", icon: RiUserSettingsLine },
    { id: "Settings", icon: RiSettings4Line },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col overflow-x-hidden relative">
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-400 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <main className="grow pt-24 md:pt-36 pb-10 px-4 max-w-360 md:px-6 md:mx-auto w-full">
        
        {/* MOBILE BRAND HEADER - Replaced text with Logo */}
        <div className="flex md:hidden bg-white px-5 py-3 rounded-3xl border border-zinc-100 shadow-sm items-center justify-between mb-8">
          <img 
            src={logoImg} 
            alt="Admin Logo" 
            className="h-12 w-auto object-contain"
          />
          <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest text-right">
            Master Control
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
          
          <aside className="hidden md:block md:w-65 lg:w-87.5 shrink-0 space-y-6 sticky top-36">
            {/* DESKTOP LOGO CARD */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm flex flex-col items-center justify-center">
              <img 
                src={logoImg} 
                alt="Admin Logo" 
                className="h-24 w-auto object-contain"
              />
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-4">
                Master Control Panel
              </p>
            </div>

            <nav className="bg-white p-4 rounded-[2.5rem] border border-zinc-100 shadow-sm space-y-2">
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4 mt-2 ml-4">
                Management
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-200 ${
                    activeTab === item.id 
                      ? "bg-zinc-900 text-white shadow-xl shadow-zinc-200" 
                      : "text-zinc-400 hover:bg-zinc-50"
                  }`}
                >
                  <item.icon className="text-xl" /> {item.id}
                </button>
              ))}
              
              <button 
                onClick={onLogoutInternal} 
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[12px] font-black text-red-600 uppercase mt-4 border-t border-zinc-50 pt-6 hover:bg-red-50 transition-colors"
              >
                <RiLogoutBoxRLine className="text-xl" /> Log Out
              </button>
            </nav>
          </aside>

          <div className="flex-1 min-w-0 w-full space-y-2 md:pt-5">
            <div className="flex flex-row items-center justify-between border-b border-zinc-100 pb-3 md:pb-6 gap-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                {activeTab}
              </h1>
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
                {!["Dashboard", "Events"].includes(activeTab) && (
                   <div className="py-20 text-center text-zinc-400 font-bold uppercase tracking-widest">
                     {activeTab} Content Coming Soon
                   </div>
                )}
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
        handleLogout={onLogoutInternal} 
      />
    </div>
  );
};

export default Admin;