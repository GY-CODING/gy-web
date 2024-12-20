'use client';

import { useTheme } from '@mui/material';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const GRID_SIZE = {
  mobile: {
    cols: 10,
    rows: 15,
  },
  desktop: {
    cols: 20,
    rows: 30,
  },
};

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const MeshLine = ({ 
  line, 
  mouseX, 
  mouseY, 
  containerWidth, 
  containerHeight 
}: { 
  line: Line;
  mouseX: number;
  mouseY: number;
  containerWidth: number;
  containerHeight: number;
}) => {
  const theme = useTheme();
  
  // Calculate the center point of the line
  const centerX = (line.x1 + line.x2) / 2;
  const centerY = (line.y1 + line.y2) / 2;
  
  // Calculate distance from mouse to center of line
  const dx = mouseX * containerWidth - centerX;
  const dy = mouseY * containerHeight - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = 200; // Maximum distance for influence
  
  // Calculate influence based on distance
  const influence = Math.max(0, 1 - distance / maxDistance);
  
  // Calculate displacement
  const displacement = influence * 20;
  const angle = Math.atan2(dy, dx);
  
  // Apply displacement perpendicular to the line
  const perpAngle = angle + Math.PI / 2;
  const displaceX = Math.cos(perpAngle) * displacement;
  const displaceY = Math.sin(perpAngle) * displacement;

  return (
    <motion.line
      x1={line.x1 + displaceX}
      y1={line.y1 + displaceY}
      x2={line.x2 + displaceX}
      y2={line.y2 + displaceY}
      stroke={theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)'}
      strokeWidth={1}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: 1, 
        opacity: 0.5 + influence * 0.5,
        strokeWidth: 1 + influence * 2
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut"
      }}
    />
  );
};

const AnimatedMesh = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [dimensions, setDimensions] = useState<Point>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  const config = isMobile ? GRID_SIZE.mobile : GRID_SIZE.desktop;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const updateDimensions = () => {
      if (containerRef.current) {
        const newDimensions = {
          x: containerRef.current.offsetWidth,
          y: containerRef.current.offsetHeight,
        };
        setDimensions(newDimensions);
        setIsMobile(window.innerWidth < 768);
        
        // Generate mesh lines
        const newLines: Line[] = [];
        const cellWidth = newDimensions.x / config.cols;
        const cellHeight = newDimensions.y / config.rows;
        
        // Horizontal lines
        for (let i = 0; i <= config.rows; i++) {
          for (let j = 0; j < config.cols; j++) {
            newLines.push({
              x1: j * cellWidth,
              y1: i * cellHeight,
              x2: (j + 1) * cellWidth,
              y2: i * cellHeight,
            });
          }
        }
        
        // Vertical lines
        for (let i = 0; i < config.rows; i++) {
          for (let j = 0; j <= config.cols; j++) {
            newLines.push({
              x1: j * cellWidth,
              y1: i * cellHeight,
              x2: j * cellWidth,
              y2: (i + 1) * cellHeight,
            });
          }
        }
        
        setLines(newLines);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [config.cols, config.rows]);

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

  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

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
        {lines.map((line, i) => (
          <MeshLine
            key={i}
            line={line}
            mouseX={springX.get()}
            mouseY={springY.get()}
            containerWidth={dimensions.x}
            containerHeight={dimensions.y}
          />
        ))}
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
            ([x, y]) => `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)`
          ),
        }}
      />
    </div>
  );
};

export default AnimatedMesh;
