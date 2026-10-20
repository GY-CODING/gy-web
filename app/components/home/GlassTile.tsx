'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function GlassTile({
  icon,
  gradient,
  size = 72,
  radius,
  blur = true,
}: {
  icon: ReactNode;
  gradient: string;
  size?: number;
  radius?: number;
  // Turn off the backdrop blur when the tile floats over animated content (e.g. the hero
  // Lottie): the blur would be recomputed every frame.
  blur?: boolean;
}) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${radius ?? size * 0.28}px`,
        background: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)',
        backdropFilter: blur ? 'blur(14px)' : 'none',
        border: (theme) =>
          `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: '0 20px 45px -12px rgba(99,102,241,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: size * 0.52,
          height: size * 0.52,
          borderRadius: `${(radius ?? size * 0.28) * 0.6}px`,
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: size * 0.3,
        }}
      >
        {icon}
      </Box>
    </Box>
  );
}
