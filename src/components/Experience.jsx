import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, GitMerge, Microscope } from 'lucide-react';

const Experience = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const experiences = [
    {
      role: 'Hackathon Champion',
      org: 'Global AI Summit',
      date: 'Dec 2023',
      icon: Code2,
      isHackathon: true,
      image: '/assets/exp1.jpg'
    },
    {
      role: 'Open Source Contributor',
      org: 'Atelier UI / GitHub',
      date: '2023 - Present',
      icon: GitMerge,
      desc: 'Authored and maintained high-performance components for a cinematic design system library. Improved render efficiency by 40% and established new documentation standards emphasizing editorial aesthetics alongside technical clarity.',
      image: '/assets/exp2.jpg'
    },
    {
      role: 'Frontend Research Lead',
      org: 'KDKCE Innovation Lab',
      date: 'Jan 2022 - Aug 2023',
      icon: Microscope,
      desc: 'Spearheaded research on WebGL performance and micro-interactions for web applications. Prototyped experimental interfaces translating academic concepts into usable, highly interactive digital products.',
      image: '/assets/exp3.jpg'
    }
  ];

  useEffect(() => {
    // Configure GSAP Stacking Cards without layout-breaking pins
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      cards.forEach((card, i) => {
        if (i === 0) return; // Skip the first card
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom', // Start animating when the bottom of viewport hits the top of the next card
          end: 'top top',      // Finish when it reaches its sticky position
          scrub: 1,            // Smooth scrubbing
          animation: gsap.to(cards[i - 1].querySelector('.card-inner'), {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            y: -50, // Slight upward movement to enhance "stacking under" effect
            ease: 'none'
          }),
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="experience" className="bg-cream relative">
      <div className="absolute top-32 left-8 md:left-20 z-10 mix-blend-difference pointer-events-none">
        <h2 className="font-jakarta text-6xl md:text-8xl font-bold tracking-tighter text-cream/20 uppercase">
          Journey
        </h2>
      </div>

      <div className="flex flex-col">
        {experiences.map((exp, i) => (
           <div 
             key={i}
             ref={el => cardsRef.current[i] = el}
             className="sticky top-0 min-h-screen w-full flex items-center justify-center py-20 px-4 md:p-20" 
           >
              {/* Complex Card Interface */}
              <div className="card-inner relative w-full max-w-6xl min-h-[60vh] h-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex border border-white/20 transform-gpu bg-charcoal">
                
                {/* Background Environment */}
                <div className="absolute inset-0 z-0 bg-charcoal">
                  <img 
                    src={exp.image || exp.bgImg} 
                    alt={exp.org} 
                    className="w-full h-full object-cover opacity-40 grayscale-[60%] mix-blend-luminosity"
                  />
                  {/* Subtle noise over image */}
                  <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay"></div>
                  {/* Gradient mask */}
                  <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col justify-between p-10 md:p-16 h-full w-full lg:w-2/3">
                  
                  {!exp.isHackathon && (
                    <div className="flex items-center gap-6 mb-8">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                         {exp.icon && <exp.icon size={32} className="text-cream" />}
                       </div>
                       <div>
                         <h3 className="font-jetbrains text-sm uppercase tracking-widest text-clay">{exp.org}</h3>
                         <p className="font-jakarta text-cream/70 text-sm mt-1 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-moss inline-block"></span>
                           {exp.date}
                         </p>
                       </div>
                    </div>
                  )}

                  {exp.isHackathon ? (
                    <div className="journey-card flex flex-col items-center justify-center w-full h-auto py-8 lg:py-4">
                      <div className="journey-text text-cream font-outfit justify-start w-full">
                        <h3 className="font-garamond italic text-3xl md:text-5xl mb-6">🚀 My First Hackathon Experience</h3>

                        <p className="mb-4 text-cream/90 font-light text-base md:text-lg">
                          Excited to share that I recently participated in my first-ever hackathon
                          at <strong className="text-white font-medium">Government Polytechnic College, Nagpur</strong> as part of
                          <strong className="text-white font-medium"> Team Agnibytes</strong>.
                        </p>

                        <p className="mb-4 text-cream/90 font-light text-base md:text-lg">
                          Along with my teammates <br/>
                          <strong className="text-white font-medium">Vineet Ravi Mandhalkar</strong>, <strong className="text-white font-medium">Tanmay Sahare</strong>, and <strong className="text-white font-medium">Vikramaditya Kambani</strong>, we joined to explore, learn, and gain hands-on experience.
                        </p>

                        <p className="mb-6 text-cream/90 font-light text-base md:text-lg">
                          It was an amazing journey filled with teamwork, problem-solving,
                          and valuable learning. Looking forward to many more opportunities
                          to build and innovate.
                        </p>

                        <div className="hashtags font-jetbrains text-xs text-cream/50 mb-8 flex flex-wrap gap-2">
                          <span>#Hackathon</span>
                          <span>#TeamAgnibytes</span>
                          <span>#LearningJourney</span>
                          <span>#Teamwork</span>
                          <span>#SkillDevelopment</span>
                        </div>
                      </div>

                      <div className="w-full flex justify-center mt-4">
                        <img 
                          src="/images/certificate.png" 
                          alt="Hackathon Certificate Government Polytechnic Nagpur"
                          className="w-full max-w-[400px] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-center">
                       <h2 className="font-garamond italic font-light text-6xl md:text-7xl lg:text-[6rem] text-cream leading-none mb-6">
                         {exp.role}
                       </h2>
                       <p className="font-outfit text-lg md:text-xl text-cream/80 max-w-xl leading-relaxed font-light">
                         {exp.desc}
                       </p>
                    </div>
                  )}
                  
                  <div className="font-jetbrains text-xs text-cream/40 flex items-center gap-4 mt-12 w-full">
                     <span>FILE_REF: EXPERIENCES/{exp.role.toUpperCase()}.LOG</span>
                     <span className="h-[1px] flex-1 bg-cream/20"></span>
                     <span>[0{i+1}/0{experiences.length}]</span>
                  </div>

                </div>

              </div>
           </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
