'use client';

// Heralds of Chaos has its own page inside /v2: the other two products share ProductPage, but this
// one is a Norse mythology encyclopedia and earns a treatment of its own — black, bone white and
// gold, nothing else. The reference is the way RPG sites (Diablo and company) stage a world:
// a lit seal on a dark field, an ornament instead of a divider, roman numerals, and one real
// scroll scene (Yggdrasil) rather than movement everywhere.
//
// Typeface stays Lexend (Valorant is only ever the GYCODING wordmark, and /v2 titles are Lexend
// 600): the weight comes from scale, caps, gold foil and the light, not from a fantasy face.
//
// Performance: no animated blur, no canvas. The sky is static gradients plus a handful of motes
// that only move with transform/opacity; coarse pointers get fewer of them, reduced motion none.

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../../products/data/products';
import { useLanguage } from '../../utils/languageContext';
import { getCopy, PRODUCT_REPOS } from './copy';
import { display, enter, MARGIN, ScrollWords, TonePage } from './kit';
import { Making, NextWorld } from './ProductPage';

const P = PRODUCTS['heralds-of-chaos'];

// ─── The three colours ────────────────────────────────────────────────────────
const GOLD = '#d8b864';
const GOLD_DIM = 'rgba(216,184,100,0.34)';
const GOLD_FAINT = 'rgba(216,184,100,0.16)';
// Gold dark enough to be read as text on the bone chapter (5.2:1); GOLD itself is only 2.4:1 there.
const GOLD_INK = '#7d6128';
// Gold leaf: light runs across the letter, so it reads as metal and not as a yellow fill.
const FOIL =
  'linear-gradient(104deg, #8a6e2f 0%, #e3cd92 20%, #fbf4de 36%, #d8b864 52%, #f7edc9 68%, #a98433 88%, #7d6128 100%)';
const foilText = {
  background: FOIL,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

// Small caps labels: the only place with open tracking.
const carved = {
  fontSize: { xs: 12, md: 13 },
  fontWeight: 600,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
} as const;

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

// Deterministic so the server and the client draw the same sky (no hydration mismatch).
const seeded = (seed: number) => {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
};

// ─── The night: stars, a cold aurora and ash rising ───────────────────────────
function NightSky({ motes = 14 }: { motes?: number }) {
  const r = seeded(7);
  const stars = Array.from({ length: 80 }, () => ({
    x: r() * 100,
    y: r() * 100,
    s: 0.35 + r() * 0.85,
    o: 0.12 + r() * 0.5,
  }));
  const r2 = seeded(31);
  const ash = Array.from({ length: motes }, (_, i) => ({
    x: r2() * 100,
    d: 17 + r2() * 18,
    delay: -r2() * 30,
    s: 1 + r2() * 1.6,
    i,
  }));
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        '@keyframes gy-aurora': {
          '0%': { transform: 'translate3d(-6%, 0, 0) scale(1.05)' },
          '100%': { transform: 'translate3d(6%, -3%, 0) scale(1.18)' },
        },
        '@keyframes gy-ash': {
          '0%': { transform: 'translate3d(0, 20vh, 0)', opacity: 0 },
          '12%': { opacity: 0.8 },
          '88%': { opacity: 0.5 },
          '100%': { transform: 'translate3d(2vw, -105vh, 0)', opacity: 0 },
        },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      {/* Aurora: two gradient veils, moved only with transform (never an animated blur). */}
      <Box
        sx={{
          position: 'absolute',
          inset: '-20% -10% auto -10%',
          height: '85%',
          background:
            'radial-gradient(58% 48% at 46% 12%, rgba(196,214,232,0.10) 0%, transparent 72%), radial-gradient(44% 38% at 64% 4%, rgba(216,184,100,0.13) 0%, transparent 70%)',
          animation: 'gy-aurora 26s ease-in-out infinite alternate',
          willChange: 'transform',
        }}
      />
      {/* Stars. */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.s * 0.055} fill="#f2f0ea" opacity={s.o} />
        ))}
      </Box>
      {/* Ash drifting up from the ground. */}
      {ash.map((a) => (
        <Box
          key={a.i}
          sx={{
            position: 'absolute',
            left: `${a.x}%`,
            bottom: 0,
            width: a.s,
            height: a.s,
            borderRadius: '50%',
            background: GOLD,
            animation: `gy-ash ${a.d}s linear ${a.delay}s infinite`,
            willChange: 'transform, opacity',
            // Phones and modest machines keep only the first six.
            ...(a.i >= 6 ? { '@media (pointer: coarse)': { display: 'none' } } : {}),
          }}
        />
      ))}
      {/* The ground swallows the light at the bottom of every dark screen. */}
      <Box
        sx={{
          position: 'absolute',
          inset: 'auto 0 0 0',
          height: '38%',
          background: 'linear-gradient(to top, #060607 10%, transparent 100%)',
        }}
      />
    </Box>
  );
}

// ─── The seal: the tree inside a slowly turning ring of marks ─────────────────
function Seal({ size = 180 }: { size?: number }) {
  const ticks = Array.from({ length: 24 }, (_, i) => i);
  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'grid',
        placeItems: 'center',
        '@keyframes gy-seal': { to: { transform: 'rotate(360deg)' } },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      {/* A breath of gold behind the mark. */}
      <Box
        sx={{
          position: 'absolute',
          inset: '-40%',
          background: 'radial-gradient(circle, rgba(216,184,100,0.22) 0%, transparent 65%)',
        }}
      />
      <Box
        component="svg"
        viewBox="0 0 200 200"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          animation: 'gy-seal 90s linear infinite',
          willChange: 'transform',
        }}
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke={GOLD_DIM} strokeWidth="1" />
        <circle cx="100" cy="100" r="78" fill="none" stroke={GOLD_FAINT} strokeWidth="1" />
        {/* Rune-like marks, drawn as strokes: no Runic font needed, so they render everywhere. */}
        {ticks.map((i) => {
          const a = (i / ticks.length) * Math.PI * 2;
          const x = 100 + Math.cos(a) * 86;
          const y = 100 + Math.sin(a) * 86;
          const deg = (i / ticks.length) * 360;
          const long = i % 3 === 0;
          return (
            <g
              key={i}
              transform={`translate(${x} ${y}) rotate(${deg + 90})`}
              stroke={long ? GOLD : GOLD_DIM}
              strokeWidth={long ? 1.4 : 1}
              strokeLinecap="square"
            >
              <line x1="0" y1="-5" x2="0" y2="5" />
              {long && <line x1="-3.5" y1="-4.5" x2="3.5" y2="1" />}
            </g>
          );
        })}
      </Box>
      <Image
        src={P.logo}
        alt=""
        width={Math.round(size * 0.46)}
        height={Math.round(size * 0.46)}
        style={{ objectFit: 'contain' }}
        priority
      />
    </Box>
  );
}

// ─── Ornament: the rule that replaces a plain divider ─────────────────────────
function Rule({ width = 280 }: { width?: number }) {
  return (
    <Box
      aria-hidden
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        width: '100%',
        maxWidth: width,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(to right, transparent, ${GOLD_DIM})`,
        }}
      />
      <Box sx={{ width: 7, height: 7, transform: 'rotate(45deg)', border: `1px solid ${GOLD}` }} />
      <Box
        sx={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(to left, transparent, ${GOLD_DIM})`,
        }}
      />
    </Box>
  );
}

// ─── I. The gate ──────────────────────────────────────────────────────────────
function Gate() {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const es = language === 'es';
  const L = LORE[es ? 'es' : 'en'];
  return (
    <Box
      component="section"
      data-tone="heralds-void"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        px: MARGIN,
        pt: { xs: 13, md: 16 },
        pb: { xs: 8, md: 10 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <NightSky />
      <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Box
          component={motion.div}
          {...enter(0, 12)}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Seal size={160} />
        </Box>
        <Box
          component={motion.div}
          {...enter(0.1, 14)}
          sx={{ mt: { xs: 4, md: 5 }, ...carved, color: GOLD }}
        >
          {L.eyebrow}
        </Box>
        {/* The name, carved: bone white, with CHAOS in gold leaf. */}
        <Box
          component="h1"
          sx={{
            m: 0,
            mt: 2,
            ...display,
            textTransform: 'uppercase',
            letterSpacing: '0.01em',
            fontSize: { xs: 44, sm: 64, md: 'clamp(72px, 8.4vw, 150px)' },
            lineHeight: 0.98,
          }}
        >
          <Box component={motion.span} {...enter(0.14, 26)} sx={{ display: 'block' }}>
            Heralds of
          </Box>
          <Box component={motion.span} {...enter(0.22, 26)} sx={{ display: 'block', ...foilText }}>
            Chaos
          </Box>
        </Box>
        <Box component={motion.div} {...enter(0.3, 16)} sx={{ mt: { xs: 3.5, md: 4.5 } }}>
          <Rule width={300} />
        </Box>
        <Box
          component={motion.p}
          {...enter(0.36, 16)}
          sx={{
            m: 0,
            mt: { xs: 3.5, md: 4.5 },
            mx: 'auto',
            maxWidth: 620,
            fontSize: { xs: 19, md: 23 },
            lineHeight: 1.5,
            color: 'var(--tone-soft)',
          }}
        >
          {es ? P.taglineEs : P.tagline}
        </Box>
        <Box
          component={motion.div}
          {...enter(0.44, 16)}
          sx={{
            mt: { xs: 4.5, md: 5.5 },
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          <GoldButton href={P.appUrl}>{es ? P.ctaLabel!.es : P.ctaLabel!.en}</GoldButton>
          <Box
            component="a"
            href={PRODUCT_REPOS['heralds-of-chaos']}
            target="_blank"
            rel="noopener noreferrer"
            sx={quietLink}
          >
            {copy.product.codeLink} ↗
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Gold is the only action colour on this page: a thin gold frame that fills on hover.
const quietLink = {
  fontSize: 16,
  fontWeight: 600,
  letterSpacing: '0.04em',
  color: 'var(--tone-soft)',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': { color: GOLD },
  '&:focus-visible': { outline: `2px solid ${GOLD}`, outlineOffset: 4, borderRadius: '4px' },
} as const;

function GoldButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        height: 54,
        px: 3.5,
        borderRadius: '14px',
        border: `1px solid ${GOLD}`,
        color: '#14100a',
        background: FOIL,
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'transform 0.25s ease, box-shadow 0.35s ease',
        boxShadow: '0 0 0 0 rgba(216,184,100,0)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 40px -10px rgba(216,184,100,0.55)',
        },
        '&:active': { transform: 'scale(0.97)' },
        '&:focus-visible': { outline: `2px solid ${GOLD}`, outlineOffset: 4 },
      }}
    >
      {children}
    </Box>
  );
}

// ─── II. Yggdrasil: the nine worlds ───────────────────────────────────────────
function Yggdrasil() {
  const { language } = useLanguage();
  const es = language === 'es';
  const L = LORE[es ? 'es' : 'en'];
  const [active, setActive] = useState(0);
  const marks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    marks.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const realm = L.realms[active];

  return (
    // No overflow:hidden on the section: it would become the scrollport and kill the sticky scene.
    <Box
      component="section"
      data-tone="heralds-void"
      aria-labelledby="realms-title"
      sx={{ position: 'relative', px: MARGIN, py: { xs: 11, md: 0 } }}
    >
      {/* Phones: the nine realms as one list down a lit trunk. */}
      <Box sx={{ position: 'relative', display: { xs: 'block', md: 'none' }, overflow: 'hidden' }}>
        <NightSky motes={6} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ ...carved, color: GOLD, textAlign: 'center' }}>{L.realmsEyebrow}</Box>
          <Box
            component="h2"
            id="realms-title"
            sx={{ m: 0, mt: 2, ...display, fontSize: 38, lineHeight: 1.05, textAlign: 'center' }}
          >
            {L.realmsTitle}
          </Box>
          <Box
            component="ol"
            sx={{ position: 'relative', listStyle: 'none', m: 0, mt: 6, p: 0, pl: 4 }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                left: 9,
                top: 8,
                bottom: 8,
                width: '1px',
                background: `linear-gradient(to bottom, transparent, ${GOLD_DIM} 12%, ${GOLD_DIM} 88%, transparent)`,
              }}
            />
            {L.realms.map((w, i) => (
              <Box
                key={w.name}
                component={motion.li}
                {...enter(0, 20)}
                sx={{ position: 'relative', pb: 4.5 }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    left: -27,
                    top: 9,
                    width: 9,
                    height: 9,
                    transform: 'rotate(45deg)',
                    border: `1px solid ${GOLD}`,
                    background: '#060607',
                  }}
                />
                <Box sx={{ ...carved, fontSize: 11, color: GOLD }}>{ROMAN[i]}</Box>
                <Box
                  component="h3"
                  sx={{ m: 0, mt: 0.75, ...display, fontSize: 25, lineHeight: 1.1, ...foilText }}
                >
                  {w.name}
                </Box>
                <Box
                  component="p"
                  sx={{ m: 0, mt: 1, fontSize: 17, lineHeight: 1.5, color: 'var(--tone-soft)' }}
                >
                  {w.line}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Desktop: the tree stays on screen and the realm beside it changes as you descend.
          The track gives the scroll distance; the nine markers inside it drive the scene. */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'relative', height: '558svh' }}>
        <Box aria-hidden sx={{ position: 'absolute', inset: 0 }}>
          {L.realms.map((w, i) => (
            <Box
              key={w.name}
              data-i={i}
              ref={(el: HTMLElement | null) => {
                marks.current[i] = el;
              }}
              sx={{ height: '62svh' }}
            />
          ))}
        </Box>
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1, height: '100svh', overflow: 'hidden' }}>
          <NightSky motes={8} />
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: 8,
              maxWidth: 1280,
              mx: 'auto',
            }}
          >
            {/* The tree. */}
            <Box
              aria-hidden
              sx={{ position: 'relative', height: '74svh', display: 'grid', placeItems: 'center' }}
            >
              <Box
                component="svg"
                viewBox="0 0 260 760"
                preserveAspectRatio="xMidYMid meet"
                sx={{ width: '100%', height: '100%' }}
              >
                {/* canopy */}
                <path
                  d="M130 120 C 60 92, 28 50, 34 8"
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth="1.2"
                />
                <path
                  d="M130 120 C 200 92, 232 50, 226 8"
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth="1.2"
                />
                <path
                  d="M130 120 C 112 74, 118 40, 130 2"
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth="1.2"
                />
                {/* trunk */}
                <line x1="130" y1="120" x2="130" y2="640" stroke={GOLD_DIM} strokeWidth="1.4" />
                {/* roots */}
                <path
                  d="M130 640 C 96 672, 62 690, 24 700"
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth="1.2"
                />
                <path
                  d="M130 640 C 164 672, 198 690, 236 700"
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth="1.2"
                />
                <path
                  d="M130 640 C 128 684, 130 714, 130 752"
                  fill="none"
                  stroke={GOLD_FAINT}
                  strokeWidth="1.2"
                />
                {/* the nine, each on the branch it hangs from */}
                {L.realms.map((w, i) => {
                  const y = 140 + i * 60;
                  const left = i % 2 === 0;
                  const x = left ? 74 : 186;
                  const on = i === active;
                  return (
                    <g key={w.name}>
                      <path
                        d={`M130 ${y} C ${left ? 110 : 150} ${y}, ${left ? 94 : 166} ${y}, ${x} ${y}`}
                        fill="none"
                        stroke={on ? GOLD : GOLD_FAINT}
                        strokeWidth="1.2"
                        style={{ transition: 'stroke 0.6s ease' }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r={on ? 6 : 3.4}
                        fill={on ? GOLD : 'transparent'}
                        stroke={on ? GOLD : GOLD_DIM}
                        strokeWidth="1.2"
                        style={{
                          transition:
                            'r 0.6s cubic-bezier(0.16,1,0.3,1), fill 0.6s ease, stroke 0.6s ease',
                        }}
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="15"
                        fill="none"
                        stroke={GOLD}
                        strokeWidth="1"
                        opacity={on ? 0.4 : 0}
                        style={{ transition: 'opacity 0.6s ease' }}
                      />
                    </g>
                  );
                })}
                {/* the light travelling down the trunk */}
                <g
                  style={{
                    transform: `translateY(${active * 60}px)`,
                    transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <circle cx="130" cy="140" r="4.5" fill={GOLD} />
                  <circle
                    cx="130"
                    cy="140"
                    r="13"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="1"
                    opacity="0.45"
                  />
                </g>
              </Box>
            </Box>
            {/* The realm being looked at. */}
            <Box>
              <Box sx={{ ...carved, color: GOLD }}>{L.realmsEyebrow}</Box>
              {/* The phone copy carries the id; aria-labelledby resolves to it at any width. */}
              <Box
                component="h2"
                sx={{
                  m: 0,
                  mt: 2,
                  ...display,
                  fontSize: 'clamp(38px, 3.4vw, 56px)',
                  lineHeight: 1.02,
                }}
              >
                {L.realmsTitle}
              </Box>
              <Box sx={{ mt: 4.5, maxWidth: 520 }}>
                <Rule width={160} />
              </Box>
              {/* aria-live: the realm under the heading changes as the visitor descends. */}
              <Box aria-live="polite" sx={{ mt: 4.5, minHeight: 230 }}>
                <Box
                  key={realm.name}
                  component={motion.div}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Box sx={{ ...carved, fontSize: 12, color: GOLD }}>
                    {ROMAN[active]} · {String(active + 1).padStart(2, '0')} / 09
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      m: 0,
                      mt: 1.5,
                      ...display,
                      fontSize: 'clamp(32px, 2.8vw, 46px)',
                      lineHeight: 1.05,
                      ...foilText,
                    }}
                  >
                    {realm.name}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      m: 0,
                      mt: 2.5,
                      maxWidth: 480,
                      fontSize: 20,
                      lineHeight: 1.5,
                      color: 'var(--tone-soft)',
                    }}
                  >
                    {realm.line}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── III. The codex (the one bone-white chapter) ──────────────────────────────
function Codex() {
  const { language } = useLanguage();
  const es = language === 'es';
  const L = LORE[es ? 'es' : 'en'];
  return (
    <Box
      component="section"
      data-tone="heralds-bone"
      aria-labelledby="codex-title"
      sx={{
        position: 'relative',
        zIndex: 2,
        px: MARGIN,
        py: { xs: 12, md: 18 },
        borderRadius: { xs: '28px 28px 0 0', md: '40px 40px 0 0' },
        background: '#f2f0ea',
        color: '#121212',
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ ...carved, color: GOLD_INK }}>{L.codexEyebrow}</Box>
          <Box
            component="h2"
            id="codex-title"
            sx={{
              m: 0,
              mt: 2,
              ...display,
              fontSize: { xs: 40, md: 'clamp(52px, 5vw, 80px)' },
              lineHeight: 1,
            }}
          >
            {L.codexTitle}
          </Box>
          <Box
            component="p"
            sx={{
              m: 0,
              mt: 3,
              mx: 'auto',
              maxWidth: 620,
              fontSize: { xs: 18, md: 21 },
              lineHeight: 1.5,
              color: '#5d5a53',
            }}
          >
            {L.codexLine}
          </Box>
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            mt: { xs: 7, md: 10 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {L.collections.map((col, i) => (
            <Box
              key={col.name}
              component={motion.li}
              {...enter(i * 0.06, 24)}
              sx={{
                position: 'relative',
                p: { xs: 3.5, md: 5 },
                borderRadius: '24px',
                background: '#ffffff',
                border: '1px solid rgba(18,18,18,0.08)',
                transition:
                  'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.5s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: GOLD,
                  boxShadow: '0 24px 60px -30px rgba(18,18,18,0.35)',
                },
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                  '&:hover': { transform: 'none' },
                },
              }}
            >
              {/* The corner mark: a gold angle, like a page bracket in a catalogue. */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  width: 22,
                  height: 22,
                  borderTop: `1px solid ${GOLD}`,
                  borderRight: `1px solid ${GOLD}`,
                  borderTopRightRadius: '6px',
                }}
              />
              <Box sx={{ ...carved, fontSize: 11, color: GOLD_INK }}>{ROMAN[i]}</Box>
              <Box
                component="h3"
                sx={{ m: 0, mt: 1.5, ...display, fontSize: { xs: 28, md: 34 }, lineHeight: 1.05 }}
              >
                {col.name}
              </Box>
              <Box
                component="p"
                sx={{
                  m: 0,
                  mt: 1.5,
                  fontSize: { xs: 16.5, md: 18 },
                  lineHeight: 1.5,
                  color: '#5d5a53',
                }}
              >
                {col.line}
              </Box>
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  mt: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                {col.names.map((n) => (
                  <Box
                    key={n}
                    component="li"
                    sx={{
                      px: 1.75,
                      py: 0.75,
                      borderRadius: '999px',
                      border: '1px solid rgba(18,18,18,0.12)',
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: '#3a3833',
                    }}
                  >
                    {n}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── IV. The relic: the real site, framed, and what it holds ──────────────────
function Relic() {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const es = language === 'es';
  const L = LORE[es ? 'es' : 'en'];
  return (
    <Box
      component="section"
      data-tone="heralds-void"
      aria-labelledby="relic-title"
      sx={{ position: 'relative', px: MARGIN, py: { xs: 12, md: 18 }, overflow: 'hidden' }}
    >
      <NightSky motes={10} />
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1240, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ ...carved, color: GOLD }}>{L.relicEyebrow}</Box>
          <Box
            component="h2"
            id="relic-title"
            sx={{
              m: 0,
              mt: 2,
              ...display,
              fontSize: { xs: 40, md: 'clamp(52px, 5vw, 80px)' },
              lineHeight: 1,
            }}
          >
            {copy.product.featuresTitle}
          </Box>
        </Box>
        {/* The screenshot hung like a relic: a gold hairline, a gold breath behind it. */}
        <Box
          component={motion.div}
          {...enter(0.08, 36)}
          sx={{ position: 'relative', mt: { xs: 7, md: 10 } }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: '-12%',
              background:
                'radial-gradient(ellipse at center, rgba(216,184,100,0.16) 0%, transparent 65%)',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              p: { xs: '6px', md: '10px' },
              borderRadius: { xs: '16px', md: '22px' },
              border: `1px solid ${GOLD_DIM}`,
              background: 'rgba(216,184,100,0.04)',
            }}
          >
            <Image
              src="/images/products/heralds-dark.webp"
              alt={P.name}
              width={1800}
              height={1468}
              sizes="(max-width: 900px) 100vw, 1200px"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 12 }}
            />
          </Box>
        </Box>
        {/* The six things it holds, as a numbered codex. */}
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            mt: { xs: 8, md: 12 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
            columnGap: 5,
            rowGap: { xs: 4.5, md: 6 },
          }}
        >
          {P.features.map((f, i) => (
            <Box
              key={f.title}
              component={motion.li}
              {...enter(i * 0.05, 20)}
              sx={{ pt: 3, borderTop: `1px solid ${GOLD_FAINT}` }}
            >
              <Box sx={{ ...carved, fontSize: 11, color: GOLD }}>{ROMAN[i]}</Box>
              <Box
                component="h3"
                sx={{ m: 0, mt: 1.25, ...display, fontSize: { xs: 24, md: 27 }, lineHeight: 1.1 }}
              >
                {es ? f.titleEs : f.title}
              </Box>
              <Box
                component="p"
                sx={{ m: 0, mt: 1.25, fontSize: 17, lineHeight: 1.55, color: 'var(--tone-soft)' }}
              >
                {es ? f.descriptionEs : f.description}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          component={motion.div}
          {...enter(0.1, 16)}
          sx={{ mt: { xs: 8, md: 11 }, textAlign: 'center' }}
        >
          <Rule width={300} />
          <Box sx={{ mt: { xs: 5, md: 6 } }}>
            <GoldButton href={P.appUrl}>{es ? P.ctaLabel!.es : P.ctaLabel!.en}</GoldButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── The page ─────────────────────────────────────────────────────────────────
export default function HeraldsPage() {
  const { language } = useLanguage();
  const es = language === 'es';
  return (
    <TonePage initial="heralds-void">
      <Gate />
      <ScrollWords
        text={es ? P.descriptionEs : P.description}
        tone="heralds-void"
        size={{ xs: 30, sm: 42, md: 'clamp(42px, 4vw, 64px)' }}
      />
      <Yggdrasil />
      <Codex />
      <Relic />
      <Making id="heralds-of-chaos" />
      <NextWorld id="heralds-of-chaos" />
    </TonePage>
  );
}

// ─── The lore on the page (en/es) ─────────────────────────────────────────────
// Norse mythology, not invented product data: the nine realms and the figures the product's own
// description already names. Like the rest of /v2 this lives next to the prototype; it moves to
// utils/locales.ts if v2 is approved.
const LORE = {
  en: {
    eyebrow: 'A GYCODING world',
    realmsEyebrow: 'Yggdrasil',
    realmsTitle: 'Nine worlds hang from one tree',
    codexEyebrow: 'The collections',
    codexTitle: 'The codex',
    codexLine: 'Everything is catalogued: who they were, what they carried, where it happened.',
    relicEyebrow: 'The site',
    realms: [
      {
        name: 'Asgard',
        line: 'The stronghold of the Æsir, and Odin’s high seat above every world.',
      },
      {
        name: 'Midgard',
        line: 'The world of men, ringed by the ocean and by the serpent that bites its own tail.',
      },
      {
        name: 'Vanaheim',
        line: 'Home of the Vanir, the older gods of the earth, the harvest and the tide.',
      },
      { name: 'Alfheim', line: 'Country of the light elves, kept in an endless, unhurried dusk.' },
      {
        name: 'Jötunheim',
        line: 'The land of the giants, beyond the river that no god crosses lightly.',
      },
      {
        name: 'Svartálfaheim',
        line: 'The forges under the stone, where the dwarves made what the gods could not.',
      },
      {
        name: 'Niflheim',
        line: 'Mist, ice and the oldest cold — one of the two things that existed first.',
      },
      {
        name: 'Muspelheim',
        line: 'The fire that was there at the beginning, and that will burn on the last day.',
      },
      {
        name: 'Helheim',
        line: 'Where the dead who did not fall in battle are kept, under Hel’s hand.',
      },
    ],
    collections: [
      {
        name: 'Characters',
        line: 'Gods, warriors and legends of the Norse pantheon, with the stories that made them.',
        names: ['Odin', 'Thor', 'Loki', 'Freyja', 'Týr', 'Baldr'],
      },
      {
        name: 'Creatures',
        line: 'The beasts of the lore, from the wolf that waits for the end to the serpent that circles the world.',
        names: ['Fenrir', 'Jörmungandr', 'Sleipnir', 'Níðhöggr', 'Huginn & Muninn'],
      },
      {
        name: 'Items',
        line: 'The weapons and artefacts the myths turn on, and who carried each one.',
        names: ['Mjölnir', 'Gungnir', 'Brísingamen', 'Draupnir', 'Gleipnir'],
      },
      {
        name: 'Places',
        line: 'Halls, bridges and borders: the map the nine worlds are written on.',
        names: ['Valhalla', 'Bifröst', 'Ginnungagap', 'Fólkvangr'],
      },
    ],
  },
  es: {
    eyebrow: 'Un mundo de GYCODING',
    realmsEyebrow: 'Yggdrasil',
    realmsTitle: 'Nueve mundos cuelgan de un solo árbol',
    codexEyebrow: 'Las colecciones',
    codexTitle: 'El códice',
    codexLine: 'Todo está catalogado: quiénes fueron, qué llevaban y dónde ocurrió.',
    relicEyebrow: 'La web',
    realms: [
      {
        name: 'Asgard',
        line: 'La fortaleza de los Æsir y el trono de Odín, por encima de todos los mundos.',
      },
      {
        name: 'Midgard',
        line: 'El mundo de los hombres, rodeado por el océano y por la serpiente que se muerde la cola.',
      },
      {
        name: 'Vanaheim',
        line: 'Hogar de los Vanir, los dioses antiguos de la tierra, la cosecha y la marea.',
      },
      {
        name: 'Alfheim',
        line: 'El país de los elfos de luz, en un crepúsculo que no termina nunca.',
      },
      {
        name: 'Jötunheim',
        line: 'La tierra de los gigantes, al otro lado del río que ningún dios cruza a la ligera.',
      },
      {
        name: 'Svartálfaheim',
        line: 'Las forjas bajo la piedra, donde los enanos hicieron lo que los dioses no podían.',
      },
      {
        name: 'Niflheim',
        line: 'Niebla, hielo y el frío más antiguo: una de las dos cosas que existieron primero.',
      },
      {
        name: 'Muspelheim',
        line: 'El fuego que estaba allí al principio y que arderá el último día.',
      },
      {
        name: 'Helheim',
        line: 'Donde esperan los muertos que no cayeron en batalla, bajo la mano de Hel.',
      },
    ],
    collections: [
      {
        name: 'Personajes',
        line: 'Dioses, guerreros y leyendas del panteón nórdico, con las historias que los hicieron.',
        names: ['Odín', 'Thor', 'Loki', 'Freyja', 'Týr', 'Baldr'],
      },
      {
        name: 'Criaturas',
        line: 'Las bestias del mito, del lobo que espera el final a la serpiente que rodea el mundo.',
        names: ['Fenrir', 'Jörmungandr', 'Sleipnir', 'Níðhöggr', 'Hugin y Munin'],
      },
      {
        name: 'Items',
        line: 'Las armas y artefactos sobre los que giran los mitos, y quién llevaba cada uno.',
        names: ['Mjölnir', 'Gungnir', 'Brísingamen', 'Draupnir', 'Gleipnir'],
      },
      {
        name: 'Lugares',
        line: 'Salones, puentes y fronteras: el mapa sobre el que se escriben los nueve mundos.',
        names: ['Valhalla', 'Bifröst', 'Ginnungagap', 'Fólkvangr'],
      },
    ],
  },
} as const;
