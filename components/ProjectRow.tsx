'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import ScrambleText from './ScrambleText';
import ProjectAsciiArt from './ProjectAsciiArt';

interface ProjectRowProps {
  item: {
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
  };
  onClick: () => void;
}

export default function ProjectRow({ item, onClick }: ProjectRowProps) {
  const [isHovering, setIsHovering] = useState(false);
  const rowRef = useRef<HTMLButtonElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const imageX = useSpring(mouseX, springConfig);
  const imageY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      // Calculate position relative to the row
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    if (isHovering) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovering, mouseX, mouseY]);

  return (
    <button 
      onClick={onClick}
      ref={rowRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="w-full text-left group relative grid grid-cols-2 md:grid-cols-12 gap-4 items-center py-10 border-b border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-colors cursor-pointer"
    >
      {/* Floating Image */}
      <motion.div
        className="absolute z-50 pointer-events-none hidden md:block overflow-hidden rounded-sm bg-white dark:bg-[#050505] border border-black/10 dark:border-white/10 shadow-2xl"
        style={{
          x: imageX,
          y: imageY,
          width: 320,
          height: 200,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-30">
          <ProjectAsciiArt id={item.id} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="text-xs font-mono uppercase tracking-widest text-black/80 dark:text-white/80 mb-1">Tech Stack</div>
          <div className="text-[10px] font-mono text-black/50 dark:text-white/50">{item.techStack?.join(' • ')}</div>
        </div>
      </motion.div>

      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      </div>

      <div className="col-span-2 md:col-span-1 font-mono text-xs md:text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">
        {item.year}
      </div>
      <div className="col-span-2 md:col-span-4 flex flex-col justify-center relative">
        <div className="text-2xl md:text-4xl font-light tracking-tight origin-left group-hover:scale-110 group-hover:translate-x-2 transition-all duration-500">
          <ScrambleText text={item.name} />
        </div>
        <div className="absolute top-full left-0 mt-2 text-sm font-serif italic text-black/60 dark:text-[#EAEAEA]/60 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-2 transition-all duration-500 pointer-events-none">
          {item.tagline}
        </div>
      </div>
      <div className="col-span-1 md:col-span-3 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-50">
        {item.role}
      </div>
      <div className="col-span-1 md:col-span-3 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-50 text-right md:text-left">
        {item.type}
      </div>
      <div className="hidden md:flex col-span-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <ArrowUpRight strokeWidth={1} />
      </div>
    </button>
  );
}
