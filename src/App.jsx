import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase"; // Adjust path if needed
import { ReactLenis } from 'lenis/react'; 

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";  
import About from './pages/About';
import Contact from './pages/Contact';
import Stalls from './pages/Stalls';
import Gallery from './components/Gallery';
import Admin from './admin/Admin';
import UserPanel from "./pages/UserPanel";
import Book from './pages/Book';
import Login from "./pages/Login"; 
import Background from './components/Background'; 

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isAdmin = currentUser.email === "stark.pc07@gmail.com";
        setUser({ ...currentUser, role: isAdmin ? "admin" : "user" });
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
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  if (loading) return null;

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Background />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar user={user} />
          
          <main className="grow">
            <Routes>
              {/* THE MAIN ONE-PAGE SECTION */}
              <Route path="/" element={
                <div className="bg-transparent">
                  <Home />
                  <section id="events"><Events /></section>
                  <section id="stalls"><Stalls /></section>
                  <section id="gallery"><Gallery /></section>
                  <section id="about"><About /></section>
                  <section id="contact"><Contact /></section>
                </div>
              } />

              {/* AUTH & PANELS */}
              <Route path="/login" element={
                user ? (
                  user.role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/user-panel" />
                ) : (
                  <Login />
                )
              } />

              <Route path="/admin" element={
                user?.role === "admin" ? <Admin user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />
              } />

              <Route path="/user-panel" element={
                user?.role === "user" ? <UserPanel user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />
              } />
              <Route path="/dashboard" element={<UserPanel user={user} />} />
              <Route path="/book" element={user ? <Book user={user} /> : <Navigate to="/login" />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;