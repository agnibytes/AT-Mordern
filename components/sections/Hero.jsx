"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

const WordRotation = () => {
    const words = ["Visionary", "Creative", "Strategic", "Innovative"];
    const [index, setIndex] = useState(0);
    const wordRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            gsap.to(wordRef.current, {
                y: -10,
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    setIndex((prev) => (prev + 1) % words.length);
                    gsap.fromTo(wordRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
                }
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return <span ref={wordRef} className="inline-block">{words[index]}</span>;
};

const Hero = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(tagRef.current, { y: 20, opacity: 0, duration: 0.8 })
        .from(headingRef.current, { y: 40, opacity: 0, duration: 1 }, "-=0.6")
        .from(descRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(btnsRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

      // Card 3D Tilt
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 10;
        const y = (clientY / innerHeight - 0.5) * -10;
        
        gsap.to(cardRef.current, {
          rotateY: x,
          rotateX: y,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-end overflow-hidden bg-black pr-[8vw] pt-20"
      id="hero"
    >
      {/* Background Image & Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
         <img src="/assets/hero.jpg" alt="" className="w-full h-full object-cover object-center" />
         <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/25 to-black/35 pointer-events-none" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {mounted && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#ff00d4] opacity-60 blur-[1px]"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
              y: ["-20%", "120%"],
              x: i % 2 === 0 ? ["0%", "5%"] : ["0%", "-5%"]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Glass Card Container */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-[520px] p-12 rounded-[20px] bg-black/45 backdrop-blur-[10px] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.45)] flex flex-col items-start perspective-1000"
      >
        <div ref={tagRef} className="hero-tag mb-6">
            <span className="text-[12px] font-medium tracking-[0.35em] text-white/60 uppercase">
                AADITYA TIWARI
            </span>
        </div>

        <h1 ref={headingRef} className="hero-heading text-left select-none mb-4">
          <span className="block text-[64px] font-semibold text-white/60 leading-[1.1]">
            <WordRotation />
          </span>
          <span className="block text-[72px] font-bold text-[#ff00d4] leading-[1.05] [text-shadow:0_0_25px_rgba(255,0,212,0.35)]">
            Architect.
          </span>
        </h1>

        <p
          ref={descRef}
          className="text-white/85 text-[16px] max-w-[420px] text-left font-light leading-[1.6] mb-10"
        >
          Crafting high-performance digital experiences where code meets creativity.
          Specializing in AI-driven interfaces and immersive web systems.
        </p>

        <div ref={btnsRef} className="hero-btns flex flex-wrap gap-5 justify-start">
          <Magnetic strength={0.2}>
            <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-[28px] py-[14px] bg-white text-[#111] font-bold rounded-[28px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Explore Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </button>
          </Magnetic>
          
          <Magnetic strength={0.15}>
            <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-[28px] py-[14px] bg-white/10 border border-white/20 text-white font-bold rounded-[28px] hover:bg-white/20 transition-all backdrop-blur-md flex items-center gap-2"
            >
                <Globe className="w-4 h-4" /> Let's Connect
            </button>
          </Magnetic>
        </div>
      </div>

    </section>
  );
};

export default Hero;
