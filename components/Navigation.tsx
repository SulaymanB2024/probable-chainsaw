'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import ScrambleText from './ScrambleText';
import Magnetic from './Magnetic';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    window.addEventListener('modal-open', handleModalOpen);
    window.addEventListener('modal-close', handleModalClose);

    return () => {
      window.removeEventListener('modal-open', handleModalOpen);
      window.removeEventListener('modal-close', handleModalClose);
    };
  }, []);

  const navLinks = [
    { href: '#about', label: '01 / About' },
    { href: '#history', label: '02 / History' },
    { href: '#theses', label: '03 / Theses' },
    { href: '#markets', label: '04 / Markets' },
    { href: '#works', label: '05 / Works' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 md:p-12 pointer-events-none mix-blend-difference transition-opacity duration-500 ${isModalOpen ? 'opacity-0' : 'opacity-100'}`}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-mono text-xs md:text-[10px] tracking-[0.2em] uppercase pointer-events-auto"
        >
          <Link href="/" className="hover:opacity-70 transition-opacity" onClick={() => setIsOpen(false)}>
            <span className="opacity-40">[ INDEX ]</span><br/>
            <span className="font-medium text-xs tracking-[0.3em] mt-1 block">S. BOWLES</span>
          </Link>
        </motion.div>
        
        <div className="flex items-center gap-4 pointer-events-auto">
          {mounted && (
            <Magnetic>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 bg-white/20 dark:bg-[#050505]/20 backdrop-blur-md"
              >
                {theme === 'dark' ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
              </motion.button>
            </Magnetic>
          )}
          <Magnetic>
            <motion.button 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 bg-white/20 dark:bg-[#050505]/20 backdrop-blur-md"
            >
              <Menu size={14} strokeWidth={1.5} />
            </motion.button>
          </Magnetic>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-[#FAFAFA]/95 dark:bg-[#050505]/95 backdrop-blur-lg flex flex-col justify-center items-center text-black dark:text-white"
          >
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            
            <div className="absolute top-6 right-6 md:top-12 md:right-12 z-10 flex items-center gap-4">
              {mounted && (
                <Magnetic>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 text-black dark:text-white"
                  >
                    {theme === 'dark' ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
                  </button>
                </Magnetic>
              )}
              <Magnetic>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 text-black dark:text-white"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              </Magnetic>
            </div>

            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="group flex items-center justify-center gap-4 text-4xl md:text-6xl font-light tracking-tighter uppercase hover:text-white/70 transition-colors">
                    <ScrambleText text={link.label} />
                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" strokeWidth={1} />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <a href="mailto:sulayman.bowles@gmail.com" onClick={() => setIsOpen(false)} className="group flex items-center justify-center gap-4 text-4xl md:text-6xl font-light tracking-tighter uppercase hover:text-white/70 transition-colors mt-8">
                  <ScrambleText text="Contact" />
                  <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" strokeWidth={1} />
                </a>
              </motion.div>
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute bottom-12 font-mono text-xs md:text-[10px] tracking-[0.2em] uppercase opacity-40 flex gap-8"
            >
              <Magnetic><a href="#" className="hover:text-white transition-colors inline-block">Twitter</a></Magnetic>
              <Magnetic><a href="#" className="hover:text-white transition-colors inline-block">GitHub</a></Magnetic>
              <Magnetic><a href="#" className="hover:text-white transition-colors inline-block">Read.cv</a></Magnetic>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
