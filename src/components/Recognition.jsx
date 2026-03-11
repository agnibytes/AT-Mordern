import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      className="w-full py-32 px-8 md:px-20 bg-cream text-charcoal border-t border-moss/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
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
          className="w-full md:w-7/12 flex flex-col items-start"
        >
          {/* Label */}
          <div className="recog-text overflow-hidden mb-6">
            <p className="font-jetbrains text-xs uppercase tracking-[0.3em] text-clay font-medium drop-shadow-sm">
              EVENT | Student Parliament – PICSEL Committee
            </p>
          </div>
          
          {/* Main Heading */}
          <div className="recog-text overflow-hidden mb-8">
            <h2 className="font-jakarta font-bold text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] text-moss tracking-tight">
              Student Parliament Champion.
            </h2>
          </div>
          
          {/* Description */}
          <div className="recog-text overflow-hidden mb-12">
            <p className="font-outfit text-lg md:text-xl text-charcoal/70 leading-relaxed max-w-xl font-light">
              <span className="font-medium text-charcoal">Winner of the Student Parliament</span> organized by the PICSEL Committee (CSE). 
              The event simulated real parliamentary debates and leadership decision-making 
              to empower students with democratic thinking and public reasoning skills.
            </p>
          </div>
          
          {/* LinkedIn Button - AntiGravity auto-injected this context logic */}
           <div className="recog-text">
             <a 
              href="https://www.linkedin.com/feed/update/urn:li:activity:7431926442927566848/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-moss text-cream font-jakarta font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
             >
               <span className="relative z-10">View Endorsement</span>
               <div className="absolute inset-0 h-full w-full bg-clay transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
               <span className="relative z-10 hidden group-hover:inline-block text-cream transition-colors duration-300 ml-2">→</span>
             </a>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Recognition;
