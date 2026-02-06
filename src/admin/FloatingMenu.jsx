import React from "react";
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
  // Optimization: Using a spring for "butter-smooth" feel
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.04, 
        delayChildren: 0.05 
      }
    },
    exit: { 
      opacity: 0, 
      transition: { 
        staggerChildren: 0.03, 
        staggerDirection: -1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } }
  };

  return (
    <div className="md:hidden fixed bottom-8 right-6 z-[500] flex flex-col items-end">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-3 mb-4 items-end"
          >
            {navItems.map((item) => (
              <motion.button
                variants={itemVariants}
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                // Removed ring and ring-offset for maximum performance
                className={`flex items-center justify-end gap-4 px-6 py-4 rounded-full shadow-xl min-w-[180px] transition-colors duration-200 active:scale-95 ${
                  activeTab === item.id 
                    ? "bg-zinc-900 text-white" 
                    : "bg-gradient-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] text-white"
                }`}
              >
                <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.id}</span>
                <item.icon size={22} />
              </motion.button>
            ))}
            
            <motion.button 
              variants={itemVariants}
              onClick={handleLogout}
              className="flex items-center justify-end gap-4 px-6 py-4 rounded-full shadow-xl min-w-[180px] bg-white text-red-600 font-black active:scale-95"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Logout</span>
              <RiLogoutBoxRLine size={22} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Trigger Button with Spring Animation */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        initial={false}
        animate={{ 
          rotate: isMobileMenuOpen ? 180 : 0,
          backgroundColor: isMobileMenuOpen ? "#18181b" : "#8B0000" // Instant sync with bg-zinc-900 logic
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="size-16 rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden"
        style={{ 
          background: !isMobileMenuOpen ? "linear-gradient(to bottom right, #8B0000, #FF8C00, #8B0000)" : "" 
        }}
      >
        {isMobileMenuOpen ? <RiCloseLine size={32} /> : <RiMenu3Fill size={28} />}
      </motion.button>
    </div>
  );
};

export default FloatingMenu;