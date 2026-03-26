"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import HowIThink from "@/components/sections/HowIThink";
import Philosophy from "@/components/sections/Philosophy";
import Recognition from "@/components/sections/Recognition";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Spotlight from "@/components/ui/Spotlight";
import Preloader from "@/components/Preloader";
import { ReactLenis } from "lenis/react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <ReactLenis root>
      <div className={cn(
        "bg-black min-h-screen selection:bg-purple-500 selection:text-white transition-opacity duration-1000",
        loading ? "h-screen overflow-hidden" : "opacity-100"
      )}>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        
        <Spotlight />
        <Navbar />
        
        <main className={cn("transition-all duration-1000", loading ? "blur-xl" : "blur-0")}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <HowIThink />
          <Philosophy />
          <Recognition />
          <Contact />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  );
}
