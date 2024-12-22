/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useTheme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const NUM_LINES = 5;

const WaveLines = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 40, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 40, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {[...Array(NUM_LINES)].map((_, i) => {
          const progress = i / (NUM_LINES - 1);
          const baseY = useTransform(springY, [0, 1], [20 + progress * 60, 40 + progress * 60]);

          const pathD = useTransform([springX, baseY], ([x, y]) => {
            const amplitude = 20 + Math.sin(progress * Math.PI) * 15;
            const frequency = 3 + Math.cos(progress * Math.PI) * 2;

            const points = [];
            for (let j = 0; j <= 100; j++) {
              const px = j;
              const wave = Math.sin((j / 100) * Math.PI * frequency + progress * 10) * amplitude;
              const mouseInfluence = Math.sin(
                (j / 100 - (x as number) * Math.PI) * 30 * (1 - Math.abs(j / 100 - (x as number)))
              );
              points.push(`${px}% ${parseFloat(y as string) + wave + mouseInfluence}%`);
            }

            return `M 0 ${y} Q ${points.join(' ')} 100% ${y}`;
          });

          return (
            <motion.path
              key={i}
              d={pathD}
              fill="none"
              stroke={
                theme.palette.mode === 'dark'
                  ? 'rgba(99, 102, 241, 0.1)'
                  : 'rgba(99, 102, 241, 0.07)'
              }
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}
      </svg>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: useTransform(
            [springX, springY],
            ([x, y]) =>
              `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(99, 102, 241, 0.05) 0%, transparent 40%)`
          ),
          opacity: 0.8,
        }}
      />
    </div>
  );
};

export default WaveLines;
