import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out rounded-[2rem] px-8 py-4 flex items-center gap-8 ${
        isScrolled
          ? 'bg-white/60 backdrop-blur-xl text-moss border border-moss/10 shadow-lg'
          : 'bg-transparent text-cream'
      }`}
    >
      <div className="font-outfit font-bold tracking-tight text-xl">
        AT.
      </div>

      <ul className="hidden md:flex items-center gap-8 font-jakarta font-medium text-sm">
        {navLinks.map((link) => (
          <li key={link} className="relative group cursor-pointer">
            <a href={`#${link.toLowerCase()}`} className="tracking-wide">
              {link}
            </a>
            {/* Subtle hover underline */}
            <span className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-moss' : 'bg-cream'}`}></span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
