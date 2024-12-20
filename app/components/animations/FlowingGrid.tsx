'use client';

import { useTheme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const GRID_SIZE = {
  COLS: 10,
  ROWS: 6
};

const FlowingGrid = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 15, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 15, stiffness: 300 });

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

  const createGrid = () => {
    const lines = [];
    const cellWidth = 100 / GRID_SIZE.COLS;
    const cellHeight = 100 / GRID_SIZE.ROWS;

    // Líneas horizontales
    for (let i = 0; i <= GRID_SIZE.ROWS; i++) {
      const y = i * cellHeight;
      lines.push(
        <motion.line
          key={`h-${i}`}
          x1="0%"
          x2="100%"
          y1={`${y}%`}
          y2={`${y}%`}
          stroke={theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.07)'}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      );
    }

    // Líneas verticales
    for (let i = 0; i <= GRID_SIZE.COLS; i++) {
      const x = i * cellWidth;
      lines.push(
        <motion.line
          key={`v-${i}`}
          x1={`${x}%`}
          x2={`${x}%`}
          y1="0%"
          y2="100%"
          stroke={theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.07)'}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      );
    }

    return lines;
  };

  const gridTransform = useTransform(
    [springX, springY],
    ([x, y]) => {
      const moveX = (x as number - 0.5) * 30;
      const moveY = (y as number - 0.5) * 30;
      const rotateX = (y as number - 0.5) * 5;
      const rotateY = (x as number - 0.5) * 5;
      return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${moveX}px, ${moveY}px)`;
    }
  );

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
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          transform: gridTransform,
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
          {createGrid()}
        </svg>
      </motion.div>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle at ${x as number * 100}% ${y as number * 100}%, rgba(99, 102, 241, 0.03) 0%, transparent 70%)`
          ),
        }}
      />
    </div>
  );
};

export default FlowingGrid;
