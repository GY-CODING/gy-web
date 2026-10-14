export const LOGIN_URL = 'https://accounts.gycoding.com';
export const BRAND_GRADIENT = 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)';

// Shared look for the small square controls on the right (language, theme, burger).
export const glassIconButtonSx = (isDark: boolean) => ({
  width: 40,
  height: 40,
  borderRadius: '12px',
  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(10px)',
  color: isDark ? 'grey.200' : 'grey.800',
  transition: 'background 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
    borderColor: 'rgba(140,84,255,0.5)',
  },
});
