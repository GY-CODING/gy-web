/* eslint-disable no-constant-condition */
'use client';

import { useTheme } from '@mui/material';
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  useTransform,
  MotionValue,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface AnimatedBackgroundProps {
  color?: string;
}

const GRID_SIZE = {
  mobile: {
    cols: 8,
    rows: 12,
    size: 40,
  },
  desktop: {
    cols: 16,
    rows: 24,
    size: 30,
  },
};

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const Particle = ({
  baseX,
  baseY,
  mouseX,
  mouseY,
  containerWidth,
  containerHeight,
  color,
}: {
  baseX: number;
  baseY: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  containerWidth: number;
  containerHeight: number;
  color?: string;
}) => {
  const theme = useTheme();
  const x = useMotionValue(baseX);
  const y = useMotionValue(baseY);

  // Create a spring for smooth movement
  const springX = useSpring(x, { damping: 25, stiffness: 300 });
  const springY = useSpring(y, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (latestX) => {
      const relativeX = baseX / containerWidth;
      const distance = Math.abs(latestX - relativeX);
      if (distance < 0.2) {
        const pull = (0.2 - distance) * 100;
        x.set(baseX + (latestX * containerWidth - baseX) * pull * 0.005);
      } else {
        x.set(baseX);
      }
    });

    const unsubscribeY = mouseY.on('change', (latestY) => {
      const relativeY = baseY / containerHeight;
      const distance = Math.abs(latestY - relativeY);
      if (distance < 0.2) {
        const pull = (0.2 - distance) * 100;
        y.set(baseY + (latestY * containerHeight - baseY) * pull * 0.005);
      } else {
        y.set(baseY);
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, baseX, baseY, containerWidth, containerHeight, x, y]);

  const distance = useTransform([mouseX, mouseY], ([latestX, latestY]) => {
    const relativeX = baseX / containerWidth;
    const relativeY = baseY / containerHeight;
    return calculateDistance(relativeX, relativeY, latestX as number, latestY as number);
  });

  const scale = useTransform(distance, [0.2, 0], [1, 1.5]);
  const opacity = useTransform(distance, [0.2, 0], [0.2, 0.8]);
  const backgroundColor = useTransform(
    distance,
    [0.2, 0],
    [
      color
        ? `${color}26`
        : theme.palette.mode === 'dark'
          ? 'rgba(99, 102, 241, 0.15)'
          : 'rgba(99, 102, 241, 0.1)',
      color
        ? `${color}80`
        : theme.palette.mode === 'dark'
          ? 'rgba(99, 102, 241, 0.5)'
          : 'rgba(99, 102, 241, 0.3)',
    ]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        x: springX,
        y: springY,
        width: 4,
        height: 4,
        scale,
        opacity,
        backgroundColor,
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

const AnimatedBackground = ({ color }: AnimatedBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isTouch, setIsTouch] = useState(false);
  const [dimensions, setDimensions] = useState<Point>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const config = isMobile ? GRID_SIZE.mobile : GRID_SIZE.desktop;

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
    setIsMobile(window.innerWidth < 768);

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          x: containerRef.current.offsetWidth,
          y: containerRef.current.offsetHeight,
        });
        setIsMobile(window.innerWidth < 768);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isTouch) {
      const animatePosition = async () => {
        while (true) {
          await animate(mouseX, Math.random(), {
            type: 'spring',
            damping: 30,
            stiffness: 200,
            duration: 2,
          });
          await animate(mouseY, Math.random(), {
            type: 'spring',
            damping: 30,
            stiffness: 200,
            duration: 2,
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      };
      animatePosition();
    } else {
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
    }
  }, [isTouch, mouseX, mouseY]);

  const particles = React.useMemo(() => {
    const points: Point[] = [];
    for (let i = 0; i < config.cols; i++) {
      for (let j = 0; j < config.rows; j++) {
        points.push({
          x: (i / (config.cols - 1)) * dimensions.x,
          y: (j / (config.rows - 1)) * dimensions.y,
        });
      }
    }
    return points;
  }, [dimensions, config.cols, config.rows]);

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
      {particles.map((particle, i) => (
        <Particle
          key={i}
          baseX={particle.x}
          baseY={particle.y}
          mouseX={mouseX}
          mouseY={mouseY}
          containerWidth={dimensions.x}
          containerHeight={dimensions.y}
          color={color}
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
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)`
          ),
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
