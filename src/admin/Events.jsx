import React from "react";
import { motion } from "framer-motion";

const Events = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-bold">
          <thead className="bg-zinc-50/50">
            <tr>
              <th className="px-8 py-6 font-black uppercase tracking-widest text-zinc-400">Event ID</th>
              <th className="px-8 py-6 font-black uppercase tracking-widest text-zinc-400">Client</th>
              <th className="px-8 py-6 font-black uppercase tracking-widest text-zinc-400 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-8 py-5 text-zinc-900 font-black">#BE-00{i}</td>
                <td className="px-8 py-5 text-zinc-500 uppercase font-bold">Client Name {i}</td>
                <td className="px-8 py-5 text-right">
                  <span className="px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase rounded-lg">Confirmed</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Events;  