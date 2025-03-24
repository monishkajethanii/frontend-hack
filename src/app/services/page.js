"use client";
import { useState, useRef, useEffect } from "react";
import { Building2, Landmark, TreePine, MapPin, Menu, X } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Residential Design",
    description:
      "Transforming living spaces into personalized sanctuaries that reflect your unique lifestyle and aesthetic vision.",
    details: [
      "Custom Home Design",
      "Renovation & Remodeling",
      "Interior Space Planning",
      "Sustainable Living Solutions",
    ],
  },
  {
    icon: Landmark,
    title: "Commercial Architecture",
    description:
      "Innovative designs that blend functionality, brand identity, and cutting-edge architectural principles.",
    details: [
      "Corporate Office Spaces",
      "Retail Environment Design",
      "Mixed-Use Developments",
      "Adaptive Reuse Projects",
    ],
  },
  {
    icon: TreePine,
    title: "Sustainable Design",
    description:
      "Pioneering eco-friendly architectural solutions that minimize environmental impact while maximizing human experience.",
    details: [
      "Green Building Certification",
      "Energy-Efficient Design",
      "Renewable Materials Selection",
      "Biophilic Design Strategies",
    ],
  },
  {
    icon: MapPin,
    title: "Urban Planning",
    description:
      "Holistic urban design that reimagines spaces, connects communities, and creates meaningful urban landscapes.",
    details: [
      "Master Planning",
      "Community Development",
      "Infrastructure Integration",
      "Spatial Connectivity Solutions",
    ],
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState(services[0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
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
    { name: "Testimonials", href: "/section" },
    { name: "Contact Now", href: "/contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="">
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

      {/* Hero Section */}
      <div className="pt-28 bg-gradient-to-br from-builtwell-lightgray to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="overflow-hidden">
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-builtwell-dark mb-6 ${
                  isVisible ? "animate-slide-in-left" : "opacity-0"
                }`}
              >
                Architectural <br />
                Solutions Reimagined
              </h1>
            </div>
            <div className="overflow-hidden">
              <p
                className={`text-lg md:text-xl text-builtwell-darkgray max-w-2xl ${
                  isVisible ? "animate-slide-in-left" : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                We don't just design spaces. We craft experiences that transform
                how people live, work, and interact with their environment.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-white" ref={sectionRef}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Services Navigation */}
            <div className="space-y-6 border-gray-200">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`
                    cursor-pointer p-6 rounded-lg border-2 border-gray-200 transition-all duration-300
                    ${
                      activeService.title === service.title
                        ? "bg-builtwell-lightgray border-gray-700"
                        : "bg-white border-transparent hover:border-builtwell-accent"
                    }
                    ${isVisible ? "animate-fade-in" : "opacity-0"}
                  `}
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                  onClick={() => setActiveService(service)}
                >
                  <div className="flex items-center mb-4">
                    <service.icon
                      className={`
                        w-10 h-10 mr-4 
                        ${
                          activeService.title === service.title
                            ? "text-builtwell-accent"
                            : "text-builtwell-gray"
                        }
                      `}
                    />
                    <h3 className="text-xl font-serif font-bold text-builtwell-dark">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-builtwell-darkgray">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Active Service Details */}
            <div
              key={activeService.title}
              className={`bg-white rounded-lg shadow-xl p-8 lg:p-10 border border-gray-200 ${
                isVisible ? "animate-scale-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center mb-8">
                <activeService.icon className="w-12 h-12 text-builtwell-accent mr-5" />
                <h2 className="text-3xl font-serif font-bold text-builtwell-dark">
                  {activeService.title}
                </h2>
              </div>
              <p className="text-lg text-builtwell-darkgray mb-8">
                {activeService.description}
              </p>
              <div className="space-y-4">
                <h4 className="text-xl font-serif font-bold text-builtwell-dark mb-4">
                  Our Approach Includes:
                </h4>
                {activeService.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-center text-builtwell-darkgray"
                  >
                    <div className="w-3 h-3 bg-builtwell-accent rounded-full mr-4"></div>
                    <span className="text-base">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-builtwell-dark text-black pb-10">
        <div className="container mx-auto text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-serif font-bold mb-6">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-lg mb-8 text-black/80">
              Let's collaborate and bring your architectural dreams to life. Our
              team is dedicated to creating spaces that inspire, innovate, and
              exceed expectations.
            </p>
            <a
              href="/contact"
              className="inline-block bg-builtwell-accent text-builtwell-dark bg-black text-white px-8 py-3 rounded hover:bg-white transition-colors duration-300 font-medium"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
