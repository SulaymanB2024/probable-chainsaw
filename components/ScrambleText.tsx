'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function ScrambleText({ text, className = '' }: { text: string, className?: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      cancelAnimationFrame(frameRef.current);
      if (elementRef.current) {
        elementRef.current.innerText = text;
      }
      return;
    }

    let frame = 0;
    const queue: { from: string, to: string, start: number, end: number, char?: string }[] = [];
    
    for (let i = 0; i < text.length; i++) {
      queue.push({
        from: CHARS[Math.floor(Math.random() * CHARS.length)],
        to: text[i],
        start: Math.floor(Math.random() * 5),
        end: Math.floor(Math.random() * 15) + 5 + (i * 1.5) // Staggered end
      });
    }

    const update = () => {
      if (!elementRef.current) return;
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = CHARS[Math.floor(Math.random() * CHARS.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      elementRef.current.innerText = output;

      if (complete === queue.length) {
        cancelAnimationFrame(frameRef.current);
      } else {
        frame++;
        frameRef.current = requestAnimationFrame(update);
      }
    };

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRef.current);
  }, [isHovering, text]);

  return (
    <span
      ref={elementRef}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        // Force a re-scramble on click
        setIsHovering(false);
        setTimeout(() => setIsHovering(true), 10);
      }}
    >
      {text}
    </span>
  );
}
