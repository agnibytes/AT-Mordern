"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Box, Columns3, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Deconstruct",
    desc: "Peeling back the layers of a problem to find its fundamental core before writing a single line of code.",
    icon: Search,
    color: "text-blue-400",
    glow: "shadow-[0_0_20px_rgba(96,165,250,0.2)]",
  },
  {
    title: "Architect",
    desc: "Designing robust, scalable systems that serve as the indestructible foundation for the future.",
    icon: Box,
    color: "text-purple-400",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
  },
  {
    title: "Interface",
    desc: "Translating abstract logic into a fluid, intuitive interface that feels like an extension of the user.",
    icon: Columns3,
    color: "text-pink-400",
    glow: "shadow-[0_0_20px_rgba(244,114,182,0.2)]",
  },
  {
    title: "Refine",
    desc: "The final layer of cinematic polish. Micro-interactions and performance optimization that define prestige.",
    icon: Sparkles,
    color: "text-orange-400",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.2)]",
  },
];

const HowIThink = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".thinking-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="howithink" className="py-40 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.05),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-white/40 font-medium text-lg tracking-[0.3em] uppercase mb-4">The Methodology</h2>
            <h3 className="text-white font-bold text-5xl md:text-6xl tracking-tighter neon-glow">Cognitive Flow<span className="text-purple-500">.</span></h3>
          </div>
          <p className="text-white/40 max-w-sm text-lg font-light leading-relaxed border-l border-purple-500/30 pl-6">
            Most engineers map requirements to tools. I map problems to systems, and systems to experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="thinking-card relative group">
              <div className={cn(
                "h-full glass p-10 rounded-[2.5rem] border-white/10 transition-all duration-500 hover:-translate-y-2 group-hover:border-purple-500/30",
                step.glow
              )}>
                <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 w-fit mb-8", step.color)}>
                  <step.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-purple-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-8 flex items-center justify-between">
                   <span className="text-white/10 font-black text-4xl">0{idx + 1}</span>
                   {idx < steps.length - 1 && (
                      <ChevronRight className="text-white/20 group-hover:text-purple-500/50 transition-colors" />
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIThink;
