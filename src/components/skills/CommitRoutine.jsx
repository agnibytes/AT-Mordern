import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CommitRoutine() {
  const cursor = useRef();
  const days = useRef([]);
  const saveBtn = useRef();

  useEffect(() => {
    // Ensuring references exist
    if (!cursor.current || !saveBtn.current) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    const getRandomDay = () => Math.floor(Math.random() * 28);

    // Initial positioning
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
        const d = getRandomDay(); // Re-choosing for visual variety though the logic above uses same target
        return days.current[d]?.offsetTop + 14;
      },
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(cursor.current, {
      scale: 0.7,
      duration: 0.1
    })
    .to(days.current[Math.floor(Math.random() * 28)], {
      backgroundColor: "#2E4036", // moss
      duration: 0.2
    })
    .to(cursor.current, {
      scale: 1,
      duration: 0.1
    })
    .to(cursor.current, {
      x: () => saveBtn.current.offsetLeft + 40,
      y: () => saveBtn.current.offsetTop + 10,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(cursor.current, {
      scale: 0.8,
      duration: 0.1
    })
    .to(saveBtn.current, {
      backgroundColor: "#CC5833", // clay
      scale: 0.98,
      duration: 0.1
    })
    .to(saveBtn.current, {
      backgroundColor: "#2E4036",
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
    <div className="relative w-full h-full bg-white rounded-[2rem] p-6 shadow-xl flex flex-col justify-between overflow-hidden">
      <div>
        <h3 className="font-outfit font-bold text-[#1A1A1A] mb-4 tracking-tight">Commit Routine</h3>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {[...Array(28)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (days.current[i] = el)}
              className="w-full aspect-square bg-moss/10 rounded-sm"
            />
          ))}
        </div>
      </div>

      <button
        ref={saveBtn}
        className="w-full py-3 rounded-xl bg-moss text-white font-jetbrains text-xs font-medium uppercase tracking-widest shadow-md"
      >
        Commit Changes
      </button>

      <div
        ref={cursor}
        className="absolute w-5 h-5 bg-clay rounded-full pointer-events-none z-50 shadow-lg border-2 border-white/50"
      />
      
      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
         <svg className="w-full h-full">
           <filter id="noise-scheduler">
             <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
           </filter>
           <rect width="100%" height="100%" filter="url(#noise-scheduler)" />
         </svg>
      </div>
    </div>
  );
}
