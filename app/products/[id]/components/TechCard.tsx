'use client';

import React from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';

interface TechCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

export default function TechCard({ name, description, icon, delay }: TechCardProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Mouse move effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = React.useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY]
  );

  // Gradient follows mouse
  const background = useMotionTemplate`radial-gradient(
    300px circle at \${mouseX}px \${mouseY}px,
    ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)'} 0%,
    ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.4)'} 80%
  )`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 20,
        delay,
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        style={{ background }}
        sx={{
          position: 'relative',
          p: 4,
          height: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
          cursor: 'pointer',
          WebkitBackfaceVisibility: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: isDark
              ? 'linear-gradient(169deg, rgba(255,255,255,0.03), rgba(255,255,255,0))'
              : 'linear-gradient(169deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
            borderRadius: 'inherit',
            zIndex: 0,
          },
        }}
      >
        {/* Content Container */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Icon Container */}
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '16px',
                background: isDark
                  ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.1)})`
                  : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                mb: 3,
                fontSize: '2rem',
                color: theme.palette.primary.main,
              }}
            >
              {icon}
            </Box>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontWeight: 600,
                mb: 1,
                fontSize: '1.25rem',
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.8)})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.9),
                lineHeight: 1.6,
                fontSize: '0.95rem',
              }}
            >
              {description}
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
    </motion.div>
  );
}
