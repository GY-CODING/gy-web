'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { lexendFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import { getLenis } from '../../hooks/useSmoothScroll';
import AuroraBackground from '../home/AuroraBackground';
import EyebrowBadge from '../home/EyebrowBadge';
import AnimatedGradientHeadline from '../home/AnimatedGradientHeadline';

export interface LegalSection {
  id: string;
  title: string;
  intro?: string;
  content?: string;
  items?: Array<string | { primary: string; secondary: string }>;
  outro?: string;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdate: string;
  intro: string;
  sections: LegalSection[];
}

const BRAND_GRADIENT = 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)';
const CONTACT_EMAIL = 'it@gycoding.com';
// Fixed header (64px) plus breathing room, shared by sticky nav and anchor scrolling.
const HEADER_OFFSET = 110;

// Locale titles already carry their number ("3. How We Collect…"); split it out so it can be
// rendered as a badge, falling back to the position when a title has none.
const splitNumberedTitle = (title: string, index: number) => {
  const match = title.match(/^(\d+)\.\s*(.*)$/);
  return match
    ? { number: match[1], label: match[2] }
    : { number: String(index + 1), label: title };
};

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const idsKey = ids.join('|');

  useEffect(() => {
    const ids = idsKey.split('|');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -65% 0px` }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [idsKey]);

  return active;
}

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset: -HEADER_OFFSET + 10, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

function LegalSwitcher({ isDark }: { isDark: boolean }) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const links = [
    { href: '/privacy', label: t('footer.legal.items.privacy') },
    { href: '/terms', label: t('footer.legal.items.terms') },
    { href: '/cookies', label: t('footer.legal.items.cookies') },
  ];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 0.5,
        p: 0.5,
        borderRadius: '16px',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {links.map((link) => {
        const isActive = pathname?.replace(/\/$/, '') === link.href;
        return (
          <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                px: { xs: 1.5, sm: 2.5 },
                py: 1,
                borderRadius: '12px',
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                fontWeight: 600,
                color: isActive ? '#fff' : isDark ? 'grey.400' : 'grey.700',
                background: isActive ? BRAND_GRADIENT : 'transparent',
                boxShadow: isActive ? '0 8px 24px -8px rgba(99,102,241,0.6)' : 'none',
                transition: 'color 0.2s ease, background 0.2s ease',
                '&:hover': isActive ? {} : { color: isDark ? '#fff' : '#000' },
              }}
            >
              {link.label}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}

function TableOfContents({
  sections,
  active,
  isDark,
}: {
  sections: LegalSection[];
  active: string;
  isDark: boolean;
}) {
  const { t } = useLanguage();

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: HEADER_OFFSET,
        p: 2.5,
        borderRadius: '24px',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        background: isDark ? 'rgba(17,17,17,0.6)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography
        sx={{
          fontFamily: lexendFont.style.fontFamily,
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: isDark ? 'grey.500' : 'grey.600',
          mb: 1.5,
          px: 1,
        }}
      >
        {t('legalPage.onThisPage')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {sections.map((section, i) => {
          const { number, label } = splitNumberedTitle(section.title, i);
          const isActive = active === section.id;
          return (
            <Box
              key={section.id}
              component="button"
              onClick={() => scrollToSection(section.id)}
              sx={{
                position: 'relative',
                display: 'flex',
                gap: 1.25,
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                px: 1,
                py: 0.9,
                borderRadius: '10px',
                fontFamily: lexendFont.style.fontFamily,
                fontSize: '0.85rem',
                lineHeight: 1.4,
                color: isActive ? (isDark ? '#fff' : '#000') : isDark ? 'grey.500' : 'grey.600',
                fontWeight: isActive ? 600 : 400,
                background: isActive
                  ? isDark
                    ? 'rgba(255,255,255,0.06)'
                    : 'rgba(99,102,241,0.06)'
                  : 'transparent',
                transition: 'color 0.2s ease, background 0.2s ease',
                '&:hover': { color: isDark ? '#fff' : '#000' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  bottom: 8,
                  width: 3,
                  borderRadius: 2,
                  background: BRAND_GRADIENT,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                },
              }}
            >
              <Box component="span" sx={{ opacity: 0.6, minWidth: 16 }}>
                {number}
              </Box>
              <Box component="span">{label}</Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

function SectionCard({
  section,
  index,
  isDark,
}: {
  section: LegalSection;
  index: number;
  isDark: boolean;
}) {
  const { number, label } = splitNumberedTitle(section.title, index);
  const bodySx = {
    fontSize: { xs: '0.95rem', md: '1rem' },
    lineHeight: 1.8,
    color: isDark ? 'grey.300' : 'grey.700',
  };

  return (
    <Box
      id={section.id}
      component={motion.section}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      sx={{
        scrollMarginTop: HEADER_OFFSET,
        p: { xs: 3, sm: 4 },
        borderRadius: '24px',
        backgroundColor: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.35)' : '0 20px 60px rgba(0,0,0,0.06)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: '12px',
            background: BRAND_GRADIENT,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: lexendFont.style.fontFamily,
            fontWeight: 700,
            boxShadow: '0 10px 24px -10px rgba(99,102,241,0.7)',
          }}
        >
          {number}
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            fontWeight: 600,
            color: isDark ? '#fff' : 'grey.900',
          }}
        >
          {label}
        </Typography>
      </Box>

      {section.intro && <Typography sx={{ ...bodySx, mb: 2 }}>{section.intro}</Typography>}
      {section.content && <Typography sx={bodySx}>{section.content}</Typography>}

      {section.items && (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 1.25 }}>
          {section.items.map((item, i) => (
            <Box
              component="li"
              key={i}
              sx={{
                display: 'flex',
                gap: 1.5,
                p: 1.5,
                borderRadius: '14px',
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.04)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.08)'}`,
              }}
            >
              <Box
                sx={{
                  mt: '9px',
                  width: 7,
                  height: 7,
                  flexShrink: 0,
                  borderRadius: '50%',
                  background: BRAND_GRADIENT,
                }}
              />
              {typeof item === 'string' ? (
                <Typography sx={{ ...bodySx, lineHeight: 1.6 }}>{item}</Typography>
              ) : (
                <Box>
                  <Typography
                    sx={{
                      ...bodySx,
                      lineHeight: 1.6,
                      fontWeight: 600,
                      color: isDark ? '#fff' : 'grey.900',
                    }}
                  >
                    {item.primary}
                  </Typography>
                  <Typography
                    sx={{ ...bodySx, fontSize: '0.9rem', color: isDark ? 'grey.400' : 'grey.600' }}
                  >
                    {item.secondary}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {section.outro && <Typography sx={{ ...bodySx, mt: 2.5 }}>{section.outro}</Typography>}
    </Box>
  );
}

function ContactCard({ isDark }: { isDark: boolean }) {
  const { t } = useLanguage();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 3, sm: 4 },
        borderRadius: '24px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 3,
        border: `1px solid ${isDark ? 'rgba(140,84,255,0.3)' : 'rgba(140,84,255,0.2)'}`,
        background: isDark
          ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.1) 100%)'
          : 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(236,72,153,0.06) 100%)',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: { xs: '1.15rem', md: '1.3rem' },
            fontWeight: 600,
            color: isDark ? '#fff' : 'grey.900',
            mb: 0.5,
          }}
        >
          {t('legalPage.questionsTitle')}
        </Typography>
        <Typography sx={{ color: isDark ? 'grey.300' : 'grey.700' }}>
          {t('legalPage.questionsDescription')}
        </Typography>
      </Box>
      <a href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
        <Box
          component={motion.span}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: '14px',
            px: 3.5,
            py: 1.5,
            fontFamily: lexendFont.style.fontFamily,
            fontWeight: 600,
            color: '#fff',
            background: BRAND_GRADIENT,
            boxShadow: '0 10px 30px -8px rgba(99,102,241,0.6)',
          }}
        >
          <MailOutlineRoundedIcon sx={{ fontSize: '1.1rem' }} />
          {t('legalPage.contactButton')}
        </Box>
      </a>
    </Box>
  );
}

export default function LegalPageLayout({
  title,
  lastUpdate,
  intro,
  sections,
}: LegalPageLayoutProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLanguage();
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        // `clip` instead of `hidden`: hidden would turn this box into a scroll container
        // and break the sticky table of contents.
        overflowX: 'clip',
        pt: { xs: '112px', sm: '120px', md: '128px' },
        pb: { xs: 10, md: 14 },
      }}
    >
      {/* Aurora only behind the header area; legal text reads better on a calm background. */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100vh' }}>
        <AuroraBackground intensity={0.6} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 6, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <EyebrowBadge>{t('footer.legal.title')}</EyebrowBadge>
          </Box>

          <AnimatedGradientHeadline
            text={title}
            component="h1"
            sx={{
              fontSize: { xs: '2.3rem', sm: '3rem', md: '3.6rem' },
              lineHeight: 1.08,
              mb: 2.5,
              textAlign: 'center',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 4,
                color: isDark ? 'grey.400' : 'grey.600',
                fontSize: '0.9rem',
              }}
            >
              <CalendarMonthRoundedIcon sx={{ fontSize: '1rem' }} />
              {lastUpdate}
            </Box>

            <Box sx={{ mb: 4 }}>
              <LegalSwitcher isDark={isDark} />
            </Box>

            <Typography
              sx={{
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                color: isDark ? 'grey.300' : 'grey.700',
                lineHeight: 1.7,
              }}
            >
              {intro}
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
            gap: { xs: 3, md: 5 },
            alignItems: 'start',
          }}
        >
          {/* Stretched to the full grid row so the sticky nav has room to travel. */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'stretch' }}>
            <TableOfContents sections={sections} active={active} isDark={isDark} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
            {sections.map((section, i) => (
              <SectionCard key={section.id} section={section} index={i} isDark={isDark} />
            ))}
            <ContactCard isDark={isDark} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
