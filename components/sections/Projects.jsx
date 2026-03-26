"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ZoomIn } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "GitHub Profile",
    category: "Open Source",
    description: "A hub of open-source contributions, experimental repositories, and continuous learning in modern web architecture.",
    stack: ["Open Source", "TypeScript", "React"],
    image: "/assets/hero.jpg",
    live: "https://github.com/agnibytes/agnibytes",
    github: "https://github.com/agnibytes/agnibytes",
  },
  {
    title: "Seva Setu",
    category: "Web App",
    description: "A dedicated platform built to bridge the gap between people in need and available resources, designed with accessibility in mind.",
    stack: ["React", "Tailwind CSS", "Node.js"],
    image: "/assets/exp2.jpg",
    live: "https://seva-setu-zeta.vercel.app/",
    github: "https://github.com/agnibytes",
  },
  {
    title: "Quantum State Manager",
    category: "Library",
    description: "A lightweight, decentralized state management library for distributed React applications with zero boilerplate.",
    stack: ["JavaScript", "React", "Node.js"],
    image: "/assets/exp3.jpg",
    live: "#",
    github: "#",
  }
];

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000"
    >
      <Card className="glass h-full overflow-hidden transition-all duration-700 border-white/5 hover:border-purple-500/40 group bg-white/[0.02]">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] glass border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold neon-glow">{project.title}</DialogTitle>
                        <DialogDescription className="text-white/60 text-lg">
                            {project.description}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-2xl" />
                        <div className="flex flex-wrap gap-2 mt-6">
                            {project.stack.map(tech => (
                                <Badge key={tech} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-8">
                            <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                            </Button>
                            <Button variant="outline" className="flex-1 rounded-full border-white/10 hover:bg-white/5">
                                <Github className="w-4 h-4 mr-2" /> GitHub
                            </Button>
                        </div>
                    </div>
                </DialogContent>
             </Dialog>
          </div>
        </div>
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400/30">
              {project.category}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-white/60">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-white/5 text-white/70">
              {tech}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: `-${(projects.length - 1) * 60 + 20}vw`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: () => `+=${sectionRef.current.offsetWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="projects" className="relative z-10 overflow-hidden bg-[#050505]">
      <div>
        <div className="h-screen flex items-center px-12 md:px-24">
           <div className="max-w-2xl">
             <h2 className="text-white/40 font-medium text-lg tracking-[0.3em] uppercase mb-4">Selected Work</h2>
             <h3 className="text-white font-bold text-5xl md:text-8xl tracking-tighter neon-glow leading-none">
               Digital Artifacts<span className="text-purple-500">.</span>
             </h3>
             <p className="mt-8 text-white/40 text-lg md:text-xl font-light leading-relaxed">
               A curated collection of systems, interfaces, and open-source contributions. Scroll horizontally to explore the details.
             </p>
           </div>
        </div>

        <div 
          ref={sectionRef} 
          className="relative h-screen flex items-center gap-[10vw] px-[10vw]"
          style={{ width: `${projects.length * 60}vw` }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="w-[60vw] md:w-[45vw] shrink-0"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          
          <div className="w-[20vw] shrink-0 flex flex-col items-center justify-center">
             <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-white/5 transition-all">
                <Github size={32} className="text-white/40 group-hover:text-purple-500 transition-colors" />
             </div>
             <span className="mt-4 text-white/20 text-xs uppercase tracking-widest font-bold">More on GitHub</span>
          </div>
        </div>
      </div>
    </section>
  );
}
