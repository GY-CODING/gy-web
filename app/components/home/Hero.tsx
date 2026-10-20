'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { lexendFont, valorantFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import EyebrowBadge from './EyebrowBadge';
import AuroraBackground from './AuroraBackground';
import dynamic from 'next/dynamic';
import DreamOrb from './DreamOrb';

// The Lottie scene only exists for the `?coffee=true` easter egg now, so it's loaded on demand
// and its code never ships with the normal home.
const Hero3DVisual = dynamic(() => import('./Hero3DVisual'), { ssr: false });
import AnimatedGradientHeadline from './AnimatedGradientHeadline';

const renderStyledText = (text: string) => {
  const parts = text.split(/(\[company\].*?\[\/company\])/);
  return parts.map((part, index) => {
    if (part.startsWith('[company]')) {
      const content = part.replace('[company]', '').replace('[/company]', '');
      return (
        <span
          key={index}
          style={{
            color: '#8C54FF',
            fontWeight: 400,
            fontFamily: valorantFont.style.fontFamily,
          }}
        >
          {content}
        </span>
      );
    }
    return part;
  });
};

// Reads `?coffee=true` (easter egg) in its own component behind <Suspense>: useSearchParams
// in a static export otherwise forces the whole hero to client-only rendering, so the
// headline and text would not be in the HTML.
function HeroVisual() {
  const searchParams = useSearchParams();
  if (searchParams.get('coffee') === 'true') {
    return <Hero3DVisual lottieUrl="/lottie/coffee.json" />;
  }
  return <DreamOrb />;
}

export default function Hero() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        // The floating bento tiles in Hero3DVisual intentionally bleed a few
        // px past their box for a layered look; clip only the x-axis so that
        // never turns into a page-wide horizontal scrollbar.
        overflowX: 'hidden',
        // Content is vertically centered in the full section height, which starts
        // *behind* the fixed 64px header — without this clearance the centered
        // block can land partly under it (seen clipping the eyebrow badge).
        pt: { xs: '112px', sm: '120px', md: '128px' },
        pb: { xs: 10, md: 8 },
      }}
    >
      <AuroraBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 6, md: 10 },
            }}
          >
            <Box sx={{ flex: '1 1 50%', width: '100%' }}>
              <Box sx={{ mb: 3 }}>
                <EyebrowBadge>{t('about.eyebrow')}</EyebrowBadge>
              </Box>

              <AnimatedGradientHeadline
                text={t('about.title')}
                component="h1"
                sx={{
                  fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4.1rem', lg: '4.6rem' },
                  lineHeight: 1.08,
                  mb: 3,
                }}
              />

              {/* This paragraph is the mobile LCP element: a short delay keeps the entrance
                  but lets it paint early (it used to wait 0.5s before starting to show). */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    color: isDark ? 'grey.300' : 'grey.700',
                    lineHeight: 1.7,
                    maxWidth: 520,
                    mb: 1.5,
                  }}
                >
                  {renderStyledText(t('about.description1'))}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    color: isDark ? 'grey.300' : 'grey.700',
                    lineHeight: 1.7,
                    maxWidth: 520,
                    mb: 4,
                  }}
                >
                  {renderStyledText(t('about.description2'))}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
              >
                <Link
                  href="https://docs.gycoding.com/"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    component={motion.button}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    sx={{
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '14px',
                      px: 4,
                      py: 1.8,
                      fontSize: { xs: '1rem', md: '1.05rem' },
                      fontWeight: 600,
                      fontFamily: lexendFont.style.fontFamily,
                      color: '#fff',
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      boxShadow: '0 10px 30px -8px rgba(99,102,241,0.6)',
                    }}
                  >
                    {t('about.buttons.button1')}
                  </Box>
                </Link>

                <Link href="/about/company" style={{ textDecoration: 'none' }}>
                  <Box
                    component={motion.button}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    sx={{
                      cursor: 'pointer',
                      border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '14px',
                      px: 4,
                      py: 1.8,
                      fontSize: { xs: '1rem', md: '1.05rem' },
                      fontWeight: 600,
                      fontFamily: lexendFont.style.fontFamily,
                      color: isDark ? '#fff' : '#000',
                    }}
                  >
                    {t('about.buttons.button2')}
                  </Box>
                </Link>
              </motion.div>
            </Box>

            <Box
              sx={{
                flex: '1 1 50%',
                width: '100%',
                height: { xs: 320, sm: 380, md: 480 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Suspense fallback={null}>
                <HeroVisual />
              </Suspense>
            </Box>
          </Box>
        </motion.div>
      </Container>

      <motion.div
        style={{
          opacity: cueOpacity,
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Box
            sx={{
              width: 22,
              height: 36,
              borderRadius: '12px',
              border: `2px solid ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}`,
              display: 'flex',
              justifyContent: 'center',
              pt: '6px',
            }}
          >
            <Box
              sx={{
                width: 3,
                height: 8,
                borderRadius: '2px',
                background: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)',
              }}
            />
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}
