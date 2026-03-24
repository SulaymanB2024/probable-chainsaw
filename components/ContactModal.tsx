'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import Magnetic from './Magnetic';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        onClose();
        setFormState('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-12 bg-[#FAFAFA]/90 dark:bg-[#050505]/90 backdrop-blur-xl"
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
          
          <div className="fixed top-6 right-6 md:top-12 md:right-12 z-[110]">
            <Magnetic>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 text-black dark:text-white bg-[#FAFAFA] dark:bg-[#050505]"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </Magnetic>
          </div>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-sm relative p-8 md:p-12 text-black dark:text-white shadow-2xl"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-light mb-2">Initiate Contact</h2>
              <p className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40">Secure Channel // Encrypted</p>
            </div>

            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center mb-4">
                  <Send size={16} />
                </div>
                <h3 className="text-xl font-serif">Message Transmitted</h3>
                <p className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40">Awaiting response...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-60">Identifier</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-mono text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-60">Return Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-mono text-sm"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-60">Payload</label>
                  <textarea 
                    id="message" 
                    required
                    rows={4}
                    className="bg-transparent border-b border-black/10 dark:border-white/10 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-mono text-sm resize-none"
                    placeholder="Enter message..."
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="mt-4 group flex items-center justify-center gap-4 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] border border-black/10 dark:border-white/10 py-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{formState === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={1} />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
