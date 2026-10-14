'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { MenuItem } from '../utils/menuItems';
import { lexendFont } from '../utils/fonts';
import { getAssetPath } from '../utils/useImagePath';

interface FloatingMenuProps {
  items: MenuItem[];
  activeIndex: number | null;
  onHover: (index: number | null) => void;
}

export default function FloatingMenu({ items, activeIndex, onHover }: FloatingMenuProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const activeItem = activeIndex !== null ? items[activeIndex] : null;
  const activeChildren = activeItem?.children || [];
  const isOpen = activeChildren.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <Box
          key="floating-menu"
          component={motion.div}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onMouseLeave={() => onHover(null)}
          // Centering goes through Framer's `x` so it composes with the animated `y`
          // (a CSS `transform` in sx would be overwritten by the animation).
          style={{ x: '-50%' }}
          sx={{
            position: 'fixed',
            top: '64px',
            left: '50%',
            // Transparent top padding bridges the gap between the bar and the panel.
            pt: '12px',
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: '20px',
              background: isDark ? 'rgba(14,14,20,0.85)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: isDark
                ? '0 30px 80px -20px rgba(0,0,0,0.7)'
                : '0 30px 80px -20px rgba(0,0,0,0.2)',
              display: 'grid',
              gridTemplateColumns: {
                md: `repeat(${Math.min(activeChildren.length, 2)}, 280px)`,
                lg: `repeat(${Math.min(activeChildren.length, 3)}, 280px)`,
              },
              gap: 0.5,
            }}
          >
            {activeChildren.map((item, index) => (
              <Link
                key={item.title}
                href={item.path}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => onHover(null)}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.75,
                    p: 1.75,
                    borderRadius: '14px',
                    transition: 'background 0.2s ease',
                    '& .menu-arrow': { opacity: 0, transform: 'translateX(-4px)' },
                    '&:hover': {
                      background: isDark ? 'rgba(140,84,255,0.1)' : 'rgba(140,84,255,0.06)',
                      '& .menu-arrow': { opacity: 1, transform: 'translateX(0)' },
                      '& .menu-icon': { borderColor: 'rgba(140,84,255,0.5)' },
                    },
                  }}
                >
                  {item.icon && (
                    <Box
                      className="menu-icon"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: '12px',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                        transition: 'border-color 0.2s ease',
                      }}
                    >
                      <Image
                        src={getAssetPath((isDark ? item.icon : item.icon_light) ?? item.icon)}
                        alt={item.title}
                        width={24}
                        height={24}
                      />
                    </Box>
                  )}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.75,
                        color: isDark ? '#fff' : 'grey.900',
                        fontFamily: lexendFont.style.fontFamily,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                      <ArrowForwardRoundedIcon
                        className="menu-arrow"
                        sx={{ fontSize: '0.95rem', color: '#8C54FF', transition: 'all 0.2s ease' }}
                      />
                    </Box>
                    {item.description && (
                      <Box
                        sx={{
                          color: isDark ? 'grey.400' : 'grey.600',
                          fontSize: '0.85rem',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.description}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
