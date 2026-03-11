import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full py-32 px-8 md:px-20 bg-cream"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Portrait & Monospace Panel */}
        <div className="about-content relative group mx-auto w-full max-w-sm lg:max-w-md">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            {/* Using the avatar provided in context mapped into a cinematic style */}
            <div className="absolute inset-0 bg-moss/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none"></div>
            <img 
              src="/assets/profile.jpg" 
              alt="Aaditya Tiwari Portrait" 
              className="w-full h-full object-cover grayscale-[30%] contrast-110 transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          </div>
          
          {/* Developer Traits Panel */}
          <div className="absolute -bottom-10 -right-4 lg:-right-10 bg-charcoal text-cream p-6 rounded-[2rem] shadow-xl border border-white/10 backdrop-blur-md transform transition-transform duration-500 group-hover:-translate-y-2">
            <h3 className="font-jetbrains text-xs text-clay mb-3 uppercase tracking-widest">Developer Profile</h3>
            <ul className="font-jetbrains text-sm space-y-2 text-cream/80">
              <li className="flex gap-4">
                <span className="text-moss">Language:</span> 
                <span>JavaScript / Python</span>
              </li>
              <li className="flex gap-4">
                <span className="text-moss">Focus:</span> 
                <span>Systems + UI</span>
              </li>
              <li className="flex gap-4">
                <span className="text-moss">Mindset:</span> 
                <span>Curiosity Driven</span>
              </li>
              <li className="flex gap-4 items-center">
                <span className="text-moss">Status:</span> 
                <span className="flex items-center gap-2">Building <span className="w-2 h-2 rounded-full bg-clay animate-pulse"></span></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Bio Text */}
        <div className="lg:pl-12 mt-16 lg:mt-0 flex flex-col justify-center">
          <h2 className="about-content font-jakarta text-4xl md:text-5xl font-bold tracking-tight mb-8 text-moss">
            Engineering with <br /> <span className="text-charcoal font-garamond italic font-light text-5xl md:text-6xl">an Artistic Eye.</span>
          </h2>
          
          <div className="about-content space-y-6 font-outfit text-lg md:text-xl text-charcoal/80 leading-relaxed font-light">
            <p>
              Hi, I'm <strong className="font-semibold text-charcoal">Aaditya Tiwari</strong> — a developer currently navigating the complexities of software engineering at KDKCE Nagpur. To me, code isn't just utility; it's a medium of expression.
            </p>
            <p>
              I thrive on building scalable systems while maintaining a relentless focus on the user interface. Whether executing robust backend architectures or crafting pixel-perfect frontend experiences, I believe the best engineering feels effortless to the user.
            </p>
            <p className="font-garamond italic text-2xl text-moss border-l-2 border-clay pl-6 py-2 my-8">
              "Learning fast, building fast, and failing forward to discover what works."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
