import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { 
  RiCalendarEventLine, RiUser3Fill, RiAddCircleLine, 
  RiLogoutBoxRLine, RiVipCrownFill, RiEditLine, 
  RiCloseLine, RiSmartphoneLine, RiUserLine, RiCheckboxCircleFill, RiLockPasswordLine
} from "react-icons/ri";

const UserPanel = ({ user }) => {
  const navigate = useNavigate();
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isForceOpen, setIsForceOpen] = useState(false); // For new users
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
          
          // Force profile completion if data is missing
          if (!data.phone || !data.fullName) {
            setIsForceOpen(true);
          }
        } else {
          // New user logic: Create doc and force setup
          setIsForceOpen(true);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };
    loadUserData();

    // Listen for bookings (Synced field names with Events.jsx)
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMyBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, ""); 
    if (val.length <= 10) setNewPhone(val);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;
    if (newPhone.length !== 10) return alert("Phone must be exactly 10 digits");
    if (newName.length > 26) return alert("Name cannot exceed 26 characters");

    setIsUpdating(true);
    try {
      // 1. Update Firebase Auth
      await updateProfile(auth.currentUser, { displayName: newName });
      
      // 2. Update Firestore (Using setDoc with merge to handle new/existing users)
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        fullName: newName,
        phone: newPhone,
        email: user.email,
        uid: user.uid,
        updatedAt: new Date()
      }, { merge: true });

      setIsEditOpen(false);
      setIsForceOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error("Update failed:", err);
      alert("System Error: Could not save profile.");
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
            <RiCheckboxCircleFill size={20} /> Profile Secured
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* HEADER */}
        <div className="relative overflow-hidden bg-white rounded-[2.5rem] p-6 md:p-10 border border-amber-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group cursor-pointer" onClick={() => setIsEditOpen(true)}>
              <div className="size-28 rounded-4xl bg-linear-to-tr from-amber-600 to-yellow-400 border-4 border-white shadow-2xl flex items-center justify-center text-white rotate-3">
                <RiUser3Fill size={48} />
              </div>
              <div className="absolute -bottom-2 -right-2 size-10 bg-zinc-900 rounded-full flex items-center justify-center text-amber-400 border-2 border-white"><RiEditLine size={18} /></div>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <RiVipCrownFill className="text-amber-500" size={14} />
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.3em]">Premium Member</p>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-zinc-900 uppercase tracking-tighter leading-none">{user?.displayName || "Setup Required"}</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => signOut(auth)} className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest"><RiLogoutBoxRLine size={18} /> Log Out</button>
        </div>

        {/* TIMELINE */}
        <div className="space-y-8">
          <div className="flex items-center justify-between px-4 border-b border-amber-100 pb-4">
            <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 flex items-center gap-3"><RiCalendarEventLine className="text-amber-500" /> Event Timeline</h3>
            <button onClick={() => navigate("/book")} className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"><RiAddCircleLine size={16} /> New Booking</button>
          </div>

          <div className="grid gap-12">
            {myBookings.map((booking) => (
              <div key={booking.id} className="animated-border-box">
                <div className="relative bg-white rounded-[2.4rem] overflow-hidden z-10">
                  <div className="p-8 flex items-center gap-6">
                    <div className="size-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100"><RiCalendarEventLine size={24} /></div>
                    <div>
                      <p className="text-[10px] font-black text-amber-600 uppercase mb-1">{booking.eventCategory}</p>
                      <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tighter">{booking.eventDate}</h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 bg-zinc-900 p-6 text-center divide-x divide-white/5">
                    <div><p className="text-[8px] font-black text-zinc-500 uppercase">Total</p><p className="text-white font-black">{formatCur(booking.amount)}</p></div>
                    <div><p className="text-[8px] font-black text-emerald-500 uppercase">Paid</p><p className="text-emerald-400 font-black">{formatCur(booking.advanceAmount)}</p></div>
                    <div><p className="text-[8px] font-black text-amber-500 uppercase">Balance</p><p className="text-amber-500 font-black">{formatCur(Number(booking.amount || 0) - Number(booking.advanceAmount || 0))}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* COMPULSORY SETUP & EDIT MODAL */}
      <AnimatePresence>
        {(isEditOpen || isForceOpen) && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm" onClick={() => !isForceOpen && setIsEditOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl border border-amber-200">
              {!isForceOpen && <button onClick={() => setIsEditOpen(false)} className="absolute top-6 right-6 p-2 bg-zinc-50 rounded-full"><RiCloseLine size={20} /></button>}
              <div className="text-center mb-8">
                <div className="size-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><RiUserLine size={32} /></div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">{isForceOpen ? "Complete Profile" : "Edit Profile"}</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Verification Required for Bookings</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2">Full Name (Max 26 Char)</label>
                  <div className="relative">
                    <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input required maxLength="26" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold outline-none focus:border-amber-400" placeholder="Enter Full Name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2">WhatsApp Number (10 Digits)</label>
                  <div className="relative">
                    <RiSmartphoneLine className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input required type="tel" maxLength="10" value={newPhone} onChange={handlePhoneChange} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl pl-12 pr-12 py-4 text-xs font-bold outline-none focus:border-amber-400" placeholder="9876543210" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-300">{newPhone.length}/10</span>
                  </div>
                </div>
                <button type="submit" disabled={isUpdating} className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 disabled:opacity-50">
                  {isUpdating ? "Securing Account..." : "Confirm & Save"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animated-border-box {
          padding: 2px; border-radius: 2.5rem;
          background: linear-gradient(90deg, #d97706, #fbbf24, #d97706);
          background-size: 200% 200%;
          animation: gold-spin 4s linear infinite;
        }
        @keyframes gold-spin { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
      `}</style>
    </div>
  );
};

export default UserPanel;