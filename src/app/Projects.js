
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ProjectGrid = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: 'Modern Pavilion',
      category: 'Residential',
      image: '/proj3.jpg',
    },
    {
      id: 2,
      title: 'Urban Office Complex',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      id: 3,
      title: 'Minimalist Retreat',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
  ];

  return (
    <div className="py-16 bg-builtwell-light">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12 space-y-6 md:space-y-0">
          <div className="max-w-lg">
            <div className="overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-slide-in-left" style={{"--index": "0"}}>
                Signature Projects
              </h2>
            </div>
            <div className="overflow-hidden">
              <p className="text-builtwell-darkgray max-w-md animate-slide-in-left" style={{"--index": "1"}}>
                Explore our portfolio of architectural excellence spanning residential, commercial, and cultural domains.
              </p>
            </div>
          </div>
          
          <a 
            href="/projects" 
            className="flex items-center text-builtwell-dark font-medium gap-2 group animate-fade-in" 
            style={{"--index": "2"}}
          >
            View All Projects 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="relative group overflow-hidden rounded-lg h-80 cursor-pointer animate-scale-up"
              style={{ animationDelay: `${index * 0.15}s` }}
              onMouseEnter={() => setHoveredItem(project.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className={`w-full h-full object-cover transition-all duration-700 ${hoveredItem === project.id ? 'scale-110 filter-none' : 'grayscale-[30%]'}`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-builtwell-dark to-transparent opacity-70 transition-opacity duration-500 ${hoveredItem === project.id ? 'opacity-90' : 'opacity-60'}`} />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 transform transition-transform duration-500">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-builtwell-accent/80 text-black bg-amber-300 mb-3 transition-all duration-500 ${hoveredItem === project.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  {project.category}
                </span>
                <h3 className="text-xl font-serif font-bold">{project.title}</h3>
                
                <div className={`mt-3 overflow-hidden transition-all duration-500 ${hoveredItem === project.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-white font-extrabold">Innovative architectural design that harmonizes with its environment</p>
                  <a href="#" className="mt-3 inline-flex items-center text-sm font-medium text-builtwell-accent group rounded-3xl pl-3 pr-3 pt-1 pb-1 text-black bg-amber-300">
                    View Project 
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;