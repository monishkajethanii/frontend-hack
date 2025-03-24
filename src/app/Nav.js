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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/section" },
    { name: "Contact Now", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 z-50">
          <img
            src="/logo.png"
            width={isScrolled ? 50 : 60}
            height={isScrolled ? 50 : 60}
            alt="BuiltWell Logo"
            className="transition-all duration-300"
          />
          <span
            className={`text-xl sm:text-2xl font-serif font-bold transition-colors duration-300 text-black`}
          >
            BuiltWell
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`hover:text-builtwell-accent transition-colors duration-300 text-base lg:text-lg ${
                isScrolled ? "text-gray-800" : "text-white font-bold"
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X
              size={24}
              className={isScrolled ? "text-builtwell-dark" : "text-black"}
            />
          ) : (
            <Menu
              size={24}
              className={isScrolled ? "text-builtwell-dark" : "text-white"}
            />
          )}
        </button>
      </div>

      {/* mobile navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center items-end pr-2 space-y-6 pt-16 text-black">
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
        </div>
      </div>
    </header>
  );
};

export default NavBar;
