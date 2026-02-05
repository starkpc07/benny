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
    { icon: <SiGooglemaps />, val: "Madurai, TN", link: "https://www.google.com/maps/search/?api=1&query=11A,+Kalpalam+Rd,+Sellur,+Goripalayam,+Madurai,+Tamil+Nadu+625002", iconStyles: "text-[#34A853]" },
    { icon: <RiInstagramFill />, val: "@benny_events", link: "https://instagram.com/benny_events", iconStyles: "text-[#E4405F]" }
  ];

  return (
    <section id="contact" className="relative w-full py-16 md:py-24 overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* ATMOSPHERIC BLURS */}
      <div className="absolute top-[-10%] right-[-5%] size-72 md:size-112.5 rounded-full bg-slate-200/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] size-64 md:size-87.5 rounded-full bg-red-50/30 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* HEADER SECTION */}
        <div className="mb-10 md:mb-14 flex flex-col items-center text-center">
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
            className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tighter text-[#020617]" 
          >
            {contactText.split("").map((char, index) => (
              <motion.span key={index} variants={letter}>
                {index >= 8 ? <span className="text-red-700 italic">{char}</span> : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          
          {/* LEFT SECTION: QUICK CONTACT */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <div className="bg-zinc-50/50 p-8 md:p-10 rounded-[2.5rem] border border-black/5 w-full flex flex-col">
              <div className="grow">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter text-[#0f172a] mb-8">Direct Lines</h3>
                <div className="flex flex-col gap-y-5">
                  {contactItems.map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                      <div className="shrink-0 size-11 md:size-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-black/5 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        <span className={`text-xl md:text-2xl transition-colors duration-300 ${item.iconStyles} group-hover:text-white`}>
                          {item.icon}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm md:text-base font-bold text-zinc-600 group-hover:text-black transition-colors">
                          {item.val}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* WHATSAPP AT THE END */}
              <div className="mt-12 pt-8 border-t border-black/5">
                <a 
                  href="https://wa.me/916382590381" 
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all active:scale-95 w-full justify-center"
                >
                  <RiWhatsappFill size={20} />
                  Start WhatsApp Chat
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
            className="flex"
          >
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-zinc-100 w-full flex flex-col">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter text-[#0f172a] mb-8">Inquiry Form</h3>
              
              <form className="flex flex-col grow">
                <div className="space-y-5 mb-8">
                  {/* Name & Phone Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[15px] uppercase font-black tracking-widest text-zinc-600 ml-1">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="Name" 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold text-[#0f172a] focus:bg-white focus:ring-2 focus:ring-red-600/10 focus:border-red-600/20 transition-all outline-none placeholder:text-zinc-300" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[15px] uppercase font-black tracking-widest text-zinc-600 ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="Contact Number" 
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold text-[#0f172a] focus:bg-white focus:ring-2 focus:ring-red-600/10 focus:border-red-600/20 transition-all outline-none placeholder:text-zinc-300" 
                      />
                    </div>
                  </div>

                  {/* Details Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[15px] uppercase font-black tracking-widest text-zinc-600 ml-1">Describe Your Needs</label>
                    <textarea 
                      rows="5" 
                      placeholder="Date, Location, Requirements..." 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold text-[#0f172a] focus:bg-white focus:ring-2 focus:ring-red-600/10 focus:border-red-600/20 transition-all outline-none resize-none placeholder:text-zinc-300"
                    ></textarea>
                  </div>
                </div>
                
                {/* SEND BUTTON - Anchored to bottom */}
                <div className="mt-auto">
                  <button 
                    type="submit" 
                    className="group relative w-full overflow-hidden py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] text-white shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2"
                  >
                    <div className="absolute inset-0 bg-zinc-900 group-hover:bg-red-700 transition-colors duration-500" />
                    <span className="relative flex items-center gap-2">
                      Send Message <RiSendPlaneFill className="text-lg" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>    
    </section>
  );
};

export default Contact;