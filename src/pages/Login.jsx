import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, 
  RiGoogleFill, RiArrowLeftLine, RiDoubleQuotesL, RiUserLine,
  RiUserAddLine, RiInformationLine
} from "react-icons/ri";

import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import Admin from "../admin/Admin";
import UserPanel from "../pages/UserPanel";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: Social, 2: Auth Form, 3: Forgot Password
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Checking if email is verified for non-social logins
        const role = currentUser.email === "stark.pc07@gmail.com" ? "admin" : "user";
        setUser({ ...currentUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      setUser(null);      
      setStep(1);          
      setEmail("");     
      setPassword("");
      setError("");
      setMessage("");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        // SIGN UP LOGIC
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMessage("Verification email sent! Please check your inbox.");
        setIsSignUp(false); // Switch to login after signup
      } else {
        // LOGIN LOGIC
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.includes("auth/user-not-found") ? "User not found." : "Authentication failed. Check details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter your email first.");
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
      setStep(2);
    } catch (err) {
      setError("Failed to send reset email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError("Sign-in interrupted.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="size-8 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#fafafa] flex flex-col items-center justify-center p-4 selection:bg-red-100">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div key="login-view" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg md:max-w-4xl">
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-zinc-100">
              
              {/* Left Side Decor */}
              <div className="hidden md:flex w-[40%] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] p-10 flex-col justify-between text-white relative">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">Benny <br /> Events</h2>
                  <div className="h-1 w-8 bg-white/40 rounded-full" />
                </div>
                <div>
                  <RiDoubleQuotesL className="text-3xl opacity-20 mb-3" />
                  <p className="text-lg font-medium tracking-tight italic opacity-90">
                    {isSignUp ? "Join our community today." : "Secure your spot at the next event."}
                  </p>
                </div>
              </div>

              {/* Right Side Form */}
              <div className="w-full md:w-[60%] p-8 lg:p-12 bg-white min-h-125 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Method Choice */}
                  {step === 1 && (
                    <motion.div key="social" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}>
                      <div className="text-center mb-8">
                        <h2 className="text-xl font-black uppercase tracking-[0.4em] text-zinc-900 mb-1">Welcome</h2>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Select Authentication Method</p>
                      </div>
                      <div className="space-y-3">
                        <button onClick={handleSocialLogin} className="w-full py-4 bg-zinc-900 rounded-xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest text-white transition-all active:scale-95 shadow-md">
                          <RiGoogleFill className="text-lg text-[#FF8C00]" /> Continue with Google
                        </button>
                        <div className="flex items-center gap-3 my-6">
                          <div className="h-px grow bg-zinc-100" />
                          <span className="text-[9px] font-black text-zinc-300 uppercase">or</span>
                          <div className="h-px grow bg-zinc-100" />
                        </div>
                        <button onClick={() => setStep(2)} className="w-full py-4 border-2 border-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest transition-all hover:bg-zinc-50">
                          <RiUserLine className="text-lg" /> Use Portal Credentials
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Login/Signup Form */}
                  {step === 2 && (
                    <motion.div key="email" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
                        <RiArrowLeftLine /> Back
                      </button>
                      <h2 className="text-lg font-black uppercase mb-6 tracking-tight text-zinc-900">
                        {isSignUp ? "Create Account" : "Portal Login"}
                      </h2>
                      
                      <form className="space-y-4" onSubmit={handleEmailAuth}>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Email</label>
                          <div className="relative">
                            <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3 text-xs font-bold outline-none focus:border-[#8B0000]" placeholder="name@example.com" required />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Password</label>
                            {!isSignUp && (
                              <button type="button" onClick={() => setStep(3)} className="text-[9px] font-black text-[#8B0000] uppercase tracking-tighter">Forgot?</button>
                            )}
                          </div>
                          <div className="relative">
                            <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-11 py-3 text-xs font-bold outline-none focus:border-[#8B0000]" placeholder="••••••••" required />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </button>
                          </div>
                        </div>

                        {error && <p className="text-[10px] text-red-600 font-bold uppercase">{error}</p>}
                        {message && <p className="text-[10px] text-emerald-600 font-bold uppercase flex items-center gap-1"><RiInformationLine /> {message}</p>}

                        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-zinc-900 text-white rounded-xl font-black uppercase text-[11px] tracking-widest transition-all shadow-lg active:scale-95">
                          {isSubmitting ? "Processing..." : isSignUp ? "Create My Account" : "Sign In"}
                        </button>

                        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-4">
                          {isSignUp ? "Already have an account? Login" : "New here? Create Account"}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* STEP 3: Forgot Password */}
                  {step === 3 && (
                    <motion.div key="forgot" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}>
                      <button onClick={() => setStep(2)} className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400"><RiArrowLeftLine /> Cancel</button>
                      <h2 className="text-lg font-black uppercase mb-2 tracking-tight">Reset Password</h2>
                      <p className="text-xs text-zinc-400 mb-6">Enter your email and we'll send a reset link.</p>
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-[#8B0000]" placeholder="Enter your email" required />
                        <button type="submit" className="w-full py-4 bg-[#8B0000] text-white rounded-xl font-black uppercase text-[11px] tracking-widest">Send Reset Link</button>
                      </form>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="authenticated-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
            {user.role === "admin" ? (
              <Admin user={user} handleLogout={handleLogout} />
            ) : (
              <UserPanel user={user} handleLogout={handleLogout} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;