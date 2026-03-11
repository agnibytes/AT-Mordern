const Footer = () => {
  return (
    <footer className="bg-charcoal text-cream pt-20 pb-8 px-8 md:px-20 rounded-t-[4rem] flex flex-col items-center border-t border-white/5 relative z-20">
      
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="font-outfit font-bold text-3xl tracking-tight mb-2">Aaditya Tiwari.</h2>
          <p className="font-jakarta text-cream/50 text-sm font-light">Developer Girl & Creative Technologist.</p>
        </div>

        {/* Links */}
        <div className="flex gap-8 font-jakarta text-sm text-cream/70">
          <a href="#about" className="hover:text-moss transition-colors">About</a>
          <a href="#skills" className="hover:text-moss transition-colors">Skills</a>
          <a href="#projects" className="hover:text-moss transition-colors">Artifacts</a>
          <a href="#experience" className="hover:text-moss transition-colors">Journey</a>
        </div>

        {/* System Status Status Indicator */}
        <div className="flex items-center gap-3 bg-white/5 py-2 px-4 rounded-full border border-white/10">
          <span className="font-jetbrains text-xs uppercase tracking-widest text-cream/70">System Status</span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></span>
          <span className="font-jetbrains text-xs text-green-500">Online</span>
        </div>

      </div>

      <div className="w-full max-w-7xl pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-jakarta text-cream/40">
        <p>&copy; {new Date().getFullYear()} Aaditya Tiwari. All rights reserved.</p>
        <p className="font-garamond italic text-sm text-Moss">"Build. Break. Learn. Repeat."</p>
      </div>

    </footer>
  );
};

export default Footer;
