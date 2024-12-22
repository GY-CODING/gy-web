/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const GRID_SIZE = {
  mobile: 128,
  desktop: 64,
} as const;

const GRID_CONFIG = {
  mobile: {
    columns: 6,
    rows: 4,
  },
  desktop: {
    columns: 12,
    rows: 8,
  },
} as const;

const GRID_COLORS = {
  light: {
    lines: 'rgba(0,0,0,0.05)',
    verticalGlow: ['rgba(99, 102, 241, 0)', 'rgba(99, 102, 241, 0.5)', 'rgba(99, 102, 241, 0)'],
    horizontalGlow: ['rgba(236, 72, 153, 0)', 'rgba(236, 72, 153, 0.5)', 'rgba(236, 72, 153, 0)'],
  },
  dark: {
    lines: 'rgba(255,255,255,0.03)',
    verticalGlow: ['rgba(99, 102, 241, 0)', 'rgba(99, 102, 241, 0.6)', 'rgba(99, 102, 241, 0)'],
    horizontalGlow: ['rgba(236, 72, 153, 0)', 'rgba(236, 72, 153, 0.6)', 'rgba(236, 72, 153, 0)'],
  },
} as const;

const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const useGridAnimation = (isMobile: boolean, isTouch: boolean) => {
  const autoX = useMotionValue(0);
  const autoY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const autoSpringX = useSpring(autoX, { damping: 30, stiffness: 200 });
  const autoSpringY = useSpring(autoY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    if (!isMobile && !isTouch) return;

    const animatePosition = async () => {
      while (true) {
        await animate(autoX, randomInRange(0, 1), {
          type: 'tween',
          duration: randomInRange(2, 4),
          ease: 'easeInOut',
        });

        await animate(autoY, randomInRange(0, 1), {
          type: 'tween',
          duration: randomInRange(2, 4),
          ease: 'easeInOut',
        });

        await new Promise((resolve) => setTimeout(resolve, randomInRange(100, 500)));
      }
    };

    animatePosition();
  }, [isMobile, isTouch, autoX, autoY]);

  return {
    mouseX,
    mouseY,
    springX,
    springY,
    autoSpringX,
    autoSpringY,
  };
};

export default function AnimatedGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { mouseX, mouseY, springX, springY, autoSpringX, autoSpringY } = useGridAnimation(
    isMobile,
    isTouch
  );

  const { columns, rows } = isMobile ? GRID_CONFIG.mobile : GRID_CONFIG.desktop;
  const gridSize = isMobile ? GRID_SIZE.mobile : GRID_SIZE.desktop;
  const colors = theme.palette.mode === 'dark' ? GRID_COLORS.dark : GRID_COLORS.light;

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  useEffect(() => {
    if (isTouch || isMobile) return;

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
  }, [mouseX, mouseY, isTouch, isMobile]);

  const activeSpringX = isMobile || isTouch ? autoSpringX : springX;
  const activeSpringY = isMobile || isTouch ? autoSpringY : springY;

  const verticalLines = Array.from({ length: columns + 1 }, (_, i) => i);
  const horizontalLines = Array.from({ length: rows + 1 }, (_, i) => i);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to right, ${colors.lines} 1px, transparent 1px),
            linear-gradient(to bottom, ${colors.lines} 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          opacity: theme.palette.mode === 'dark' ? 0.2 : 0.4,
        }}
      />

      {verticalLines.map((i) => {
        const distance = useTransform(activeSpringX, (latest) => {
          const lineX = i / columns;
          const distanceFromMouse = Math.abs(lineX - latest);
          return 1 - Math.min(distanceFromMouse * 2, 1);
        });

        return (
          <motion.div
            key={`v-${i}`}
            style={{
              position: 'absolute',
              left: `${(i / columns) * 100}%`,
              top: 0,
              bottom: 0,
              width: '1px',
              opacity: distance,
              background: `linear-gradient(to bottom, ${colors.verticalGlow.join(', ')})`,
            }}
          />
        );
      })}

      {horizontalLines.map((i) => {
        const distance = useTransform(activeSpringY, (latest) => {
          const lineY = i / rows;
          const distanceFromMouse = Math.abs(lineY - latest);
          return 1 - Math.min(distanceFromMouse * 2, 1);
        });

        return (
          <motion.div
            key={`h-${i}`}
            style={{
              position: 'absolute',
              top: `${(i / rows) * 100}%`,
              left: 0,
              right: 0,
              height: '1px',
              opacity: distance,
              background: `linear-gradient(to right, ${colors.horizontalGlow.join(', ')})`,
            }}
          />
        );
      })}
    </Box>
  );
}
