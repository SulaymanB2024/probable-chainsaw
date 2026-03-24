'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import ScrambleText from './ScrambleText';
import Magnetic from './Magnetic';
import ProjectAsciiArt from './ProjectAsciiArt';

interface Project {
  id: string;
  slug: string;
  name: string;
  role: string;
  type: string;
  year: string;
  tagline: string;
  overview: string;
  approach: string;
  images: string[];
  techStack?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new Event('modal-open'));
    } else {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new Event('modal-close'));
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.dispatchEvent(new Event('modal-close'));
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#FAFAFA] dark:bg-[#050505] overflow-y-auto"
        >
          {/* Noise overlay */}
          <div className="fixed inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
          
          <div className="fixed top-6 right-6 md:top-10 md:right-10 z-[140]">
            <Magnetic>
              <button 
                onClick={onClose}
                aria-label="Close project modal"
                className="h-11 px-4 rounded-none border border-black/40 dark:border-white/40 flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-black dark:text-white bg-[#FAFAFA]/95 dark:bg-[#050505]/95 backdrop-blur-sm font-mono text-[10px] uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
              >
                <span>Close</span>
                <span className="opacity-50">[Esc]</span>
                <X size={16} strokeWidth={1.5} />
              </button>
            </Magnetic>
          </div>

          <div className="max-w-7xl mx-auto w-full min-h-screen flex flex-col px-6 md:px-12 lg:px-16 pt-32 pb-24">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 flex-grow">
              
              <div className="md:col-span-5 flex flex-col">
                <div className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-8">
                  [ {project.id} / {project.year} ]
                </div>
                
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter uppercase mb-8 leading-[0.9]">
                  <ScrambleText text={project.name} />
                </h2>
                
                <p className="font-serif italic text-2xl md:text-3xl text-black/80 dark:text-[#EAEAEA]/80 mb-12 leading-snug">
                  {project.tagline}
                </p>

                <div className="grid grid-cols-2 gap-8 mb-12 border-y border-black/10 dark:border-white/10 py-8">
                  <div>
                    <div className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3">Role</div>
                    <div className="text-base font-light">{project.role}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3">Type</div>
                    <div className="text-base font-light">{project.type}</div>
                  </div>
                  {project.techStack && (
                    <div className="col-span-2">
                      <div className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3">Tech Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-xs font-mono px-3 py-1.5 border border-black/10 dark:border-white/10 rounded-sm text-black/70 dark:text-white/70">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-8">
                  <a href="#" className="group inline-flex items-center gap-3 text-sm font-mono uppercase tracking-widest hover:text-black/70 dark:hover:text-white/70 transition-colors">
                    <ScrambleText text="Visit Project" />
                    <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                </div>
              </div>

              <div className="md:col-span-6 md:col-start-7 flex flex-col gap-16">
                
                {project.images.length > 0 && (
                  <div className="w-full aspect-[4/3] relative border border-black/10 dark:border-white/10 rounded-sm overflow-hidden group">
                    <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                      <ProjectAsciiArt id={project.id} variant="main" />
                    </div>
                  </div>
                )}

                <div className="space-y-12">
                  <div>
                    <h3 className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">Overview</h3>
                    <p className="text-base md:text-lg leading-relaxed text-black/80 dark:text-[#EAEAEA]/80 font-light">
                      {project.overview}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">Approach</h3>
                    <p className="text-base md:text-lg leading-relaxed text-black/80 dark:text-[#EAEAEA]/80 font-light">
                      {project.approach}
                    </p>
                  </div>
                </div>

                {project.images.length > 1 && (
                  <div className="grid grid-cols-1 gap-8">
                    {project.images.slice(1).map((_, idx) => (
                      <div key={idx} className="w-full aspect-video relative border border-black/10 dark:border-white/10 rounded-sm overflow-hidden group">
                        <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                          <ProjectAsciiArt id={project.id} variant={`detail-${idx + 1}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
