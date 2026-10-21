'use client';

// Everything below the hero of the /v2 prototype ("exhibition" direction, see
// frontend/.claude/docs/home-v2.md): Apple-style full-screen tiles that alternate light and dark,
// a Stripe-style bento and closing band, editorial white space. The page's ground and ink ease to
// the tone of each screen as it reaches the middle of the viewport (HomeV2 sets the CSS variables).
//
// Motion: transform and opacity only, scroll-linked through framer-motion; CSS loops pause with
// prefers-reduced-motion. Valorant only for the GYCODING wordmark; every other heading is Lexend.

import { Box } from '@mui/material';
import { motion, MotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { PRODUCTS, ProductId } from '../../products/data/products';
import { BRAND_GRADIENT, CONTACT_EMAIL, Copy, DISCORD_URL } from './copy';
import {
  display,
  easeOut,
  enter,
  MARGIN,
  ScrollWords,
  SOFT,
  ToneContext,
  TextLink,
  ToolChip,
  useMotionPause,
  visuallyHidden,
} from './kit';
import { Shot } from './media';


// ─── Statement: the light sheet slides over the hero and one sentence lights up ───
export function Statement({ copy }: { copy: Copy }) {
  return <ScrollWords text={copy.statement} sub={copy.statementSub} tone="mist" sheet />;
}

// ─── Worlds: one full-screen tile per product, centred, its picture growing in ───
function WorldTile({ id, copy, lang }: { id: ProductId; copy: Copy; lang: string }) {
  const p = PRODUCTS[id];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The picture rises and grows to full size as the tile reaches the middle, then drifts on.
  const scale = useTransform(scrollYProgress, [0.1, 0.5], reduce ? [1, 1] : [0.82, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.5, 1], reduce ? [0, 0, 0] : [120, 0, -60]);
  const imgOpacity = useTransform(scrollYProgress, [0.08, 0.3], reduce ? [1, 1] : [0, 1]);
  // Heralds of Chaos looks best as its dark site on the parchment tile; GY Accounts is drawn dark.
  const showDark = id !== 'wingwords';

  return (
    <Box
      component="article"
      id={`world-${id}`}
      data-tone={id}
      aria-labelledby={`world-${id}-title`}
      ref={ref}
      sx={{
        minHeight: '100svh',
        px: MARGIN,
        pt: { xs: 12, md: 16 },
        pb: { xs: 10, md: 14 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <Box component={motion.div} {...enter()}>
        <Image src={p.logo} alt="" width={56} height={56} style={{ objectFit: 'contain' }} />
      </Box>
      <Box
        component={motion.h3}
        {...enter(0.06)}
        id={`world-${id}-title`}
        sx={{ m: 0, mt: 2.5, ...display, fontSize: { xs: 48, md: 'clamp(56px, 6vw, 104px)' }, lineHeight: 1 }}
      >
        {p.name}
      </Box>
      <Box
        component={motion.p}
        {...enter(0.12)}
        sx={{ m: 0, mt: 2, maxWidth: 640, fontSize: { xs: 20, md: 28 }, lineHeight: 1.3, color: SOFT }}
      >
        {lang === 'es' ? p.taglineEs : p.tagline}
      </Box>
      <Box component={motion.div} {...enter(0.18)} sx={{ mt: 4 }}>
        <TextLink href={`/products/${id}/`}>{copy.worldsDiscover(p.name)}</TextLink>
      </Box>

      <Box
        component={motion.div}
        style={{ scale, y, opacity: imgOpacity }}
        sx={{ mt: { xs: 7, md: 9 }, width: '100%', maxWidth: 1180 }}
      >
        <Box sx={{ filter: 'drop-shadow(3px 5px 30px rgba(0,0,0,0.22))' }}>
          <Shot id={id} isDark={showDark} name={p.name} sizes="(max-width: 900px) 100vw, 1180px" />
        </Box>
      </Box>
    </Box>
  );
}

// Desktop with motion: a pinned horizontal reel. The section is as tall as the reel is wide; while
// it is pinned, vertical scroll slides the three worlds sideways like scenes of a showreel.
function useWideMotion() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return wide && !reduce;
}

function ReelScene({
  id,
  index,
  count,
  progress,
  copy,
  lang,
}: {
  id: ProductId;
  index: number;
  count: number;
  progress: MotionValue<number>;
  copy: Copy;
  lang: string;
}) {
  const p = PRODUCTS[id];
  const at = index / (count - 1);
  const span = 1 / (count - 1);
  // Each layer travels at its own speed through the scene: the picture slower than the frame
  // (it lags in from the right and leaves late), the words faster and fading at the edges.
  const imgX = useTransform(progress, [at - span, at, at + span], ['38vw', '0vw', '-22vw']);
  const imgScale = useTransform(progress, [at - span, at, at + span], [0.8, 1, 0.9]);
  const imgRotate = useTransform(progress, [at - span, at, at + span], [6, 0, -4]);
  const textX = useTransform(progress, [at - span, at, at + span], ['-10vw', '0vw', '-6vw']);
  const textO = useTransform(progress, [at - span * 0.6, at, at + span * 0.6], [0, 1, 0]);
  const nameY = useTransform(progress, [at - span * 0.7, at], ['135%', '0%']);
  return (
    <Box
      component="article"
      id={`world-${id}`}
      aria-labelledby={`world-${id}-title`}
      sx={{
        position: 'relative',
        flex: '0 0 100vw',
        height: '100svh',
        px: MARGIN,
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        columnGap: 4,
        alignItems: 'center',
      }}
    >
      <Box component={motion.div} style={{ x: textX, opacity: textO }} sx={{ gridColumn: '1 / span 4', position: 'relative', zIndex: 1 }}>
        <Image src={p.logo} alt="" width={56} height={56} style={{ objectFit: 'contain' }} />
        {/* The name rises out of a mask, like a title card. The mask only clips top and bottom, and
            leaves room under the baseline so descenders (the g of Wingwords) are never cut. */}
        <Box sx={{ clipPath: 'inset(-0.1em -100vw 0 -100vw)', mt: 2.5, pb: '0.24em', mb: '-0.16em', fontSize: 'clamp(52px, 4.9vw, 92px)' }}>
          <Box
            component={motion.h3}
            style={{ y: nameY }}
            id={`world-${id}-title`}
            sx={{ m: 0, ...display, fontSize: '1em', lineHeight: 0.98 }}
          >
            {p.name}
          </Box>
        </Box>
        <Box component="p" sx={{ m: 0, mt: 2.5, maxWidth: 400, fontSize: 24, lineHeight: 1.35, color: SOFT }}>
          {lang === 'es' ? p.taglineEs : p.tagline}
        </Box>
        <Box sx={{ mt: 4.5 }}>
          <TextLink href={`/products/${id}/`}>{copy.worldsDiscover(p.name)}</TextLink>
        </Box>
      </Box>
      <Box
        component={motion.div}
        style={{ x: imgX, scale: imgScale, rotate: imgRotate }}
        sx={{ gridColumn: '5 / span 8', display: 'flex', justifyContent: 'center' }}
      >

        {/* Pictures are capped by height too (≈ 68% of the screen) so tall ones never touch the edges.
            The picture is a second way into the world's page (hidden from the tab order: the
            "Discover" link is the keyboard way in). */}
        <Box
          component={Link}
          href={`/products/${id}/`}
          tabIndex={-1}
          aria-hidden
          sx={{
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': { transform: 'scale(1.02)' },
            width: `min(100%, ${(68 * (id === 'wingwords' ? 1800 / 1494 : id === 'gy-accounts' ? 1800 / 1022 : 1800 / 1468)).toFixed(1)}svh)`,
            filter: 'drop-shadow(3px 5px 30px rgba(0,0,0,0.22))',
          }}
        >
          <Shot id={id} isDark={id !== 'wingwords'} name={p.name} sizes="62vw" />
        </Box>
      </Box>
    </Box>
  );
}

function Reel({ ids, copy, lang }: { ids: ProductId[]; copy: Copy; lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const setTone = useContext(ToneContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = ids.length;
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(n - 1) * 100}vw`]);
  const bar = useTransform(scrollYProgress, [0, 1], [1 / n, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    if (i !== active) setActive(i);
  });
  // Tell the page which world is on screen while the reel is pinned.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setTone(ids[active]), {
      rootMargin: '-50% 0px -50% 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, [active, ids, setTone]);

  return (
    <Box ref={ref} id="worlds-reel" data-count={n} sx={{ height: `${n * 100 + 40}svh` }}>
      <Box sx={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden' }}>
        <Box component={motion.div} style={{ x }} sx={{ display: 'flex', width: `${n * 100}vw`, willChange: 'transform' }}>
          {ids.map((id, i) => (
            <ReelScene key={id} id={id} index={i} count={n} progress={scrollYProgress} copy={copy} lang={lang} />
          ))}
        </Box>
        {/* Scene index: the three names, the current one in full ink, and the reel's progress. */}
        <Box sx={{ position: 'absolute', left: 32, right: 32, bottom: 28, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {ids.map((id, i) => (
              <Box key={id} sx={{ fontSize: 15, fontWeight: 600, color: i === active ? 'inherit' : SOFT, transition: 'color 0.4s ease' }}>
                {PRODUCTS[id].name}
              </Box>
            ))}
          </Box>
          <Box sx={{ flex: 1, height: 3, borderRadius: 2, background: 'color-mix(in srgb, currentColor 14%, transparent)', overflow: 'hidden' }}>
            <Box component={motion.div} style={{ scaleX: bar }} sx={{ height: '100%', background: 'currentColor', transformOrigin: 'left' }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function Worlds({ copy, lang }: { copy: Copy; lang: string }) {
  const ids: ProductId[] = ['wingwords', 'gy-accounts', 'heralds-of-chaos'];
  const reel = useWideMotion();
  return (
    <Box id="worlds" component="section" aria-labelledby="worlds-title">
      <Box component="h2" id="worlds-title" sx={visuallyHidden}>
        {copy.worldsHeading}
      </Box>
      {reel ? (
        <Reel ids={ids} copy={copy} lang={lang} />
      ) : (
        ids.map((id) => <WorldTile key={id} id={id} copy={copy} lang={lang} />)
      )}
    </Box>
  );
}

// ─── What we build: a bento of four live tiles ────────────────────────────────

// Starts a CSS-free interval only while the element is on screen and motion is allowed.
function useCycle(length: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const { paused } = useMotionPause();
  const [i, setI] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !timer) timer = setInterval(() => setI((v) => (v + 1) % length), ms);
      if (!e.isIntersecting && timer) {
        clearInterval(timer);
        timer = undefined;
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [length, ms, paused]);
  return { ref, i };
}

function Tile({
  title,
  line,
  dark = false,
  area,
  delay = 0,
  href,
  children,
}: {
  title: string;
  line: string;
  dark?: boolean;
  area: string;
  delay?: number;
  // When set, the whole tile is a door to that page.
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      component={motion.li}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
      sx={{
        gridArea: { md: area },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        ...(href ? { '&:hover': { transform: 'translateY(-4px)' }, '&:hover .chev': { transform: 'translateX(4px)' } } : {}),
        background: dark ? '#0b0906' : '#f5f5f7',
        color: dark ? '#f5f0e1' : '#1d1d1f',
        minHeight: { xs: 400, md: 440 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {href && (
        <Box
          component={Link}
          href={href}
          aria-label={title}
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            borderRadius: '24px',
            '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: -4 },
          }}
        />
      )}
      <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 4 } }}>
        <Box component="h3" sx={{ m: 0, ...display, fontSize: { xs: 28, md: 34 }, lineHeight: 1.1 }}>
          {title}
          {href && (
            <Box component="span" className="chev" aria-hidden sx={{ display: 'inline-block', ml: '0.3em', transition: 'transform 0.25s ease' }}>
              ›
            </Box>
          )}
        </Box>
        <Box component="p" sx={{ m: 0, mt: 1, fontSize: 17, lineHeight: 1.47, color: dark ? '#c9bf9f' : '#6e6e73', maxWidth: 420 }}>
          {line}
        </Box>
      </Box>
      <Box sx={{ position: 'relative', flex: 1, minHeight: 0 }}>{children}</Box>
    </Box>
  );
}

// Web: our real products, one after another.
function ProductCycle() {
  const shots = [
    { src: '/images/products/wingwords-2.webp', w: 1800, h: 805, alt: 'Wingwords' },
    { src: '/images/products/heralds-dark.webp', w: 1800, h: 1468, alt: 'Heralds of Chaos' },
    { src: '/images/products/wingwords.webp', w: 1800, h: 1494, alt: 'Wingwords' },
  ];
  const { ref, i } = useCycle(shots.length, 3200);
  return (
    <Box ref={ref} sx={{ position: 'absolute', inset: 0, px: { xs: 2, md: 4 }, pb: { xs: 2, md: 3 } }}>
      {shots.map((s, k) => (
        <Box
          key={s.src}
          sx={{
            position: 'absolute',
            inset: { xs: '0 16px 16px', md: '0 32px 24px' },
            opacity: k === i ? 1 : 0,
            transform: k === i ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
            transition: 'opacity 0.9s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Image src={s.src} alt={k === 0 ? s.alt : ''} fill sizes="(max-width: 900px) 100vw, 760px" style={{ objectFit: 'contain', objectPosition: 'center bottom' }} />
        </Box>
      ))}
    </Box>
  );
}

// Backend / identity: one GY account at the centre, the three worlds orbiting it.
function IdentityOrbit() {
  const logos = [PRODUCTS.wingwords.logo, PRODUCTS['heralds-of-chaos'].logo, PRODUCTS['gy-accounts'].logo];
  const R = 112;
  return (
    <Box
      aria-hidden
      sx={{
        // Phones: a band at the bottom of the card, so the ring never runs under the card's edge.
        position: 'absolute',
        left: 0,
        right: 0,
        top: { xs: 'auto', md: 0 },
        bottom: 0,
        height: { xs: 230, md: 'auto' },
        inset: { md: 0 },
        // flex, not grid: an overflowing child stays centred on both sides (grid pushes it to the top).
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@keyframes gy-orbit': { to: { transform: 'rotate(360deg)' } },
        '@keyframes gy-counter': { to: { transform: 'rotate(-360deg)' } },
        '@keyframes gy-pulse': {
          '0%': { transform: 'scale(0.6)', opacity: 0.5 },
          '100%': { transform: 'scale(1.9)', opacity: 0 },
        },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <Box sx={{ position: 'relative', width: R * 2 + 64, height: R * 2 + 64, transform: { xs: 'scale(0.72)', md: 'none' } }}>
        {/* the orbit path */}
        <Box sx={{ position: 'absolute', inset: 32, borderRadius: '50%', border: '1.5px dashed rgba(29,29,31,0.18)' }} />
        {/* signal leaving the centre */}
        {[0, 1].map((k) => (
          <Box
            key={k}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 120,
              height: 120,
              ml: '-60px',
              mt: '-60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(140,84,255,0.35) 0%, rgba(140,84,255,0) 70%)',
              animation: `gy-pulse 3.2s ease-out ${k * 1.6}s infinite`,
            }}
          />
        ))}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 76,
            height: 76,
            ml: '-38px',
            mt: '-38px',
            borderRadius: '22px',
            background: '#ffffff',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '3px 5px 30px rgba(0,0,0,0.12)',
          }}
        >
          <Image src="/gy-logo.png" alt="" width={44} height={44} />
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, animation: 'gy-orbit 24s linear infinite' }}>
          {logos.map((src, k) => {
            const a = (k / logos.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <Box
                key={src}
                sx={{
                  position: 'absolute',
                  left: `calc(50% + ${Math.cos(a) * R}px - 26px)`,
                  top: `calc(50% + ${Math.sin(a) * R}px - 26px)`,
                  width: 52,
                  height: 52,
                  borderRadius: '16px',
                  background: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  animation: 'gy-counter 24s linear infinite',
                }}
              >
                <Image src={src} alt="" width={32} height={32} style={{ objectFit: 'contain' }} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

// Games: the Heralds of Chaos tree, lit like a relic.
function Relic() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        '@keyframes gy-breathe': {
          from: { transform: 'scale(0.94)', opacity: 0.6 },
          to: { transform: 'scale(1.04)', opacity: 1 },
        },
        '@keyframes gy-float': { from: { transform: 'translateY(6px)' }, to: { transform: 'translateY(-8px)' } },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          // Sized to the tile so the halo fades out well inside its edges (never clipped).
          width: 'min(240px, 70%)',
          aspectRatio: '1',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.16) 0%, rgba(212,175,55,0.05) 45%, rgba(212,175,55,0) 70%)',
          animation: 'gy-breathe 4.5s ease-in-out infinite alternate',
        }}
      />
      <Box sx={{ position: 'relative', width: 150, height: 150, animation: 'gy-float 5s ease-in-out infinite alternate' }}>
        <Image src={PRODUCTS['heralds-of-chaos'].logo} alt="" fill sizes="150px" style={{ objectFit: 'contain' }} />
      </Box>
    </Box>
  );
}

// Tools: the real logos of what we use, in two rows moving opposite ways.
const TOOLS: [string, string][] = [
  ['Next.js', 'nextjs'],
  ['React', 'react'],
  ['TypeScript', 'typescript'],
  ['Java', 'java'],
  ['Spring Boot', 'springboot'],
  ['MongoDB', 'mongodb'],
  ['Unity', 'unity'],
  ['C#', 'csharp'],
  ['Blender', 'blender'],
  ['Figma', 'figma'],
  ['Cloudflare', 'cloudflare'],
  ['Vercel', 'vercel'],
  ['Git', 'git'],
  ['GitHub', 'github'],
];

function ToolRows() {
  const row = (items: [string, string][], reverse: boolean) => (
    <Box sx={{ overflow: 'hidden', py: 1 }}>
      <Box
        className="row"
        sx={{
          display: 'inline-flex',
          gap: 1.5,
          pr: 1.5,
          whiteSpace: 'nowrap',
          animation: `gy-tools 40s linear infinite ${reverse ? 'reverse' : ''}`,
          willChange: 'transform',
        }}
      >
        {[...items, ...items].map(([name], k) => (
          <ToolChip key={k} name={name} />
        ))}
      </Box>
    </Box>
  );
  const half = Math.ceil(TOOLS.length / 2);
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 1,
        '@keyframes gy-tools': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        '&:hover .row': { animationPlayState: 'paused' },
        '@media (prefers-reduced-motion: reduce)': { '& .row': { animation: 'none' } },
      }}
    >
      {row(TOOLS.slice(0, half), false)}
      {row(TOOLS.slice(half), true)}
    </Box>
  );
}

export function Build({ copy }: { copy: Copy }) {
  const [web, backend, games] = copy.build;
  return (
    <Box
      id="build"
      component="section"
      data-tone="paper"
      aria-labelledby="build-title"
      sx={{ px: MARGIN, py: { xs: 14, md: 20 } }}
    >
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 } }}>
        <Box component={motion.h2} {...enter()} id="build-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1 }}>
          {copy.buildHeading}
        </Box>
        <Box component={motion.p} {...enter(0.08)} sx={{ m: 0, mt: 2, fontSize: { xs: 20, md: 28 }, color: SOFT }}>
          {copy.buildLead}
        </Box>
      </Box>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          maxWidth: 1240,
          mx: 'auto',
          display: 'grid',
          gap: { xs: 2, md: 2.5 },
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gridTemplateAreas: { md: '"web web backend" "games tools tools"' },
        }}
      >
        <Tile area="web" title={web.group} line={web.summary}>
          <ProductCycle />
        </Tile>
        <Tile area="backend" title={backend.group} line={backend.summary} delay={0.08} href="/products/gy-accounts/">
          <IdentityOrbit />
        </Tile>
        <Tile area="games" title={games.group} line={games.summary} dark delay={0.12} href="/products/heralds-of-chaos/">
          <Relic />
        </Tile>
        <Tile area="tools" title={copy.toolsTitle} line={copy.toolsLine} delay={0.16}>
          <ToolRows />
        </Tile>
      </Box>
    </Box>
  );
}

// ─── Team: two doors, one per founder (each opens their page) ─────────────────
export function FounderDoors({ copy }: { copy: Copy }) {
  return (
    <Box
      component="ul"
        sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 7, md: 9 }, width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 2, md: 3 } }}
      >
        {copy.founders.map((f, i) => (
          <Box
            key={f.slug}
            component={motion.li}
            initial={{ opacity: 0, y: 50, rotate: i ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: easeOut }}
          >
            <Box
              component={Link}
              href={`/team/${f.slug}/`}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '32px',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
                textDecoration: 'none',
                p: { xs: 4, md: 5 },
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
                '&:hover': { transform: 'translateY(-6px)', background: 'rgba(255,255,255,0.09)' },
                '&:hover .chev': { transform: 'translateX(4px)' },
                '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 4 },
              }}
            >
              <Box
                className="bob"
                sx={{
                  position: 'relative',
                  width: { xs: 150, md: 190 },
                  aspectRatio: '1',
                  animation: `gy-bob ${4 + i}s ease-in-out ${i * 0.8}s infinite alternate`,
                }}
              >
                <Image src={f.image} alt="" fill sizes="190px" style={{ objectFit: 'contain' }} />
              </Box>
              <Box component="h3" sx={{ m: 0, mt: 3, ...display, fontSize: { xs: 30, md: 36 }, lineHeight: 1.05 }}>
                {f.name}
              </Box>
              <Box component="p" sx={{ m: 0, mt: 1, fontSize: 17, color: SOFT }}>
                {f.role}
              </Box>
              <Box component="span" sx={{ mt: 2.5, fontSize: 17, fontWeight: 600 }}>
                {copy.team.view}{' '}
                <Box component="span" className="chev" sx={{ display: 'inline-block', transition: 'transform 0.2s ease' }}>
                  ›
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
  );
}

export function Story({ copy }: { copy: Copy }) {
  return (
    <Box
      id="story"
      component="section"
      data-tone="night"
      aria-labelledby="story-title"
      sx={{
        minHeight: '100svh',
        px: MARGIN,
        py: { xs: 14, md: 16 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        '@keyframes gy-bob': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-10px)' } },
        '@media (prefers-reduced-motion: reduce)': { '& .bob': { animation: 'none' } },
      }}
    >
      <Box component={motion.h2} {...enter()} id="story-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1 }}>
        {copy.storyHeading}
      </Box>
      <Box component={motion.p} {...enter(0.08)} sx={{ m: 0, mt: 3, maxWidth: 640, fontSize: { xs: 19, md: 24 }, lineHeight: 1.45, color: SOFT }}>
        {copy.storyLine}
      </Box>
      <FounderDoors copy={copy} />
    </Box>
  );
}

// ─── CTA: white, under a band of the brand gradient in slow motion (Stripe-like) ───
export function InvertedCta({ copy }: { copy: Copy }) {
  const blobs = [
    { c: '#6366f1', l: '-10%', t: '-30%', d: 0 },
    { c: '#ec4899', l: '30%', t: '-10%', d: -6 },
    { c: '#8c54ff', l: '60%', t: '-40%', d: -12 },
    { c: '#66d9ff', l: '80%', t: '0%', d: -3 },
  ];
  return (
    <Box
      id="community"
      component="section"
      data-tone="paper"
      aria-labelledby="cta-title"
      sx={{ position: 'relative', overflow: 'hidden', pb: { xs: 10, md: 16 } }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'relative',
          height: { xs: 220, md: 340 },
          overflow: 'hidden',
          transform: 'skewY(-6deg)',
          transformOrigin: 'top left',
          mt: { xs: -4, md: -8 },
          background: '#6366f1',
          '@keyframes gy-mesh': {
            from: { transform: 'translate(0, 0) scale(1)' },
            to: { transform: 'translate(10%, 18%) scale(1.25)' },
          },
          '@media (prefers-reduced-motion: reduce)': { '& > *': { animation: 'none !important' } },
        }}
      >
        {blobs.map((b) => (
          <Box
            key={b.c}
            sx={{
              position: 'absolute',
              left: b.l,
              top: b.t,
              width: '60%',
              aspectRatio: '1',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${b.c} 0%, ${b.c}00 62%)`,
              animation: `gy-mesh 14s ease-in-out ${b.d}s infinite alternate`,
              willChange: 'transform',
            }}
          />
        ))}
      </Box>
      <Box sx={{ px: MARGIN, mt: { xs: 6, md: 8 }, textAlign: 'center' }}>
        <Box component={motion.h2} {...enter()} id="cta-title" sx={{ m: 0, ...display, fontSize: { xs: '10vw', md: 'clamp(56px, 6.4vw, 112px)' }, lineHeight: 1 }}>
          {copy.ctaHeadline[0]}
          <br />
          {copy.ctaHeadline[1]}
        </Box>
        <Box component={motion.p} {...enter(0.08)} sx={{ m: 0, mt: 3, mx: 'auto', maxWidth: 560, fontSize: { xs: 18, md: 22 }, lineHeight: 1.45, color: SOFT }}>
          {copy.ctaSentence}
        </Box>
        <Box component={motion.div} {...enter(0.14)} sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', columnGap: 3.5, rowGap: 2 }}>
          <Box
            component="a"
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 56,
              px: 4,
              borderRadius: '14px',
              fontWeight: 600,
              fontSize: 17,
              color: '#fff',
              textDecoration: 'none',
              background: BRAND_GRADIENT,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' },
              '&:active': { transform: 'scale(0.95)' },
              '&:focus-visible': { outline: '2px solid #1d1d1f', outlineOffset: 3 },
            }}
          >
            {copy.ctaButton}
          </Box>
          <Box
            component="a"
            href={`mailto:${CONTACT_EMAIL}`}
            sx={{
              fontSize: 17,
              fontWeight: 600,
              color: 'inherit',
              textDecoration: 'none',
              '& span': { display: 'inline-block', transition: 'transform 0.2s ease' },
              '&:hover span': { transform: 'translateX(4px)' },
              '&:hover': { textDecoration: 'underline', textUnderlineOffset: '5px' },
            }}
          >
            {copy.ctaWrite} <span>›</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

