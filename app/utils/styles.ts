import { Theme } from '@mui/material';

export const cardStyles = (theme: Theme) => ({
  position: 'relative',
  p: { xs: 3, sm: 4 },
  height: '100%',
  minHeight: { xs: 'auto', sm: '340px' },
  borderRadius: '24px',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
  boxShadow:
    theme.palette.mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 3,
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 12px 40px rgba(0,0,0,0.6)'
        : '0 12px 40px rgba(0,0,0,0.15)',
  },
});

export const iconStyles = (theme: Theme) => ({
  position: 'relative',
  width: '64px',
  height: '64px',
  filter:
    theme.palette.mode === 'dark'
      ? 'drop-shadow(0 0 20px rgba(255,255,255,0.1))'
      : 'drop-shadow(0 0 20px rgba(0,0,0,0.1))',
});

export const smallIconStyles = (theme: Theme) => ({
  position: 'relative',
  width: '20px',
  height: '20px',
  filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
  opacity: theme.palette.mode === 'dark' ? 0.9 : 0.7,
});

export const gradientTextStyles = (gradient: string) => ({
  background: gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});
