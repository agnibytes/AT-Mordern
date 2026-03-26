"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Exp", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-6 flex justify-center pointer-events-none",
        isScrolled ? "py-4" : "py-8"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-10 px-8 py-3 rounded-full transition-all duration-700 ease-in-out pointer-events-auto border",
          isScrolled
            ? "glass shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10 backdrop-blur-2xl scale-95"
            : "bg-transparent border-transparent"
        )}
      >
        <a href="#hero" className="font-bold tracking-tighter text-2xl mr-4 hover:scale-110 transition-transform">
          AT<span className="text-purple-500">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-medium text-[13px] uppercase tracking-widest">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group overflow-hidden">
              <a
                href={link.href}
                className={cn(
                  "transition-all duration-300 block py-1",
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-white/40 hover:text-white"
                )}
              >
                {link.name}
              </a>
              {/* Premium Indicator */}
              <motion.span
                layoutId="nav-underline"
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] bg-purple-500 transition-all",
                  activeSection === link.href.slice(1) ? "w-full" : "w-0"
                )}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            </li>
          ))}
        </ul>

        <div className="md:hidden flex items-center">
            <button className="w-6 h-6 flex flex-col justify-center gap-1.5 focus:outline-none group">
                <span className="w-full h-[1px] bg-white/60 group-hover:bg-purple-500 transition-colors"></span>
                <span className="w-2/3 h-[1px] bg-white/60 group-hover:bg-purple-500 transition-colors self-end"></span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
