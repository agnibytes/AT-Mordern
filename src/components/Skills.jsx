import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';

// New sub-components
import CodeIntelligence from './skills/CodeIntelligence';
import CommitRoutine from './skills/CommitRoutine';

const Skills = () => {
  const containerRef = useRef(null);
  
  // Terminal Typing Logic (Middle Card)
  const [text, setText] = useState('');
  const [msgIdx, setMsgIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const messages = [
    "Compiling new ideas...",
    "Building scalable systems...",
    "Optimizing developer workflow..."
  ];

  useEffect(() => {
    const currentMsg = messages[msgIdx];
    let typingSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && text === currentMsg) {
       setTimeout(() => setIsDeleting(true), 1500);
       return;
    } else if (isDeleting && text === '') {
       setIsDeleting(false);
       setMsgIdx((prev) => (prev + 1) % messages.length);
       return;
    }

    const timer = setTimeout(() => {
      setText(prev => 
        isDeleting 
          ? currentMsg.substring(0, prev.length - 1)
          : currentMsg.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, msgIdx]);

  return (
    <section id="skills" className="w-full py-32 px-8 md:px-20 bg-moss text-cream" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-16 tracking-tight">
          Tools of the <span className="font-garamond italic font-light text-clay text-5xl md:text-6xl">Trade</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:min-h-[450px]">
          
          {/* Card 1: Code Intelligence (Rotating Stack) */}
          <div className="bg-white/5 border border-white/10 rounded-[2rem] flex flex-col items-center justify-center relative overflow-hidden h-[350px] md:h-full">
            <h3 className="absolute top-8 left-8 font-jetbrains text-sm text-clay uppercase tracking-widest z-20">Code Intelligence</h3>
            <CodeIntelligence />
          </div>

          {/* Card 2: Live Dev Terminal */}
          <div className="bg-charcoal border border-white/5 rounded-[2rem] p-8 h-[350px] md:h-full flex flex-col font-jetbrains shadow-inner relative group">
            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-white/40 text-xs tracking-wider">developer@atelier</span>
            </div>
            
            <div className="flex-1 flex items-start text-cream/90 text-sm md:text-base leading-relaxed">
              <div className="flex gap-4 w-full">
                <span className="text-moss">❯</span>
                <p className="flex-1 break-words">
                  {text}
                  <span className="inline-block w-2.5 h-5 bg-clay ml-1 align-middle animate-pulse"></span>
                </p>
              </div>
            </div>
            
            {/* Subtle Noise for Terminal */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay rounded-[2rem]">
               <svg className="w-full h-full">
                 <filter id="noise-terminal">
                   <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
                 </filter>
                 <rect width="100%" height="100%" filter="url(#noise-terminal)" />
               </svg>
            </div>
          </div>

          {/* Card 3: Project Scheduler */}
          <div className="h-[350px] md:h-full relative">
            <CommitRoutine />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
