'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '../../utils/fonts';

export default function EyebrowBadge({
  children,
  accent = 'linear-gradient(135deg, #6366f1, #ec4899)',
}: {
  children: string;
  accent?: string;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 0.75,
          borderRadius: '999px',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: accent,
          }}
        />
        <Typography
          sx={{
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: lexendFont.style.fontFamily,
            letterSpacing: '0.02em',
            color: isDark ? 'grey.200' : 'grey.800',
          }}
        >
          {children}
        </Typography>
      </Box>
    </motion.div>
  );
}
