'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { lexendFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import { gradientTextStyles } from '../../utils/styles';
import EyebrowBadge from '../home/EyebrowBadge';

gsap.registerPlugin(ScrollTrigger);

interface Slide {
  title: string;
  description: string;
  gradient: string;
  icon: string;
  techIcons: string[];
}

function useServiceSlides(): Slide[] {
  const { t } = useLanguage();
  return useMemo(
    () => [
      {
        title: t('services.modules.webDev.title'),
        description: t('services.modules.webDev.description'),
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        icon: 'nextjs',
        techIcons: ['react', 'nextjs', 'typescript'],
      },
      {
        title: t('services.modules.backend.title'),
        description: t('services.modules.backend.description'),
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
        icon: 'springboot',
        techIcons: ['springboot', 'java', 'mongodb'],
      },
      {
        title: t('services.modules.gameDev.title'),
        description: t('services.modules.gameDev.description'),
        gradient: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
        icon: 'unity',
        techIcons: ['unity', 'csharp', 'blender'],
      },
    ],
    [t]
  );
}

export default function ServicesShowcase() {
  const { t } = useLanguage();
  const slides = useServiceSlides();

  return (
    <Box id="modular-section" component="section" sx={{ position: 'relative' }}>
      {/* Both variants stay mounted; only CSS toggles visibility. GSAP's pin mutates the
          DOM directly (pin-spacer wrapping), so unmounting the pinned tree via a React
          breakpoint switch races React's own DOM removal and crashes — see ServicesDesktop. */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <ServicesDesktop slides={slides} t={t} />
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <ServicesMobile slides={slides} t={t} />
      </Box>
    </Box>
  );
}

function SectionHeader({ t }: { t: (key: string) => string }) {
  return (
    <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <EyebrowBadge>{t('services.eyebrow')}</EyebrowBadge>
      </Box>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          ...gradientTextStyles('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'),
          fontFamily: lexendFont.style.fontFamily,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 600,
          mb: 2,
        }}
      >
        {t('services.title')}
      </Typography>
      <Typography
        variant="h5"
        component="p"
        sx={{
          fontFamily: lexendFont.style.fontFamily,
          fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700'),
        }}
      >
        {t('services.description')}
      </Typography>
    </Box>
  );
}

function SlideVisual({ slide, isDark }: { slide: Slide; isDark: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: 8 },
        maxWidth: 920,
        mx: 'auto',
        px: { xs: 3, md: 0 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: 120, md: 160 },
          height: { xs: 120, md: 160 },
          flexShrink: 0,
          borderRadius: '32px',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
          boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Image
          src={`/icons/${slide.icon}.svg`}
          alt={slide.title}
          fill
          style={{
            objectFit: 'contain',
            padding: '28px',
            filter: isDark ? 'brightness(0) invert(1)' : 'none',
            opacity: isDark ? 0.9 : 0.8,
          }}
        />
      </Box>

      <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontWeight: 600,
            fontSize: { xs: '1.75rem', sm: '2.1rem', md: '2.5rem' },
            mb: 2,
            ...gradientTextStyles(slide.gradient),
          }}
        >
          {slide.title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.7,
            color: isDark ? 'grey.300' : 'grey.700',
            mb: 3,
            maxWidth: 480,
          }}
        >
          {slide.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          {slide.techIcons.map((tech) => (
            <Box
              key={tech}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: '10px',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
              }}
            >
              <Box sx={{ position: 'relative', width: 18, height: 18 }}>
                <Image
                  src={`/icons/${tech}.svg`}
                  alt={tech}
                  fill
                  style={{
                    objectFit: 'contain',
                    filter: isDark ? 'brightness(0) invert(1)' : 'none',
                    opacity: isDark ? 0.9 : 0.7,
                  }}
                />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: isDark ? 'grey.300' : 'grey.700' }}>
                {tech}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function ServicesDesktop({ slides, t }: { slides: Slide[]; t: (key: string) => string }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const applyProgress = (raw: number) => {
      const idx = Math.min(slides.length - 1, Math.floor(raw));
      const sub = raw - idx;
      setActiveIndex(Math.round(Math.min(slides.length - 1, raw)));

      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i < idx) {
          gsap.set(el, { autoAlpha: 0, rotateY: -35, z: -200, pointerEvents: 'none' });
        } else if (i === idx) {
          gsap.set(el, {
            autoAlpha: 1 - sub,
            rotateY: -sub * 35,
            z: -sub * 200,
            pointerEvents: sub < 0.5 ? 'auto' : 'none',
          });
        } else if (i === idx + 1) {
          gsap.set(el, {
            autoAlpha: sub,
            rotateY: (1 - sub) * 35,
            z: -(1 - sub) * 200,
            pointerEvents: sub >= 0.5 ? 'auto' : 'none',
          });
        } else {
          gsap.set(el, { autoAlpha: 0, rotateY: 35, z: -200, pointerEvents: 'none' });
        }
      });
    };

    // Scoped to a media query so GSAP itself (not React) owns tearing down the pin when
    // crossing the mobile breakpoint — it reverts the pin-spacer it inserted synchronously,
    // before this tree would otherwise race a React-driven unmount.
    const mm = gsap.matchMedia();

    mm.add('(min-width: 600px)', () => {
      applyProgress(0);

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${(slides.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          applyProgress(self.progress * (slides.length - 1));
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [slides.length]);

  return (
    <Box ref={containerRef} sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {slides.map((slide, i) => (
        <Box
          key={`bg-${i}`}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: activeIndex === i ? 1 : 0,
            transition: 'opacity 0.6s ease',
            background: isDark
              ? `radial-gradient(ellipse 70% 50% at 50% 30%, ${slide.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#6366f1'}22 0%, transparent 70%)`
              : `radial-gradient(ellipse 70% 50% at 50% 30%, ${slide.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] || '#6366f1'}14 0%, transparent 70%)`,
          }}
        />
      ))}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { md: 6 },
        }}
      >
        <SectionHeader t={t} />

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            flex: 1,
            maxHeight: 360,
            perspective: '1600px',
          }}
        >
          {slides.map((slide, i) => (
            <Box
              key={slide.title}
              ref={(el: HTMLDivElement | null) => {
                slideRefs.current[i] = el;
              }}
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
              }}
            >
              <SlideVisual slide={slide} isDark={isDark} />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: activeIndex === i ? 32 : 10,
                height: 4,
                borderRadius: '4px',
                background:
                  activeIndex === i
                    ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
                    : isDark
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(0,0,0,0.12)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function ServicesMobile({ slides, t }: { slides: Slide[]; t: (key: string) => string }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 12 } }}>
      <Box sx={{ mb: 8 }}>
        <SectionHeader t={t} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {slides.map((slide, index) => (
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Box
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '24px',
                backgroundColor: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <SlideVisual slide={slide} isDark={isDark} />
            </Box>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}
