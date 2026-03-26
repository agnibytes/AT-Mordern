"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, GitMerge, Microscope, Rocket, Layers, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Hackathon Champion",
    org: "Global AI Summit",
    date: "Dec 2023",
    icon: Rocket,
    desc: "Competed with elite teams to build a decentralized energy marketplace. Awarded for innovation in smart contract architecture and real-time telemetry visualization.",
    color: "from-blue-600 to-purple-600",
    image: "/assets/exp1.jpg"
  },
  {
    role: "Open Source Contributor",
    org: "Atelier UI / GitHub",
    date: "2023 - Present",
    icon: GitMerge,
    desc: "Architecting high-performance components for cinematic design systems. Established new standards for WebGL integration and fluid micro-interactions.",
    color: "from-purple-600 to-pink-600",
    image: "/assets/exp2.jpg"
  },
  {
    role: "Foundational Lead",
    org: "KDKCE Innovation Lab",
    date: "2022 - 2023",
    icon: Cpu,
    desc: "Led a research initiative focused on edge computing and distributed systems. Built highly interactive prototypes translating complex data into usable insights.",
    color: "from-pink-600 to-red-600",
    image: "/assets/exp3.jpg"
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      // Path Animation
      gsap.fromTo(".evolution-path", 
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: "#experience",
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "center center",
          endTrigger: cards[i + 1],
          end: "top center",
          scrub: true,
          animation: gsap.to(card, {
            scale: 0.8,
            opacity: 0.3,
            filter: "blur(10px)",
            y: -100,
            ease: "none"
          }),
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="bg-black relative pt-32 pb-60 px-6 overflow-hidden">
      <div className="absolute left-1/2 top-40 bottom-40 w-[2px] -translate-x-1/2 z-0 hidden md:block">
        <svg className="w-full h-full" preserveAspectRatio="none">
           <path 
             d="M 1 0 V 2000" 
             className="evolution-path stroke-purple-500/30" 
             strokeWidth="2" 
             fill="none" 
             strokeDasharray="10 10"
           />
           <path 
             d="M 1 0 V 2000" 
             className="evolution-path stroke-purple-500" 
             strokeWidth="2" 
             fill="none" 
             style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' }}
           />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <h2 className="text-white/40 font-medium text-lg tracking-[0.3em] uppercase mb-4">Journey</h2>
        <h3 className="text-white font-bold text-5xl md:text-7xl tracking-tighter neon-glow">Evolution Paths<span className="text-purple-500">.</span></h3>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="sticky top-40 mb-20 w-full"
          >
            <div className="glass rounded-[3rem] overflow-hidden border-white/10 shadow-2xl flex flex-col md:flex-row h-full md:min-h-[400px] backdrop-blur-2xl">
              {/* Image Side */}
              <div className="relative w-full md:w-1/3 min-h-[200px] md:min-h-[400px]">
                <img 
                  src={exp.image} 
                  alt={exp.org} 
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-40 mix-blend-overlay`} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <exp.icon size={64} className="text-white/80" />
                </div>
              </div>

              {/* Content Side */}
              <div className="p-10 md:p-16 flex flex-col justify-center flex-1">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <Badge variant="outline" className="text-purple-400 border-purple-400/30 mb-2"> {exp.org} </Badge>
                     <h4 className="text-white/60 font-mono text-xs tracking-widest uppercase"> {exp.date} </h4>
                   </div>
                   <span className="text-white/10 font-bold text-4xl italic">0{i+1}</span>
                </div>

                <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tighter mb-6"> {exp.role} </h2>
                <p className="text-white/60 text-lg font-light leading-relaxed max-w-xl"> {exp.desc} </p>
                
                <div className="mt-8 flex gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors group">
                        <Layers className="w-4 h-4 text-purple-500 group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 cursor-pointer transition-colors group">
                        <Code2 className="w-4 h-4 text-purple-500 group-hover:scale-125 transition-transform" />
                    </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
