'use client';

import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { MenuItem, getButtonText } from '../utils/menuItems';
import { lexendFont } from '../utils/fonts';
import { getAssetPath } from '../utils/useImagePath';
import { useLanguage } from '../utils/languageContext';
import { getLenis } from '../hooks/useSmoothScroll';
import { LOGIN_URL, BRAND_GRADIENT } from './headerStyles';

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
  onClose: () => void;
}

function MenuLink({
  item,
  onClose,
  children,
}: {
  item: MenuItem;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (item.external) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        onClick={onClose}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={item.path || '/'} style={{ textDecoration: 'none' }} onClick={onClose}>
      {children}
    </Link>
  );
}

export default function MobileMenu({ isOpen, menuItems, onClose }: MobileMenuProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpen) setExpanded(null);
  }, [isOpen]);

  // Freeze the page behind the open menu (Lenis drives scrolling when it's active).
  useEffect(() => {
    if (!isOpen) return;
    const lenis = getLenis();
    const previousOverflow = document.body.style.overflow;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const rowSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    px: 2,
    py: 1.5,
    border: 'none',
    background: 'transparent',
    borderRadius: '14px',
    cursor: 'pointer',
    color: isDark ? '#fff' : 'grey.900',
    fontFamily: lexendFont.style.fontFamily,
    fontSize: '1rem',
    fontWeight: 600,
    textAlign: 'left' as const,
    '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop: tapping outside closes the menu. */}
          <Box
            component={motion.div}
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            sx={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              height: 'calc(100vh - 64px)',
              background: 'rgba(0,0,0,0.35)',
              zIndex: 998,
            }}
          />
          <Box
            component={motion.div}
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            sx={{
              position: 'fixed',
              top: '72px',
              left: 12,
              right: 12,
              p: 1.5,
              borderRadius: '22px',
              background: isDark ? 'rgba(14,14,20,0.92)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)',
              zIndex: 1000,
              maxHeight: 'calc(100vh - 88px)',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
            }}
            // Lenis would otherwise hijack wheel/touch scrolling inside the panel.
            data-lenis-prevent
          >
            {menuItems.map((item, index) => {
              const isExpanded = expanded === index;

              if (!item.children) {
                return (
                  <MenuLink key={item.title} item={item} onClose={onClose}>
                    <Box sx={rowSx}>{item.title}</Box>
                  </MenuLink>
                );
              }

              return (
                <Box key={item.title}>
                  <Box
                    component="button"
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    sx={rowSx}
                  >
                    {item.title}
                    <KeyboardArrowDownRoundedIcon
                      sx={{
                        color: isDark ? 'grey.400' : 'grey.600',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </Box>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="children"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <Box sx={{ pb: 1, display: 'grid', gap: 0.5 }}>
                          {item.children.map((child) => (
                            <MenuLink key={child.title} item={child} onClose={onClose}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5,
                                  px: 2,
                                  py: 1.25,
                                  borderRadius: '14px',
                                  '&:hover': {
                                    background: isDark
                                      ? 'rgba(140,84,255,0.1)'
                                      : 'rgba(140,84,255,0.06)',
                                  },
                                }}
                              >
                                {child.icon && (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: 36,
                                      height: 36,
                                      flexShrink: 0,
                                      borderRadius: '10px',
                                      background: isDark
                                        ? 'rgba(255,255,255,0.05)'
                                        : 'rgba(255,255,255,0.9)',
                                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                                    }}
                                  >
                                    <Image
                                      src={getAssetPath(
                                        (isDark ? child.icon : child.icon_light) ?? child.icon
                                      )}
                                      alt={child.title}
                                      width={20}
                                      height={20}
                                    />
                                  </Box>
                                )}
                                <Box sx={{ minWidth: 0 }}>
                                  <Box
                                    sx={{
                                      color: isDark ? '#fff' : 'grey.900',
                                      fontFamily: lexendFont.style.fontFamily,
                                      fontSize: '0.92rem',
                                      fontWeight: 500,
                                    }}
                                  >
                                    {child.title}
                                  </Box>
                                  {child.description && (
                                    <Box
                                      sx={{
                                        fontSize: '0.8rem',
                                        color: isDark ? 'grey.400' : 'grey.600',
                                        mt: 0.25,
                                      }}
                                    >
                                      {child.description}
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </MenuLink>
                          ))}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              );
            })}

            <Box sx={{ p: 1, pt: 1.5 }}>
              <a href={LOGIN_URL} style={{ textDecoration: 'none' }} onClick={onClose}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.25,
                    height: 48,
                    borderRadius: '14px',
                    fontFamily: lexendFont.style.fontFamily,
                    fontWeight: 600,
                    color: '#fff',
                    background: BRAND_GRADIENT,
                    boxShadow: '0 10px 30px -8px rgba(99,102,241,0.6)',
                  }}
                >
                  {/* Shield on a light chip so it stands out against the gradient button. */}
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      p: '5px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.18)',
                    }}
                  >
                    <Image
                      src={getAssetPath('/icons/gy_accounts.svg')}
                      alt=""
                      width={18}
                      height={18}
                    />
                  </Box>
                  {getButtonText(language, 'login')}
                </Box>
              </a>
            </Box>
          </Box>
        </>
      )}
    </AnimatePresence>
  );
}
