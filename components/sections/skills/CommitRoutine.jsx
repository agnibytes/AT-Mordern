"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CommitRoutine() {
  const cursor = useRef();
  const days = useRef([]);
  const saveBtn = useRef();

  useEffect(() => {
    if (!cursor.current || !saveBtn.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    const getRandomDay = () => Math.floor(Math.random() * 28);

    gsap.set(cursor.current, { x: 50, y: 50, opacity: 0 });

    tl.to(cursor.current, {
        opacity: 1,
        duration: 0.3
    })
    .to(cursor.current, {
      x: () => {
        const d = getRandomDay();
        return days.current[d]?.offsetLeft + 14;
      },
      y: () => {
        const d = getRandomDay();
        return days.current[d]?.offsetTop + 14;
      },
      duration: 1,
      ease: "power3.inOut"
    })
    .to(cursor.current, {
      scale: 0.7,
      duration: 0.1
    })
    .to(days.current[Math.floor(Math.random() * 28)], {
      backgroundColor: "#a855f7", // purple-500
      duration: 0.3
    })
    .to(cursor.current, {
      scale: 1,
      duration: 0.1
    })
    .to(cursor.current, {
      x: () => saveBtn.current.offsetLeft + 40,
      y: () => saveBtn.current.offsetTop + 10,
      duration: 1,
      ease: "power4.out"
    })
    .to(cursor.current, {
      scale: 0.8,
      duration: 0.1
    })
    .to(saveBtn.current, {
      backgroundColor: "#7c3aed",
      scale: 0.95,
      duration: 0.1
    })
    .to(saveBtn.current, {
      backgroundColor: "#6b21a8",
      scale: 1,
      duration: 0.2
    })
    .to(cursor.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="relative w-full h-full glass rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between overflow-hidden border-white/10 group">
      <div>
        <h3 className="text-white font-bold text-xl mb-6 tracking-tight">System Routine</h3>

        <div className="grid grid-cols-7 gap-2 mb-8">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (days.current[i] = el)}
              className="w-full aspect-square bg-white/5 rounded-md border border-white/5 transition-colors group-hover:border-purple-500/20"
            />
          ))}
        </div>
      </div>

      <button
        ref={saveBtn}
        className="w-full py-4 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 font-bold text-xs uppercase tracking-widest shadow-lg transition-all hover:bg-purple-600 hover:text-white"
      >
        Optimize Architecture
      </button>

      <div
        ref={cursor}
        className="absolute w-6 h-6 bg-purple-500 rounded-full pointer-events-none z-50 shadow-[0_0_15px_rgba(168,85,247,0.5)] border-2 border-white/50"
      />
    </div>
  );
}
