import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import HowIThink from './components/HowIThink';
import Philosophy from './components/Philosophy';
import Experience from './components/Experience';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="relative w-full min-h-screen font-jakarta text-charcoal bg-cream selection:bg-moss selection:text-cream">
      {/* Global noise is handled in index.html, but we keep this div structured cleanly */}
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <HowIThink />
        <Philosophy />
        <Experience />
        <Recognition />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
