import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { 
  RiDeleteBin6Line, 
  RiCheckboxCircleLine, 
  RiWallet3Line,
  RiHandCoinLine,
  RiLockLine,
  RiCalendarEventLine,
  RiBriefcaseLine,
  RiRestaurantLine
} from "react-icons/ri";

const Events = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const formatCur = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num || 0);
  };

  const updateField = async (id, field, value) => {
    try {
      await updateDoc(doc(db, "bookings", id), { [field]: value });
      setEditingId(null);
    } catch (err) { console.error(err); }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Delete record?")) await deleteDoc(doc(db, "bookings", id));
  };

  const stats = {
    revenue: bookings.reduce((acc, curr) => {
      if (curr.paymentStatus === "Fully Paid") return acc + (Number(curr.amount) || 0);
      return acc + (Number(curr.advanceAmount) || 0);
    }, 0),
    totalAdvance: bookings.reduce((acc, curr) => acc + (Number(curr.advanceAmount) || 0), 0),
    receivable: bookings.reduce((acc, curr) => {
      const total = Number(curr.amount) || 0;
      const paid = curr.paymentStatus === "Fully Paid" ? total : (Number(curr.advanceAmount) || 0);
      return acc + (total - paid);
    }, 0),
  };

  const getEventStyle = (s) => {
    if (s === "Confirmed") return "bg-zinc-900 text-white border-zinc-800";
    if (s === "Completed") return "bg-zinc-100 text-zinc-500 border-zinc-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  const getPaymentStyle = (s) => {
    if (s === "Fully Paid") return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s === "Partial") return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getCategoryStyle = (cat) => {
    if (cat === "Corporate") return "bg-purple-50 text-purple-600 border-purple-100";
    if (cat === "Catering") return "bg-orange-50 text-orange-600 border-orange-100";
    return "bg-zinc-100 text-zinc-600 border-zinc-200";
  };

  if (loading) return <div className="p-20 text-center text-sm font-black uppercase text-zinc-400 animate-pulse tracking-widest">Syncing Cloud Database...</div>;

  return (
    <div className="w-full space-y-6 max-w-7xl mx-auto p-4 bg-zinc-50/30 min-h-screen">
      
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-emerald-600 to-emerald-700 p-6 rounded-[2.5rem] text-white shadow-lg">
          <div className="flex justify-between items-start">
            <p className="text-[11px] font-black uppercase opacity-80 tracking-widest">Paid Revenue</p>
            <RiCheckboxCircleLine size={24} className="opacity-40" />
          </div>
          <h2 className="text-3xl font-black mt-2 tracking-tight">{formatCur(stats.revenue)}</h2>
        </div>

        <div className="bg-linear-to-br from-blue-600 to-blue-700 p-6 rounded-[2.5rem] text-white shadow-lg">
          <div className="flex justify-between items-start">
            <p className="text-[11px] font-black uppercase opacity-80 tracking-widest">Advance Collected</p>
            <RiHandCoinLine size={24} className="opacity-40" />
          </div>
          <h2 className="text-3xl font-black mt-2 tracking-tight">{formatCur(stats.totalAdvance)}</h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-[2.5rem] text-white shadow-lg border-b-8 border-amber-500">
          <div className="flex justify-between items-start">
            <p className="text-[11px] font-black uppercase opacity-80 tracking-widest">Balance Pending</p>
            <RiWallet3Line size={24} className="text-amber-500" />
          </div>
          <h2 className="text-3xl font-black mt-2 text-amber-400 tracking-tight">{formatCur(stats.receivable)}</h2>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-[3rem] border border-zinc-200 shadow-xl overflow-hidden">
        <table className="w-full text-left text-[12px] font-bold">
          <thead className="bg-zinc-50/50 border-b border-zinc-100">
            <tr>
              <th className="px-8 py-6 uppercase text-zinc-400 tracking-widest">Client & Date</th>
              <th className="px-8 py-6 uppercase text-zinc-400 text-center tracking-widest">Category</th>
              <th className="px-8 py-6 uppercase text-zinc-400 text-center tracking-widest">Total Deal</th>
              <th className="px-8 py-6 uppercase text-zinc-400 text-center tracking-widest">Advance</th>
              <th className="px-8 py-6 uppercase text-zinc-400 text-center tracking-widest">Status Controls</th>
              <th className="px-8 py-6 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {bookings.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/80 transition-all">
                <td className="px-8 py-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-zinc-900 text-[15px] uppercase font-black leading-tight">{item.clientName || "Guest"}</span>
                    <span className="text-[11px] text-zinc-400 uppercase flex items-center gap-1.5 font-bold">
                      <RiCalendarEventLine className="text-blue-500" /> {item.eventDate}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <select 
                    value={item.eventCategory || "Catering"} 
                    onChange={(e) => updateField(item.id, "eventCategory", e.target.value)}
                    className={`text-[10px] font-black uppercase py-1.5 px-3 rounded-full border transition-all cursor-pointer ${getCategoryStyle(item.eventCategory)}`}
                  >
                    <option value="Catering">Catering</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
                <td className="px-8 py-5 text-center">
                  <span onClick={() => setEditingId(item.id + 'amt')} className="text-zinc-900 text-[14px] font-black cursor-pointer hover:underline decoration-2 underline-offset-4">
                    {editingId === item.id + 'amt' ? (
                      <input autoFocus className="w-24 border-b-2 border-zinc-900 outline-none bg-transparent" defaultValue={item.amount} onBlur={(e) => updateField(item.id, "amount", e.target.value)} />
                    ) : formatCur(item.amount)}
                  </span>
                </td>
                <td className="px-8 py-5 text-center">
                  <div className="relative inline-block">
                    <input 
                      disabled={item.paymentStatus !== "Partial"}
                      type="number"
                      className={`w-32 text-center border-2 rounded-2xl py-2 text-[12px] font-black outline-none transition-all ${item.paymentStatus === 'Partial' ? 'bg-white border-blue-200 focus:border-blue-600 shadow-sm' : 'bg-zinc-100 border-transparent text-zinc-300 cursor-not-allowed opacity-40'}`}
                      value={item.advanceAmount || ""}
                      onChange={(e) => updateField(item.id, "advanceAmount", e.target.value)}
                    />
                    {item.paymentStatus !== "Partial" && <RiLockLine className="absolute top-1/2 -translate-y-1/2 right-3 text-zinc-300" size={16} />}
                  </div>
                </td>
                <td className="px-8 py-5 text-center space-x-3">
                  <select 
                    value={item.paymentStatus || "Unpaid"} 
                    onChange={(e) => updateField(item.id, "paymentStatus", e.target.value)}
                    className={`text-[10px] font-black uppercase py-2.5 px-4 rounded-2xl border outline-none cursor-pointer ${getPaymentStyle(item.paymentStatus)}`}
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Partial">Partial</option>
                    <option value="Fully Paid">Fully Paid</option>
                  </select>
                  <select 
                    value={item.status || "Pending"} 
                    onChange={(e) => updateField(item.id, "status", e.target.value)}
                    className={`text-[10px] font-black uppercase py-2.5 px-4 rounded-2xl border outline-none cursor-pointer ${getEventStyle(item.status)}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-8 py-5 text-right">
                  <button onClick={() => deleteBooking(item.id)} className="p-3 text-zinc-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST - COMPACT & BOLD */}
      <div className="grid grid-cols-1 gap-5 md:hidden">
        {bookings.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-zinc-200 shadow-md space-y-5">
            {/* Header: Name, Category & Total */}
            <div className="flex justify-between items-start border-b border-zinc-50 pb-4">
              <div className="space-y-1.5">
                <div className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border inline-block ${getCategoryStyle(item.eventCategory)}`}>
                  {item.eventCategory || "Catering"}
                </div>
                <h4 className="text-[18px] font-black text-zinc-900 uppercase leading-none tracking-tight">{item.clientName}</h4>
                <p className="text-[11px] font-bold text-zinc-400 uppercase flex items-center gap-1">
                  <RiCalendarEventLine className="text-zinc-300" /> {item.eventDate}
                </p>
              </div>
              <div className="bg-zinc-900 px-4 py-2 rounded-2xl text-center shadow-lg shadow-zinc-200">
                <p className="text-[14px] font-black text-white">{formatCur(item.amount)}</p>
                <p className="text-[8px] font-black text-zinc-400 uppercase leading-none mt-0.5">Total</p>
              </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-400 uppercase ml-2">Event Status</p>
                <select 
                  value={item.status || "Pending"} 
                  onChange={(e) => updateField(item.id, "status", e.target.value)}
                  className={`w-full text-[11px] font-black uppercase py-3.5 rounded-3xl border outline-none text-center shadow-sm ${getEventStyle(item.status)}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-400 uppercase ml-2">Pay Status</p>
                <select 
                  value={item.paymentStatus || "Unpaid"} 
                  onChange={(e) => updateField(item.id, "paymentStatus", e.target.value)}
                  className={`w-full text-[11px] font-black uppercase py-3.5 rounded-3xl border outline-none text-center shadow-sm ${getPaymentStyle(item.paymentStatus)}`}
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Partial">Partial</option>
                  <option value="Fully Paid">Fully Paid</option>
                </select>
              </div>
            </div>

            {/* Advance & Delete Row */}
            <div className="flex items-center gap-3 bg-zinc-50 p-2 rounded-4xl">
              <div className="flex-1 relative">
                <input 
                  disabled={item.paymentStatus !== "Partial"}
                  type="number"
                  placeholder="ADVANCE"
                  className={`w-full text-center py-3 rounded-3xl text-[12px] font-black border transition-all ${item.paymentStatus === 'Partial' ? 'border-blue-200 bg-white text-blue-700 shadow-inner' : 'bg-transparent border-transparent text-transparent opacity-0'}`}
                  value={item.advanceAmount || ""}
                  onChange={(e) => updateField(item.id, "advanceAmount", e.target.value)}
                />
                {item.paymentStatus === 'Partial' && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-blue-400 font-black">₹</span>}
              </div>
              <button onClick={() => deleteBooking(item.id)} className="p-4 bg-white text-red-500 rounded-full shadow-sm border border-red-50 active:scale-90 transition-transform">
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;