"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Cpu, Zap, Activity } from "lucide-react";
import CodeIntelligence from "./skills/CodeIntelligence";
import CommitRoutine from "./skills/CommitRoutine";
import gsap from "gsap";

const Skills = () => {
  const containerRef = useRef(null);
  const [text, setText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const messages = [
    "Compiling visionary ideas...",
    "Building neural architectures...",
    "Optimizing experience layers...",
    "Securing distributed systems..."
  ];

  useEffect(() => {
    const currentMsg = messages[msgIdx];
    let typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && text === currentMsg) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setMsgIdx((prev) => (prev + 1) % messages.length);
      return;
    }

    const timer = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentMsg.substring(0, prev.length - 1)
          : currentMsg.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, msgIdx]);

  return (
    <section id="skills" className="w-full py-32 px-6 bg-black text-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-white/40 font-medium text-lg tracking-[0.3em] uppercase mb-4"> Technical Stack </h2>
          <h3 className="text-white font-bold text-5xl md:text-6xl tracking-tighter neon-glow"> Mastery <span className="text-purple-500">&</span> Logic<span className="text-purple-500">.</span> </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Code Intelligence */}
          <div className="glass rounded-[2.5rem] p-1 h-[450px] md:h-[550px] flex flex-col items-center justify-center relative overflow-hidden border-white/10 group">
             <div className="absolute top-8 left-8 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-500" />
                <span className="text-white/40 font-bold text-xs uppercase tracking-widest">Intelligence</span>
             </div>
             <CodeIntelligence />
             <div className="absolute bottom-8 left-8 right-8 text-center text-white/40 text-xs font-medium"> Rerouting cognitive stack... </div>
          </div>

          {/* Card 2: Terminal */}
          <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 h-[450px] md:h-[550px] flex flex-col font-mono shadow-2xl relative group overflow-hidden">
             <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <span className="text-white/20 text-[10px] tracking-widest uppercase">node-v20.11.0</span>
             </div>
             
             <div className="flex-1 flex flex-col gap-4 text-sm md:text-base">
                <div className="flex gap-3">
                   <span className="text-purple-500">➜</span>
                   <span className="text-white/40 font-bold italic">~/portfolio</span>
                </div>
                <div className="flex gap-3">
                   <span className="text-white opacity-90 leading-relaxed break-words">
                      {text}
                      <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse align-middle"></span>
                   </span>
                </div>
             </div>

             <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Live Instance</span>
             </div>

             <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>

          {/* Card 3: System Routine */}
          <div className="h-[450px] md:h-[550px]">
             <CommitRoutine />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
