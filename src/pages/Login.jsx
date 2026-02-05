import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, 
  RiGoogleFill, RiArrowLeftLine, RiDoubleQuotesL, RiFacebookFill, RiUserLine 
} from "react-icons/ri";

// Import your page components
import Admin from "../pages/Admin";
import UserPanel from "../pages/UserPanel";

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setStep(1);
    setUsername("");
    setPassword("");
  };

  // MOCK LOGIN LOGIC
  const handleMockLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        setUser({ email: "admin@benny.com", displayName: "Head Admin", role: "admin" });
      } else if (username === "user" && password === "user") {
        setUser({ email: "client@benny.com", displayName: "Event Guest", role: "user" });
      } else {
        setError("Invalid! Use 'admin' or 'user' for both fields.");
      }
      setIsSubmitting(false);
    }, 1000);
  };

  // MOCK SOCIAL LOGIN
  const handleSocialLogin = (platform) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ email: `social-${platform}@demo.com`, displayName: `${platform} User`, role: "user" });
      setLoading(false);
    }, 1000);
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
          <motion.div key="login-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-lg md:max-w-4xl">
            <div className="w-full bg-white rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-zinc-100">
              
              {/* BRANDING SIDE */}
              <div className="hidden md:flex w-[40%] bg-linear-to-br from-[#8B0000] via-[#FF8C00] to-[#8B0000] p-10 flex-col justify-between text-white relative">
                <div className="relative z-10">
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">Benny <br /> Events</h2>
                  <div className="h-1 w-8 bg-white/40 rounded-full" />
                </div>
                <div className="relative z-10">
                  <RiDoubleQuotesL className="text-3xl opacity-20 mb-3" />
                  <p className="text-lg font-medium tracking-tight italic opacity-90">
                    {step === 1 ? "Start your journey with us." : "Credentials verified. Access granted."}
                  </p>
                </div>
              </div>

              {/* FORM SIDE */}
              <div className="w-full md:w-[60%] p-8 lg:p-12 bg-white">
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div key="s1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}>
                      <div className="text-center mb-8">
                        <h2 className="text-xl font-black uppercase tracking-[0.4em] text-zinc-900 mb-1">Welcome</h2>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Select Method</p>
                      </div>
                      <div className="space-y-3">
                        <button onClick={() => handleSocialLogin('Google')} className="w-full py-4 bg-zinc-900 rounded-xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest text-white transition-all active:scale-95">
                          <RiGoogleFill className="text-lg text-[#FF8C00]" /> Continue with Google
                        </button>
                        <button onClick={() => handleSocialLogin('Facebook')} className="w-full py-4 bg-[#1877F2] rounded-xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest text-white transition-all active:scale-95">
                          <RiFacebookFill className="text-xl" /> Continue with Facebook
                        </button>
                        
                        <div className="flex items-center gap-3 my-6">
                          <div className="h-px grow bg-zinc-100" />
                          <span className="text-[9px] font-black text-zinc-300 uppercase">or</span>
                          <div className="h-px grow bg-zinc-100" />
                        </div>

                        <button onClick={() => setStep(2)} className="w-full py-4 border-2 border-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-widest transition-all">
                          <RiUserLine className="text-lg" /> Use Username
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                      <button onClick={() => setStep(1)} className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#8B0000]">
                        <RiArrowLeftLine /> Back
                      </button>
                      
                      <form className="space-y-4" onSubmit={handleMockLogin}>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Username</label>
                          <div className="relative">
                            <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input 
                              type="text" 
                              value={username} 
                              onChange={(e) => setUsername(e.target.value)} 
                              className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-4 py-3.5 text-xs font-bold outline-none focus:border-[#8B0000]" 
                              placeholder="admin or user" 
                              required 
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Password</label>
                            <button type="button" className="text-[9px] font-black text-[#8B0000] uppercase hover:underline">Forgot?</button>
                          </div>
                          <div className="relative">
                            <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input 
                              type={showPassword ? "text" : "password"} 
                              value={password} 
                              onChange={(e) => setPassword(e.target.value)} 
                              className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-xl pl-11 pr-11 py-3.5 text-xs font-bold outline-none focus:border-[#8B0000]" 
                              placeholder="admin or user" 
                              required 
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                            </button>
                          </div>
                        </div>

                        {error && <p className="text-[9px] text-white bg-red-600 font-bold uppercase py-2 px-4 rounded-lg text-center">{error}</p>}
                        
                        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-linear-to-r from-[#8B0000] to-[#FF8C00] text-white rounded-xl font-black uppercase text-[11px] tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/10">
                          {isSubmitting ? "Authenticating..." : "Login"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          /* REDIRECT TO IMPORTED PAGES */
          <div key="authenticated-view" className="w-full h-full">
            {user.role === "admin" ? (
              <Admin user={user} handleLogout={handleLogout} />
            ) : (
              <UserPanel user={user} handleLogout={handleLogout} />
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;