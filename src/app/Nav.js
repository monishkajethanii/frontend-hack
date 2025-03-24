"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact Now", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.png" width={60} height={60} alt="" />
          <span className="text-2xl font-serif font-bold text-builtwell-dark text-gray-200">
            BuiltWell
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-white text-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-builtwell-darkgray hover:text-builtwell-accent transition-colors duration-300 text-lg font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full justify-center items-center space-y-8 pt-16">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-builtwell-darkgray hover:text-builtwell-accent transition-colors duration-300 text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-3 bg-builtwell-dark text-white rounded hover:bg-builtwell-darkgray transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
