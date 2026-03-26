"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-animate", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-40 px-6 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Visuals */}
        <div className="about-animate relative w-full aspect-square md:aspect-[4/5] max-w-md mx-auto">
          <div className="absolute inset-0 border border-purple-500/30 rounded-[3rem] translate-x-4 translate-y-4 -z-1" />
          <div className="relative h-full w-full rounded-[3rem] overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 shadow-2xl border border-white/10 group">
             <img
                src="/assets/profile.jpg"
                alt="Aaditya Tiwari"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>

          <div className="absolute -bottom-10 -right-4 md:-right-12 glass p-8 rounded-[2rem] shadow-2xl border-white/20 transform transition-transform hover:-translate-y-2 max-w-[280px]">
             <h4 className="text-purple-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">Current Vector</h4>
             <ul className="space-y-3 text-sm font-medium text-white/80">
                <li className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                   Designing AI Systems
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                   Immersive Web UX
                </li>
                <li className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
                   Scalable Architecture
                </li>
             </ul>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="relative">
          <h2 className="about-animate text-white/40 font-medium text-lg tracking-[0.3em] uppercase mb-6">
            The Philosophy
          </h2>
          <h3 className="about-animate text-white font-bold text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-10 neon-glow">
            Engineering<br />
            with <span className="text-purple-500 italic">Prestige.</span>
          </h3>

          <div className="about-animate space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed">
            <p>
              Hi, I'm <strong className="text-white font-bold">Aaditya Tiwari</strong>. For me, code is more than a tool—it's a medium for sculpting the digital landscape.
            </p>
            <p>
              Deeply invested in the intersection of <span className="text-white font-medium italic">High Performance</span> and <span className="text-white font-medium italic">High Aesthetics</span>. I build systems that don't just work, but inspire.
            </p>
            <div className="border-l-2 border-purple-500/50 pl-8 py-2 italic text-2xl text-purple-200/80 font-light">
               "If a system doesn't look like the future, it doesn't function like the future."
            </div>
            <p className="text-base text-white/40">
                Currently building at KDKCE Nagpur. Driven by curiosity, fueled by logic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
