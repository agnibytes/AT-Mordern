import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Philosophy = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for staggered narrative effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });

      // Left column animation
      tl.from('.phil-left-elem', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1
      })
      // Right column staggered slightly later
      .from('.phil-right-elem', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1
      }, "-=0.6")
      // Right side question scale emphasis
      .fromTo('.phil-question', 
        { scale: 1 }, 
        { scale: 1.05, duration: 1.5, ease: 'power2.out' },
        "-=0.8"
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[100vh] py-32 px-8 flex items-center bg-[#1A1A1A] overflow-hidden"
    >
      {/* Background organic noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-0">
         <svg className="w-full h-full">
           <filter id="noise-phil">
             <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
           </filter>
           <rect width="100%" height="100%" filter="url(#noise-phil)" />
         </svg>
      </div>
      
      {/* Subtle central vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1A1A1A_100%)] opacity-80 z-0"></div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
        
        {/* Left Column - The Standard */}
        <div ref={leftRef} className="relative flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0">
          {/* Vertical Accent Line */}
          <div className="hidden md:block absolute left-[-40px] top-[-100px] bottom-[-100px] w-[1px] bg-moss opacity-30"></div>
          
          <div className="phil-left-elem">
            <p className="font-jetbrains text-xs uppercase tracking-[0.2em] mb-8 text-clay">
              The Standard
            </p>
          </div>
          
          <div className="phil-left-elem overflow-hidden py-2">
            <h2 className="font-jakarta font-medium text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-neutral-400">
              Most developers ask:
            </h2>
          </div>
          
          <div className="phil-left-elem overflow-hidden py-2 mt-4 md:mt-6">
            <h2 className="font-jakarta font-bold text-5xl md:text-6xl lg:text-[5.5rem] leading-none text-white whitespace-nowrap">
              What works<span className="text-[1.1em] inline-block -ml-2">?</span>
            </h2>
          </div>
        </div>

        {/* Right Column - The Atelier Approach */}
        <div ref={rightRef} className="relative flex flex-col items-center md:items-start text-center md:text-left pb-12 md:pb-0 md:mt-32">
          {/* Vertical Accent Line */}
          <div className="hidden md:block absolute right-[-40px] top-[-100px] bottom-[-100px] w-[1px] bg-clay opacity-40"></div>
          
          <div className="phil-right-elem">
            <p className="font-jetbrains text-xs uppercase tracking-[0.2em] mb-8 text-[#4A7A63]">
              The Atelier Approach
            </p>
          </div>
          
          <div className="phil-right-elem overflow-hidden py-2">
            <h2 className="font-garamond italic text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] text-cream">
              I ask:
            </h2>
          </div>
          
          <div className="phil-right-elem overflow-hidden py-4 mt-2 md:mt-8">
             <div className="phil-question transform-gpu origin-left">
               <h2 className="font-jakarta font-bold text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.1] text-[#4A7A63]">
                 What can be better?
               </h2>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
