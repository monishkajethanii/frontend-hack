"use client";
import { useRef, useState, useEffect } from "react";
import { Quote, ArrowLeft, ArrowRight, X, Menu } from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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
    { name: "Contact Now", href: "/contact" },
  ];

  const testimonials = [
    {
      name: "ElenaKovacs",
      role: "Award-Winning Urban Planner",
      quote:
        "A transformative architectural approach that redefines spatial harmony. Each design transcends mere structure, becoming a narrative of human experience.",
      image: "/dr.jpg",
      background: "Linear geometric patterns in soft grays and whites",
    },
    {
      name: "Alexander Wright",
      role: "Luxury Real Estate Developer",
      quote:
        "Unprecedented vision that seamlessly blends innovative design with functional elegance. A true masterclass in architectural storytelling.",
      image: "/architect3.jpg",
      background: "Minimalist urban skyline silhouette",
    },
    {
      name: "Dr. Sophia Nakamura",
      role: "Sustainable Design Consultant",
      quote:
        "An architectural philosophy that doesn't just create spaces, but crafts living ecosystems that breathe, adapt, and inspire.",
      image: "/architect2.jpg",
      background: "Subtle organic texture with natural earth tones",
    },
  ];

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTest = testimonials[currentTestimonial];

  return (
    <>
      {/* header section */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-sm shadow-md py-2"
            : "bg-white/90 py-4"
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
              className={`text-xl sm:text-2xl font-serif font-bold transition-colors duration-300 text-gray-400 ${
                isScrolled ? "text-gray-800" : "text-gray-800"
              }`}
            >
              BuiltWell
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`hover:text-builtwell-accent transition-colors duration-300 text-base lg:text-lg font-medium ${
                  isScrolled ? "text-gray-800" : "text-gray-800"
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
                className={isScrolled ? "text-builtwell-dark" : "text-black"}
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
      <div className="text-center mt-24">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Testimonials that reflect our commitment to exceptional architectural
          design and transformative spaces.
        </p>
      </div>
      <section className="relative min-h-screen w-full flex overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-8 flex">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Client Image Section */}
            <div className="relative flex justify-center items-center">
              <div className="absolute -inset-4 bg-gradient-to-br from-gray-200 to-gray-500 rounded-3xl transform -rotate-3"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
                <img
                  src={currentTest.image}
                  alt={currentTest.name}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>

            {/* Testimonial Content Section */}
            <div className="space-y-8 p-4">
              <div className="relative">
                <Quote className="absolute -top-8 -left-8 text-gray-400 w-24 h-24 opacity-50" />
                <p className="text-2xl font-light text-gray-800 italic leading-relaxed relative z-10">
                  "{currentTest.quote}"
                </p>
              </div>

              <div className="border-t border-gray-300 pt-6">
                <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                  {currentTest.name}
                </h3>
                <p className="text-lg text-gray-600">{currentTest.role}</p>
              </div>

              {/* Navigation */}
              <div className="flex space-x-4 items-center">
                <button
                  onClick={handlePrev}
                  className="bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentTestimonial
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className="bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition-colors"
                >
                  <ArrowRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
