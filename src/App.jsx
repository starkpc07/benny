import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ReactLenis } from 'lenis/react'; 

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";  
import About from './pages/About';
import Contact from './pages/Contact';
import Stalls from './pages/Stalls';
import Gallery from './components/Gallery';
import Admin from './pages/Admin';
import Book from './pages/Book';
import Background from './components/Background'; 

const App = () => {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false 
      }}
    >
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Background />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="grow">
            <Routes>
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
              <Route path="/login" element={<Admin />} />
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