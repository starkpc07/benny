import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  RiDeleteBin6Line,
  RiCheckboxCircleLine,
  RiWallet3Line,
  RiHandCoinLine,
  RiCalendarEventLine,
  RiWhatsappLine,
  RiUser3Line,
  RiEditLine,
  RiTimeLine,
  RiMailLine,
  RiMapPin2Line,
  RiCloseLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMessage3Line,
} from "react-icons/ri";

const Events = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = bookings.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(bookings.length / eventsPerPage);

  const formatCur = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num || 0);
  };

  const updateField = async (id, field, value) => {
    try {
      await updateDoc(doc(db, "bookings", id), { [field]: value });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (deleteConfirm) {
      await deleteDoc(doc(db, "bookings", deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const stats = {
    revenue: bookings.reduce(
      (acc, curr) =>
        curr.paymentStatus === "Fully Paid"
          ? acc + (Number(curr.amount) || 0)
          : acc + (Number(curr.advanceAmount) || 0),
      0,
    ),
    totalAdvance: bookings.reduce(
      (acc, curr) => acc + (Number(curr.advanceAmount) || 0),
      0,
    ),
    receivable: bookings.reduce(
      (acc, curr) =>
        (Number(curr.amount) || 0) -
        (curr.paymentStatus === "Fully Paid"
          ? Number(curr.amount)
          : Number(curr.advanceAmount) || 0) +
        acc,
      0,
    ),
  };

  if (loading)
    return (
      <div className="p-20 text-center text-xl font-black uppercase text-zinc-400 animate-pulse tracking-widest">
        Syncing Cloud Database...
      </div>
    );

  return (
    <div className="w-full space-y-8 max-w-7xl mx-auto p-4 bg-zinc-50/30 min-h-screen pb-20">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <StatCard
          title="Paid Revenue"
          value={stats.revenue}
          icon={<RiCheckboxCircleLine />}
          color="from-emerald-600 to-emerald-700"
        />
        <StatCard
          title="Amount Recieved"
          value={stats.totalAdvance}
          icon={<RiHandCoinLine />}
          color="from-blue-600 to-blue-700"
        />
        <StatCard
          title="Pending"
          value={stats.receivable}
          icon={<RiWallet3Line />}
          color="from-zinc-800 to-zinc-900"
          border="border-b-2 md:border-b-4 border-amber-500"
          isPending
        />
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden xl:block space-y-8">
        {currentEvents.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[3rem] border border-zinc-200 shadow-sm overflow-hidden hover:shadow-xl transition-all border-t-8 border-t-zinc-900"
          >
            <div className="flex items-center justify-between p-8 border-b border-zinc-50">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg rotate-3">
                  <RiUser3Line size={32} />
                </div>
                <div>
                  <h4 className="font-black text-2xl uppercase tracking-tighter text-zinc-900">
                    {item.clientName || "Guest User"}
                  </h4>
                  <div className="flex items-center gap-4 mt-1">
                    <a href={`https://wa.me/91${item.clientPhone}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm text-green-600 font-black">
                      <RiWhatsappLine size={18} /> {item.clientPhone}
                    </a>
                    <span className="text-zinc-300">|</span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400 font-bold">
                      <RiMailLine /> {item.clientEmail || "No Email"}
                    </span>
                    {item.location && (
                      <>
                        <span className="text-zinc-300">|</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-400 font-bold uppercase tracking-wider">
                          <RiMapPin2Line className="text-red-400" /> {item.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setEditModal(item)} className="p-4 bg-zinc-50 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-2xl transition-all"><RiEditLine size={22} /></button>
                <button onClick={() => setDeleteConfirm(item.id)} className="p-4 bg-red-50 text-red-300 hover:text-red-600 hover:bg-red-100 rounded-2xl transition-all"><RiDeleteBin6Line size={22} /></button>
              </div>
            </div>

            {/* FINANCIALS & STATUS (Desktop) - Keeping your original logic */}
            <div className="grid grid-cols-3 items-center px-8 py-4 bg-zinc-50/50 border-b border-zinc-100">
              <div className="flex items-center gap-3 font-black text-zinc-900 uppercase">
                <RiCalendarEventLine className="text-blue-500" size={20} />
                <span className="text-sm text-zinc-400 mr-2">Event Date:</span>
                <span className="text-lg">{item.eventDate || "Not Set"}</span>
              </div>
              <div className="flex items-center justify-center gap-3 font-black uppercase">
                <span className="text-xs text-zinc-400">Status:</span>
                <select value={item.status || "Pending"} onChange={(e) => updateField(item.id, "status", e.target.value)} className="bg-white border border-zinc-200 rounded-xl px-4 py-2 text-xs outline-none shadow-sm cursor-pointer">
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 bg-zinc-900 py-8 px-8 text-center">
              <div className="border-r border-zinc-800">
                <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Total Contract</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-zinc-500 font-black text-xl">₹</span>
                  <input type="number" className="bg-transparent text-emerald-400 text-2xl font-black text-center w-32 outline-none" value={item.amount || ""} onChange={(e) => updateField(item.id, "amount", e.target.value)} />
                </div>
              </div>
              <div className="border-r border-zinc-800">
                <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Amount Received</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-zinc-500 font-black text-xl">₹</span>
                  <input type="number" className="bg-transparent text-blue-400 text-2xl font-black text-center w-32 outline-none" value={item.advanceAmount || ""} onChange={(e) => updateField(item.id, "advanceAmount", e.target.value)} />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Pending Balance</p>
                <p className="text-amber-500 text-2xl font-black">{formatCur((item.amount || 0) - (item.advanceAmount || 0))}</p>
              </div>
            </div>

            <div className="px-8 py-6 bg-amber-50/30 border-t border-zinc-100">
                <div className="flex items-start gap-3">
                    <RiMessage3Line className="text-amber-600 mt-1 shrink-0" size={20} />
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-amber-700 tracking-widest">Client Requirements</p>
                        <p className="text-zinc-600 text-sm font-medium leading-relaxed italic">{item.requirements || "No specific requirements."}</p>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-center px-6 py-6 border-t border-zinc-50">
               <select value={item.paymentStatus || "Unpaid"} onChange={(e) => updateField(item.id, "paymentStatus", e.target.value)} className={`py-3 px-10 rounded-2xl text-[11px] text-center font-black uppercase outline-none cursor-pointer border-2 transition-all ${getPaymentStyle(item.paymentStatus)}`}>
                 <option value="Unpaid">Unpaid</option>
                 <option value="Partial">Partial Payment</option>
                 <option value="Fully Paid">Fully Paid</option>
               </select>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE & TABLET VIEW - FIXED GMAIL VIEW */}
      <div className="xl:hidden grid grid-cols-1 gap-6">
        {currentEvents.map((item) => (
          <div key={item.id} className="bg-white rounded-[3rem] border border-zinc-200 shadow-xl overflow-hidden border-t-8 border-t-zinc-900 flex flex-col h-full">
            <div className="p-6 pb-4 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                  <RiUser3Line size={24} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-lg font-black uppercase leading-tight text-zinc-900 truncate max-w-37.5">
                    {item.clientName || "Guest"}
                  </h4>
                  <div className="flex flex-col gap-0.5">
                    <a href={`tel:${item.clientPhone}`} className="text-xs font-black text-zinc-500 flex items-center gap-1">
                      <RiWhatsappLine className="text-green-500" /> {item.clientPhone}
                    </a>
                    {/* FIXED EMAIL DISPLAY HERE */}
                    <p className="text-[10px] font-bold text-zinc-400 flex items-center gap-1 break-all">
                      <RiMailLine className="shrink-0" /> {item.clientEmail || "No Email"}
                    </p>
                    {item.location && (
                       <p className="text-[9px] font-black text-red-500 uppercase tracking-tighter flex items-center gap-1">
                        <RiMapPin2Line className="shrink-0" /> {item.location}
                       </p>
                    )}
                  </div>
                </div>
              </div>
              <a href={`https://wa.me/91${item.clientPhone}`} className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner active:scale-90 shrink-0">
                <RiWhatsappLine size={24} />
              </a>
            </div>

            {/* Mobile Stats & Selects remain same as your design */}
            <div className="grid grid-cols-2 border-y border-zinc-100 bg-zinc-50/50">
              <div className="p-5 border-r border-zinc-100 text-center">
                <p className="text-[9px] font-black uppercase text-zinc-400 mb-1 italic">Event Date</p>
                <p className="text-sm font-black text-zinc-900">{item.eventDate || "---"}</p>
              </div>
              <div className="p-5 text-center">
                <p className="text-[9px] font-black uppercase text-zinc-400 mb-1 italic">Event Status</p>
                <select onChange={(e) => updateField(item.id, "status", e.target.value)} value={item.status || "Pending"} className="text-xs font-black uppercase text-zinc-900 bg-transparent outline-none">
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 bg-zinc-900 p-5 text-center gap-2">
               {/* Financial inputs here... */}
               <div>
                <p className="text-[8px] font-black uppercase text-zinc-500 mb-1">Total</p>
                <input type="number" value={item.amount || 0} onChange={(e) => updateField(item.id, "amount", e.target.value)} className="bg-transparent text-white text-lg font-black w-full text-center outline-none" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-zinc-500 mb-1">Advance</p>
                <input type="number" value={item.advanceAmount || 0} onChange={(e) => updateField(item.id, "advanceAmount", e.target.value)} className="bg-transparent text-blue-400 text-lg font-black w-full text-center outline-none" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase text-zinc-500 mb-1">Balance</p>
                <p className="text-amber-500 text-lg font-black truncate">{formatCur((item.amount || 0) - (item.advanceAmount || 0))}</p>
              </div>
            </div>

            <div className="flex bg-white border-t border-zinc-100 mt-auto">
              <button onClick={() => setEditModal(item)} className="flex-1 py-5 flex items-center justify-center gap-2 text-xs font-black uppercase text-zinc-400 border-r border-zinc-100"><RiEditLine size={18} /> Edit</button>
              <button onClick={() => setDeleteConfirm(item.id)} className="flex-1 py-5 flex items-center justify-center gap-2 text-xs font-black uppercase text-red-400"><RiDeleteBin6Line size={18} /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL - ADDED LOCATION FIELD */}
      {editModal && (
        <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-md z-100 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[3rem] p-10 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setEditModal(null)} className="absolute top-6 right-6 p-2 bg-zinc-100 rounded-full"><RiCloseLine size={24} /></button>
            <div className="text-center">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Update Profile</h3>
              <p className="text-zinc-400 font-bold text-sm">Modify client identification details</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Full Client Name</label>
                <input className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-3xl p-4 text-lg font-black outline-none focus:border-zinc-900 transition-all" value={editModal.clientName || ""} onChange={(e) => setEditModal({ ...editModal, clientName: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Contact Number</label>
                <input className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-3xl p-4 text-lg font-black outline-none focus:border-zinc-900 transition-all" value={editModal.clientPhone || ""} onChange={(e) => setEditModal({ ...editModal, clientPhone: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Email Address</label>
                <input className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-3xl p-4 text-lg font-black outline-none focus:border-zinc-900 transition-all" value={editModal.clientEmail || ""} onChange={(e) => setEditModal({ ...editModal, clientEmail: e.target.value })} />
              </div>
              {/* NEW LOCATION FIELD */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-zinc-400 ml-4 flex items-center gap-1"><RiMapPin2Line /> Event Location</label>
                <input className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-3xl p-4 text-lg font-black outline-none focus:border-zinc-900 transition-all" placeholder="Enter City/Venue" value={editModal.location || ""} onChange={(e) => setEditModal({ ...editModal, location: e.target.value })} />
              </div>
              <button
                onClick={() => {
                  updateField(editModal.id, "clientName", editModal.clientName);
                  updateField(editModal.id, "clientPhone", editModal.clientPhone);
                  updateField(editModal.id, "clientEmail", editModal.clientEmail);
                  updateField(editModal.id, "location", editModal.location);
                  setEditModal(null);
                }}
                className="w-full bg-zinc-900 text-white py-5 rounded-3xl text-sm font-black uppercase shadow-xl hover:bg-black transition-all mt-4"
              >
                Sync Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL (Remains same) */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-100 flex items-center justify-center p-4">
          <div className="bg-white w-full max-sm:max-w-xs max-w-sm rounded-[3rem] p-10 text-center space-y-8 shadow-2xl">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto animate-bounce"><RiDeleteBin6Line size={48} /></div>
            <h3 className="text-2xl font-black uppercase tracking-tighter">Confirm Deletion</h3>
            <div className="flex flex-col gap-3">
              <button onClick={handleDelete} className="w-full py-5 bg-red-600 text-white rounded-2xl text-xs font-black uppercase">Delete Permanently</button>
              <button onClick={() => setDeleteConfirm(null)} className="w-full py-5 bg-zinc-100 text-zinc-500 rounded-2xl text-xs font-black uppercase">Keep Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ... StatCard and getPaymentStyle subcomponents remain the same ...
const StatCard = ({ title, value, icon, color, border = "", isPending = false }) => (
  <div className={`bg-linear-to-br ${color} p-4 md:p-5 rounded-3xl text-white shadow-lg ${border} flex flex-col justify-between`}>
    <div className="flex justify-between items-center mb-1">
      <p className="text-[10px] md:text-[11px] font-black uppercase opacity-70 tracking-wider">{title}</p>
      <div className="opacity-40 scale-90">{icon}</div>
    </div>
    <h2 className={`text-xl md:text-2xl font-black tracking-tighter ${isPending ? "text-amber-400" : ""}`}>
      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)}
    </h2>
  </div>
);

const getPaymentStyle = (s) => {
  if (s === "Fully Paid") return "text-emerald-400 border-emerald-900 ";
  if (s === "Partial") return "text-blue-400 border-blue-900 ";
  return "text-red-400 border-red-900";
};

export default Events;