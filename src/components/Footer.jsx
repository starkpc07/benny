import React from "react";
import { RiInstagramFill, RiWhatsappFill, RiTwitterFill, RiFacebookFill } from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <RiInstagramFill />, link: "https://instagram.com", color: "hover:text-[#E4405F]" },
    { icon: <RiWhatsappFill />, link: "https://wa.me/919876543210", color: "hover:text-[#25D366]" },
    { icon: <RiFacebookFill />, link: "https://facebook.com", color: "hover:text-[#1877F2]" },
  ];

  return (
    <footer className="w-full border-t border-black/5 py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
        
        {/* LOGO OR BRAND NAME */}
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-[#020617]">
            Benny <span className="text-red-700 italic">Events</span>
          </h2>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            © {currentYear} Benny Events. All Rights Reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-300">
            <a className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a className="hover:text-red-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;