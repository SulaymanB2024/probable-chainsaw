'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import ContactModal from './ContactModal';
import Magnetic from './Magnetic';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAFAFA] text-[#050505] dark:bg-[#050505] dark:text-[#F2F2F2] pt-32 pb-12 p-6 md:p-12 lg:p-16 border-t border-black/5 dark:border-white/5 relative z-30 transition-colors duration-500">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
            Let&apos;s build <br/>
            <span className="font-serif italic opacity-60">the future.</span>
          </h2>
          <button 
            onClick={() => setIsContactOpen(true)} 
            className="group inline-flex items-center gap-4 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-black dark:after:bg-white after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 pb-2"
          >
            <span>Initiate Contact</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={1} />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-8 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-50">
          <div className="flex flex-col items-start gap-4">
            <span className="text-black dark:text-[#F2F2F2] opacity-100 mb-2 border-b border-black/10 dark:border-white/10 pb-2 w-full">Presence</span>
            <Magnetic><a href="#" className="hover:text-black/70 dark:hover:text-white transition-colors inline-block">Twitter / X</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-black/70 dark:hover:text-white transition-colors inline-block">GitHub</a></Magnetic>
            <Magnetic><a href="#" className="hover:text-black/70 dark:hover:text-white transition-colors inline-block">Read.cv</a></Magnetic>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-black dark:text-[#F2F2F2] opacity-100 mb-2 border-b border-black/10 dark:border-white/10 pb-2">Base</span>
            <span>San Francisco, CA</span>
            <span>London, UK</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full mt-32 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] md:text-[9px] uppercase tracking-[0.3em] opacity-30">
        <div>&copy; 2026 SULAYMAN BOWLES. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-8">
          <div>SYS.OP. 992.1 // SECURE</div>
          <Magnetic>
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors"
            >
              <span>[ TOP ]</span>
              <ArrowUp size={12} />
            </button>
          </Magnetic>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
}
