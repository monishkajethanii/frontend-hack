"use client";
import { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Mail, SendIcon, Menu, X } from "lucide-react";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      service: "",
      message: "",
    });
    alert("Thank you for your message! We will get back to you soon.");
  };

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

  const contactInfo = [
    {
      id: 1,
      icon: <MapPin className="w-6 h-6 text-builtwell-accent" />,
      title: "Address",
      details: "123 Architect Street, Design District, Mumbai, India",
    },
    {
      id: 2,
      icon: <Phone className="w-6 h-6 text-builtwell-accent" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
    },
    {
      id: 3,
      icon: <Mail className="w-6 h-6 text-builtwell-accent" />,
      title: "Email",
      details: "info@builtwell.com",
    },
  ];
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
    { name: "Services", href: "/services" },
  ];

  return (
    <>
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
      <section id="contact" ref={sectionRef} className="py-24 bg-white text-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="overflow-hidden">
                <p
                  className={`text-yellow-600 font-medium mb-3 ${
                    isVisible ? "animate-slide-in-left" : "opacity-0"
                  }`}
                  style={{ "--index": "0" }}
                >
                  Get In Touch
                </p>
              </div>

              <div className="overflow-hidden">
                <h2
                  className={`text-3xl md:text-4xl font-sans font-bold mb-6 ${
                    isVisible ? "animate-slide-in-left" : "opacity-0"
                  }`}
                  style={{ "--index": "1" }}
                >
                  Let's Start a Conversation
                </h2>
              </div>

              <div className="overflow-hidden">
                <p
                  className={`text-gray-800 mb-8 ${
                    isVisible ? "animate-slide-in-left" : "opacity-0"
                  }`}
                  style={{ "--index": "2" }}
                >
                  Whether you're looking to start a new project, need
                  consultation, or have questions about our services, we're here
                  to help.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 ${
                      isVisible ? "animate-slide-in-left" : "opacity-0"
                    }`}
                    style={{ "--index": index + 3 }}
                  >
                    <div className="bg-gray-100 p-3 rounded-lg text-yellow-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`bg-gray-100 p-8 rounded-lg ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ "--index": "6" }}
            >
              <h3 className="text-2xl font-sans font-bold mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-builtwell-darkgray mb-1 font-bold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Monishka Jethani"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-builtwell-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-builtwell-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-builtwell-darkgray mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="monishka@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-builtwell-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-builtwell-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-bold text-builtwell-darkgray mb-1"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-builtwell-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-builtwell-accent"
                  >
                    <option value="" className="text-gray-400">Select a service</option>
                    <option value="architectural-design">
                      Architectural Design
                    </option>
                    <option value="commercial-architecture">
                      Commercial Architecture
                    </option>
                    <option value="residential-architecture">
                      Residential Architecture
                    </option>
                    <option value="landscape-design">Landscape Design</option>
                    <option value="interior-design">Interior Design</option>
                    <option value="project-management">
                      Project Management
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-builtwell-darkgray mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your query message"
                    rows={4}
                    className="w-full px-4 py-3 border border-builtwell-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-builtwell-accent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-builtwell-dark bg-gray-900 text-white rounded-lg hover:bg-builtwell-accent transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <SendIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
