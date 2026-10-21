'use client';

// Shared layout for the three legal pages (/privacy, /terms, /cookies), in the same language as
// every other page now that gy-web's /v2 redesign is the real site. The legal text itself still
// comes from utils/locales.ts (t('privacy') etc.) — translating that much regulatory copy into
// components/v2/copy.ts isn't worth it; only the chrome around it changed. Each page wraps this
// in <TonePage>, which brings the real nav and footer — this component only renders the content.

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { lexendFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import { getLenis } from '../../hooks/useSmoothScroll';
import { ActionButton, display, easeOut, enter, MARGIN, SOFT } from '../v2/kit';
import { BRAND_GRADIENT, CONTACT_EMAIL } from '../v2/copy';

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

// Fixed nav (56px) plus breathing room, shared by the sticky table of contents and anchor scroll.
const HEADER_OFFSET = 80;

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

// Glass: the same color-mix-on-currentColor treatment as the nav dropdown and the pause button.
const glass = (strength = 8) => `color-mix(in srgb, currentColor ${strength}%, transparent)`;
const glassBorder = (strength = 14) => `1px solid ${glass(strength)}`;

function LegalSwitcher() {
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
        border: glassBorder(),
        background: glass(4),
      }}
    >
      {links.map((link) => {
        const isActive = pathname?.replace(/\/$/, '') === link.href;
        return (
          <Box
            key={link.href}
            component={Link}
            href={link.href}
            sx={{
              px: { xs: 1.5, sm: 2.5 },
              py: 1,
              borderRadius: '12px',
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontWeight: 600,
              textDecoration: 'none',
              color: isActive ? '#fff' : 'inherit',
              opacity: isActive ? 1 : 0.7,
              background: isActive ? BRAND_GRADIENT : 'transparent',
              boxShadow: isActive ? '0 8px 24px -8px rgba(99,102,241,0.6)' : 'none',
              transition: 'opacity 0.2s ease, background-color 0.2s ease',
              '&:hover': { opacity: 1 },
            }}
          >
            {link.label}
          </Box>
        );
      })}
    </Box>
  );
}

function TableOfContents({ sections, active }: { sections: LegalSection[]; active: string }) {
  const { t } = useLanguage();

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: HEADER_OFFSET,
        p: 2.5,
        borderRadius: '24px',
        border: glassBorder(),
        background: glass(5),
      }}
    >
      <Typography
        sx={{
          fontFamily: lexendFont.style.fontFamily,
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: SOFT,
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
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                lineHeight: 1.4,
                color: isActive ? 'inherit' : SOFT,
                fontWeight: isActive ? 600 : 400,
                background: isActive ? glass(8) : 'transparent',
                transition: 'color 0.2s ease, background-color 0.2s ease',
                '&:hover': { color: 'inherit' },
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

function SectionCard({ section, index }: { section: LegalSection; index: number }) {
  const { number, label } = splitNumberedTitle(section.title, index);
  const bodySx = { fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.8, color: SOFT };

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
        background: glass(5),
        border: glassBorder(),
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
        <Typography component="h2" sx={{ ...display, fontSize: { xs: '1.2rem', md: '1.4rem' } }}>
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
                background: glass(3),
                border: glassBorder(8),
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
                  <Typography sx={{ ...bodySx, lineHeight: 1.6, fontWeight: 600, color: 'inherit' }}>
                    {item.primary}
                  </Typography>
                  <Typography sx={{ ...bodySx, fontSize: '0.9rem' }}>{item.secondary}</Typography>
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

function ContactCard() {
  const { t } = useLanguage();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: '24px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 3,
        border: `1px solid color-mix(in srgb, ${'#8c54ff'} 30%, transparent)`,
        background:
          'linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(236,72,153,0.09) 100%)',
      }}
    >
      <Box>
        <Typography sx={{ ...display, fontSize: { xs: '1.15rem', md: '1.3rem' }, mb: 0.5 }}>
          {t('legalPage.questionsTitle')}
        </Typography>
        <Typography sx={{ color: SOFT }}>{t('legalPage.questionsDescription')}</Typography>
      </Box>
      <ActionButton href={`mailto:${CONTACT_EMAIL}`} bg={BRAND_GRADIENT} external={false}>
        <MailOutlineRoundedIcon sx={{ fontSize: '1.1rem', mr: 1 }} />
        {t('legalPage.contactButton')}
      </ActionButton>
    </Box>
  );
}

export default function LegalPageLayout({
  title,
  lastUpdate,
  intro,
  sections,
}: LegalPageLayoutProps) {
  const { t } = useLanguage();
  const active = useActiveSection(sections.map((s) => s.id));

  return (
    <Box
      component="section"
      data-tone="ground"
      sx={{
        position: 'relative',
        px: MARGIN,
        pt: { xs: 14, md: 18 },
        pb: { xs: 10, md: 14 },
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 6, md: 8 } }}>
        <Box
          component={motion.p}
          {...enter()}
          sx={{
            m: 0,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: SOFT,
          }}
        >
          {t('footer.legal.title')}
        </Box>

        <Box
          component={motion.h1}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
          sx={{ m: 0, mt: 2, ...display, fontSize: { xs: '2.3rem', sm: '3rem', md: '3.6rem' }, lineHeight: 1.05 }}
        >
          {title}
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              mt: 3,
              mb: 4,
              color: SOFT,
              fontSize: '0.9rem',
            }}
          >
            <CalendarMonthRoundedIcon sx={{ fontSize: '1rem' }} />
            {lastUpdate}
          </Box>

          <Box sx={{ mb: 4 }}>
            <LegalSwitcher />
          </Box>

          <Typography sx={{ fontSize: { xs: '1.05rem', sm: '1.15rem' }, color: SOFT, lineHeight: 1.7 }}>
            {intro}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
          gap: { xs: 3, md: 5 },
          alignItems: 'start',
        }}
      >
        {/* Stretched to the full grid row so the sticky nav has room to travel. */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'stretch' }}>
          <TableOfContents sections={sections} active={active} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          {sections.map((section, i) => (
            <SectionCard key={section.id} section={section} index={i} />
          ))}
          <ContactCard />
        </Box>
      </Box>
    </Box>
  );
}
