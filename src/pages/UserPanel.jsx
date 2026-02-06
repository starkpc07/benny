import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { 
  RiFileList3Line, RiLogoutBoxRLine, RiCalendarEventLine,
  RiCalendarCheckLine, RiUser3Fill, RiAddCircleLine,
  RiMoneyDollarCircleLine
} from "react-icons/ri";

const UserPanel = ({ user }) => {
  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user?.uid) return;

    // Connects to the same "bookings" collection managed by Events/Dashboard
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyBookings(docs);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error("Firestore Error:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatDate = (dateStr) => {
    try {
      if (!dateStr) return { month: "TBD", day: "--" };
      const date = new Date(dateStr);
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return { month: months[date.getMonth()], day: date.getDate() };
    } catch { return { month: "ERR", day: "!!" }; }
  };

  // Helper to format currency for the user
  const formatCur = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 md:pt-32 pb-32 px-4 md:px-10 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl">
        
        {/* PROFILE HEADER */}
        <div className="bg-white rounded-4xl p-6 md:p-10 shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="size-24 rounded-full bg-zinc-900 border-2 border-white shadow-lg flex items-center justify-center text-white overflow-hidden shrink-0">
              {user?.photoURL ? <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" /> : <RiUser3Fill size={40} />}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">{user?.displayName || "Guest User"}</h1>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => signOut(auth)} className="flex items-center gap-2 px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl transition-colors text-[10px] font-black uppercase tracking-widest">
            <RiLogoutBoxRLine size={16} /> Logout
          </button>
        </div>

        {/* BOOKING SECTION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
              <RiCalendarEventLine className="text-orange-500" /> My Schedule
            </h3>
            {myBookings.length > 0 && (
              <button onClick={() => navigate("/book")} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg active:scale-95">
                <RiAddCircleLine size={16} /> Book New
              </button>
            )}
          </div>
          
          <div className="grid gap-4">
            {loading ? (
              <div className="bg-white p-20 rounded-[3rem] border border-zinc-100 flex flex-col items-center justify-center gap-4">
                <div className="size-10 border-4 border-zinc-100 border-t-orange-500 rounded-full animate-spin" />
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Syncing Records...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center text-red-600 text-[10px] font-black uppercase tracking-widest">
                {error}
              </div>
            ) : myBookings.length > 0 ? (
                <AnimatePresence mode="popLayout">
                  {myBookings.map((booking) => {
                    const { month, day } = formatDate(booking.eventDate);
                    // Determine which status color to show based on Admin input
                    const isConfirmed = booking.status === 'Confirmed';
                    const isCompleted = booking.status === 'Completed';

                    return (
                      <motion.div key={booking.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-6 rounded-3xl border border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:shadow-md transition-all">
                        <div className="flex items-center gap-5 w-full">
                          <div className="size-14 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center text-white font-black text-[10px] leading-tight shrink-0">
                            <span className="text-orange-500">{month}</span>
                            <span>{day}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-tight">
                              {booking.eventCategory || booking.eventType || "Event"}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 mt-1">
                               <div className="flex items-center gap-1.5">
                                 <span className={`size-1.5 rounded-full ${isConfirmed ? 'bg-green-500' : isCompleted ? 'bg-zinc-300' : 'bg-orange-500 animate-pulse'}`} />
                                 <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                                   {booking.status || 'Processing'}
                                 </p>
                               </div>
                               {/* Payment Indicator Bridge */}
                               <div className="flex items-center gap-1.5 border-l border-zinc-100 pl-3">
                                 <RiMoneyDollarCircleLine className={booking.paymentStatus === 'Fully Paid' ? 'text-emerald-500' : 'text-zinc-300'} size={12} />
                                 <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                                   {booking.paymentStatus || 'Unpaid'}
                                 </p>
                               </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-50">
                          <div className="text-left sm:text-right pr-4">
                            <p className="text-[14px] font-black text-zinc-900 leading-none">{formatCur(booking.amount)}</p>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">Total Deal</p>
                          </div>
                          <RiFileList3Line className="text-zinc-200 group-hover:text-orange-500 transition-colors" size={24} />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
            ) : (
              /* EMPTY STATE */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 md:p-20 rounded-[3rem] border-2 border-dashed border-zinc-100 flex flex-col items-center justify-center text-center">
                <div className="size-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-500">
                  <RiCalendarCheckLine size={48} />
                </div>
                <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tight mb-2">Ready to plan?</h4>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest max-w-75 mb-8 leading-relaxed">Secure your date for an unforgettable experience.</p>
                <button onClick={() => navigate("/book")} className="group relative overflow-hidden py-5 px-12 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95">
                  <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] transition-all duration-700 group-hover:bg-position-[100%_0%]" />
                  <span className="relative">Create First Booking</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserPanel;