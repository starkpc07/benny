import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Tooltip 
} from "recharts";
import { 
  RiPieChartLine, 
  RiStackLine, 
  RiCalendarCheckLine, 
  RiMoneyDollarCircleLine, 
  RiArrowRightUpLine,
  RiFilter3Line,
  RiCalendarLine
} from "react-icons/ri";

import logoImg from "../assets/logo.png";

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- GET CURRENT DATE FOR DEFAULTS ---
  const today = new Date();
  const currentMonth = today.getMonth().toString(); // "0" - "11"
  const currentYear = today.getFullYear().toString();

  // --- FILTER STATES (Defaulting to Current Month/Year) ---
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); 
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // --- FIREBASE REAL-TIME LISTENER ---
  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- FILTER LOGIC ---
  const filteredBookings = bookings.filter(b => {
    if (!b.createdAt) return false;
    const date = b.createdAt.toDate();
    
    const monthMatch = selectedMonth === "all" || date.getMonth().toString() === selectedMonth;
    const yearMatch = date.getFullYear().toString() === selectedYear;
    
    return monthMatch && yearMatch;
  });

  // --- DYNAMIC CALCULATIONS ---
  const formatCur = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  const activeCount = filteredBookings.filter(b => b.status === "Confirmed").length;
  const pendingCount = filteredBookings.filter(b => b.status === "Pending").length;
  const upcomingCount = filteredBookings.filter(b => b.status !== "Completed").length;

  const totalBalance = filteredBookings.reduce((acc, curr) => {
    const total = Number(curr.amount) || 0;
    const paid = curr.paymentStatus === "Fully Paid" ? total : (Number(curr.advanceAmount) || 0);
    return acc + (total - paid);
  }, 0);

  const totalGrowth = filteredBookings.reduce((acc, curr) => {
    if (curr.paymentStatus === "Fully Paid") return acc + (Number(curr.amount) || 0);
    return acc + (Number(curr.advanceAmount) || 0);
  }, 0);

  const categoryCounts = filteredBookings.reduce((acc, curr) => {
    const cat = curr.eventCategory || "Other";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const COLORS = ["#8B0000", "#FF8C00", "#4338ca", "#dc2626", "#4b5563", "#f97316"];
  
  const PIE_DATA = Object.keys(categoryCounts).map((name, index) => ({
    name,
    value: categoryCounts[name],
    color: COLORS[index % COLORS.length]
  }));

  const TOP_SERVICE = PIE_DATA.length > 0 
    ? PIE_DATA.reduce((prev, current) => (prev.value > current.value) ? prev : current)
    : { name: "None", value: 0 };

  const months = [
    { val: "all", label: "Full Year" },
    { val: "0", label: "January" }, { val: "1", label: "February" },
    { val: "2", label: "March" }, { val: "3", label: "April" },
    { val: "4", label: "May" }, { val: "5", label: "June" },
    { val: "6", label: "July" }, { val: "7", label: "August" },
    { val: "8", label: "September" }, { val: "9", label: "October" },
    { val: "10", label: "November" }, { val: "11", label: "December" }
  ];

  // Dynamic Year range based on current year
  const years = Array.from({ length: 5 }, (_, i) => (parseInt(currentYear) - 1 + i).toString());

  if (loading) return <div className="p-20 text-center text-sm font-black uppercase text-zinc-400 animate-pulse tracking-widest">Loading Analytics...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 sm:gap-6 w-full max-w-5xl mx-auto bg-zinc-50/50 px-4 pt-4 pb-10"
    >
      {/* --- FILTER BAR --- */}
      <div className="bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 p-2 rounded-xl text-[#FF8C00]">
            <RiFilter3Line size={20} />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-tighter text-zinc-900">Analytics Filter</h2>
            <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Currently showing: {months.find(m => m.val === selectedMonth)?.label} {selectedYear}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Month Select */}
          <div className="relative flex-1 md:w-40">
            <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-black uppercase outline-none focus:border-[#FF8C00] appearance-none cursor-pointer"
            >
              {months.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
            </select>
          </div>

          {/* Year Select */}
          <div className="relative flex-1 md:w-32">
            <RiStackLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={14} />
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-black uppercase outline-none focus:border-[#FF8C00] appearance-none cursor-pointer"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>
      
      {/* --- SECTION 1: STATS & MONEY --- */}
      <div className="flex flex-col space-y-5 lg:order-2">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatCard icon={<RiPieChartLine />} label="Confirmed" value={activeCount.toString().padStart(2, '0')} color="text-[#8B0000]" />
          <StatCard icon={<RiStackLine />} label="Pending" value={pendingCount.toString().padStart(2, '0')} color="text-[#FF8C00]" />
          <StatCard icon={<RiCalendarCheckLine />} label="All Active" value={upcomingCount.toString().padStart(2, '0')} color="text-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <MoneyCard label="Balance Due" value={formatCur(totalBalance)} icon={<RiMoneyDollarCircleLine />} type="balance" />
          <MoneyCard label="Total Revenue" value={formatCur(totalGrowth)} icon={<RiArrowRightUpLine />} type="growth" />
        </div>
      </div>

      {/* --- SECTION 2: PIE CHART SECTION --- */}
      <div className="w-full lg:order-1">
        <div className="bg-zinc-900 rounded-4xl lg:rounded-[2.5rem] shadow-2xl p-5 md:p-6 lg:p-7 flex flex-col gap-5">
          
          <div className="w-full flex justify-between items-center">
            <h4 className="text-[10px] font-black text-[#FF8C00] uppercase tracking-[0.2em]">Service Distribution</h4>
            <div className="flex items-center gap-2">
               <div className="size-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Live Sync</span>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row items-center justify-between w-full gap-6">
            <div className="w-full xl:w-1/2 h-65 sm:h-70 lg:h-80 relative">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => setActiveIndex(null)}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              >
                <div className="w-36 h-36 rounded-full p-2 flex items-center justify-center pointer-events-auto">
                  <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                </div>
              </motion.div>
              
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => setActiveIndex(null)}>
                  <defs>
                    <style>{`
                      .recharts-sector { 
                        outline: none !important; 
                        -webkit-tap-highlight-color: transparent;
                        cursor: pointer;
                        transition: filter 200ms ease-in-out;
                      }
                      .recharts-sector:active, .recharts-sector:hover { filter: brightness(1.2); }
                      text.recharts-text { fill: white !important; }
                    `}</style>
                  </defs>
                  <Pie 
                    data={PIE_DATA} 
                    innerRadius="72%" 
                    outerRadius="100%" 
                    paddingAngle={4} 
                    dataKey="value" 
                    stroke="none"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={(e, index) => {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }}
                    isAnimationActive={true}
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={6} />
                    ))}
                  </Pie>
                  <Tooltip 
                    cursor={false}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px', color: '#fff' }} 
                    itemStyle={{ fontSize: '10px', textTransform: 'uppercase', color: '#fff' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full xl:w-1/2 flex flex-col gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2">
                {PIE_DATA.length > 0 ? PIE_DATA.map((item, index) => (
                  <motion.div 
                    key={item.name} 
                    className={`flex flex-col p-2.5 rounded-xl border transition-all duration-200 ${
                        activeIndex === index 
                        ? 'bg-white/20 border-white/30 scale-[1.02] shadow-lg shadow-black/20' 
                        : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[8px] md:text-[9px] text-zinc-400 font-bold uppercase truncate">{item.name}</span>
                    </div>
                    <span className="text-white font-black text-xs lg:text-sm">{item.value}</span>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-10 text-center text-zinc-500 text-[10px] font-black uppercase tracking-widest opacity-50">
                    No data for this period
                  </div>
                )}
              </div>

              {PIE_DATA.length > 0 && (
                <motion.div 
                  className="mt-1 p-3 rounded-2xl bg-linear-to-r from-[#FF8C00]/20 to-transparent border-l-4 border-[#FF8C00] flex items-center justify-between"
                >
                  <div>
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">Top Category</p>
                    <h5 className="text-white text-base lg:text-lg font-black">{TOP_SERVICE.name}</h5>
                  </div>
                  <div className="text-right">
                    <p className="text-[#FF8C00] text-lg lg:text-xl font-black">{TOP_SERVICE.value}</p>
                    <p className="text-[7px] font-bold text-zinc-500 uppercase">Bookings</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* Subcomponents remain unchanged... */
const MoneyCard = ({ label, value, icon, type }) => {
  const isGrowth = type === "growth";
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`flex items-center justify-between p-4 sm:p-5 lg:p-6 rounded-2xl lg:rounded-4xl shadow-xl border border-white/10 ${
      isGrowth ? "bg-linear-to-br from-[#FF8C00] to-[#cc7000] text-white" : "bg-linear-to-br from-[#8B0000] to-[#660000] text-white" 
    }`}>
      <div className="min-w-0 pr-2">
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-1 opacity-80">{label}</p>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-black truncate tracking-tight">{value}</h3>
      </div>
      <div className="bg-white/20 p-2 sm:p-3 rounded-xl backdrop-blur-md shrink-0">
        {React.cloneElement(icon, { size: 20 })}
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-zinc-100 shadow-sm flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-3 w-full"
  >
    <div className={`${color} text-base sm:text-lg lg:text-xl bg-zinc-50 p-2 sm:p-3 rounded-xl shrink-0 mb-1 sm:mb-0`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[6px] sm:text-[8px] lg:text-[9px] font-black text-zinc-400 uppercase tracking-tighter sm:tracking-widest leading-none mb-0.5 truncate">
        {label}
      </p>
      <h3 className="text-xs sm:text-base lg:text-xl font-black text-zinc-900 leading-tight truncate">
        {value}
      </h3>
    </div>
  </motion.div>
);

export default Dashboard;