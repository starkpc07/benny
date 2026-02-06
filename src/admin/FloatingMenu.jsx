import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiLogoutBoxRLine, 
  RiMenu3Fill, 
  RiCloseLine 
} from "react-icons/ri";

const FloatingMenu = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  navItems, 
  activeTab, 
  setActiveTab, 
  handleLogout 
}) => {
  // Prevent background scrolling for better performance
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.01 }
    },
    exit: { 
      opacity: 0, 
      transition: { staggerChildren: 0.02, staggerDirection: -1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 28, mass: 0.8 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.1 } }
  };

  return (
    <>
      {/* Dimmed Background Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-9998 backdrop-blur-[2px] will-change-opacity"
          />
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-8 right-6 z-9999 flex flex-col items-end">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-3 mb-4 items-end transform-gpu will-change-transform"
            >
              {navItems.map((item) => (
                <motion.button
                  variants={itemVariants}
                  key={item.id}
                  onClick={() => { 
                    setActiveTab(item.id); 
                    setIsMobileMenuOpen(false); 
                  }}
                  className={`flex items-center justify-between gap-4 px-6 py-4 rounded-full shadow-2xl min-w-45 active:scale-95 will-change-transform ${
                    activeTab === item.id 
                      ? "bg-zinc-900 text-white" 
                      : "bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] text-white"
                  }`}
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] pointer-events-none">{item.id}</span>
                  <item.icon size={22} className="pointer-events-none" />
                </motion.button>
              ))}
              
              <motion.button 
                variants={itemVariants}
                onClick={() => {
                  setIsMobileMenuOpen(false); 
                  handleLogout();              
                }}
                className="flex items-center justify-between gap-4 px-6 py-4 rounded-full shadow-2xl min-w-45 bg-white text-red-600 font-black active:scale-95 will-change-transform"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.2em] pointer-events-none">Logout</span>
                <RiLogoutBoxRLine size={22} className="pointer-events-none" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* MAIN TOGGLE BUTTON - PERMANENT GRADIENT */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          initial={false}
          animate={{ 
            rotate: isMobileMenuOpen ? 180 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden transform-gpu will-change-transform"
          style={{ 
            background: "linear-gradient(to bottom right, #8B0000, #FF8C00, #8B0000)" 
          }}
        >
          {isMobileMenuOpen ? <RiCloseLine size={32} /> : <RiMenu3Fill size={28} />}
        </motion.button>
      </div>
    </>
  );
};

export default FloatingMenu;