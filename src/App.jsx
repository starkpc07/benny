import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";  
import About from './pages/About';
import Contact from './pages/Contact';
import Stalls from './pages/Stalls';
import Login from './pages/Login';
import Book from './pages/Book';

const App = () => {
  return (
    <div className="bg-[#FAF9F6]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <div id="events"><Events /></div>
              <div id="stalls"><Stalls /></div>
              <div id="about"><About /></div>
              <div id="contact"><Contact /></div>
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;