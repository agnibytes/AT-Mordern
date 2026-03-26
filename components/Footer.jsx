import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(124,58,237,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
        <div className="text-center md:text-left">
           <div className="text-3xl font-black tracking-tighter mb-4 neon-glow">
              AT<span className="text-purple-500">.</span>
           </div>
           <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Synthesizing logic and creativity to build the next generation of digital interfaces.
           </p>
        </div>

        <div className="flex gap-8">
           {[Github, Linkedin, Mail, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="text-white/40 hover:text-purple-400 transition-colors">
                 <Icon size={20} />
              </a>
           ))}
        </div>

        <div className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
           © 2026 Aaditya Tiwari • Premium Portfolio
        </div>
      </div>
    </footer>
  );
}
