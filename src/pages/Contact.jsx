import { motion } from "framer-motion";
import { 
  RiSendPlaneFill, 
  RiWhatsappFill, 
  RiPhoneFill, 
  RiInstagramFill 
} from "react-icons/ri";
import { 
  SiGmail, 
  SiGooglemaps 
} from "react-icons/si";

const Contact = () => {
  const contactText = "Contact Us";

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const letter = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
  };

  const contactItems = [
    { icon: <RiPhoneFill />, val: "+91 6382590381", link: "tel:+916382590381", iconStyles: "text-[#007AFF]" },
    { icon: <SiGmail />, val: "hello@benny.com", link: "mailto:hello@benny.com", iconStyles: "text-[#EA4335]" },
    { icon: <SiGooglemaps />, val: "Madurai, TN", link: "https://maps.google.com", iconStyles: "text-[#34A853]" },
    { icon: <RiInstagramFill />, val: "@benny_events", link: "https://instagram.com/benny_events", iconStyles: "text-[#E4405F]" }
  ];

  return (
    <section id="contact" className="relative w-full bg-[#FAF9F6] py-12 md:py-36 overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* ATMOSPHERIC BLURS - Reduced size */}
      <div className="absolute top-[-5%] right-[-5%] size-64 md:size-96 rounded-full bg-slate-200/30 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] size-48 md:size-72 rounded-full bg-red-50/40 blur-[70px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        
        {/* HEADER SECTION - Reduced margins */}
        <div className="mb-10 md:mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="h-px w-6 bg-red-600" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">Get In Touch</span>
            <span className="h-px w-6 bg-red-600" />
          </motion.div>

          <motion.h2
            variants={sentence}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="text-2xl font-black uppercase leading-tight tracking-tighter text-[#020617] sm:text-3xl md:text-4xl" 
          >
            {contactText.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {index >= 8 ? <span className="text-red-700 italic">{char}</span> : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* LEFT SECTION: QUICK CONTACT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col"
          >
            <div className="bg-zinc-900/5 p-6 md:p-8 rounded-3xl border border-black/3 h-full flex flex-col items-center justify-between text-center">
              <div className="w-full">
                <h3 className="text-lg font-black uppercase tracking-tighter text-[#0f172a] mb-6">Quick Contact</h3>
                <div className="flex flex-col gap-y-4 w-full max-w-xs mx-auto">
                  {contactItems.map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 group transition-all">
                      <div className="shrink-0 size-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-black/2 group-hover:scale-105 transition-all duration-300">
                        <span className={`text-xl flex items-center justify-center ${item.iconStyles}`}>
                          {item.icon}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-[#0f172a] tracking-tight leading-tight group-hover:text-red-700 transition-colors">
                          {item.val}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center space-y-4 w-full">
                <p className="text-[10px] font-bold text-zinc-500 max-w-50 leading-relaxed">
                  Let's talk strategy and turn your vision into reality.
                </p>
                <a 
                  href="https://wa.me/916382590381" 
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-black uppercase text-[9px] tracking-widest hover:shadow-lg hover:shadow-green-500/10 transition-all active:scale-95 w-full sm:w-auto justify-center"
                >
                  <RiWhatsappFill size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SECTION: INQUIRY FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col"
          >
            <div className="absolute inset-0 bg-white rounded-3xl shadow-sm border border-zinc-100" />
            <form className="relative z-10 p-6 md:p-8 flex flex-col h-full items-center">
              <h3 className="text-lg font-black uppercase tracking-tighter text-[#0f172a] mb-6 text-center">Inquiry Form</h3>
              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black tracking-widest text-zinc-400 ml-1">Full Name</label>
                  <input type="text" placeholder="Your Name" required className="w-full bg-zinc-50 border border-transparent rounded-xl px-4 py-3 text-xs font-bold text-[#0f172a] focus:bg-white focus:border-red-600/10 transition-all outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black tracking-widest text-zinc-400 ml-1">Phone Number</label>
                  <input type="tel" placeholder="Phone Number" required className="w-full bg-zinc-50 border border-transparent rounded-xl px-4 py-3 text-xs font-bold text-[#0f172a] focus:bg-white focus:border-red-600/10 transition-all outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-black tracking-widest text-zinc-400 ml-1">Event Details</label>
                  <textarea rows="2" placeholder="Requirements..." className="w-full bg-zinc-50 border border-transparent rounded-xl px-4 py-3 text-xs font-bold text-[#0f172a] focus:bg-white focus:border-red-600/10 transition-all outline-none resize-none"></textarea>
                </div>
              </div>
              <div className="mt-8 w-full flex justify-center">
                <button type="submit" className="group relative w-full sm:w-auto overflow-hidden py-4 px-8 rounded-full font-black uppercase text-[9px] tracking-widest text-white shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2">
                  <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] transition-all duration-500 group-hover:bg-position-[100%_0%]" />
                  <span className="relative flex items-center justify-center gap-2">
                    Send Inquiry <RiSendPlaneFill className="text-base" />
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>    
    </section>
  );
};

export default Contact;