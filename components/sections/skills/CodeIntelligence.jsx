"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const skills = ["React", "Next.js", "Node", "Python", "Three.js", "GSAP"];

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
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.1
        }
      );
    }, container);

    return () => ctx.revert();
  }, [stack]);

  return (
    <div
      ref={container}
      className="relative w-full h-full flex items-center justify-center perspective-1000 overflow-visible"
    >
      {stack.slice(0, 5).map((skill, i) => (
        <div
          key={skill}
          className="skill-card absolute w-[240px] py-6 rounded-2xl bg-white/5 backdrop-blur-xl text-center text-xl font-bold text-white shadow-2xl border border-white/10 transition-all duration-700"
          style={{
            transform: `translateY(${i * 24}px) scale(${1 - i * 0.1})`,
            zIndex: 10 - i,
            opacity: 1 - i * 0.2,
            filter: `blur(${i * 1}px)`
          }}
        >
          <span className={i === 0 ? "neon-glow text-purple-400" : ""}>{skill}</span>
        </div>
      ))}
    </div>
  );
}
