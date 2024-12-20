'use client';

import { useTheme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface Pixel {
  x: number;
  y: number;
  size: number;
  initialOpacity: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface PixelProps {
  pixel: Pixel;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  dimensions: Dimensions;
  theme: any;
}

const PIXEL_SIZE = {
  mobile: 8,
  desktop: 12
};

const PixelDot = ({ pixel, mouseX, mouseY, dimensions, theme }: PixelProps) => {
  const distance = useTransform(
    [mouseX, mouseY],
    ([x, y]) => {
      const dx = (x * dimensions.width - pixel.x) / dimensions.width;
      const dy = (y * dimensions.height - pixel.y) / dimensions.height;
      return Math.sqrt(dx * dx + dy * dy);
    }
  );

  const opacity = useTransform(
    distance,
    [0, 0.2],
    [pixel.initialOpacity * 2, pixel.initialOpacity]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: pixel.x,
        top: pixel.y,
        width: pixel.size,
        height: pixel.size,
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(99, 102, 241, 0.15)'
          : 'rgba(99, 102, 241, 0.1)',
        opacity,
      }}
      animate={{
        opacity: [
          opacity.get(),
          opacity.get() * (0.8 + Math.random() * 0.4),
          opacity.get()
        ]
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  );
};

const PixelatedBackground = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const generatePixels = () => {
      if (!containerRef.current) return;

      const { offsetWidth: width, offsetHeight: height } = containerRef.current;
      setDimensions({ width, height });

      const pixelSize = window.innerWidth < 768 ? PIXEL_SIZE.mobile : PIXEL_SIZE.desktop;
      const cols = Math.ceil(width / pixelSize);
      const rows = Math.ceil(height / pixelSize);

      const newPixels: Pixel[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Crear un patrón de opacidad basado en la posición
          const distanceFromCenter = Math.sqrt(
            Math.pow((x / cols) - 0.5, 2) + 
            Math.pow((y / rows) - 0.5, 2)
          );
          
          const baseOpacity = Math.random() * 0.04 + 0.01; // Entre 0.01 y 0.05
          
          newPixels.push({
            x: x * pixelSize,
            y: y * pixelSize,
            size: pixelSize,
            initialOpacity: baseOpacity * (1 - distanceFromCenter),
          });
        }
      }
      setPixels(newPixels);
    };

    generatePixels();
    window.addEventListener('resize', generatePixels);
    return () => window.removeEventListener('resize', generatePixels);
  }, []);

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
      {pixels.map((pixel, i) => (
        <PixelDot
          key={i}
          pixel={pixel}
          mouseX={springX}
          mouseY={springY}
          dimensions={dimensions}
          theme={theme}
        />
      ))}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(99, 102, 241, 0.05) 0%, transparent 30%)`
          ),
        }}
      />
    </div>
  );
};

export default PixelatedBackground;
