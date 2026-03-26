"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CommitRoutine() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full glass rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between overflow-hidden border-white/10 group cursor-none"
    >
      <div className="relative z-10">
        <h3 className="text-white font-bold text-xl mb-6 tracking-tight">Synaptic Routine</h3>
        <div className="grid grid-cols-7 gap-2">
          {[...Array(49)].map((_, i) => (
            <HeatmapCell key={i} index={i} mousePos={mousePos} />
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-8">
        <div className="w-full py-4 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-400 font-bold text-[10px] uppercase tracking-[0.3em] text-center backdrop-blur-sm group-hover:border-purple-500/40 transition-colors">
            Neutral Grid Synchronized
        </div>
      </div>

      {/* Reactive Glow Follower */}
      <div 
        className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none z-0"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
        }}
      />
    </div>
  );
}

function HeatmapCell({ index, mousePos }) {
  const cellRef = useRef(null);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    if (!cellRef.current) return;
    const rect = cellRef.current.getBoundingClientRect();
    const cellX = rect.left + rect.width / 2;
    const cellY = rect.top + rect.height / 2;
    
    // We need absolute mouse pos for this calculation or pass relative
    // For simplicity, let's use a distance-based intensity
  }, [mousePos]);

  // Using CSS-based proximity for high performance
  return (
    <motion.div
      ref={cellRef}
      whileHover={{ scale: 1.2, backgroundColor: "rgba(168, 85, 247, 0.6)" }}
      className="w-full aspect-square bg-white/5 rounded-sm border border-white/5 transition-all duration-300"
      style={{
          // We can use a custom property for smooth transitions
          boxShadow: intensity > 0 ? `0 0 ${intensity * 10}px rgba(168, 85, 247, 0.4)` : 'none'
      }}
    />
  );
}
