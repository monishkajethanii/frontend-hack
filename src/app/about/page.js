"use client";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Menu, X } from "lucide-react";

let motion = {
  div: "div",
  section: "section",
  h1: "h1",
};

try {
  const framerMotion = require("framer-motion");
  motion = framerMotion.motion;
} catch (error) {
  console.error(
    "Framer motion not available, using standard DOM elements instead"
  );
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function About() {
  const teamMembers = [
    {
      name: "Elena Rodriguez",
      role: "Principal Architect",
      bio: "With over 15 years of experience, Elena specializes in sustainable urban design and has led award-winning projects across three continents.",
      expertise: ["Urban Planning", "Sustainable Architecture", "Green Design"],
      imageSrc: "/architect1.jpg",
    },
    {
      name: "Marcus Chen",
      role: "Design Director",
      bio: "A visionary architect known for innovative structural solutions and cutting-edge architectural concepts that challenge traditional design boundaries.",
      expertise: [
        "Innovative Design",
        "Structural Engineering",
        "Contemporary Architecture",
      ],
      imageSrc: "/architect2.jpg",
    },
    {
      name: "Sophia Nkosi",
      role: "Senior Architect",
      bio: "Passionate about adaptive reuse and community-centered design, Sophia brings a global perspective to every project she undertakes.",
      expertise: [
        "Community Design",
        "Historic Preservation",
        "Cultural Architecture",
      ],
      imageSrc: "/architect3.jpg",
    },
    {
      name: "Daniel Kim",
      role: "Technical Architect",
      bio: "A master of technical precision and digital innovation, Daniel integrates cutting-edge technology with architectural design.",
      expertise: ["Digital Architecture", "3D Modeling", "Technical Design"],
      imageSrc: "/architect4.jpg",
    },
  ];
  // header ka logic
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
    { name: "3D Model", href: "/design" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/section" },
    { name: "Contact Now", href: "/contact" },
  ];
  return (
    <>
      <Head>
        <title>About Us | Axis Architecture</title>
        <meta
          name="description"
          content="Learn about our architectural philosophy, process and team"
        />
      </Head>

      <main className="flex flex-col min-h-screen">
        {/* header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-sm shadow-md py-2"
              : "bg-white/90 py-4"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
            <a href="/" className="flex items-center gap-2 z-50">
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

        {/* Process Section */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-white text-black">
            <div className="flex flex-col space-y-6 order-2 md:order-1">
              <h2 className="text-4xl font-light border-b border-gray-300 pb-4">
                Our Process
              </h2>
              <p className="text-lg text-gray-700">
                Our collaborative design process begins with listening. We
                immerse ourselves in your vision, the site's context, and the
                needs of those who will inhabit the space.
              </p>
              <p className="text-lg text-gray-700">
                This foundation of understanding allows us to craft architecture
                that feels both fresh and familiar—spaces that surprise yet
                belong.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-96 w-full">
                <div className="w-full h-full bg-gray-300">
                  <Image
                    src="/sketch.jpg"
                    alt="Architectural sketching"
                    fill
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-900 text-white py-24">
          <div className="max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light border-b border-gray-700 pb-4 inline-block">
                Our Team
              </h2>
              <p className="mt-8 text-lg text-gray-300 max-w-3xl mx-auto">
                Behind our portfolio stands a diverse team of architects,
                designers, and thinkers united by a shared passion for
                exceptional architecture. Each member brings unique perspectives
                and specialized expertise, creating a studio environment where
                creativity flourishes and boundaries are pushed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="group">
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <div className="w-full h-full bg-gray-700">
                      <Image
                        src={member.imageSrc}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        className="transition-transform duration-500 group-hover:scale-105 object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-medium">{member.name}</h3>
                      <p className="text-gray-300">{member.role}</p>
                      <p className="text-sm text-gray-400 mt-2">{member.bio}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-8 text-center bg-white text-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-light mb-6">
              Transform Your Vision into Reality
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We invite you to explore our work and discover how we might
              transform your architectural aspirations into built reality.
            </p>
            <button className="px-8 py-3 bg-gray-900 text-white text-lg rounded-none hover:bg-gray-800 transition-colors duration-300">
              <a href="/projects">View Our Portfolio</a>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
