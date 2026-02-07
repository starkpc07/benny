import React from "react";
import { RiInstagramFill, RiWhatsappFill, RiFacebookFill } from "react-icons/ri";
import logoImg from "../assets/logo2.png"; // Importing the logo

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <RiInstagramFill />, link: "https://instagram.com", color: "hover:text-[#E4405F]" },
    { icon: <RiWhatsappFill />, link: "https://wa.me/919876543210", color: "hover:text-[#25D366]" },
    { icon: <RiFacebookFill />, link: "https://facebook.com", color: "hover:text-[#1877F2]" },
  ];

  return (
    <footer className="w-full border-t border-black/5 py-12 selection:bg-red-600 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        
        {/* LOGO SECTION - Restricted drag/selection */}
        <div className="mb-6">
          <img 
            src={logoImg} 
            alt="Benny Events Logo" 
            draggable="false"
            className="h-12 w-auto object-contain drop-shadow-md select-none pointer-events-none" 
          />
        </div>

        {/* SOCIAL LINKS (Optional - added back in case you want them visible) */}
        <div className="flex gap-6 mb-8 text-2xl text-zinc-400">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`transition-all duration-300 hover:scale-110 ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 select-none">
            © {currentYear} Benny Events & Catering. All Rights Reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-300">
            <a href="#" className="hover:text-red-600 transition-colors cursor-pointer">Privacy Policy</a>
            <span className="select-none">•</span>
            <a href="#" className="hover:text-red-600 transition-colors cursor-pointer">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;