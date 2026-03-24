'use client';

import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[2px] bg-black/5 dark:bg-white/5 z-50 pointer-events-none">
      <motion.div
        className="absolute top-0 left-0 right-0 bg-black/40 dark:bg-white/40 origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  );
}
