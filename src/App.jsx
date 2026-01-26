import React from 'react';
import { Routes, Route } from "react-router-dom";
// Update this specific line:
import { ReactLenis } from 'lenis/react'; 

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";  
import About from './pages/About';
import Contact from './pages/Contact';
import Stalls from './pages/Stalls';
import Login from './pages/Login';
import Book from './pages/Book';
import Background from './components/Background'; 

const App = () => {
  return (
    // 'root' prop is essential for global smooth scrolling
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Background />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="grow">
            <Routes>
              <Route path="/" element={
                <div className="bg-transparent">
                  <Home />
                  <div id="events"><Events /></div>
                  <div id="stalls"><Stalls /></div>
                  <div id="about"><About /></div>
                  <div id="contact"><Contact /></div>
                </div>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/book" element={<Book />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;