import React, { memo } from "react";
import { motion } from "framer-motion";

const Background = memo(() => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-[#FAF9F6] overflow-hidden pointer-events-none transform-gpu">
      
      {/* 1. Subtle Paper Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      {/* 2. Top Left - Soft Yellow (Oversized to hide edges) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[20%] h-full w-full"
        style={{
          // Added a middle 40% stop to smooth the falloff and prevent lines
          background: "radial-gradient(circle at center, rgba(254, 240, 138, 0.3) 0%, rgba(254, 240, 138, 0.05) 40%, rgba(254, 240, 138, 0) 80%)",
          willChange: "transform, opacity"
        }}
      />

      {/* 3. Center Right - Amber Warmth (Wider Fade) */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] -right-[20%] h-full w-full"
        style={{
          background: "radial-gradient(circle at center, rgba(120, 53, 15, 0.12) 0%, rgba(120, 53, 15, 0.02) 50%, rgba(120, 53, 15, 0) 85%)",
          willChange: "transform, opacity"
        }}
      />

      {/* 4. Bottom Center - Red Accent (Smoothed) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 h-[80%] w-[120%]"
        style={{
          background: "radial-gradient(circle at center, rgba(185, 28, 28, 0.1) 0%, rgba(185, 28, 28, 0.02) 45%, rgba(185, 28, 28, 0) 80%)",
          willChange: "transform, opacity"
        }}
      />

      {/* 5. The "Anti-Banding" Noise Layer */}
      {/* This tiny amount of grain breaks up the digital lines in gradients */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` 
        }}
      />

      {/* 6. Soft Lighting Blend */}
      <div className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white/30" />
    </div>
  );
});

Background.displayName = "Background";
export default Background;