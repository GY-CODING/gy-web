'use client';

import { Box, useTheme } from '@mui/material';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLiteMotion } from '../../hooks/useLiteMotion';
import { useEffect, useRef, useState } from 'react';

const NOISE_URL =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E';

const DEFAULT_COLORS: [string, string, string] = ['#6366f1', '#ec4899', '#8C54FF'];

const BLOB_LAYOUT = [
  { size: 55, top: '-15%', left: '-5%', duration: 20 },
  { size: 45, top: '5%', left: '65%', duration: 24 },
  { size: 42, top: '50%', left: '15%', duration: 28 },
];

const SPOTLIGHT_SIZE = 1040; // px diameter of the cursor glow

// Same look as before, built for performance:
// - Blobs are radial gradients instead of `filter: blur(90px)`. The blur was re-rasterised
//   on every animation frame (very expensive on Safari/iPhone and integrated GPUs); now only
//   `transform` animates, which the GPU composites without repainting.
// - The cursor spotlight is a fixed-size layer moved with `transform` instead of rewriting a
//   full-section `background` on every mousemove.
// - The noise overlay has no `mix-blend-mode` (it forced compositing of everything below).
// - In lite mode (touch, modest machines, reduced motion) everything is static.
//
// `colors` tints the aurora with a page's palette (e.g. product pages); the third color also
// drives the cursor spotlight. Expects 6-digit hex values.
// `intensity` scales the blob opacity (1 = default) for pages that need a calmer backdrop.
export default function AuroraBackground({
  colors = DEFAULT_COLORS,
  intensity = 1,
}: {
  colors?: [string, string, string];
  intensity?: number;
}) {
  const theme = useTheme();
  const liteMotion = useLiteMotion();
  const isDark = theme.palette.mode === 'dark';
  const rootRef = useRef<HTMLDivElement>(null);
  const [trackPointer, setTrackPointer] = useState(false);

  // Spotlight position in px relative to the section, smoothed with a spring.
  const mx = useMotionValue(-SPOTLIGHT_SIZE);
  const my = useMotionValue(-SPOTLIGHT_SIZE);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (liteMotion || !window.matchMedia('(pointer: fine)').matches) {
      setTrackPointer(false);
      return;
    }
    setTrackPointer(true);

    const handleMove = (e: MouseEvent) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      mx.set(e.clientX - rect.left - SPOTLIGHT_SIZE / 2);
      my.set(e.clientY - rect.top - SPOTLIGHT_SIZE / 2);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [liteMotion, mx, my]);

  const gridLineColor = isDark ? 'rgba(255,255,255,0.07)' : `${colors[0]}1f`;
  // Without the blur the gradient edge is already soft; opacity is nudged up to keep the
  // same perceived glow as the old blurred blobs.
  const blobOpacity = (isDark ? 0.3 : 0.2) * intensity;

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
            background: `radial-gradient(circle at center, ${colors[i]} 0%, ${colors[i]}00 70%)`,
            opacity: blobOpacity,
            // Own GPU layer only when it actually animates.
            willChange: liteMotion ? 'auto' : 'transform',
          }}
          animate={liteMotion ? undefined : { x: [0, 60, -40, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Perspective grid floor — adds a depth cue beneath the hero content (static). */}
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
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SPOTLIGHT_SIZE,
            height: SPOTLIGHT_SIZE,
            x: sx,
            y: sy,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${colors[2]}${isDark ? '29' : '1a'} 0%, transparent 70%)`,
            willChange: 'transform',
          }}
        />
      )}

      {!liteMotion && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: isDark ? 0.035 : 0.025,
            backgroundImage: `url("${NOISE_URL}")`,
            backgroundSize: '200px 200px',
          }}
        />
      )}
    </Box>
  );
}
