"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Recognition = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".recog-animate", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="recognition"
      className="relative w-full py-40 px-6 bg-black text-white overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        
        {/* Left: Achievement Portrait */}
        <div className="recog-animate relative w-full lg:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10">
           <img
              src="/assets/recognition.jpg"
              alt="Recognition"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
           />
           
        </div>

        {/* Right: Context */}
        <div className="w-full lg:w-1/2">
          <h2 className="recog-animate text-purple-500 font-bold text-sm uppercase tracking-[0.4em] mb-8">Official Endorsement</h2>
          <h3 className="recog-animate text-white font-bold text-5xl md:text-7xl tracking-tighter leading-none mb-10 neon-glow">
            Leadership <br /> & Diplomacy<span className="text-purple-500">.</span>
          </h3>
          
          <div className="recog-animate space-y-8 text-lg md:text-xl text-white/60 font-light leading-relaxed">
            <p>
              Awarded for excellence in the <span className="text-white font-medium">Student Parliament</span> organized by the PICSEL Committee. 
            </p>
            <p>
              Demonstrated exceptional skills in democratic reasoning, policy deconstruction, and strategic leadership. A testament to the belief that logic is the ultimate power in any system—human or digital.
            </p>
            
            <Button asChild className="rounded-full bg-white text-black hover:bg-purple-600 hover:text-white transition-all px-10 py-6 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               <a href="https://www.linkedin.com/feed/update/urn:li:activity:7431926442927566848/" target="_blank">
                  View Endorsement <ExternalLink className="ml-2 w-4 h-4" />
               </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Recognition;
