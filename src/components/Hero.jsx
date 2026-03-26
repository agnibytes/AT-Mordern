import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered fade-up animation for text elements
      gsap.from('.hero-text', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-20 overflow-hidden bg-charcoal"
    >
      {/* Hero Media Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero.jpg" 
          alt="Hero" 
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle gradients to ensure text remains readable in the bottom-left */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-transparent to-transparent"></div>
      </div>

      {/* Content anchored to bottom-left third */}
      <div className="relative z-10 w-full max-w-4xl text-cream">
        <h1 className="flex flex-col gap-2 mb-8">
          <span className="hero-text font-jakarta font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
            Code is Logic.
          </span>
          <span className="hero-text font-garamond italic text-6xl md:text-8xl lg:text-[8rem] font-light leading-none text-cream/90">
            Creativity is the Interface.
          </span>
        </h1>
        
        <p className="hero-text font-outfit text-xl md:text-2xl text-cream/80 max-w-2xl font-light tracking-wide leading-relaxed">
          A developer crafting systems, interfaces, and digital experiences.
        </p>

        <div className="hero-text mt-12">
           <a 
            href="#projects"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-cream text-charcoal font-jakarta font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
           >
             <span className="relative z-10">Explore Artifacts</span>
             <div className="absolute inset-0 h-full w-full bg-clay transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
             <span className="relative z-10 hidden group-hover:inline-block text-cream transition-colors duration-300 ml-2">→</span>
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
