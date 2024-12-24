'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  color?: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ color = '#6366f1' }) => {
  // Convertir el color a rgba con opacidad
  const getRGBA = (opacity: number) => {
    if (color.startsWith('#')) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          right: '-50%',
          bottom: '-50%',
          background: `
            radial-gradient(circle at 30% 30%, ${getRGBA(0.05)} 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, ${getRGBA(0.05)} 0%, transparent 50%)
          `,
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* Overlay sutil */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, transparent 0%, ${getRGBA(0.02)} 100%),
            linear-gradient(135deg, ${getRGBA(0.02)} 0%, transparent 100%)
          `,
          filter: 'blur(60px)',
        }}
      />
    </div>
  );
};

export default GradientBackground;
