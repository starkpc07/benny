import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, 
  RiGoogleFill, RiLogoutCircleRLine, RiVerifiedBadgeFill, RiArrowLeftLine,
  RiDoubleQuotesL
} from "react-icons/ri";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Sign-in failed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="size-8 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col items-center justify-center p-4 pt-24 selection:bg-red-100">
      <AnimatePresence mode="wait">
        {!user ? (
          /* CONTAINER SIZE REDUCED TO 800px max */
          <div className="w-full max-w-200">
            
            {/* MOBILE ONLY BACK BUTTON */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 flex justify-between items-center px-4 md:hidden"
            >
              <Link to="/" className="flex items-center gap-2 text-[17px] font-black uppercase tracking-widest text-zinc-500">
                <RiArrowLeftLine size={14} /> Back
              </Link>
            </motion.div>

            {/* MAIN COMPACT CONTAINER */}
            <motion.div 
              key="login-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row overflow-hidden border border-zinc-100"
            >
              
              {/* LEFT SIDE: BRANDING (Compact Version) */}
              <div className="hidden md:flex w-[40%] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] p-10 flex-col justify-between text-white relative">
                <div className="absolute inset-0 bg-black/5" />
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">
                    Benny <br /> Events
                  </h2>
                  <div className="h-1 w-8 bg-white/40 rounded-full" />
                </div>

                <div className="relative z-10">
                  <RiDoubleQuotesL className="text-4xl opacity-20 mb-3" />
                  <p className="text-lg font-medium tracking-tight italic opacity-90 leading-snug">
                    Access your command center to manage the magic.
                  </p>
                </div>

                <div className="absolute -bottom-10 -left-10 size-48 bg-white/10 blur-[60px] rounded-full" />
              </div>

              {/* RIGHT SIDE: LOGIN FORM */}
              <div className="w-full md:w-[60%] p-8 md:p-12 ">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-black uppercase tracking-[0.4em] text-zinc-900 mb-1">Login</h2>
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Authorized Personnel</p>
                </div>

                <form className="space-y-4" onSubmit={handleEmailLogin}>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Email</label>
                    <div className="relative">
                      <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input    
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all" 
                        placeholder="Enter your registered mail" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black tracking-widest text-zinc-400 ml-1">Password</label>
                    <div className="relative">
                      <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-11 py-3.5 text-xs font-bold text-zinc-900 outline-none focus:bg-white focus:border-[#8B0000] transition-all" 
                        placeholder="••••••••" 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#8B0000]"
                      >
                        {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-[9px] text-white bg-red-600 font-bold uppercase tracking-widest py-2.5 px-4 rounded-lg text-center">{error}</p>}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-linear-to-r from-[#8B0000] to-[#FF8C00] text-white hover:brightness-110 disabled:opacity-50 rounded-xl font-black uppercase text-[11px] tracking-[0.2em] transition-all active:scale-[0.98] flex justify-center items-center mt-4 shadow-lg shadow-red-900/10"
                  >
                    {isSubmitting ? (
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : "Sign In"}
                  </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                  <div className="h-px grow bg-zinc-100" />
                  <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">or</span>
                  <div className="h-px grow bg-zinc-100" />
                </div>

                <button 
                  onClick={handleGoogleLogin} 
                  className="w-full py-3.5 bg-zinc-900 hover:bg-black rounded-xl flex items-center justify-center gap-3 font-black uppercase text-[9px] tracking-widest text-white transition-all active:scale-[0.98]"
                >
                  <RiGoogleFill className="text-lg text-[#FF8C00]" /> Continue with Google
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* --- PROFILE VIEW (Compact) --- */
          <motion.div 
            key="profile-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white border-b-10 border-[#8B0000] rounded-[2.5rem] p-10 shadow-2xl mx-4"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-linear-to-tr from-[#8B0000] to-[#FF8C00] rounded-full blur-xl opacity-20" />
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                  className="size-24 rounded-full border-4 border-white shadow-xl relative z-10 object-cover" 
                  alt="avatar" 
                />
                <RiVerifiedBadgeFill className="absolute -bottom-1 -right-1 text-[#FF8C00] bg-white rounded-full text-3xl z-20" />
              </div>
              
              <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 leading-none">
                {user.displayName || "Admin"}
              </h1>
              <p className="text-[10px] font-black text-[#8B0000] uppercase tracking-[0.4em] mt-3 mb-8">Portal Access</p>

              <div className="w-full space-y-3 mb-8">
                <div className="bg-zinc-50 px-5 py-4 rounded-2xl flex justify-between items-center border border-zinc-100">
                  <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Email</span>
                  <span className="text-xs font-bold text-zinc-800 truncate ml-4">{user.email}</span>
                </div>
              </div>

              <button 
                onClick={() => signOut(auth)} 
                className="flex items-center gap-3 px-10 py-4 rounded-full bg-zinc-900 text-white font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all active:scale-95"
              >
                <RiLogoutCircleRLine size={18} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;