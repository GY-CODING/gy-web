'use client';

import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useLanguage } from '@/app/utils/languageContext';
import { lexendFont, valorantFont } from '../../utils/fonts';
import { getAssetPath } from '../../utils/useImagePath';
import { getLenis } from '../../hooks/useSmoothScroll';
import SmartLink from '../SmartLink';
import SocialIcon from './SocialIcon';
import { BRAND_GRADIENT, glassIconButtonSx } from '../headerStyles';

const CONTACT_EMAIL = 'it@gycoding.com';

const renderStyledText = (text: string) => {
  const parts = text.split(/(\[company\].*?\[\/company\])/g);
  return parts.map((part, index) => {
    if (part.startsWith('[company]')) {
      const content = part.replace('[company]', '').replace('[/company]', '');
      return (
        <Box
          key={index}
          component="span"
          sx={{
            fontFamily: valorantFont.style.fontFamily,
            // Valorant has a single weight: no synthetic bold, it distorts the letters.
            fontSynthesis: 'none',
            fontWeight: 400,
            background: BRAND_GRADIENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            px: 0.5,
          }}
        >
          {content}
        </Box>
      );
    }
    return part;
  });
};

const scrollToTop = () => {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Entrance animations run when the footer scrolls into view; with `animate` they would play
// on page load, far below the fold, and never be seen.
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function LinkColumn({
  title,
  links,
  delay,
  isDark,
}: {
  title: string;
  links: { name: string; href: string }[];
  delay: number;
  isDark: boolean;
}) {
  return (
    <motion.div {...reveal(delay)}>
      <Typography
        sx={{
          fontFamily: lexendFont.style.fontFamily,
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: isDark ? 'grey.500' : 'grey.600',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {links.map((link) => (
          <SmartLink key={link.href} href={link.href}>
            {link.name}
          </SmartLink>
        ))}
      </Box>
    </motion.div>
  );
}

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLanguage();

  const homeLinks = [
    { name: t('footer.home.items.home'), href: '/' },
    { name: t('footer.home.items.services'), href: '/#modular-section' },
    { name: t('footer.home.items.techstack'), href: '/#tech-stack' },
  ];

  const projectLinks = [
    { name: 'Heralds of Chaos', href: '/products/heralds-of-chaos' },
    { name: 'GY Accounts', href: '/products/gy-accounts' },
    { name: 'Wingwords', href: '/products/wingwords' },
  ];

  const aboutLinks = [
    { name: t('footer.about.items.team'), href: '/about/team' },
    { name: t('footer.about.items.company'), href: '/about/company' },
  ];

  const legalLinks = [
    { name: t('footer.legal.items.privacy'), href: '/privacy' },
    { name: t('footer.legal.items.terms'), href: '/terms' },
    { name: t('footer.legal.items.cookies'), href: '/cookies' },
  ];

  const socialLinks = [
    { name: 'Contact', href: `mailto:${CONTACT_EMAIL}` },
    { name: 'GitHub', href: 'https://github.com/GY-CODING' },
    { name: 'X', href: 'https://x.com/GYCODING' },
    { name: 'Discord', href: 'https://discord.gg/AGYhzD53qg' },
    { name: 'Support', href: 'https://github.com/orgs/GY-CODING/discussions/new?category=support' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: 6,
        backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(250,250,252,0.85)',
        backdropFilter: 'blur(20px)',
        // Gradient hairline on top instead of a flat grey border.
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 30%, rgba(236,72,153,0.6) 70%, transparent 100%)',
        },
      }}
    >
      {/* Soft glow spilling down from the hairline */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, rgba(140,84,255,${isDark ? 0.18 : 0.1}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: '1.6fr repeat(4, 1fr)',
            },
            gap: { xs: 4, md: 5 },
          }}
        >
          {/* Brand */}
          <Box
            component={motion.div}
            {...reveal()}
            sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
                p: 1.5,
                pr: 2.5,
                borderRadius: '16px',
                background: isDark
                  ? 'linear-gradient(45deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)'
                  : 'linear-gradient(45deg, rgba(99,102,241,0.05) 0%, rgba(236,72,153,0.05) 100%)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.08, rotate: -6 }}
                sx={{ position: 'relative', width: 40, height: 40 }}
              >
                <Image
                  src={getAssetPath('/gy-logo.png')}
                  alt="GYCODING"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: valorantFont.style.fontFamily,
                  fontWeight: 400,
                  fontSynthesis: 'none',
                  fontSize: '1.5rem',
                  letterSpacing: '0.1em',
                  background: BRAND_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('footer.company')}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: isDark ? 'grey.400' : 'grey.600',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                maxWidth: 320,
                mb: 3,
              }}
            >
              {renderStyledText(t('about.description1'))}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {socialLinks.map((link) => (
                <SocialIcon key={link.name} name={link.name} href={link.href} />
              ))}
            </Box>
          </Box>

          <LinkColumn
            title={t('footer.home.title')}
            links={homeLinks}
            delay={0.05}
            isDark={isDark}
          />
          <LinkColumn
            title={t('footer.projects.title')}
            links={projectLinks}
            delay={0.1}
            isDark={isDark}
          />
          <LinkColumn
            title={t('footer.about.title')}
            links={aboutLinks}
            delay={0.15}
            isDark={isDark}
          />
          <LinkColumn
            title={t('footer.legal.title')}
            links={legalLinks}
            delay={0.2}
            isDark={isDark}
          />
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            mt: 6,
            py: 3,
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: isDark ? 'grey.500' : 'grey.600',
              fontFamily: lexendFont.style.fontFamily,
              fontSize: '0.85rem',
            }}
          >
            © {new Date().getFullYear()}{' '}
            {/* Brand in Valorant (lowercase "y"), same as gy-accounts' footer. */}
            <Box
              component="span"
              sx={{
                fontFamily: valorantFont.style.fontFamily,
                fontWeight: 400,
                fontSynthesis: 'none',
                letterSpacing: '0.04em',
              }}
            >
              {t('footer.company')}
            </Box>{' '}
            · {t('footer.rights')}
          </Typography>

          <Box
            component={motion.button}
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t('footer.backToTop')}
            sx={{
              ...glassIconButtonSx(isDark),
              width: 'auto',
              px: 1.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              cursor: 'pointer',
              fontFamily: lexendFont.style.fontFamily,
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {t('footer.backToTop')}
            </Box>
            <ArrowUpwardRoundedIcon sx={{ fontSize: '1.05rem' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
