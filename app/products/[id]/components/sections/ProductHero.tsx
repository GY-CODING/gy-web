import { Box, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { lexendFont, valorantFont } from '../../../../utils/fonts';
import { useHeroScroll } from '../../hooks/useHeroScroll';
import FloatingOrb from '../shared/FloatingOrb';
import type { ProductSectionProps } from '../../types';

export default function ProductHero({ product, lang, mode }: ProductSectionProps) {
  const { heroRef, yTitle, opacity } = useHeroScroll();
  const isDark = mode === 'dark';
  const taglineText = lang === 'es' ? product.taglineEs : product.tagline;
  const heroGradient = isDark ? product.theme.gradient : product.theme.lightGradient;

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

      <FloatingOrb size={400} color={product.theme.primary} top="-10%" left="-5%" delay={0} />
      <FloatingOrb size={300} color={product.theme.accent} top="60%" left="75%" delay={2} />
      <FloatingOrb size={200} color={product.theme.primary} top="30%" left="60%" delay={1} />

      {/* Animated grid lines */}
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 12, md: 0 } }}>
        <motion.div style={{ y: yTitle, opacity }}>
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
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 80, md: 110 },
                  height: { xs: 80, md: 110 },
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: `0 0 60px ${product.theme.primary}66, 0 0 120px ${product.theme.primary}33`,
                  border: `1px solid ${product.theme.primary}44`,
                }}
              >
                <Image
                  src={product.logo}
                  alt={`${product.name} logo`}
                  fill
                  style={{ objectFit: 'contain', padding: '10px' }}
                />
              </Box>
            </motion.div>

            {/* Product name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: valorantFont.style.fontFamily,
                  fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  background: product.theme.textGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.05,
                }}
              >
                {product.name}
              </Typography>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                  component={Link}
                  href={product.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    background: product.theme.textGradient,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    boxShadow: `0 0 30px ${product.theme.primary}66`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 0 50px ${product.theme.primary}99`,
                    },
                  }}
                >
                  {lang === 'es'
                    ? (product.ctaLabel?.es ?? 'Abrir App')
                    : (product.ctaLabel?.en ?? 'Open App')}
                </Button>

                <Button
                  onClick={() => {
                    const el = document.getElementById('features');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    background: 'transparent',
                    color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.25)'
                      : '1px solid rgba(0,0,0,0.2)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                      borderColor: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                    },
                  }}
                >
                  {lang === 'es' ? 'Ver más' : 'Learn More'}
                </Button>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll indicator — outside Container, positioned at hero bottom */}
      <motion.div
        style={{ opacity, position: 'absolute', bottom: 0, left: 0, right: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pb: { xs: 3, md: 5 },
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Box
              sx={{
                width: 24,
                height: 38,
                borderRadius: '12px',
                border: isDark ? '2px solid rgba(255,255,255,0.3)' : '2px solid rgba(0,0,0,0.25)',
                display: 'flex',
                justifyContent: 'center',
                pt: '6px',
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 8,
                  borderRadius: '2px',
                  background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
