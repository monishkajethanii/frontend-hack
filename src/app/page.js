"use client"
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import NavBar from './Nav';

const HeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !imageRef.current) return;
      
      const scrollPosition = window.scrollY;
      imageRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="home" ref={heroRef} className="relative h-screen overflow-hidden">
      <NavBar/>
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
            <p className="text-builtwell-accent font-medium mb-3 animate-slide-in-left" style={{"--index": "0"}}>
              Architectural Excellence
            </p>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-in-left" style={{"--index": "1"}}>
              We Build Your Vision With Precision & Passion
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p className="text-white/90 text-lg mb-8 max-w-md animate-slide-in-left" style={{"--index": "2"}}>
              Creating architectural masterpieces that blend aesthetic beauty with functional design since 2005.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{"--index": "3"}}>
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
  );
};

export default HeroSection;