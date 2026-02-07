import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot, doc, getDoc, setDoc, writeBatch, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { 
  RiCalendarEventLine, RiUser3Fill, RiLogoutBoxRLine, RiVipCrownFill, RiEditLine, 
  RiCloseLine, RiSmartphoneLine, RiUserLine, RiCheckboxCircleFill, RiTimeLine, RiMapPin2Line, RiCalendarCheckLine, RiMailLine
} from "react-icons/ri";

const UserPanel = ({ user }) => {
  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isForceOpen, setIsForceOpen] = useState(false); 
  const [newName, setNewName] = useState(user?.displayName || "");
  const [newPhone, setNewPhone] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user?.uid) return;

    const loadUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setNewPhone(data.phone || "");
          setNewName(data.fullName || user.displayName || "");
          // Force open if profile is incomplete
          if (!data.phone || !data.fullName) setIsForceOpen(true);
        } else {
          setIsForceOpen(true);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    loadUserData();

    const q = query(collection(db, "bookings"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;
    if (newPhone.length !== 10) return alert("Phone must be 10 digits");

    setIsUpdating(true);
    try {
      // 1. Update Firebase Auth Profile
      await updateProfile(auth.currentUser, { displayName: newName });
      
      // 2. Update User Document in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        fullName: newName,
        phone: newPhone,
        email: user.email,
        uid: user.uid,
        updatedAt: new Date()
      }, { merge: true });

      // 3. SYNC TO BOOKINGS: Update all bookings so Admin (Events.jsx) sees latest info
      const batch = writeBatch(db);
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((document) => {
        batch.update(doc(db, "bookings", document.id), {
          clientName: newName,
          clientPhone: newPhone,
          clientEmail: user.email // Ensuring email is synced for Events.jsx
        });
      });
      await batch.commit();

      setIsEditOpen(false);
      setIsForceOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error saving profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCur = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency", currency: "INR", maximumFractionDigits: 0,
    }).format(num || 0);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] pt-24 md:pt-36 pb-32 px-4 md:px-6 w-full max-w-360 md:mx-auto">
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ y: -100 }} animate={{ y: 20 }} exit={{ y: -100 }} className="fixed top-24 left-1/2 -translate-x-1/2 z-200 bg-zinc-900 border border-amber-500 text-amber-500 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-black uppercase text-[10px] tracking-widest">
            <RiCheckboxCircleFill size={20} /> Profile & Events Updated
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-6 md:p-10 border border-amber-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group cursor-pointer" onClick={() => setIsEditOpen(true)}>
              <div className="size-28 rounded-4xl bg-linear-to-tr from-amber-600 to-yellow-400 border-4 border-white shadow-2xl flex items-center justify-center text-white rotate-3 transition-transform group-hover:rotate-0">
                <RiUser3Fill size={48} />
              </div>
              <div className="absolute -bottom-2 -right-2 size-10 bg-zinc-900 rounded-full flex items-center justify-center text-amber-400 border-2 border-white"><RiEditLine size={18} /></div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <RiVipCrownFill className="text-amber-500" size={14} />
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.3em]">Premium Member</p>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tighter leading-none mb-2">
                {newName || user?.displayName || "Setup Required"}
              </h1>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start">
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <RiMailLine className="text-amber-500" /> {user?.email}
                </p>
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <RiSmartphoneLine className="text-amber-500" /> {newPhone ? `+91 ${newPhone}` : "Phone Required"}
                </p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"><RiLogoutBoxRLine size={18} /> Log Out</button>
        </div>

        {/* DETAILED TIMELINE */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col items-center justify-center gap-6 mb-12">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 flex items-center gap-3">
              <RiCalendarEventLine className="text-amber-500" /> My Timeline
            </h3>
            
            <div className="flex items-center justify-center w-full">
              <button onClick={() => navigate("/book")} className="group relative w-auto overflow-hidden py-4 px-10 rounded-full font-black uppercase text-[16px] md:text-[18px] tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95 flex justify-center items-center gap-3 cursor-pointer">
                <div className="absolute inset-0 bg-linear-to-r from-[#8B0000] via-[#FF8C00] to-[#8B0000] bg-size-[200%_100%] transition-all duration-700 group-hover:bg-position-[100%_0%]" />
                <span className="relative flex items-center justify-center gap-3">
                  Book Events <RiCalendarCheckLine className="text-2xl md:text-3xl" />
                </span>
              </button>
            </div>
          </div>

          <div className="relative border-l-2 border-amber-200 ml-4 md:ml-10 space-y-12 pb-10">
            {myBookings.length === 0 && !loading && (
                <p className="pl-10 text-zinc-400 font-bold uppercase text-xs tracking-widest">No bookings found yet.</p>
            )}
            {myBookings.map((booking) => (
              <div key={booking.id} className="relative pl-10">
                <div className="absolute -left-2.75 top-0 size-5 rounded-full bg-amber-500 border-4 border-[#fcfaf7] shadow-[0_0_0_4px_rgba(245,158,11,0.1)]" />
                <div className="bg-white rounded-4xl p-6 md:p-8 shadow-sm border border-amber-50 hover:shadow-xl transition-all group">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[9px] font-black uppercase">{booking.eventCategory}</span>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-600'}`}>
                          {booking.status || 'Pending'}
                        </span>
                      </div>
                      <h4 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">{booking.eventDate}</h4>
                      <div className="flex flex-wrap gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><RiTimeLine className="text-amber-500"/> {booking.createdAt?.toDate().toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><RiMapPin2Line className="text-amber-500"/> Venue Confirmed</span>
                      </div>
                    </div>
                    <div className="bg-zinc-50 rounded-2xl p-4 min-w-45 flex flex-col justify-center border border-zinc-100">
                      <div className="flex justify-between mb-2"><p className="text-[8px] font-black text-zinc-400 uppercase">Total Bill</p><p className="text-zinc-900 font-black text-xs">{formatCur(booking.amount)}</p></div>
                      <div className="flex justify-between mb-2"><p className="text-[8px] font-black text-emerald-500 uppercase">Paid</p><p className="text-emerald-600 font-black text-xs">{formatCur(booking.advanceAmount)}</p></div>
                      <div className="h-px bg-zinc-200 my-2"/>
                      <div className="flex justify-between"><p className="text-[8px] font-black text-amber-600 uppercase">Due</p><p className="text-amber-600 font-black text-xs">{formatCur((Number(booking.amount) || 0) - (Number(booking.advanceAmount) || 0))}</p></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SETUP / EDIT MODAL */}
      <AnimatePresence>
        {(isEditOpen || isForceOpen) && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm" onClick={() => !isForceOpen && setIsEditOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl border border-amber-200">
              {!isForceOpen && <button onClick={() => setIsEditOpen(false)} className="absolute top-6 right-6 p-2 bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors"><RiCloseLine size={20} /></button>}
              <div className="text-center mb-8">
                <div className="size-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><RiUserLine size={32} /></div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">{isForceOpen ? "Setup Profile" : "Edit Profile"}</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Required to Sync with your Bookings</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2">Full Name</label>
                  <div className="relative">
                    <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input required maxLength="26" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold outline-none focus:border-amber-400 transition-colors" placeholder="Full Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2">WhatsApp Number</label>
                  <div className="relative">
                    <RiSmartphoneLine className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input required type="tel" maxLength="10" value={newPhone} onChange={e => setNewPhone(e.target.value.replace(/\D/g, ""))} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-12 py-4 text-xs font-bold outline-none focus:border-amber-400 transition-colors" placeholder="10 Digit Mobile" />
                  </div>
                </div>
                <button type="submit" disabled={isUpdating} className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl disabled:opacity-50 active:scale-95 transition-all">
                  {isUpdating ? "Processing..." : "Save & Update Everything"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserPanel;