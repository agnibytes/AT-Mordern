import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const containerRef = useRef(null);
  
  const projects = [
    {
      title: "GitHub Profile",
      description: "A hub of open-source contributions, experimental repositories, and continuous learning in modern web architecture.",
      stack: ["Open Source", "TypeScript", "React"],
      live: "https://github.com/agnibytes/agnibytes",
      github: "https://github.com/agnibytes/agnibytes",
    },
    {
      title: "Seva Setu",
      description: "A dedicated platform built to bridge the gap between people in need and available resources, designed with accessibility in mind.",
      stack: ["React", "Tailwind CSS", "Node.js"],
      live: "https://seva-setu-zeta.vercel.app/",
      github: "https://github.com/agnibytes",
    },
    {
      title: "Quantum State Manager",
      description: "A lightweight, decentralized state management library for distributed React applications with zero boilerplate.",
      stack: ["JavaScript", "React", "Node.js"],
      live: "#",
      github: "#",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', 
        { y: 60, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-32 px-8 md:px-20 bg-cream">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold text-moss mb-16 tracking-tight">
          Selected <span className="font-garamond italic font-light text-clay text-5xl md:text-6xl">Artifacts</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="project-card group relative bg-white rounded-[2.5rem] p-10 shadow-xl border border-moss/5 hover:border-moss/20 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[450px]"
              style={{
                /* Subtle tilt setup */
                transformStyle: 'preserve-3d',
                transformPerspective: '1000px'
              }}
            >
              {/* Animated Background Overlay */}
              <div className="absolute inset-0 bg-moss/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-moss font-jetbrains font-bold text-sm shadow-inner group-hover:bg-moss group-hover:text-cream transition-colors duration-300">
                    0{idx + 1}
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                    <a href={project.github} className="p-2 bg-charcoal text-cream rounded-full hover:bg-clay transition-colors">
                      <Github size={18} />
                    </a>
                    <a href={project.live} className="p-2 bg-moss text-cream rounded-full hover:bg-clay transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <h3 className="font-jakarta text-2xl font-bold text-charcoal mb-4 group-hover:text-moss transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="font-outfit text-charcoal/70 leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.stack.map(tech => (
                  <span 
                    key={tech} 
                    className="px-4 py-1.5 text-xs font-jetbrains bg-cream text-moss rounded-full border border-moss/10 group-hover:border-moss/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
