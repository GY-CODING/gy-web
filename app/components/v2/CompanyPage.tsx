'use client';

// Company page of the /v2 prototype (/company/). Content from utils/locales.ts (company.story,
// company.values, about, services) — the same facts as the live /about/company, told in the v2
// language. Signature scene: the story pinned in three chapters (2021, a year later, today).

import { Box } from '@mui/material';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { PRODUCT_ORDER, PRODUCTS } from '../../products/data/products';
import { useLanguage } from '../../utils/languageContext';
import { locales } from '../../utils/locales';
import { getCopy } from './copy';
import { display, easeOut, enter, MARGIN, ScrollWords, SOFT, TonePage } from './kit';
import { FounderDoors, InvertedCta } from './Sections';
import { Values } from './TeamPage';

// Locale texts carry [company]…[/company] markup and a few typos; in Lexend the name is GYCODING.
const clean = (t: string) =>
  t
    .replace(/\[company\][^[]*\[\/company\]/g, 'GYCODING')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.\.+/g, '.')
    .trim();
const sentences = (t: string) => clean(t).split(/(?<=\.)\s+/);

function useCompany() {
  const { language } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const L = locales[lang];
  const s1 = sentences(L.company.story.part1);
  return {
    copy: getCopy(language),
    lang,
    L,
    // 2021: founding and purpose · a year later: the community · today: the products.
    chapters: [s1.slice(0, 2).join(' '), s1.slice(2).join(' '), clean(L.company.story.part2)],
  };
}

function Hero() {
  const { copy, L } = useCompany();
  return (
    <Box
      component="section"
      data-tone="night"
      sx={{
        minHeight: '88svh',
        px: MARGIN,
        pt: { xs: 16, md: 20 },
        pb: { xs: 10, md: 12 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        component={motion.h1}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: easeOut }}
        sx={{
          m: 0,
          ...display,
          fontSize: { xs: 60, md: 'clamp(88px, 11vw, 200px)' },
          lineHeight: 0.92,
        }}
      >
        {copy.company.title}
      </Box>
      <Box
        component={motion.p}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
        sx={{
          m: 0,
          mt: 3,
          maxWidth: 640,
          fontSize: { xs: 20, md: 28 },
          lineHeight: 1.3,
          color: SOFT,
        }}
      >
        {L.company.description}
      </Box>
    </Box>
  );
}

// The story, pinned: the chapter label swaps out of a mask, its text crossfades, a line fills.
function Chapters() {
  const { copy, chapters } = useCompany();
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = chapters.length;
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) =>
    setI(Math.min(n - 1, Math.floor(v * n * 0.999)))
  );
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const labels = copy.company.chapters;

  return (
    <Box
      ref={ref}
      component="section"
      data-tone="night"
      aria-label={copy.company.title}
      sx={{ height: { xs: 'auto', md: `${n * 90 + 20}svh` } }}
    >
      {/* Phones and reduced motion: the three chapters in sequence. */}
      <Box
        component="ol"
        sx={{
          display: { xs: 'grid', md: reduce ? 'grid' : 'none' },
          listStyle: 'none',
          m: 0,
          px: MARGIN,
          py: 10,
          gap: 8,
        }}
      >
        {chapters.map((t, k) => (
          <Box key={k} component={motion.li} {...enter()}>
            <Box component="h2" sx={{ m: 0, ...display, fontSize: 64, lineHeight: 1 }}>
              {labels[k]}
            </Box>
            <Box component="p" sx={{ m: 0, mt: 2, fontSize: 19, lineHeight: 1.5, color: SOFT }}>
              {t}
            </Box>
          </Box>
        ))}
      </Box>
      {!reduce && (
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'sticky',
            top: 0,
            height: '100svh',
            px: MARGIN,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              columnGap: 4,
              alignItems: 'center',
              maxWidth: 1400,
              mx: 'auto',
              width: '100%',
            }}
          >
            <Box
              sx={{
                gridColumn: '1 / span 6',
                overflow: 'hidden',
                height: 'clamp(140px, 15vw, 260px)',
                position: 'relative',
              }}
            >
              <AnimatePresence initial={false}>
                <Box
                  key={i}
                  component={motion.h2}
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.8, ease: easeOut }}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    m: 0,
                    ...display,
                    fontSize: 'clamp(140px, 15vw, 260px)',
                    lineHeight: 1,
                  }}
                >
                  {labels[i]}
                </Box>
              </AnimatePresence>
            </Box>
            <Box sx={{ gridColumn: '7 / span 6', position: 'relative', minHeight: 260 }}>
              <AnimatePresence mode="wait" initial={false}>
                <Box
                  key={i}
                  component={motion.p}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  sx={{ m: 0, fontSize: 'clamp(22px, 1.9vw, 30px)', lineHeight: 1.4 }}
                >
                  {chapters[i]}
                </Box>
              </AnimatePresence>
            </Box>
          </Box>
          {/* The timeline: three marks and the line filling as the story advances. */}
          <Box sx={{ position: 'absolute', left: 32, right: 32, bottom: 48 }}>
            <Box
              sx={{
                position: 'relative',
                height: 3,
                borderRadius: 2,
                background: 'color-mix(in srgb, currentColor 14%, transparent)',
              }}
            >
              <Box
                component={motion.div}
                style={{ scaleX: line }}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'currentColor',
                  transformOrigin: 'left',
                  borderRadius: 2,
                }}
              />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              {labels.map((l, k) => (
                <Box
                  key={l}
                  sx={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: k === i ? 'inherit' : SOFT,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {l}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// What we do: the three fields from the site, as three large lines.
function Fields() {
  const { copy, L } = useCompany();
  const m = L.services.modules;
  const rows = [m.webDev, m.backend, m.gameDev];
  return (
    <Box
      component="section"
      data-tone="paper"
      aria-labelledby="fields-title"
      sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Box
          component={motion.h2}
          {...enter()}
          id="fields-title"
          sx={{
            m: 0,
            ...display,
            fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' },
            lineHeight: 1,
          }}
        >
          {copy.company.fieldsTitle}
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            mt: { xs: 6, md: 9 },
            display: 'grid',
            gap: { xs: 5, md: 6 },
          }}
        >
          {rows.map((r, k) => (
            <Box
              key={r.title}
              component={motion.li}
              {...enter(k * 0.08)}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
                columnGap: 6,
                rowGap: 1.5,
                alignItems: 'end',
              }}
            >
              <Box
                component="h3"
                sx={{
                  m: 0,
                  ...display,
                  fontSize: { xs: 36, md: 'clamp(48px, 5vw, 80px)' },
                  lineHeight: 1,
                }}
              >
                {r.title}
              </Box>
              <Box
                component="p"
                sx={{ m: 0, fontSize: { xs: 18, md: 21 }, lineHeight: 1.47, color: SOFT }}
              >
                {r.description}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// The ecosystem: the three worlds as doors.
function Ecosystem() {
  const { copy, lang } = useCompany();
  return (
    <Box
      component="section"
      data-tone="mist"
      aria-labelledby="eco-title"
      sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Box
          component={motion.h2}
          {...enter()}
          id="eco-title"
          sx={{
            m: 0,
            ...display,
            fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' },
            lineHeight: 1,
            textAlign: 'center',
          }}
        >
          {copy.company.ecosystemTitle}
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            mt: { xs: 6, md: 9 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {PRODUCT_ORDER.map((id, k) => {
            const p = PRODUCTS[id];
            return (
              <Box key={id} component={motion.li} {...enter(k * 0.08, 40)}>
                <Box
                  component={Link}
                  href={`/products/${id}/`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: '100%',
                    borderRadius: '24px',
                    background: '#ffffff',
                    color: '#1d1d1f',
                    textDecoration: 'none',
                    p: { xs: 3.5, md: 4.5 },
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': { transform: 'translateY(-6px)' },
                    '&:hover .chev': { transform: 'translateX(4px)' },
                    '&:hover .logo': { transform: 'rotate(-8deg) scale(1.08)' },
                    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 4 },
                  }}
                >
                  <Box
                    className="logo"
                    sx={{ transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <Image
                      src={p.logo}
                      alt=""
                      width={56}
                      height={56}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  <Box
                    component="h3"
                    sx={{ m: 0, mt: 3, ...display, fontSize: { xs: 30, md: 34 }, lineHeight: 1.05 }}
                  >
                    {p.name}
                    <Box
                      component="span"
                      className="chev"
                      aria-hidden
                      sx={{
                        display: 'inline-block',
                        ml: '0.3em',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      ›
                    </Box>
                  </Box>
                  <Box
                    component="p"
                    sx={{ m: 0, mt: 1.5, fontSize: 17, lineHeight: 1.47, color: '#6e6e73' }}
                  >
                    {lang === 'es' ? p.taglineEs : p.tagline}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

function People() {
  const { copy } = useCompany();
  return (
    <Box
      component="section"
      data-tone="night"
      aria-labelledby="people-title"
      sx={{
        px: MARGIN,
        py: { xs: 12, md: 18 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        component={motion.h2}
        {...enter()}
        id="people-title"
        sx={{
          m: 0,
          ...display,
          fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' },
          lineHeight: 1,
        }}
      >
        {copy.company.peopleTitle}
      </Box>
      <FounderDoors copy={copy} />
    </Box>
  );
}

export default function CompanyPageV2() {
  const { L } = useCompany();
  return (
    <TonePage initial="night">
      <Hero />
      <Chapters />
      <ScrollWords
        text={clean(L.about.description1)}
        sub={clean(L.about.description2)}
        tone="mist"
        size={{ xs: 32, sm: 44, md: 'clamp(44px, 4.4vw, 72px)' }}
      />
      <Fields />
      <Values />
      <People />
      <Ecosystem />
      <InvertedCta copy={getCopy(L === locales.es ? 'es' : 'en')} />
    </TonePage>
  );
}
