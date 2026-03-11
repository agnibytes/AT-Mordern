import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    { name: 'GitHub', icon: Github, link: 'https://github.com/agnibytes', color: 'hover:bg-charcoal hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/aaditya-tiwari-2b1996333', color: 'hover:bg-blue-600 hover:text-white' },
    { name: 'Email', icon: Mail, link: 'mailto:developer@example.com', color: 'hover:bg-moss hover:text-white' },
  ];

  return (
    <section id="contact" ref={containerRef} className="py-40 px-8 md:px-20 bg-cream flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto w-full">
        
        <p className="contact-item font-jetbrains text-sm text-clay uppercase tracking-widest mb-6">Let's Connect</p>
        
        <h2 className="contact-item font-jakarta text-5xl md:text-7xl lg:text-[6rem] font-bold text-charcoal tracking-tight leading-none mb-16">
          Let's build something <br />
          <span className="font-garamond italic font-light text-moss">interesting.</span>
        </h2>

        <div className="contact-item flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
           {socials.map((social) => (
             <a 
               key={social.name}
               href={social.link}
               target="_blank"
               rel="noopener noreferrer"
               className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-charcoal/10 bg-white font-jakarta font-semibold text-charcoal shadow-sm transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${social.color}`}
             >
               <social.icon size={20} className="transition-transform group-hover:scale-110" />
               <span>{social.name}</span>
             </a>
           ))}
        </div>

      </div>
    </section>
  );
};

export default Contact;
