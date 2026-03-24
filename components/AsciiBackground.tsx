'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

// Default intricate characters
const DEFAULT_CHARS = ' ⠄⠆⠇⠋⠙⠸⠰⠆⠤⠤⠒⠉';
const DEFAULT_DENSE_CHARS = ' .-+*=%@#';

// Subtle characters for project pages
const SUBTLE_CHARS = '  .·°+';
const SUBTLE_DENSE_CHARS = '  .·°+*';

// Simple string hash for unique project seeds
const getSeed = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize by disabling alpha on context
    if (!ctx) return;

    const isProjectPage = pathname?.startsWith('/work/');
    const slug = isProjectPage ? pathname.split('/').pop() || '' : '';
    const seed = isProjectPage ? getSeed(slug) : 0;
    
    // Configuration based on route
    const CHARS = isProjectPage ? SUBTLE_CHARS : DEFAULT_CHARS;
    const DENSE_CHARS = isProjectPage ? SUBTLE_DENSE_CHARS : DEFAULT_DENSE_CHARS;
    const baseOpacityMult = isProjectPage ? 0.3 : 1.0; // Make it much more subtle on project pages
    const waveFreqMult = isProjectPage ? 0.5 + (seed % 10) * 0.05 : 1.0; // Unique wave frequency per project
    const timeMult = isProjectPage ? 0.005 : 0.015; // Slower on project pages

    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction state
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let cols = 0;
    let rows = 0;
    const fontSize = isProjectPage ? 18 : 14; // Larger font size = sparser grid on project pages

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      cols = Math.ceil(window.innerWidth / (fontSize * 0.6)); // mono font aspect ratio approx 0.6
      rows = Math.ceil(window.innerHeight / fontSize);
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Pre-calculate some math for performance
    const render = () => {
      time += timeMult; // Speed of the flow
      
      // Pre-calculate time-based values outside the loop
      const t05 = time * 0.5;
      const t03 = time * 0.3;
      const t08 = time * 0.8;
      const t04 = time * 0.4;
      const t2 = time * 2;
      
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const currentTheme = resolvedTheme || theme;
      const isDark = currentTheme === 'dark';

      // Solid background for VC/Studio aesthetic
      ctx.fillStyle = isDark ? '#050505' : '#FAFAFA';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `300 ${fontSize}px "JetBrains Mono", monospace`;
      ctx.textBaseline = 'top';

      const maxDist = 400;
      const maxDistSq = maxDist * maxDist;

      // We'll create a flowing 3D terrain effect
      const colorValue = isDark ? 255 : 0;
      const opacityGroups: Record<number, {char: string, x: number, y: number}[]> = {};
      for (let i = 0; i <= 10; i++) opacityGroups[i] = [];

      for (let y = 0; y < rows; y++) {
        const py = y * fontSize;
        const ny = y * 0.05 * waveFreqMult;
        
        // Pre-calculate y-dependent wave components
        const cosNyT03 = Math.cos(ny - t03);
        const cosNyT04 = Math.cos(ny * 1.5 + t04);

        for (let x = 0; x < cols; x++) {
          const px = x * (fontSize * 0.6);

          // Calculate distance to mouse for interaction
          const dx = px - mouseX;
          const dy = py - mouseY;
          const distSq = dx * dx + dy * dy;
          
          // Complex wave function for a "digital ocean" or "terrain" look
          const nx = x * 0.05 * waveFreqMult;
          
          let elevation = 
            Math.sin(nx * 0.5 + t05) * cosNyT03 * 2.0 +
            Math.sin(nx * 1.2 - t08) * cosNyT04 * 1.0 +
            Math.sin(nx * 2.5 + time) * 0.5;

          // Normalize elevation roughly to 0-1
          let normalized = (elevation + 3.5) / 7.0;
          
          // Mouse interaction: creates a "gravity well" or "lens" effect
          let mouseInfluence = 0;
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const influence = Math.max(0, 1 - dist / maxDist);
            // Ease out cubic for smoother light falloff
            const easedInfluence = 1 - (1 - influence) * (1 - influence) * (1 - influence);
            mouseInfluence = easedInfluence;
            
            // Distort the terrain near the mouse
            normalized += Math.sin(dist * 0.02 - t2) * 0.1 * easedInfluence;
          }

          normalized = Math.max(0, Math.min(1, normalized));

          // Determine character based on elevation
          const charSet = mouseInfluence > 0.3 ? DENSE_CHARS : CHARS;
          const charIndex = Math.floor(normalized * (charSet.length - 1));
          const char = charSet[charIndex];

          // Skip rendering empty spaces for performance if it's the first char of CHARS
          if (char === ' ' && mouseInfluence < 0.1) continue;

          // Calculate color/opacity
          // Base opacity is very low (stealthy VC look)
          let opacity = (0.05 + (normalized * 0.15)) * baseOpacityMult;
          
          // Mouse adds a bright, premium white/silver glow
          if (mouseInfluence > 0) {
            opacity += mouseInfluence * (isProjectPage ? 0.3 : 0.8);
          }

          // Add a subtle horizontal scanline effect
          if (y % 2 === 0) opacity *= 0.7;

          // Quantize opacity to 10 levels to minimize context state changes
          const quantizedOpacity = Math.min(10, Math.max(0, Math.floor(opacity * 10)));
          if (quantizedOpacity > 0) {
            opacityGroups[quantizedOpacity].push({ char, x: px, y: py });
          }
        }
      }

      // Batch render by opacity group
      for (let i = 1; i <= 10; i++) {
        const group = opacityGroups[i];
        if (group.length === 0) continue;
        
        ctx.fillStyle = `rgba(${colorValue}, ${colorValue}, ${colorValue}, ${i / 10})`;
        for (let j = 0; j < group.length; j++) {
          const item = group[j];
          ctx.fillText(item.char, item.x, item.y);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pathname, theme, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500"
    />
  );
}
