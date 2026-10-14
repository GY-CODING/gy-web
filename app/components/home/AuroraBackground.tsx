'use client';

import { Box, useTheme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const NOISE_URL =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E';

const DEFAULT_COLORS: [string, string, string] = ['#6366f1', '#ec4899', '#8C54FF'];

const BLOB_LAYOUT = [
  { size: 55, top: '-15%', left: '-5%', duration: 20 },
  { size: 45, top: '5%', left: '65%', duration: 24 },
  { size: 42, top: '50%', left: '15%', duration: 28 },
];

// `colors` lets a page tint the aurora with its own palette (e.g. product pages);
// the third color also drives the cursor spotlight. Expects 6-digit hex values.
// `intensity` scales the blob opacity (1 = default) for pages that need a calmer backdrop.
export default function AuroraBackground({
  colors = DEFAULT_COLORS,
  intensity = 1,
}: {
  colors?: [string, string, string];
  intensity?: number;
}) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme.palette.mode === 'dark';
  const rootRef = useRef<HTMLDivElement>(null);
  const [trackPointer, setTrackPointer] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const spotlightBackground = useTransform([sx, sy], ([x, y]) => {
    const px = (x as number) * 100;
    const py = (y as number) * 100;
    const tint = `${colors[2]}${isDark ? '29' : '1a'}`;
    return `radial-gradient(520px circle at ${px}% ${py}%, ${tint}, transparent 70%)`;
  });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    setTrackPointer(true);

    const handleMove = (e: MouseEvent) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduceMotion, mx, my]);

  const gridLineColor = isDark ? 'rgba(255,255,255,0.07)' : `${colors[0]}1f`;

  return (
    <Box
      ref={rootRef}
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        // Fade every layer out at the bottom instead of painting a solid color over it,
        // so the aurora blends into whatever background sits behind the section.
        maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
      }}
    >
      {BLOB_LAYOUT.map((blob, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: blob.top,
            left: blob.left,
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            minWidth: 280,
            minHeight: 280,
            borderRadius: '50%',
            background: colors[i],
            filter: 'blur(90px)',
            opacity: (isDark ? 0.22 : 0.14) * intensity,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 60, -40, 0],
                  y: [0, -40, 30, 0],
                  scale: [1, 1.15, 0.95, 1],
                }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Perspective grid floor — adds a depth cue beneath the hero content. */}
      <Box
        sx={{
          position: 'absolute',
          left: '-10%',
          right: '-10%',
          bottom: 0,
          height: '42%',
          backgroundImage: `linear-gradient(${gridLineColor} 1px, transparent 1px), linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          transform: 'perspective(600px) rotateX(62deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black 0%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 85%)',
          opacity: isDark ? 0.5 : 0.4,
        }}
      />

      {trackPointer && (
        <motion.div style={{ position: 'absolute', inset: 0, background: spotlightBackground }} />
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: isDark ? 0.05 : 0.035,
          mixBlendMode: 'overlay',
          backgroundImage: `url("${NOISE_URL}")`,
          backgroundSize: '200px 200px',
        }}
      />
    </Box>
  );
}
