'use client';

import React, { useRef } from 'react';
import { notFound } from 'next/navigation';
import { Box, Container, Typography, Button, Grid, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { lexendFont, valorantFont } from '../../../utils/fonts';
import { PRODUCTS, ProductId, ProductData } from '../../data/products';
import { useLanguage } from '../../../utils/languageContext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// ─── Micro-components ────────────────────────────────────────────────────────

function FloatingOrb({
  size,
  color,
  top,
  left,
  delay,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}44 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function ProductHero({
  product,
  lang,
  mode,
}: {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const taglineText = lang === 'es' ? product.taglineEs : product.tagline;
  const isDark = mode === 'dark';

  // Hero: dark branded gradient in dark mode, soft light gradient in light mode
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

      {/* Floating orbs — slightly more opaque in light mode so they read on white */}
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

      {/* Scroll indicator — positioned relative to the hero Box, not the Container */}
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

// ─── Description + Screenshot Section ────────────────────────────────────────

function ProductPreview({
  product,
  lang,
  mode,
}: {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}) {
  const desc = lang === 'es' ? product.descriptionEs : product.description;
  const isDark = mode === 'dark';
  const hasImage = !!product.image;
  const imageSrc = isDark && product.imageDark ? product.imageDark : product.image;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: isDark
          ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,20,0.6) 50%, rgba(0,0,0,0) 100%)'
          : '#f8f8fc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: hasImage ? 'row' : 'column' },
            alignItems: 'center',
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* Text side */}
          <Box
            sx={{
              flex: hasImage ? '0 0 42%' : '0 0 100%',
              maxWidth: hasImage ? '42%' : '700px',
              '@media (max-width: 900px)': { maxWidth: '100%' },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                  px: 2,
                  py: 0.5,
                  borderRadius: '20px',
                  border: `1px solid ${product.theme.primary}44`,
                  background: `${product.theme.primary}11`,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: product.theme.primary,
                    boxShadow: `0 0 8px ${product.theme.primary}`,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: isDark ? product.theme.accent : product.theme.secondary,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {lang === 'es' ? 'Sobre la app' : 'About the app'}
                </Typography>
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '2rem', md: '2.6rem' },
                  fontWeight: 700,
                  color: isDark ? '#fff' : 'grey.900',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                {lang === 'es' ? '¿Qué es ' : 'What is '}
                <Box
                  component="span"
                  sx={{
                    background: product.theme.textGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {product.name}
                </Box>
                {'?'}
              </Typography>

              <Typography
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: isDark ? 'rgba(255,255,255,0.65)' : 'grey.700',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {desc}
              </Typography>

              <Button
                component={Link}
                href={product.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon fontSize="small" />}
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 3.5,
                  py: 1.25,
                  borderRadius: '50px',
                  border: `2px solid ${product.theme.primary}`,
                  color: isDark ? product.theme.accent : product.theme.secondary,
                  background: `${product.theme.primary}18`,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `${product.theme.primary}35`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {lang === 'es'
                  ? (product.ctaLabel?.es ?? 'Visitar aplicación')
                  : (product.ctaLabel?.en ?? 'Visit application')} →
              </Button>
            </motion.div>
          </Box>

          {/* Screenshot */}
          {hasImage && (
            <Box sx={{ flex: '0 0 55%', width: '100%' }}>
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                    src={imageSrc!}
                    alt={`${product.name} screenshot`}
                    width={900}
                    height={560}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
              </motion.div>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

// ─── Features Grid ────────────────────────────────────────────────────────────

// ─── Profile Section ─────────────────────────────────────────────────────────

function ProductProfileSection({
  product,
  lang,
  mode,
}: {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}) {
  const { profileSection } = product;
  if (!profileSection) return null;
  const isDark = mode === 'dark';
  const title = lang === 'es' ? profileSection.titleEs : profileSection.title;
  const desc = lang === 'es' ? profileSection.descriptionEs : profileSection.description;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: isDark
          ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,20,0.6) 50%, rgba(0,0,0,0) 100%)'
          : product.theme.lightSectionBg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            {/* Label badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                border: `1px solid ${product.theme.primary}44`,
                background: `${product.theme.primary}11`,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: product.theme.primary,
                  boxShadow: `0 0 8px ${product.theme.primary}`,
                }}
              />
              <Typography
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: isDark ? product.theme.accent : product.theme.secondary,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {lang === 'es' ? 'Tu perfil' : 'Your profile'}
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2rem', md: '2.6rem' },
                fontWeight: 700,
                color: isDark ? '#fff' : 'grey.900',
                mb: 1.5,
                lineHeight: 1.2,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: product.theme.textGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1rem', md: '1.05rem' },
                color: isDark ? 'rgba(255,255,255,0.55)' : 'grey.600',
                lineHeight: 1.7,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {desc}
            </Typography>
          </Box>
        </motion.div>

        {/* Highlights grid */}
        <Grid container spacing={2} sx={{ mb: { xs: 5, md: 6 } }}>
          {profileSection.highlights.map((h, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    height: '100%',
                    borderRadius: '14px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.75)',
                    border: `1px solid ${product.theme.primary}22`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: isDark ? 'none' : '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography sx={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>
                    {h.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: lexendFont.style.fontFamily,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: isDark ? 'rgba(255,255,255,0.8)' : 'grey.800',
                      lineHeight: 1.4,
                    }}
                  >
                    {lang === 'es' ? h.textEs : h.text}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Screenshot — full width below */}
        {profileSection.image && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
              <Image
                src={profileSection.image}
                alt={`${product.name} profile`}
                width={1200}
                height={700}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

// ─── Features Grid (original) ─────────────────────────────────────────────────

function ProductFeatures({
  product,
  lang,
  mode,
}: {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}) {
  const isDark = mode === 'dark';

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark ? 'transparent' : '#ffffff',
      }}
    >
      {/* Subtle background accent */}
      <Box
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${product.theme.primary}${isDark ? '12' : '0a'} 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 } }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                border: `1px solid ${product.theme.primary}44`,
                background: `${product.theme.primary}11`,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: product.theme.primary,
                  boxShadow: `0 0 8px ${product.theme.primary}`,
                }}
              />
              <Typography
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: isDark ? product.theme.accent : product.theme.secondary,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {lang === 'es' ? 'Características' : 'Features'}
              </Typography>
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontWeight: 700,
                color: isDark ? '#fff' : 'grey.900',
                mb: 2,
              }}
            >
              {lang === 'es' ? 'Todo lo que necesitas' : 'Everything you need'}
            </Typography>

            <Typography
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255,255,255,0.5)' : 'grey.600',
                maxWidth: '550px',
                mx: 'auto',
              }}
            >
              {lang === 'es'
                ? `Descubre lo que hace especial a ${product.name}`
                : `Discover what makes ${product.name} special`}
            </Typography>
          </Box>
        </motion.div>

        {/* Feature cards */}
        <Grid container spacing={3}>
          {product.features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
                style={{ height: '100%' }}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      p: { xs: 3, md: 3.5 },
                      borderRadius: '20px',
                      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
                      border: isDark
                        ? '1px solid rgba(255,255,255,0.08)'
                        : '1px solid rgba(0,0,0,0.07)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: isDark ? 'none' : '0 2px 16px rgba(0,0,0,0.06)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        borderColor: `${product.theme.primary}55`,
                        boxShadow: isDark
                          ? `0 8px 40px ${product.theme.primary}22`
                          : `0 8px 32px ${product.theme.primary}22`,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: product.theme.textGradient,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '2.2rem', mb: 2, lineHeight: 1 }}>
                      {feature.icon}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: lexendFont.style.fontFamily,
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: isDark ? '#fff' : 'grey.900',
                        mb: 1.5,
                      }}
                    >
                      {lang === 'es' ? feature.titleEs : feature.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: lexendFont.style.fontFamily,
                        fontSize: '0.9rem',
                        color: isDark ? 'rgba(255,255,255,0.5)' : 'grey.600',
                        lineHeight: 1.7,
                      }}
                    >
                      {lang === 'es' ? feature.descriptionEs : feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─── Tech Stack Section ───────────────────────────────────────────────────────

function ProductTechStack({
  product,
  mode,
}: {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}) {
  const isDark = mode === 'dark';

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        overflow: 'hidden',
        position: 'relative',
        background: isDark ? 'transparent' : product.theme.lightSectionBg,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              fontFamily: lexendFont.style.fontFamily,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Built with
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 3 },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {product.techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 1.25, md: 1.5 },
                    borderRadius: '50px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.1)',
                    boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    '&:hover': {
                      borderColor: `${tech.color}55`,
                      background: isDark ? `${tech.color}11` : `${tech.color}18`,
                      boxShadow: `0 4px 20px ${tech.color}22`,
                    },
                  }}
                >
                  <Box
                    component={tech.icon as any}
                    sx={{
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                      color: isDark
                        ? tech.color
                        : tech.color === '#ffffff'
                          ? '#000000'
                          : tech.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: lexendFont.style.fontFamily,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      fontWeight: 500,
                      color: isDark ? 'rgba(255,255,255,0.75)' : 'grey.800',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tech.name}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

// ─── Final CTA Section ────────────────────────────────────────────────────────

function ProductCTA({
  product,
  lang,
  mode,
}: {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}) {
  const isDark = mode === 'dark';

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 18 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark ? 'transparent' : '#f8f8fc',
      }}
    >
      {/* Background accent */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${product.theme.primary}${isDark ? '18' : '10'} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 5, md: 8 },
              borderRadius: '32px',
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)',
              border: `1px solid ${product.theme.primary}33`,
              backdropFilter: 'blur(20px)',
              boxShadow: isDark
                ? 'none'
                : `0 8px 40px ${product.theme.primary}14, 0 2px 20px rgba(0,0,0,0.06)`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: product.theme.textGradient,
              },
            }}
          >
            {/* Product logo in CTA */}
            <Box
              sx={{
                position: 'relative',
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 3,
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: `0 0 40px ${product.theme.primary}55`,
                border: `1px solid ${product.theme.primary}44`,
              }}
            >
              <Image
                src={product.logo}
                alt={product.name}
                fill
                style={{ objectFit: 'contain', padding: '8px' }}
              />
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 700,
                color: isDark ? '#fff' : 'grey.900',
                mb: 2,
              }}
            >
              {lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
            </Typography>

            <Typography
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255,255,255,0.55)' : 'grey.600',
                mb: 5,
                maxWidth: '480px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {lang === 'es'
                ? `Únete a la comunidad de ${product.name} hoy mismo y descubre todo lo que tiene para ofrecerte.`
                : `Join the ${product.name} community today and discover everything it has to offer.`}
            </Typography>

            <Button
              component={Link}
              href={product.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontWeight: 700,
                fontSize: '1rem',
                px: 5,
                py: 1.75,
                borderRadius: '50px',
                background: product.theme.textGradient,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: `0 0 40px ${product.theme.primary}55`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 0 60px ${product.theme.primary}88`,
                },
              }}
            >
              {lang === 'es' ? `Ir a ${product.name}` : `Go to ${product.name}`}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductPageClient({ id }: { id: string }) {
  const { language } = useLanguage();
  const theme = useTheme();
  const mode = theme.palette.mode;

  const product = PRODUCTS[id as ProductId] ?? null;

  if (!product) {
    notFound();
  }

  const lang = language as 'en' | 'es';
  const isDark = mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark ? product.theme.gradient : '#ffffff',
        color: isDark ? '#fff' : 'grey.900',
        overflowX: 'hidden',
      }}
    >
      <ProductHero product={product} lang={lang} mode={mode} />
      <ProductPreview product={product} lang={lang} mode={mode} />
      <ProductProfileSection product={product} lang={lang} mode={mode} />
      <ProductFeatures product={product} lang={lang} mode={mode} />
      <ProductTechStack product={product} lang={lang} mode={mode} />
      <ProductCTA product={product} lang={lang} mode={mode} />
    </Box>
  );
}
