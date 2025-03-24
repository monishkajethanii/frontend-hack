"use client";
import { useEffect, useRef } from "react";
import {
  Compass,
  Target,
  Users,
  Lightbulb,
  Building,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import NavBar from "./Nav";
import ProjectsSection from "./Projects";

const HeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !imageRef.current) return;

      const scrollPosition = window.scrollY;
      imageRef.current.style.transform = `translateY(${
        scrollPosition * 0.2
      }px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen overflow-hidden"
      >
        <NavBar />
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={imageRef}
            src="/bg.jpg"
            alt="Modern Architecture"
            className="w-full h-[120%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pt-24">
          <div className="max-w-2xl">
            <div className="overflow-hidden">
              <h1
                className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-in-left"
                style={{ "--index": "1" }}
              >
                We Build Your Vision With Precision & Passion
              </h1>
            </div>

            <div className="overflow-hidden">
              <p
                className="text-white/90 text-lg mb-8 max-w-md animate-slide-in-left"
                style={{ "--index": "2" }}
              >
                Creating architectural masterpieces that blend aesthetic beauty
                with functional design since 2005.
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ "--index": "3" }}
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-white bg-builtwell-accent text-builtwell-dark rounded font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors duration-300 group"
              >
                Explore Our Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-white text-white rounded font-medium flex items-center justify-center hover:bg-white hover:text-builtwell-dark transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
      <ProjectsSection />
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-builtwell-light text-builtwell-dark rounded-full mb-6">
                <Compass className="w-5 h-5 mr-2" />
                <span className="font-medium">Our Vision</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Redefining Architecture for Tomorrow's World
              </h2>
              <p className="text-builtwell-darkgray mb-6">
                Our vision is to become the leading architectural firm known for
                creating spaces that harmoniously blend aesthetic beauty,
                functional excellence, and environmental responsibility. We
                envision a future where our designs stand as landmarks of
                innovation and sustainability.
              </p>
              <p className="text-builtwell-darkgray">
                We aspire to push boundaries in architectural design, creating
                spaces that not only meet the present needs but anticipate
                future demands, setting new standards for what architecture can
                achieve.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
                alt="Architectural vision"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-builtwell-light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=1800&q=80"
                alt="Architectural mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 bg-white text-builtwell-dark rounded-full mb-6">
                <Target className="w-5 h-5 mr-2" />
                <span className="font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Crafting Meaningful Spaces Through Excellence
              </h2>
              <p className="text-builtwell-darkgray mb-6">
                Our mission is to deliver architectural solutions that exceed
                client expectations by combining technical expertise, creative
                innovation, and sustainable practices. We are committed to
                understanding each client's unique needs and translating them
                into designs that inspire and endure.
              </p>
              <p className="text-builtwell-darkgray">
                Through collaborative engagement with clients, communities, and
                industry partners, we strive to create spaces that positively
                impact lives and contribute to a more sustainable and beautiful
                world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-builtwell-darkgray">
              The principles that guide every design decision, client
              interaction, and creative process at BuiltWell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="w-10 h-10 text-builtwell-accent" />,
                title: "Innovation",
                description:
                  "We continuously explore new ideas, technologies, and approaches to create progressive architectural solutions.",
              },
              {
                icon: <Users className="w-10 h-10 text-builtwell-accent" />,
                title: "Collaboration",
                description:
                  "We believe in the power of teamwork, bringing together diverse perspectives to achieve exceptional results.",
              },
              {
                icon: <Building className="w-10 h-10 text-builtwell-accent" />,
                title: "Integrity",
                description:
                  "We uphold the highest ethical standards in all our interactions, delivering on our promises with honesty and transparency.",
              },
              {
                icon: <Target className="w-10 h-10 text-builtwell-accent" />,
                title: "Excellence",
                description:
                  "We strive for excellence in every aspect of our work, from initial concept to final execution.",
              },
              {
                icon: (
                  <GraduationCap className="w-10 h-10 text-builtwell-accent" />
                ),
                title: "Continuous Learning",
                description:
                  "We embrace ongoing education and growth, constantly evolving our skills and knowledge.",
              },
              {
                icon: <Compass className="w-10 h-10 text-builtwell-accent" />,
                title: "Sustainability",
                description:
                  "We design with environmental responsibility in mind, creating spaces that minimize ecological impact.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-builtwell-light/50 p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-builtwell-darkgray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className=" md:py-24 bg-builtwell-dark text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Build Your Vision?
          </h2>
          <p className="text-black max-w-2xl mx-auto mb-8">
            Let's collaborate to bring your architectural dreams to life with
            our expertise and innovative approach.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-builtwell-accent text-white bg-black rounded-md hover:bg-builtwell-accent/90 transition-colors duration-300 font-medium"
          >
            Contact Our Team
          </a>
        </div>
      </section>

      <footer className="bg-black text-white p-4 text-center">
            <p>© 2025 BuiltWell Architecture. All Rights Reserved.</p>
      </footer> 
    </>
  );
};

export default HeroSection;
