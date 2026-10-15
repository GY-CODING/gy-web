'use client';

import { Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { lexendFont } from '../../utils/fonts';
import { useLiteMotion } from '../../hooks/useLiteMotion';

export default function AnimatedGradientHeadline({
  text,
  component = 'h1',
  sx,
  delayStart = 0.15,
  gradient = 'linear-gradient(90deg, #6366f1 0%, #ec4899 35%, #8C54FF 70%, #6366f1 100%)',
}: {
  text: string;
  component?: 'h1' | 'h2';
  sx?: SxProps<Theme>;
  delayStart?: number;
  gradient?: string;
}) {
  const words = text.split(' ');
  const lite = useLiteMotion();

  return (
    <Typography
      variant={component}
      component={component}
      sx={{
        fontFamily: lexendFont.style.fontFamily,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        ...sx,
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: '60%' }}
          animate={{
            opacity: 1,
            y: '0%',
            // The looping gradient repaints every frame; skip it on touch / reduced motion.
            ...(lite ? {} : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }),
          }}
          transition={{
            opacity: { duration: 0.7, delay: delayStart + i * 0.08, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 0.7, delay: delayStart + i * 0.08, ease: [0.16, 1, 0.3, 1] },
            backgroundPosition: { duration: 7, repeat: Infinity, ease: 'linear' },
          }}
          style={{
            display: 'inline-block',
            marginRight: i < words.length - 1 ? '0.3em' : 0,
            backgroundImage: gradient,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {word}
        </motion.span>
      ))}
    </Typography>
  );
}
