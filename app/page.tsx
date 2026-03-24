'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { WORKS, THESES, HISTORY } from '@/lib/data';
import ProjectRow from '@/components/ProjectRow';
import ScrambleText from '@/components/ScrambleText';
import ProjectModal from '@/components/ProjectModal';
import LiveMarkets from '@/components/LiveMarkets';

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<typeof WORKS[0] | null>(null);

  return (
    <main className="relative">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center p-6 md:p-12 lg:p-16 pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter uppercase">
              <span className="font-serif italic font-light opacity-80">Sulayman</span> <br/>
              <span className="font-sans font-medium ml-8 md:ml-32">Bowles</span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-6 ml-8 md:ml-32 font-mono text-xs md:text-sm tracking-[0.3em] uppercase opacity-70"
            >
              <ScrambleText text="Engineering • Capital • Architecture" />
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-24 md:mt-32">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="md:col-span-5 md:col-start-8 font-mono text-xs md:text-[10px] leading-relaxed opacity-50 uppercase tracking-[0.2em]"
            >
              [ Overview ]
              <div className="mt-6 normal-case tracking-normal opacity-90 text-base md:text-lg font-sans font-light leading-loose text-black dark:text-[#EAEAEA]">
                Engineer, designer, and early-stage investor. I build intricate digital systems and allocate capital to visionary founders shaping the frontiers of technology and human-computer interaction.
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-12 left-6 md:left-12 font-mono text-[10px] tracking-[0.2em] uppercase opacity-40 flex items-center gap-4"
          >
            <ChevronDown size={12} className="animate-bounce" />
            <span>[ Scroll to explore ]</span>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen py-32 p-6 md:p-12 lg:p-16 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="md:sticky md:top-32 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40"
            >
              [ 01 / About ]
              <div className="mt-8 hidden md:block w-8 h-[1px] bg-black/10 dark:bg-white/10"></div>
            </motion.div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight mb-12">
                Bridging the gap between <br className="hidden md:block" />
                <span className="font-serif italic opacity-70">raw engineering</span> and <br className="hidden md:block" />
                <span className="font-serif italic opacity-70">strategic capital.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/10 dark:border-white/10 pt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="p-6 -m-6 rounded-sm hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-500"
              >
                <h3 className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">Background</h3>
                <p className="text-base md:text-lg text-black/80 dark:text-[#EAEAEA]/80 leading-relaxed font-light">
                  My journey started in the trenches of software engineering, building scalable distributed systems and crafting meticulous user interfaces. This technical foundation allows me to evaluate startups not just on their pitch decks, but on their architecture, codebase, and product velocity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="p-6 -m-6 rounded-sm hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-500"
              >
                <h3 className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">Philosophy</h3>
                <p className="text-base md:text-lg text-black/80 dark:text-[#EAEAEA]/80 leading-relaxed font-light">
                  I believe the most asymmetric returns come from founders who are obsessed with product quality and technical excellence. Capital is a commodity; the true differentiator is the ability to execute relentlessly and build products that feel inevitable.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.6 }}
                className="md:col-span-2 p-6 -m-6 rounded-sm hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-500"
              >
                <h3 className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">Approach</h3>
                <p className="text-base md:text-lg text-black/80 dark:text-[#EAEAEA]/80 leading-relaxed font-light max-w-2xl">
                  Unlike traditional investors, I don&apos;t just sit on the cap table. I actively partner with founders to solve hard engineering problems, refine product design, and accelerate go-to-market strategies. I invest in early-stage companies where my technical expertise can act as a force multiplier.
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* HISTORY SECTION */}
      <section id="history" className="min-h-screen py-32 p-6 md:p-12 lg:p-16 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="md:sticky md:top-32 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40"
            >
              [ 02 / History ]
              <div className="mt-8 hidden md:block w-8 h-[1px] bg-black/10 dark:bg-white/10"></div>
            </motion.div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight mb-12">
                A trajectory defined by <br className="hidden md:block" />
                <span className="font-serif italic opacity-70">deep technical execution.</span>
              </h2>
            </motion.div>

            <div className="flex flex-col border-t border-black/10 dark:border-white/10">
              {HISTORY.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 dark:border-white/10 group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-500 -mx-6 px-6 md:mx-0 md:px-4 rounded-sm"
                >
                  <div className="md:col-span-3 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-50 pt-2">
                    {item.year}
                  </div>
                  <div className="md:col-span-9 flex flex-col gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-500">{item.role}</h3>
                      <div className="font-serif italic text-lg opacity-70 mt-1 group-hover:translate-x-2 transition-transform duration-500 delay-75">{item.company}</div>
                    </div>
                    <p className="text-base text-black/70 dark:text-[#EAEAEA]/70 leading-relaxed font-light max-w-2xl group-hover:translate-x-2 transition-transform duration-500 delay-100">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* THESES SECTION (Sticky Split Layout) */}
      <section id="theses" className="min-h-screen py-32 p-6 md:p-12 lg:p-16 border-t border-black/5 dark:border-white/5 bg-[#FAFAFA]/60 dark:bg-[#050505]/60 backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Sticky Header Column */}
          <div className="md:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="md:sticky md:top-32 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40"
            >
              [ 03 / Investment Theses ]
              <div className="mt-8 hidden md:block w-8 h-[1px] bg-black/10 dark:bg-white/10"></div>
            </motion.div>
          </div>
          
          {/* Scrolling Content Column */}
          <div className="md:col-span-8 flex flex-col gap-24 md:gap-32">
            {THESES.map((thesis, index) => (
              <motion.div 
                key={thesis.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="group flex gap-6 md:gap-8"
              >
                <div className="w-0 group-hover:w-8 md:group-hover:w-12 h-[1px] bg-black/30 dark:bg-white/30 mt-8 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 hidden md:block"></div>
                <div>
                  <div className="font-mono text-xs md:text-[10px] opacity-30 mb-6 tracking-[0.2em] transition-transform duration-500 group-hover:translate-x-2">{thesis.id}</div>
                  <h2 className="text-3xl md:text-5xl font-serif font-light leading-[1.1] tracking-tight mb-8 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                    {thesis.title}
                  </h2>
                  <p className="text-base md:text-lg font-mono text-black/80 dark:text-[#EAEAEA]/80 leading-relaxed font-light max-w-xl transition-transform duration-500 group-hover:translate-x-2">
                    {thesis.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* MARKETS SECTION */}
      <section id="markets" className="min-h-screen py-32 p-6 md:p-12 lg:p-16 border-t border-black/5 dark:border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          <div className="md:col-span-4 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="md:sticky md:top-32 font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40"
            >
              [ 04 / Markets ]
              <div className="mt-8 hidden md:block w-8 h-[1px] bg-black/10 dark:bg-white/10"></div>
            </motion.div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight mb-8">
                <ScrambleText text="Live Data & Order Flow" />
              </h2>
              <p className="text-base md:text-lg text-black/80 dark:text-[#EAEAEA]/80 leading-relaxed font-light max-w-2xl">
                A demonstration of real-time data ingestion and state management. Streaming live L2 order book data and ticker updates directly from the exchange via WebSocket.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full"
            >
              <LiveMarkets />
            </motion.div>
          </div>

        </div>
      </section>

      {/* PROJECTS & INVESTMENTS SECTION */}
      <section id="works" className="min-h-screen py-32 p-6 md:p-12 lg:p-16 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="font-mono text-xs md:text-[10px] uppercase tracking-[0.2em] opacity-40 mb-16"
          >
            [ 05 / Selected Works & Allocations ]
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-col border-t border-black/10 dark:border-white/10"
          >
            {WORKS.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectRow item={item} onClick={() => setSelectedProject(item)} />
                </motion.div>
              ))}
            </motion.div>
        </div>
      </section>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
}
