"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });

      tl.from(".phil-elem", {
        y: 80,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="philosophy"
      className="relative w-full min-h-screen py-40 px-6 flex items-center bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1),transparent_70%)]" />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        <div className="relative group">
          <div className="phil-elem">
            <p className="text-purple-500 font-bold text-xs uppercase tracking-[0.4em] mb-10">The Conventional Logic</p>
          </div>
          
          <div className="phil-elem">
            <h2 className="text-white/30 font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-6">
              Most ask:
            </h2>
          </div>
          
          <div className="phil-elem">
            <h2 className="text-white font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none uppercase select-none">
              What<br/>Works<span className="text-purple-500">?</span>
            </h2>
          </div>
        </div>

        <div className="relative md:mt-40">
          <div className="phil-elem">
            <p className="text-white/40 font-bold text-xs uppercase tracking-[0.4em] mb-10">The Visionary Approach</p>
          </div>
          
          <div className="phil-elem">
            <h2 className="text-purple-200/40 italic font-light text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-6">
              I ask:
            </h2>
          </div>
          
          <div className="phil-elem group">
            <h2 className="text-purple-500 font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none neon-glow group-hover:scale-105 transition-transform duration-700 select-none">
              What Is<br/>Possible<span className="text-white text-[0.8em]">?</span>
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
