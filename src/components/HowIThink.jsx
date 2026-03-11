import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Box, Columns3, Search, Sparkles } from 'lucide-react';

const HowIThink = () => {
  const containerRef = useRef(null);
  const steps = [
    {
      title: "Problem",
      desc: "Deconstructing the core requirement before touching code.",
      icon: Search,
      bg: "bg-moss/5",
      color: "text-moss"
    },
    {
      title: "System",
      desc: "Architecting robust foundations and logical flow.",
      icon: Box,
      bg: "bg-charcoal/5",
      color: "text-charcoal"
    },
    {
      title: "Interface",
      desc: "Translating logic into an intuitive, accessible layout.",
      icon: Columns3,
      bg: "bg-clay/5",
      color: "text-clay"
    },
    {
      title: "Experience",
      desc: "Elevating the interaction with cinematic polish.",
      icon: Sparkles,
      bg: "bg-cream/50",
      color: "text-charcoal"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.thinking-step', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
      
      gsap.from('.thinking-arrow', {
         scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
         },
         x: -20,
         opacity: 0,
         duration: 0.5,
         stagger: 0.15,
         delay: 0.4,
         ease: 'back.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-8 md:px-20 bg-moss text-cream relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--tw-colors-cream) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
           <h2 className="font-jakarta text-4xl md:text-5xl font-bold tracking-tight">
             How I <span className="font-garamond italic font-light text-clay text-5xl md:text-6xl">Think</span>
           </h2>
           <p className="font-outfit text-cream/70 max-w-sm text-lg font-light leading-relaxed border-l border-clay pl-4">
             Most engineers map requirements to tools. I map problems to systems, and systems to experiences.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 mt-12 w-full">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col lg:flex-row items-center w-full lg:w-auto gap-4 lg:gap-8">
              
              <div className={`thinking-step relative w-full lg:w-64 aspect-video lg:aspect-square rounded-[2rem] p-8 flex flex-col justify-between items-start isolation-auto group border border-white/10 ${idx === 3 ? 'bg-white text-charcoal shadow-[0_0_40px_rgba(255,255,255,0.1)]' : 'bg-[#24332b]'}`}>
                
                <div className={`p-4 rounded-xl ${step.bg} ${step.color} border border-white/5`}>
                  <step.icon size={24} className={idx === 3 ? 'text-moss' : 'text-cream'} />
                </div>

                <div className="mt-8">
                  <h3 className={`font-jakarta text-xl font-bold mb-2 ${idx === 3 ? 'text-moss' : 'text-cream'}`}>{step.title}</h3>
                  <p className={`font-outfit text-sm font-light leading-relaxed ${idx === 3 ? 'text-charcoal/70' : 'text-cream/60'}`}>
                    {step.desc}
                  </p>
                </div>

              </div>

              {idx < steps.length - 1 && (
                <div className="thinking-arrow hidden lg:flex items-center justify-center text-clay/50">
                  <ArrowRight size={32} />
                </div>
              )}
              {idx < steps.length - 1 && (
                <div className="thinking-arrow lg:hidden flex items-center justify-center text-clay/50 py-4">
                   <ArrowRight size={24} className="transform rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIThink;
