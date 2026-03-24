'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

const ASCII_PATTERNS: Record<string, string[]> = {
  default: [
    "  +-------------------+  ",
    "  |                   |  ",
    "  |   DATA STREAM     |  ",
    "  |   [||||||||||]    |  ",
    "  |                   |  ",
    "  +-------------------+  ",
  ],
  "01": [
    "      .---.      ",
    "     /     \\     ",
    "    | () () |    ",
    "     \\  ^  /     ",
    "      |||||      ",
    "      |||||      ",
  ],
  "02": [
    "   \\       /   ",
    "    \\     /    ",
    " --- [   ] --- ",
    "    /     \\    ",
    "   /       \\   ",
  ],
  "03": [
    "   /\\   /\\   ",
    "  /  \\ /  \\  ",
    " /____V____\\ ",
    " \\         / ",
    "  \\       /  ",
    "   \\     /   ",
  ],
  "04": [
    "  [=======]  ",
    "  |       |  ",
    "  |  GPU  |  ",
    "  |       |  ",
    "  [=======]  ",
  ]
};

const DENSE_CHARS = " .-+*=%@#";

export default function ProjectAsciiArt({ id }: { id: string }) {
  const [art, setArt] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    // Generate a dynamic ASCII pattern based on the ID
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const generateDynamicArt = () => {
      const lines = [];
      for (let i = 0; i < 8; i++) {
        let line = "";
        for (let j = 0; j < 24; j++) {
          const noise = Math.sin(i * 0.5 + j * 0.2 + seed) * 0.5 + 0.5;
          const charIndex = Math.floor(noise * (DENSE_CHARS.length - 1));
          line += DENSE_CHARS[charIndex];
        }
        lines.push(line);
      }
      return lines;
    };

    const basePattern = ASCII_PATTERNS[id.toLowerCase()] || generateDynamicArt();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArt(basePattern);

    if (!isInView) return;

    // Optional: Add a slight animation effect by shifting characters
    const interval = setInterval(() => {
      setArt((prev) => 
        prev.map(line => {
          // Randomly mutate a character
          if (Math.random() > 0.8) {
            const chars = line.split('');
            const idx = Math.floor(Math.random() * chars.length);
            chars[idx] = DENSE_CHARS[Math.floor(Math.random() * DENSE_CHARS.length)];
            return chars.join('');
          }
          return line;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [id, isInView]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center bg-white dark:bg-[#050505] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <pre className="font-mono text-[10px] md:text-xs leading-none text-black/70 dark:text-white/70 tracking-widest whitespace-pre">
        {art.join('\n')}
      </pre>
    </div>
  );
}
