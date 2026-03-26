import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';

const Recognition = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // Image fade up and slight slide
      tl.from(imageRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      // Staggered text reveal
      .from('.recog-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, "-=0.6");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="recognition" 
      className="relative w-full py-40 px-8 md:px-20 bg-black text-white border-t border-white/5 overflow-hidden"
    >
      {/* Targeted Spline Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Spline 
          scene="https://prod.spline.design/2D4vipYzKaG3mxTA/scene.splinecode" 
        />
      </div>
      
      {/* Dark Vignette Overlay for extra text isolation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Side: Portrait Image */}
        <div 
          ref={imageRef} 
          className="w-full md:w-5/12 perspective-[1000px]"
        >
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-moss/5 group transform-gpu transition-transform duration-700 hover:scale-[1.03]">
            <img 
              src="/assets/recognition.jpg" 
              alt="Student Parliament Winner Portrait" 
              className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.95]"
            />
            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-moss/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>

        {/* Right Side: Editorial Context */}
        <div 
          ref={textGroupRef} 
          className="w-full md:w-7/12 flex flex-col items-start relative"
        >
          {/* Text Isolation Overlay */}
          <div className="hidden md:block absolute -inset-10 bg-black/40 backdrop-blur-md rounded-[3rem] -z-10 border border-white/5 shadow-2xl"></div>

          {/* Label */}
          <div className="recog-text overflow-hidden mb-6">
            <p className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#39FF14] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              EVENT | Student Parliament – PICSEL Committee
            </p>
          </div>
          
          {/* Main Heading */}
          <div className="recog-text overflow-hidden mb-8">
            <h2 className="font-jakarta font-bold text-5xl md:text-6xl lg:text-[4.8rem] leading-[1.05] text-[#39FF14] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              Student Parliament <br /> Champion.
            </h2>
          </div>
          
          {/* Description */}
          <div className="recog-text overflow-hidden mb-12">
            <p className="font-outfit text-xl md:text-2xl text-white leading-relaxed max-w-xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <span className="font-bold text-[#39FF14]">Winner of the Student Parliament</span> organized by the PICSEL Committee (CSE). 
              The event simulated real parliamentary debates and leadership decision-making 
              to empower students with democratic thinking and public reasoning skills.
            </p>
          </div>
          
          {/* LinkedIn Button */}
           <div className="recog-text">
             <a 
              href="https://www.linkedin.com/feed/update/urn:li:activity:7431926442927566848/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-black font-jakarta font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
             >
               <span className="relative z-10 transition-colors group-hover:text-white">View Endorsement</span>
               <div className="absolute inset-0 h-full w-full bg-[#39FF14] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
               <span className="relative z-10 hidden group-hover:inline-block text-white transition-colors duration-300 ml-2">→</span>
             </a>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Recognition;
