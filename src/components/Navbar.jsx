import { useState } from "react";
import {
  RiUser3Fill,
  RiHome4Line,
  RiCalendarEventLine,
  RiInformationLine,
  RiContactsLine,
} from "react-icons/ri";
import { Rotate as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import logoImg from "../assets/logo.png";

const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  const handleNavClick = (e, path) => {
    const isAnchor = path.startsWith("#");
    setIsMenuOpen(false);
    const scrollOffset = window.innerWidth < 768 ? -10 : -20;

    if (isAnchor) {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          lenis?.scrollTo(path, { offset: scrollOffset, duration: 1.2 });
        }, 150);
      } else {
        lenis?.scrollTo(path, { offset: scrollOffset, duration: 1.2 });
      }
    } else if (path === "/") {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        lenis?.scrollTo(0, { duration: 1.2 });
      }
    }
  };

  const navItems = [
    { name: "Home", icon: <RiHome4Line />, path: "/" },
    { name: "Events", icon: <RiCalendarEventLine />, path: "#events" },
    { name: "About", icon: <RiInformationLine />, path: "#about" },
    { name: "Contact", icon: <RiContactsLine />, path: "#contact" },
  ];

  const getPanelLink = () => {
    if (!user) return "/login";
    return user.role === "admin" ? "/admin" : "/user-panel";
  };

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-150 bg-black/80 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-24 bottom-6 z-160 rounded-[2.5rem] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#B22222] shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div className="text-center pt-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 select-none">Menu</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.li key={item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <button
                        onClick={(e) => handleNavClick(e, item.path)}
                        className="w-full flex items-center gap-4 rounded-2xl bg-white/10 p-3 text-base font-black uppercase tracking-widest text-white active:scale-95 transition-all select-none touch-none"
                      >
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-lg pointer-events-none">
                          {item.icon}
                        </span>
                        {item.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
                <div className="pb-2">
                  <Link 
                    to={getPanelLink()} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="flex items-center justify-center gap-3 rounded-2xl bg-white p-4 text-base font-black uppercase tracking-widest text-[#8B0000] shadow-xl active:scale-95 select-none"
                  >
                    <RiUser3Fill size={20} className="pointer-events-none" />
                    {user ? (user.role === "admin" ? "Admin Panel" : "Account") : "Login"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-4 z-200 md:top-8 select-none">
        <div className="relative mx-auto max-w-7xl px-4 md:px-10">
          
          {/* LOGO */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-250">
            <button 
              onClick={(e) => handleNavClick(e, "/")} 
              className="cursor-pointer transition-transform hover:scale-105 active:scale-95 block outline-none"
            >
              <img 
                src={logoImg} 
                alt="Logo" 
                draggable="false"
                className="h-32 w-32 md:h-48 md:w-48 object-contain drop-shadow-2xl select-none pointer-events-none" 
              />
            </button>
          </div>

          {/* NAVBAR PILL */}
          <nav className="relative ml-8 md:ml-6 flex h-14 md:h-20 items-center justify-between rounded-full bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] shadow-2xl border border-white/20">
            
            {/* 1. LEFT SPACER */}
            <div className="w-16 md:w-48 shrink-0" />

            {/* 2. CENTER LINKS */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-12">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-[0.2em] transition-all hover:opacity-70 cursor-pointer hover:-translate-y-px select-none"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* 3. RIGHT SECTION */}
            <div className="flex md:flex-1 items-center justify-end gap-2 pr-2 md:pr-6">
              <Link 
                to={getPanelLink()} 
                className="hidden md:grid size-12 place-items-center rounded-full bg-white/15 text-white border border-white/20 hover:bg-white hover:text-[#8B0000] transition-all shadow-lg active:scale-90"
              >
                <RiUser3Fill size={22} className="pointer-events-none" />
              </Link>
              
              <div className="md:hidden flex items-center justify-center rounded-full transition-colors active:bg-white/10">
                <Hamburger 
                  toggled={isMenuOpen} 
                  toggle={setIsMenuOpen} 
                  color="#FFFFFF" 
                  size={20} 
                  rounded 
                />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;