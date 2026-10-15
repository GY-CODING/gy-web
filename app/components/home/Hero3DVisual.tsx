'use client';

import { Box } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLiteMotion } from '../../hooks/useLiteMotion';
import { useEffect, useRef } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import LottieAnimation from '../lottieAnimation';
import GlassTile from './GlassTile';

function ShineSweep() {
  const liteMotion = useLiteMotion();
  if (liteMotion) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '-50%',
        width: '55%',
        height: '220%',
        background:
          'linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
        pointerEvents: 'none',
      }}
      animate={{ left: ['-65%', '135%'] }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
    />
  );
}

export default function Hero3DVisual({ lottieUrl }: { lottieUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const liteMotion = useLiteMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 22 });
  const sy = useSpring(my, { stiffness: 120, damping: 22 });

  useEffect(() => {
    if (liteMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [liteMotion, mx, my]);

  // Layered parallax: each depth moves by its own multiple of the cursor offset,
  // so the composition reads as several panels floating at different distances
  // rather than one flat card tilting.
  const glowX = useTransform(sx, [0, 1], [12, -12]);
  const glowY = useTransform(sy, [0, 1], [12, -12]);
  const tileAX = useTransform(sx, [0, 1], [28, -28]);
  const tileAY = useTransform(sy, [0, 1], [28, -28]);
  const tileBX = useTransform(sx, [0, 1], [-20, 20]);
  const tileBY = useTransform(sy, [0, 1], [-20, 20]);
  const mainRotateX = useTransform(sy, [0, 1], [8, -8]);
  const mainRotateY = useTransform(sx, [0, 1], [-8, 8]);

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          position: 'absolute',
          inset: '8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        style={{ x: tileAX, y: tileAY, position: 'absolute', top: '2%', left: '0%', zIndex: 2 }}
        animate={liteMotion ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GlassTile
          icon={<BoltRoundedIcon fontSize="inherit" />}
          gradient="linear-gradient(135deg, #6366f1, #8C54FF)"
        />
      </motion.div>

      <motion.div
        style={{
          x: tileBX,
          y: tileBY,
          position: 'absolute',
          bottom: '4%',
          right: '-2%',
          zIndex: 2,
        }}
        animate={liteMotion ? undefined : { y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <GlassTile
          icon={<AutoAwesomeRoundedIcon fontSize="inherit" />}
          gradient="linear-gradient(135deg, #ec4899, #8C54FF)"
          size={64}
        />
      </motion.div>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          style={{
            rotateX: mainRotateX,
            rotateY: mainRotateY,
            transformPerspective: 1000,
            width: '78%',
            maxWidth: 400,
            aspectRatio: '1 / 1',
          }}
          animate={liteMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '32px',
              background: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(20px)',
              border: (theme) =>
                `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 30px 80px -10px rgba(99,102,241,0.3)'
                  : '0 30px 80px -10px rgba(99,102,241,0.18)',
              p: 4,
              overflow: 'hidden',
            }}
          >
            <ShineSweep />
            <LottieAnimation animationPath={lottieUrl} />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
