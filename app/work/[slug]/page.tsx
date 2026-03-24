import { WORKS } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'motion/react-client';

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = WORKS.find(w => w.slug === slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="pt-32 pb-16 relative z-20">
      {/* Hero */}
      <section className="p-6 md:p-12 lg:p-16 min-h-[70vh] flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] opacity-40 mb-8 uppercase tracking-[0.2em]"
          >
            [ Project {work.id} {'//'} {work.year} ]
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[14vw] md:text-[11vw] leading-[0.8] tracking-tighter uppercase mb-12 font-sans font-medium"
          >
            {work.name}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 border-t border-white/10 pt-8"
          >
            <div>
              <div className="text-[#F2F2F2]/40 mb-2">Role</div>
              <div className="text-[#F2F2F2]">{work.role}</div>
            </div>
            <div>
              <div className="text-[#F2F2F2]/40 mb-2">Sector</div>
              <div className="text-[#F2F2F2]">{work.type}</div>
            </div>
            <div>
              <div className="text-[#F2F2F2]/40 mb-2">Timeline</div>
              <div className="text-[#F2F2F2]">{work.year}</div>
            </div>
            <div>
              <div className="text-[#F2F2F2]/40 mb-2">Status</div>
              <div className="text-[#F2F2F2]">Deployed</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="p-6 md:p-12 lg:p-16 bg-[#050505]/60 backdrop-blur-md border-t border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4 font-serif italic text-2xl md:text-4xl text-[#F2F2F2]/80 leading-snug"
          >
            &quot;{work.tagline}&quot;
          </motion.div>
          <div className="md:col-span-8 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4 text-[#F2F2F2]/40">Overview</h3>
              <p className="text-lg md:text-xl font-light leading-relaxed text-[#F2F2F2]/80">
                {work.overview}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4 text-[#F2F2F2]/40">Approach</h3>
              <p className="text-lg md:text-xl font-light leading-relaxed text-[#F2F2F2]/80">
                {work.approach}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="p-6 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
          {work.images.map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#050505] overflow-hidden border border-white/5"
            >
              <Image 
                src={img} 
                alt={`${work.name} preview ${i + 1}`} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover opacity-70 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 z-10 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Project */}
      <section className="p-6 md:p-12 lg:p-16 border-t border-white/5 mt-16">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F2F2]/50 hover:text-[#F2F2F2] transition-colors flex items-center gap-4">
            <span className="rotate-180"><ArrowUpRight size={14} /></span>
            Back to Index
          </Link>
          {(() => {
            const currentIndex = WORKS.findIndex(w => w.slug === slug);
            const nextWork = WORKS[(currentIndex + 1) % WORKS.length];
            return (
              <Link href={`/work/${nextWork.slug}`} className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F2F2]/50 hover:text-[#F2F2F2] transition-colors flex items-center gap-4 text-right">
                <span className="flex flex-col">
                  <span className="text-[9px] opacity-40 mb-1">Next Project</span>
                  <span>{nextWork.name}</span>
                </span>
                <ArrowUpRight size={14} />
              </Link>
            );
          })()}
        </div>
      </section>
    </main>
  );
}
