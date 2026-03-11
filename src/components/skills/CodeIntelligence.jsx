import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const skills = ["React", "Node", "Python", "System Design"];

export default function CodeIntelligence() {
  const [stack, setStack] = useState(skills);
  const container = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const newStack = [...prev];
        newStack.unshift(newStack.pop());
        return newStack;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stack]);

  return (
    <div
      ref={container}
      className="relative w-full h-full flex items-center justify-center perspective-[1000px] overflow-visible"
    >
      {stack.slice(0, 4).map((skill, i) => (
        <div
          key={skill}
          className="skill-card absolute w-[200px] py-4 rounded-xl bg-white text-center text-xl font-bold text-moss shadow-2xl border border-moss/5 transition-all duration-500"
          style={{
            transform: `translateY(${i * 18}px) scale(${1 - i * 0.08})`,
            zIndex: 10 - i,
            opacity: 1 - i * 0.25,
            filter: `blur(${i * 0.5}px)`
          }}
        >
          {skill}
        </div>
      ))}
      
      {/* Subtle Noise Overlay for premium look */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay rounded-[2rem]">
         <svg className="w-full h-full">
           <filter id="noise-card">
             <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
           </filter>
           <rect width="100%" height="100%" filter="url(#noise-card)" />
         </svg>
      </div>
    </div>
  );
}
