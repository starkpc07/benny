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
import logoImg from "../assets/logo.webp";

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

  // Logic to determine the link based on user role
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
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Menu</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {navItems.map((item, i) => (
                    <motion.li key={item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <button
                        onClick={(e) => handleNavClick(e, item.path)}
                        className="w-full flex items-center gap-4 rounded-2xl bg-white/10 p-3 text-base font-black uppercase tracking-widest text-white active:scale-95 transition-all"
                      >
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-lg">
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
                    className="flex items-center justify-center gap-3 rounded-2xl bg-white p-4 text-base font-black uppercase tracking-widest text-[#8B0000] shadow-xl active:scale-95"
                  >
                    <RiUser3Fill size={20} />
                    {user ? (user.role === "admin" ? "Admin Panel" : "Account") : "Login"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-4 z-200 md:top-8">
        <div className="mx-4 max-w-400 lg:px-10 md:px-5 md:mx-auto">
          <nav className="relative flex h-14 items-center justify-between rounded-full bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] px-4 shadow-2xl md:h-20 md:px-8 border border-white/20">
            <button onClick={(e) => handleNavClick(e, "/")} className="group relative z-210 flex items-center gap-3 cursor-pointer">
              <img src={logoImg} alt="Logo" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
              <span className="text-lg font-black text-white md:text-xl tracking-tighter uppercase leading-none">
                Benny <br className="md:hidden"/> Events
              </span>
            </button>

            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-xs font-bold text-white uppercase tracking-widest transition-opacity hover:opacity-70 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="relative z-210 flex items-center gap-3">
              <Link 
                to={getPanelLink()} 
                className="hidden md:grid size-12 place-items-center rounded-full bg-white/20 text-white border border-white/20 hover:bg-white hover:text-[#8B0000] transition-all"
              >
                <RiUser3Fill size={22} />
              </Link>
              <div className="md:hidden">
                <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} color="#FFFFFF" size={20} rounded />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;