import { useState, useEffect } from "react";
import {
  RiFireFill,
  RiUser3Fill,
  RiHome4Line,
  RiCalendarEventLine,
  RiInformationLine,
  RiContactsLine,
} from "react-icons/ri";
import { Rotate as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.webp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Combined Scroll to Top & Navigation
  const handleProfileClick = (e) => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTop = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const getNavLink = (path) => {
    return location.pathname === "/" ? path : `/${path}`;
  };

  const navItems = [
    { name: "Home", icon: <RiHome4Line />, path: "/" },
    { name: "Events", icon: <RiCalendarEventLine />, path: "#events" },
    { name: "About", icon: <RiInformationLine />, path: "#about" },
    { name: "Contact", icon: <RiContactsLine />, path: "#contact" },
  ];

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
              className="fixed inset-0 z-150 bg-black/60 backdrop-blur-xl md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-24 bottom-6 z-160 rounded-[2.5rem] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#B22222] shadow-2xl md:hidden overflow-hidden"
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div className="text-center pt-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                    Menu
                  </span>
                </div>

                <ul className="flex flex-col gap-2 sm:gap-4">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={
                          item.path.startsWith("#")
                            ? getNavLink(item.path)
                            : item.path
                        }
                        onClick={
                          item.name === "Home"
                            ? scrollToTop
                            : () => setIsMenuOpen(false)
                        }
                        className="flex items-center gap-4 rounded-2xl bg-white/10 p-3 sm:p-4 text-base font-black uppercase tracking-widest text-white backdrop-blur-md active:scale-95 transition-all"
                      >
                        <span className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-white/10 text-lg sm:text-xl">
                          {item.icon}
                        </span>
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="pb-2">
                  <Link
                    to="/login"
                    onClick={handleProfileClick} // MOBILE PROFILE CLICK
                    className="flex items-center justify-center gap-3 rounded-2xl bg-white p-4 text-base font-black uppercase tracking-widest text-[#8B0000] shadow-xl active:scale-95 transition-transform"
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="size-6 rounded-full object-cover"
                        alt=""
                      />
                    ) : (
                      <RiUser3Fill />
                    )}
                    {user ? "Account" : "Login"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="fixed inset-x-0 top-4 z-200 md:top-8">
        <div className="mx-4 max-w-6xl md:mx-auto">
          <nav className="relative flex h-14 items-center justify-between rounded-full bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] px-4 shadow-2xl md:h-20 md:px-8 border border-white/10">
            <Link
              to="/"
              onClick={scrollToTop}
              className="group relative z-210 flex items-center gap-3"
            >
              <img
                src={logoImg}
                alt="Chef Logo"
                className="h-19 w-19 object-contain p-1"
              />
              <span className="text-lg font-black text-white md:text-xl xl:text-2xl tracking-tighter uppercase">
                Benny Events
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={
                    item.path.startsWith("#")
                      ? getNavLink(item.path)
                      : item.path
                  }
                  className="text-xs font-bold text-white uppercase tracking-widest transition-opacity hover:opacity-70"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="relative z-210 flex items-center gap-2">
              <Link
                to="/login"
                onClick={handleProfileClick} // DESKTOP PROFILE CLICK
                className="hidden md:grid size-12 place-items-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/10 overflow-hidden group hover:bg-white hover:text-red-700 transition-all"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="size-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <RiUser3Fill />
                )}
              </Link>
              <div className="md:hidden">
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
