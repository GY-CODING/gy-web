'use client';

import { useEffect, useState } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '../utils/useImagePath';
import ThemeToggle from './ThemeToggle';
import CustomMenuItem from './menuItem';
import FloatingMenu from './FloatingMenu';
import MobileMenu from './MobileMenu';
import LanguageSelector from './LanguageSelector';
import { getMenuItems, getButtonText } from '../utils/menuItems';
import { useLanguage } from '../utils/languageContext';
import { LOGIN_URL, BRAND_GRADIENT, glassIconButtonSx } from './headerStyles';

interface HeaderProps {
  onThemeToggle: () => void;
}

export default function Header({ onThemeToggle }: HeaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { language } = useLanguage();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  const currentMenuItems = getMenuItems(language);
  // Stay solid while a menu is open so the panel never floats over a see-through bar.
  const solid = scrolled || mobileMenuOpen || hoveredIndex !== null;

  return (
    <Box
      component="header"
      // The dropdown panel is a DOM child of the header, so leaving the header is the one
      // reliable "pointer is gone" signal for closing it.
      onMouseLeave={() => setHoveredIndex(null)}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        zIndex: 1000,
        // The glass lives on a pseudo-element: backdrop-filter on the header itself would make
        // it the containing block for the fixed dropdown/mobile panels and break their layout.
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundColor: solid
            ? isDark
              ? 'rgba(10,10,14,0.7)'
              : 'rgba(255,255,255,0.75)'
            : 'transparent',
          backdropFilter: solid ? 'blur(16px) saturate(160%)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(16px) saturate(160%)' : 'none',
          borderBottom: `1px solid ${
            solid ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'transparent'
          }`,
          boxShadow: solid
            ? isDark
              ? '0 10px 30px -15px rgba(0,0,0,0.6)'
              : '0 10px 30px -15px rgba(0,0,0,0.12)'
            : 'none',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          height: '100%',
          margin: '0 auto',
          padding: { xs: '0 1rem', sm: '0 2rem' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link href="/" aria-label="GYCODING" onMouseEnter={() => setHoveredIndex(null)}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.06, rotate: -4 }}
              whileTap={{ scale: 0.95 }}
              sx={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer' }}
            >
              <Image
                src={getAssetPath('/gy-logo.png')}
                alt="GYCODING"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Link>

          {!isMobile && (
            <Box component="nav" sx={{ display: 'flex', gap: '0.25rem' }}>
              {currentMenuItems.map((item, index) => (
                <CustomMenuItem
                  key={item.title}
                  item={item}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={setHoveredIndex}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Right side */}
        <Box
          onMouseEnter={() => setHoveredIndex(null)}
          sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
        >
          <LanguageSelector />
          <ThemeToggle onToggle={onThemeToggle} />
          {/* Divider sets the account button apart from the language/theme controls. */}
          <Box
            sx={{
              width: '1px',
              height: 24,
              mx: { xs: 0.25, md: 1 },
              background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
            }}
          />
          <Box
            component={motion.a}
            href={LOGIN_URL}
            aria-label={getButtonText(language, 'login')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              ...glassIconButtonSx(isDark),
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px -10px rgba(140,84,255,0.55)',
              '&:hover': {
                ...glassIconButtonSx(isDark)['&:hover'],
                boxShadow: '0 12px 28px -10px rgba(140,84,255,0.75)',
              },
            }}
          >
            <Image
              src={getAssetPath(isDark ? '/icons/gy_accounts.svg' : '/icons/gy_accounts_light.svg')}
              alt=""
              width={22}
              height={22}
            />
          </Box>
          {isMobile && (
            <IconButton
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              sx={glassIconButtonSx(isDark)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex' }}
                >
                  {mobileMenuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
                </motion.span>
              </AnimatePresence>
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Scroll progress */}
      <motion.div
        style={{
          scaleX: progress,
          transformOrigin: '0% 50%',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -1,
          height: 2,
          background: BRAND_GRADIENT,
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {!isMobile && (
        <FloatingMenu
          items={currentMenuItems}
          activeIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      )}

      <MobileMenu
        isOpen={mobileMenuOpen}
        menuItems={currentMenuItems}
        onClose={() => setMobileMenuOpen(false)}
      />
    </Box>
  );
}
