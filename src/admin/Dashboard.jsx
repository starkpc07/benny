import React from "react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis,
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { 
  RiPieChartLine, 
  RiStackLine, 
  RiCalendarCheckLine, 
  RiMoneyDollarCircleLine, 
  RiLineChartLine 
} from "react-icons/ri";

const REVENUE_DATA = [
  { month: "Jan", amount: 4000 },
  { month: "Feb", amount: 3000 },
  { month: "Mar", amount: 5000 },
  { month: "Apr", amount: 4500 },
  { month: "May", amount: 6000 },
  { month: "Jun", amount: 5500 },
];

const PIE_DATA = [
  { name: "Wedding", value: 400, color: "#8B0000" },
  { name: "Catering", value: 300, color: "#FF8C00" },
  { name: "Corporate", value: 200, color: "#4338ca" },
  { name: "Birthday", value: 250, color: "#dc2626" },
  { name: "Stage", value: 150, color: "#4b5563" },
  { name: "Decor", value: 200, color: "#f97316" },
];

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-4 md:space-y-6 pb-10 w-full max-w-full overflow-x-hidden px-1"
    >
      {/* 1. MOBILE ONLY: MONEY FOOTER ON TOP */}
      <div className="flex md:hidden flex-row gap-2 overflow-x-auto no-scrollbar pb-2">
        <MoneyCard 
          label="Balance" 
          value="$12,400" 
          icon={<RiMoneyDollarCircleLine size={20} />} 
          isDark={false} 
        />
        <MoneyCard 
          label="Annual" 
          value="$142,850" 
          icon={<RiLineChartLine size={20} />} 
          isDark={true} 
        />
      </div>

      {/* 2. STATS SECTION */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        
        {/* STATS ROW (Top on Mobile, Sidebar on Desktop) */}
        <div className="order-1 lg:order-2 w-full lg:w-[240px] flex flex-row lg:flex-col gap-2 md:gap-4 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0">
          <StatCard icon={<RiPieChartLine />} label="Active" value="12" color="text-[#8B0000]" />
          <StatCard icon={<RiStackLine />} label="Pending" value="05" color="text-[#FF8C00]" />
          <StatCard icon={<RiCalendarCheckLine />} label="Upcoming" value="24" color="text-zinc-900" />
        </div>

        {/* 3. CHARTS SECTION (Middle) */}
        <div className="order-2 lg:order-1 flex-grow space-y-4 w-full lg:w-[calc(100%-260px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* PIE CHART - NOW FIRST */}
            <div className="bg-zinc-900 p-5 md:p-6 rounded-[2rem] shadow-xl flex flex-col h-[280px] md:h-[320px]">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Service Mix</h4>
              <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={PIE_DATA} innerRadius="60%" outerRadius="85%" paddingAngle={5} dataKey="value" stroke="none">
                      {PIE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3">
                {PIE_DATA.slice(0, 3).map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="size-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[7px] text-zinc-400 font-bold uppercase">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REVENUE GRAPH - NOW SECOND */}
            <div className="bg-white p-5 md:p-6 rounded-[2rem] border border-zinc-100 shadow-sm flex flex-col h-[280px] md:h-[320px]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Revenue Flow</h4>
                <RiLineChartLine className="text-[#8B0000]" />
              </div>
              <div className="flex-grow w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B0000" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '10px' }} />
                    <Area type="monotone" dataKey="amount" stroke="#8B0000" strokeWidth={3} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. DESKTOP ONLY: MONEY FOOTER AT BOTTOM */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        <MoneyCard 
          label="Balance" 
          value="$12,400" 
          icon={<RiMoneyDollarCircleLine size={28} />} 
          isDark={false} 
        />
        <MoneyCard 
          label="Annual" 
          value="$142,850" 
          icon={<RiLineChartLine size={28} />} 
          isDark={true} 
        />
      </div>
    </motion.div>
  );
};

/* Reusable Money Card Component */
const MoneyCard = ({ label, value, icon, isDark }) => (
  <div className={`flex flex-1 items-center justify-between p-4 md:p-5 rounded-xl md:rounded-[2rem] shadow-sm min-w-[150px] md:min-w-0 ${
    isDark 
    ? "bg-gradient-to-br from-[#8B0000] to-[#FF8C00] text-white shadow-lg" 
    : "bg-white border border-zinc-100"
  }`}>
    <div>
      <p className={`text-[7px] md:text-[9px] font-black uppercase tracking-widest ${isDark ? "text-white/60" : "text-zinc-400"}`}>
        {label}
      </p>
      <h3 className="text-sm md:text-2xl font-black">{value}</h3>
    </div>
    <div className={isDark ? "text-white" : "text-[#8B0000]"}>
      {icon}
    </div>
  </div>
);

/* Mobile-Tight StatCard */
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-zinc-100 shadow-sm flex flex-1 lg:flex-none items-center gap-3 lg:flex-col lg:items-start lg:gap-1 min-w-[110px] lg:min-w-0">
    <div className={`${color} text-base md:text-lg bg-zinc-50 p-2 rounded-lg`}>{icon}</div>
    <div>
      <p className="text-[7px] md:text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">{label}</p>
      <h3 className="text-sm md:text-lg font-black text-zinc-900 leading-tight">{value}</h3>
    </div>
  </div>
);

export default Dashboard;