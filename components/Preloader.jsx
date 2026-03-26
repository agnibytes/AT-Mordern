"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap, Sparkles, Code, Cpu, Layers, Palette, ShieldCheck, Globe } from "lucide-react";

// Premium Icon Map
const STICKER_ICONS = [
  <Zap className="text-yellow-400" />,
  <Sparkles className="text-purple-400" />,
  <Code className="text-blue-400" />,
  <Cpu className="text-emerald-400" />,
  <Layers className="text-pink-400" />,
  <Palette className="text-orange-400" />,
  <ShieldCheck className="text-sky-400" />,
  <Globe className="text-indigo-400" />
];

const Sticker = ({ x, y, rotate, scale, icon, id }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, x: x - 40, y: y - 40, rotate: rotate - 20 }}
      animate={{ 
        scale, 
        opacity: 1, 
        rotate,
      }}
      exit={{ scale: 0.5, opacity: 0, filter: "blur(15px)" }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20
      }}
      className="absolute pointer-events-none z-[1000] select-none"
      style={{ left: 0, top: 0 }}
    >
      <motion.div 
        animate={{
            y: [0, -15, 0],
            rotate: [rotate, rotate + 5, rotate - 5, rotate]
        }}
        transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className="w-16 h-16 p-3 flex items-center justify-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)] transform-gpu"
      >
        <div className="w-full h-full flex items-center justify-center">
            {icon}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stickers, setStickers] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const stickerId = useRef(0);
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth > 1024);
    
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 100,
      duration: 3.5,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.floor(obj.value)),
      onComplete: () => {
          gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.1,
              filter: "blur(40px)",
              duration: 1.5,
              ease: "expo.inOut",
              onComplete: onComplete
          });
      }
    });

    const handleMouseMove = (e) => {
      if (!isDesktop) return;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      
      const dist = Math.hypot(e.clientX - lastMousePos.current.x, e.clientY - lastMousePos.current.y);
      // Logic for spawning on distance or velocity
    };

    // Spawn logic on interval if mouse moved
    const spawnInterval = setInterval(() => {
        if (!isDesktop) return;
        
        // Spawn a sticker if mouse is moving or just at current position
        const newSticker = {
          id: stickerId.current++,
          x: lastMousePos.current.x,
          y: lastMousePos.current.y,
          rotate: (Math.random() - 0.5) * 60,
          scale: Math.random() * 0.3 + 0.9,
          icon: STICKER_ICONS[stickerId.current % STICKER_ICONS.length]
        };

        setStickers(prev => {
          const next = [...prev, newSticker];
          return next.slice(-12);
        });
    }, 250);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        clearInterval(spawnInterval);
    };
  }, [isDesktop, onComplete]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Desktop Stickers Layer */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {stickers.map(s => (
            <Sticker key={s.id} {...s} />
          ))}
        </AnimatePresence>
      </div>

      {/* Hero BG Number (Decorative) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="text-[50vw] font-black leading-none text-white transition-all duration-700">
            {progress.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-[-90deg]">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <motion.circle 
                    cx="50" cy="50" r="48" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="1.5"
                    strokeDasharray="301"
                    strokeDashoffset={301 - (301 * progress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                />
            </svg>
            <div className="text-3xl font-light tracking-[0.2em] text-white">
                {progress}
            </div>
        </div>

        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-white/20" />
                <span className="text-[11px] uppercase tracking-[0.5em] text-white/50 font-medium">System Loaded</span>
                <span className="w-8 h-[1px] bg-white/20" />
            </div>
            
            <div className="h-[2px] w-48 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
        </div>
      </div>

      {/* Side Numbers (Desktop) */}
      <div className="hidden lg:block fixed right-16 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-[0.8em] text-white/20 mb-6 [writing-mode:vertical-rl]">Architectural Load</span>
            <div className="relative h-20 overflow-hidden text-7xl font-bold text-white/90">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={progress}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="block"
                    >
                        {progress.toString().padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <div className="w-[2px] h-32 bg-gradient-to-b from-purple-500/50 to-transparent mt-6 self-end" />
        </div>
      </div>

      {/* Bottom Information */}
      <div className="fixed bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Current Phase</span>
            <span className="text-[12px] text-white/70 font-mono">
                {progress < 30 ? "Booting..." : progress < 70 ? "Linking Neural Grid..." : "Finalizing Experience..."}
            </span>
        </div>
        <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">© 2026 Portfolio</span>
            <div className="w-12 h-[1px] bg-white/10" />
        </div>
      </div>
    </div>
  );
}
