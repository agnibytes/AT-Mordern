"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Kaleidoscope Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, w2, h2;
    const slices = 12;
    let img = new Image();
    img.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";
    
    let offset = { x: 0, y: 0 };
    let frameId;

    const setup = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      w2 = w / 2;
      h2 = h / 2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const angle = (Math.PI * 2) / slices;
      
      for (let i = 0; i < slices; i++) {
        ctx.save();
        ctx.translate(w2, h2);
        ctx.rotate(i * angle);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, 0);
        ctx.lineTo(w * Math.cos(angle), w * Math.sin(angle));
        ctx.closePath();
        ctx.clip();
        
        ctx.translate(offset.x, offset.y);
        ctx.drawImage(img, -w2, -h2, w, h);
        ctx.restore();
      }
      
      offset.x += 0.5;
      offset.y += 0.3;
      frameId = requestAnimationFrame(draw);
    };

    img.onload = () => {
      setup();
      draw();
    };

    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative min-h-screen py-40 px-6 bg-black flex flex-col items-center justify-center text-center overflow-hidden">
      
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-1" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-purple-500 font-bold text-sm uppercase tracking-[0.4em] mb-10">Initiate Connection</h2>
        <h3 className="text-white font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none mb-20 neon-glow">
          Let's Build<br />The <span className="text-purple-500 italic">Future.</span>
        </h3>

        <div className="flex flex-wrap justify-center gap-6 mb-24">
          {[
            { name: "GitHub", icon: Github, href: "https://github.com/agnibytes" },
            { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/aaditya-tiwari-2b1996333" },
            { name: "Email", icon: Mail, href: "mailto:aaditya@example.com" }
          ].map((social) => (
            <Button
              key={social.name}
              asChild
              variant="outline"
              className="rounded-full px-10 py-8 text-lg font-bold border-white/10 hover:bg-white hover:text-black hover:scale-105 transition-all glass"
            >
              <a href={social.href} target="_blank">
                <social.icon className="mr-3 w-5 h-5" /> {social.name}
              </a>
            </Button>
          ))}
        </div>

        <div className="w-full aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
           <iframe 
            src="https://my.spline.design/xmaskcopycopy-XoNEWrrSgg7HsVkFCrZeVb04-q7A/" 
            frameBorder="0" 
            width="100%" 
            height="100%" 
            className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
