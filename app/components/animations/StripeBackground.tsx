'use client';

import React from 'react';
import { motion } from 'framer-motion';

const StripeBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      {/* Líneas animadas */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
      >
        <defs>
          <pattern
            id="stripePattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <motion.line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke="#000"
              strokeWidth="1"
              initial={{ strokeDasharray: '2,8' }}
              animate={{
                strokeDashoffset: [0, -10],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stripePattern)" />
      </svg>

      {/* Gradiente superior */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gradiente inferior */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Efecto de brillo */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '-100%',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 50%)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
        animate={{
          x: ['0%', '100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default StripeBackground;
