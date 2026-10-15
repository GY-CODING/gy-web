import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLiteMotion } from '../../../../hooks/useLiteMotion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { lexendFont, valorantFont } from '../../../../utils/fonts';
import { getLenis } from '../../../../hooks/useSmoothScroll';
import AuroraBackground from '../../../../components/home/AuroraBackground';
import AnimatedGradientHeadline from '../../../../components/home/AnimatedGradientHeadline';
import { useHeroScroll } from '../../hooks/useHeroScroll';
import type { ProductSectionProps } from '../../types';

export default function ProductHero({ product, lang, mode }: ProductSectionProps) {
  const { heroRef, yTitle, opacity, scale, cueOpacity } = useHeroScroll();
  const liteMotion = useLiteMotion();
  const isDark = mode === 'dark';
  const taglineText = lang === 'es' ? product.taglineEs : product.tagline;
  const heroGradient = isDark ? product.theme.gradient : product.theme.lightGradient;

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -90, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      ref={heroRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: heroGradient,
        overflow: 'hidden',
        // Same clearance as the home hero: the section starts behind the fixed header.
        pt: { xs: '112px', sm: '120px', md: '128px' },
        pb: { xs: 10, md: 8 },
      }}
    >
      {/* Background glow */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? product.theme.heroBg
            : product.theme.heroBg
                .replace('0.22)', '0.35)')
                .replace('0.25)', '0.4)')
                .replace('0.18)', '0.3)'),
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <AuroraBackground
        colors={[product.theme.primary, product.theme.accent, product.theme.secondary]}
        intensity={0.45}
      />

      {/* Grid lines */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${product.theme.primary}18 1px, transparent 1px),
            linear-gradient(90deg, ${product.theme.primary}18 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, black 20%, transparent 80%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div style={{ y: yTitle, opacity, scale }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: { xs: 3, md: 4 },
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.div
                animate={liteMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 96, md: 128 },
                    height: { xs: 96, md: 128 },
                    borderRadius: '30px',
                    overflow: 'hidden',
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(14px)',
                    border: `1px solid ${product.theme.primary}55`,
                    boxShadow: `0 0 40px ${product.theme.primary}33, 0 30px 60px -15px ${product.theme.primary}44`,
                  }}
                >
                  <Image
                    src={product.logo}
                    alt={`${product.name} logo`}
                    fill
                    style={{ objectFit: 'contain', padding: '14px' }}
                  />
                </Box>
              </motion.div>
            </motion.div>

            {/* Product name */}
            <AnimatedGradientHeadline
              text={product.name}
              component="h1"
              gradient={product.theme.textGradient}
              delayStart={0.2}
              sx={{
                fontFamily: valorantFont.style.fontFamily,
                fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
                letterSpacing: '0.04em',
                lineHeight: 1.05,
                textAlign: 'center',
              }}
            />

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Typography
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.55rem' },
                  fontWeight: 300,
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                  maxWidth: '640px',
                  lineHeight: 1.5,
                  letterSpacing: '0.02em',
                }}
              >
                {taglineText}
              </Typography>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <Link
                href={product.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  component={motion.button}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '14px',
                    px: 4,
                    py: 1.8,
                    fontSize: { xs: '1rem', md: '1.05rem' },
                    fontWeight: 600,
                    fontFamily: lexendFont.style.fontFamily,
                    color: '#fff',
                    background: product.theme.textGradient,
                    boxShadow: `0 10px 30px -8px ${product.theme.primary}99`,
                  }}
                >
                  {lang === 'es'
                    ? (product.ctaLabel?.es ?? 'Abrir App')
                    : (product.ctaLabel?.en ?? 'Open App')}
                  <OpenInNewIcon sx={{ fontSize: '1.1rem' }} />
                </Box>
              </Link>

              <Box
                component={motion.button}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToFeatures}
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
                {lang === 'es' ? 'Ver más' : 'Learn More'}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        style={{
          opacity: cueOpacity,
          position: 'absolute',
          bottom: 28,
          left: '50%',
          x: '-50%',
          zIndex: 1,
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
