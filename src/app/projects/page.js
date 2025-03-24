"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Modern Lakeside Villa",
    description:
      "Contemporary residential development with panoramic lake views and sustainable design features.",
    category: "residential",
    location: "Lake Tahoe, California",
    year: 2023,
    sqft: "4,500 sq ft",
    coverImage: "/proj2.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Smith & Partners",
    status: "Completed",
  },
  {
    id: 2,
    title: "The Vertex Tower",
    description:
      "Mixed-use high-rise featuring innovative vertical garden integration throughout its 28 floors.",
    category: "commercial",
    location: "Toronto, Canada",
    year: 2022,
    sqft: "425,000 sq ft",
    coverImage: "/proj3.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Urban Creations",
    status: "Completed",
  },
  {
    id: 3,
    title: "Horizon Cultural Center",
    description:
      "Award-winning public facility featuring exhibition spaces, performance venues, and educational facilities.",
    category: "cultural",
    location: "Chicago, Illinois",
    year: 2023,
    sqft: "65,000 sq ft",
    coverImage: "/proj2.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Modern Collective",
    status: "Completed",
  },
  {
    id: 4,
    title: "Urban Loft Development",
    description:
      "Adaptive reuse project transforming an industrial warehouse into luxury residential lofts.",
    category: "residential",
    location: "Brooklyn, New York",
    year: 2021,
    sqft: "78,000 sq ft",
    coverImage: "/proj3.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "MRT Architecture",
    status: "Completed",
  },
  {
    id: 5,
    title: "Waterfront Pavilion",
    description:
      "Temporary structure featuring innovative tensile roof system and panoramic harbor views.",
    category: "installation",
    location: "Sydney, Australia",
    year: 2024,
    sqft: "3,200 sq ft",
    coverImage: "/proj2.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Studio Nomad",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Heritage Restoration",
    description:
      "Careful restoration and adaptive reuse of a 19th century landmark building.",
    category: "preservation",
    location: "Boston, Massachusetts",
    year: 2022,
    sqft: "25,000 sq ft",
    coverImage: "/proj3.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Historical Futures",
    status: "Completed",
  },
  {
    id: 7,
    title: "Terraced Garden Apartments",
    description:
      "Sustainable multi-family development with extensive greenery integrated into architecture.",
    category: "residential",
    location: "Portland, Oregon",
    year: 2023,
    sqft: "112,000 sq ft",
    coverImage: "/proj2.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Green Design Collective",
    status: "Completed",
  },
  {
    id: 8,
    title: "Corporate Headquarters",
    description:
      "LEED Platinum-certified office campus featuring biophilic design principles.",
    category: "commercial",
    location: "San Francisco, California",
    year: 2024,
    sqft: "185,000 sq ft",
    coverImage: "/proj3.jpg",
    images: ["/proj2.jpg", "/proj3.jpg"],
    architect: "Future Workspace",
    status: "In Progress",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Handle modal controls
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setCurrentImageIndex(0);
    }

    const handleKeyDown = (e) => {
      if (!selectedProject) return;

      if (e.key === "Escape") {
        setSelectedProject(null);
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === selectedProject.images.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? selectedProject.images.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  // for nav bar
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
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/section" },
    { name: "Contact Now", href: "/contact" },
  ];

  
  const titles = projects.map((project) => project.title); // Get project titles

  // Join all titles into a single string with a separator for clarity
  const titleText = titles.join("  |  ");

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>PROJECT GALLERY | Architecture Portfolio</title>
        <meta
          name="description"
          content="Explore our collection of architectural projects"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-1 border-black ${
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

      <main className="pt-22 pb-16">
      <div className="circular-scroll-container">
        <div className="circular-scroll-text-wrapper">
          <div className="circular-scroll-text">
            {titleText} {/* First loop of text */}
          </div>
          <div className="circular-scroll-text">
            {titleText} {/* Second loop of text */}
          </div>
          <div className="circular-scroll-text">
            {titleText} {/* Second loop of text */}
          </div>
          
        </div>
      </div>
        <div className="container mx-auto px-4 mb-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-6 uppercase text-xs md:text-sm tracking-wider">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-2 transition-colors duration-300 ${
                  activeCategory === category
                    ? "font-bold text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {category === "all" ? "all projects" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-${project.id}`}
                className="relative cursor-pointer group overflow-hidden"
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* In a real project, use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={project.coverImage}
                      alt=""
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white text-gray-900 bg-opacity-90 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-light text-lg tracking-wide mb-1">
                        {project.title}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {project.location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay Background */}
            <div
              className="absolute inset-0 bg-white"
              onClick={() => setSelectedProject(null)}
            ></div>

            {/* Modal Content */}
            <motion.div
              className="relative w-full h-full md:w-11/12 md:h-5/6 md:max-w-6xl flex flex-col md:flex-row bg-white overflow-auto"
              layoutId={`project-${selectedProject.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-10"
                onClick={() => setSelectedProject(null)}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="w-full md:w-3/5 h-1/2 md:h-full relative ">
                {selectedProject.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden m-7">
                    <img
                      src={image}
                      alt={`Project image ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="w-full md:w-2/5 p-6 md:p-12 overflow-y-auto pt-30">
                <div className="max-w-md">
                  <h2 className="text-3xl font-light tracking-tight mb-4 pt-10">
                    {selectedProject.title}
                  </h2>

                  <div className="border-t border-gray-200 py-4">
                    <p className="text-gray-700 mb-6">
                      {selectedProject.description}
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div className="text-gray-500">LOCATION</div>
                      <div>{selectedProject.location}</div>

                      <div className="text-gray-500">STATUS</div>
                      <div>{selectedProject.status}</div>

                      <div className="text-gray-500">YEAR</div>
                      <div>{selectedProject.year}</div>

                      <div className="text-gray-500">SIZE</div>
                      <div>{selectedProject.sqft}</div>

                      <div className="text-gray-500">ARCHITECT</div>
                      <div>{selectedProject.architect}</div>

                      <div className="text-gray-500">CATEGORY</div>
                      <div className="capitalize">
                        {selectedProject.category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
