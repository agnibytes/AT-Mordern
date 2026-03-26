import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx_gsap = gsap.context(() => {
      gsap.from('.contact-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);

    // --- Kaleidoscope Animation Logic ---
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let container = containerRef.current;
    
    let w, h, w2, h2;
    const {PI,sin,cos} = Math;
    const PI2 = PI*2;

    const slices = 15;
    const mirror = true;

    let img;
    let pattern;
    let offset = {x: 50, y: 10};
    let lastMousePos = {x: 0, y: 0};
    let animationFrameId;

    const updateSize = () => {
      w = canvas.width = container.offsetWidth;
      h = canvas.height = container.offsetHeight;
      w2 = w/2;
      h2 = h/2;
    };

    const handleMouseMove = (e) => {
      if (img) {
        if (!lastMousePos.x && !lastMousePos.y) {
          lastMousePos = { x: e.clientX, y: e.clientY };
          return;
        }
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        offset.x += img.width * (dx / window.innerWidth);
        offset.y += img.height * (dy / window.innerHeight);
        lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const setup = () => {
      img = new Image();
      img.src = "https://dl.dropboxusercontent.com/s/vd6jnmd2di62oxq/seamless-floral-skulls.png";
      img.onload = () => {
        pattern = ctx.createPattern(img, 'repeat');
        updateSize();
        loop();
      };
    };

    const loop = () => {
        ctx.clearRect(0,0,w,h);
        
        let radius = w2 + h2;
        let deltaAngle = PI2 / slices;
        
        let x = [ -1, -1, radius * sin(deltaAngle), radius * sin(deltaAngle/2)];
        let y = [ -1, radius, radius * cos(deltaAngle), radius * cos(deltaAngle/2)];
        
        for(let i=0; i<slices; i++) {
            ctx.translate(w2, h2);
            ctx.rotate(i * deltaAngle);
            ctx.translate(offset.x, offset.y);
            ctx.beginPath();
            ctx.moveTo(x[0]-offset.x, y[0]-offset.y);
            ctx.lineTo(x[1]-offset.x, y[1]-offset.y);
            ctx.lineTo(x[2]-offset.x, y[2]-offset.y);
            ctx.lineTo(x[0]-offset.x, y[0]-offset.y);
            ctx.fillStyle = pattern;
            ctx.fill();
            ctx.resetTransform();

            if (mirror) {
                ctx.translate(w2, h2);
                ctx.rotate((i-1) * deltaAngle);
                ctx.scale(-1, 1);
                ctx.translate(offset.x, offset.y);

                ctx.beginPath();
                ctx.moveTo(x[0]-offset.x, y[0]-offset.y);
                ctx.lineTo(x[1]-offset.x, y[1]-offset.y);
                ctx.lineTo(x[3]-offset.x, y[3]-offset.y);
                ctx.lineTo(x[0]-offset.x, y[0]-offset.y);
                ctx.fillStyle = pattern;
                ctx.fill();
                
                ctx.resetTransform();
            }
        }
        offset.x = (offset.x + 0.75) % img.width;
        offset.y = (offset.y + 0.25) % img.height;

        animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', updateSize);
    window.addEventListener('mousemove', handleMouseMove);
    setup();

    return () => {
      ctx_gsap.revert();
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const socials = [
    { name: 'GitHub', icon: Github, link: 'https://github.com/agnibytes', color: 'hover:bg-charcoal hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, link: 'https://www.linkedin.com/in/aaditya-tiwari-2b1996333', color: 'hover:bg-blue-600 hover:text-white' },
    { name: 'Email', icon: Mail, link: 'mailto:developer@example.com', color: 'hover:bg-[#39FF14] hover:text-black' },
  ];

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen pt-40 pb-0 px-8 md:px-20 bg-black flex flex-col items-center justify-start text-center overflow-hidden">
      
      {/* Kaleidoscope Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      
      {/* Readability Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        
        <p className="contact-item font-jetbrains text-sm text-[#39FF14] font-bold uppercase tracking-[0.3em] mb-6 drop-shadow-md">Let's Connect</p>
        
        <h2 className="contact-item font-jakarta text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white tracking-tight leading-none mb-16 drop-shadow-2xl">
          Let's build something <br />
          <span className="font-jakarta italic font-light text-[#39FF14]">interesting.</span>
        </h2>

        <div className="contact-item flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-24 relative z-20">
           {socials.map((social) => (
             <a 
               key={social.name}
               href={social.link}
               target="_blank"
               rel="noopener noreferrer"
               className={`group flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/20 bg-white/90 backdrop-blur-md font-jakarta font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-400 transform hover:-translate-y-2 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] ${social.color}`}
             >
               <social.icon size={22} className="transition-transform group-hover:scale-125" />
               <span>{social.name}</span>
             </a>
           ))}
        </div>

        {/* Existing Spline 3D Element Integration */}
        <div className="contact-item w-full h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl relative z-20 mt-12 mb-[-150px]">
          <iframe 
            src="https://my.spline.design/xmaskcopycopy-XoNEWrrSgg7HsVkFCrZeVb04-q7A/" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            title="Spline 3D Interaction"
            className="absolute inset-0"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contact;
