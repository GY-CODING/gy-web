'use client';

// Product page of the /v2 prototype (/products/<id>/), in the same "exhibition" language as
// the home: chapters alternate the product's dark and light tones; the page's ground and ink ease
// between them. Content comes from products/data/products.ts (features, profile, stack).
//
// Signature scene: "the camera reads the product" — while the six features scroll past on the
// left, the product's picture on the right stays pinned and pans/zooms to a different area for
// each one (transform only). Phones get the features as a plain sequence with the picture above.

import { Box } from '@mui/material';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PRODUCT_ORDER, PRODUCTS, ProductId } from '../../products/data/products';
import { useLanguage } from '../../utils/languageContext';
import { getCopy, PRODUCT_REPOS, PRODUCT_TONES, TONES, WORLD_BANDS } from './copy';
import { ActionButton, display, easeOut, enter, MARGIN, ScrollWords, SOFT, TextLink, TonePage, ToolChip } from './kit';
import { Shot } from './media';
import AccountsDemo from './AccountsDemo';

const picture = (id: ProductId, sizes?: string) => (
  <Shot id={id} isDark={id === 'heralds-of-chaos'} name={PRODUCTS[id].name} sizes={sizes} />
);

// ─── Hero: the name, one line, the actions, and the product rising into place ───
function ProductHero({ id }: { id: ProductId }) {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const p = PRODUCTS[id];
  const band = WORLD_BANDS[id];
  const [dark] = PRODUCT_TONES[id];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.6], reduce ? [1, 1] : [0.9, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  return (
    <Box
      ref={ref}
      component="section"
      data-tone={dark}
      sx={{ minHeight: '100svh', px: MARGIN, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, textAlign: 'center', overflow: 'hidden' }}
    >
      <Box component={motion.div} {...enter(0, 16)}>
        <Image src={p.logo} alt="" width={72} height={72} style={{ objectFit: 'contain' }} priority />
      </Box>
      <Box
        component={motion.h1}
        initial={{ opacity: 0, y: 40, filter: 'none' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.05 }}
        sx={{ m: 0, mt: 3, ...display, fontSize: { xs: 56, md: 'clamp(72px, 9vw, 168px)' }, lineHeight: 0.95 }}
      >
        {p.name}
      </Box>
      <Box
        component={motion.p}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
        sx={{ m: 0, mt: 3, mx: 'auto', maxWidth: 720, fontSize: { xs: 22, md: 30 }, lineHeight: 1.3, color: SOFT }}
      >
        {language === 'es' ? p.taglineEs : p.tagline}
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.25 }}
        sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', columnGap: 3.5, rowGap: 2 }}
      >
        <ActionButton href={p.appUrl} bg={band.action} fg={band.actionInk}>
          {copy.worldsOpen(p.name)} ↗
        </ActionButton>
        <TextLink href={PRODUCT_REPOS[id]} external>
          {copy.product.codeLink}
        </TextLink>
      </Box>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: easeOut, delay: 0.35 }}
        sx={{ mt: { xs: 8, md: 10 }, mx: 'auto', width: '100%', maxWidth: 1180 }}
      >
        <Box component={motion.div} style={{ scale, y }} sx={{ filter: 'drop-shadow(3px 5px 30px rgba(0,0,0,0.3))' }}>
          {picture(id, '(max-width: 900px) 100vw, 1180px')}
        </Box>
      </Box>
    </Box>
  );
}

// ─── Features: the camera reads the product ───────────────────────────────────
// Products with one real capture per feature show it (crossfading); the rest zoom into one.
const FEATURE_SHOTS: Partial<Record<ProductId, string[]>> = {
  wingwords: ['profile', 'book-searched', 'hall-of-fame', 'friends', 'editions', 'feed'].map(
    (n) => `/images/products/wingwords/${n}.webp`,
  ),
};
// Where the camera looks for each feature: scale and pan (percent of the frame).
const SHOTS = [
  { s: 1, x: 0, y: 0 },
  { s: 1.7, x: 22, y: 14 },
  { s: 1.9, x: -18, y: 16 },
  { s: 1.6, x: 14, y: -12 },
  { s: 1.8, x: -20, y: -14 },
  { s: 1.25, x: 0, y: 4 },
];

function Features({ id }: { id: ProductId }) {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const p = PRODUCTS[id];
  const [dark] = PRODUCT_TONES[id];
  const es = language === 'es';
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      // A band just below the middle: on phones the pinned picture covers the top of the screen.
      { rootMargin: '-60% 0px -32% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const shot = SHOTS[active % SHOTS.length];
  const panel = TONES[dark as keyof typeof TONES];

  return (
    <Box component="section" data-tone={dark} aria-labelledby="features-title" sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}>
      <Box component={motion.h2} {...enter()} id="features-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1, textAlign: { md: 'center' } }}>
        {copy.product.featuresTitle}
      </Box>
      <Box
        sx={{
          mt: { xs: 6, md: 10 },
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(12, minmax(0, 1fr))' },
          columnGap: 4,
          maxWidth: 1400,
          mx: 'auto',
        }}
      >
        {/* The pinned picture (desktop); above the list on phones. */}
        {/* Pinned on every width: on phones it sits under the bar while the features pass below. */}
        <Box
          sx={{
            gridColumn: { md: '6 / span 7' },
            gridRow: { md: 1 },
            position: 'sticky',
            top: { xs: 56, md: '12svh' },
            zIndex: 1,
            alignSelf: 'start',
            mb: { xs: 2, md: 0 },
            background: { xs: 'var(--tone-bg)', md: 'transparent' },
            transition: 'background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: id === 'heralds-of-chaos' ? { xs: '38svh', md: '76svh' } : 'auto',
              borderRadius: '24px',
              overflow: 'hidden',
              background: `color-mix(in srgb, ${panel.ink} 6%, transparent)`,
              display: 'grid',
              placeItems: 'center',
              p: id === 'heralds-of-chaos' ? { xs: 2, md: 5 } : { xs: 1, md: 2 },
            }}
          >
            {id === 'gy-accounts' ? (
              // GY Accounts plays a working replica of its dashboard, one action per feature.
              <Box sx={{ width: '100%' }}>
                <AccountsDemo step={active} />
              </Box>
            ) : FEATURE_SHOTS[id] ? (
              // One real capture per feature, crossfading (with a slight settle) as features change.
              <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1800 / 1022', borderRadius: { xs: '10px', md: '16px' }, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' }}>
                {FEATURE_SHOTS[id]!.map((src, k) => (
                  <Box
                    key={src}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      opacity: k === active ? 1 : 0,
                      transform: k === active ? 'scale(1)' : 'scale(1.04)',
                      transition: 'opacity 0.7s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
                    }}
                  >
                    <Image src={src} alt={k === active ? (es ? p.features[k]?.titleEs : p.features[k]?.title) ?? '' : ''} fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  </Box>
                ))}
              </Box>
            ) : (
            <Box
              sx={{
                width: '100%',
                transform: `translate(${shot.x}%, ${shot.y}%) scale(${shot.s})`,
                transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
                '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
              }}
            >
              {picture(id, '(max-width: 900px) 100vw, 60vw')}
            </Box>
            )}
          </Box>
        </Box>
        <Box component="ol" sx={{ gridColumn: { md: '1 / span 5' }, gridRow: { md: 1 }, listStyle: 'none', m: 0, p: 0 }}>
          {p.features.map((f, i) => (
            <Box
              key={f.title}
              component="li"
              ref={(el: HTMLElement | null) => {
                items.current[i] = el;
              }}
              data-i={i}
              sx={{
                minHeight: { xs: '52svh', md: '62svh' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: { xs: 3, md: 0 },
              }}
            >
              {/* Only the large title dims when inactive (it stays above 3:1); the text keeps full contrast. */}
              <Box
                component="h3"
                sx={{
                  m: 0,
                  ...display,
                  fontSize: { xs: 30, md: 44 },
                  lineHeight: 1.05,
                  opacity: { md: active === i ? 1 : 0.5 },
                  transition: 'opacity 0.5s ease',
                }}
              >
                {es ? f.titleEs : f.title}
              </Box>
              <Box component="p" sx={{ m: 0, mt: 2, maxWidth: 460, fontSize: { xs: 18, md: 21 }, lineHeight: 1.47, color: SOFT }}>
                {es ? f.descriptionEs : f.description}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── Profile (Wingwords): the second screenshot, wide, and what you can do with it ───
function Profile({ id }: { id: ProductId }) {
  const { language } = useLanguage();
  const p = PRODUCTS[id];
  const [, light] = PRODUCT_TONES[id];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1]);
  const ps = p.profileSection;
  if (!ps) return null;
  const es = language === 'es';
  return (
    <Box ref={ref} component="section" data-tone={light} aria-labelledby="profile-title" sx={{ px: MARGIN, py: { xs: 12, md: 18 }, textAlign: 'center' }}>
      <Box component={motion.h2} {...enter()} id="profile-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1 }}>
        {es ? ps.titleEs : ps.title}
      </Box>
      <Box component={motion.p} {...enter(0.08)} sx={{ m: 0, mt: 3, mx: 'auto', maxWidth: 680, fontSize: { xs: 20, md: 26 }, lineHeight: 1.35, color: SOFT }}>
        {es ? ps.descriptionEs : ps.description}
      </Box>
      {/* Two real captures of the profile, overlapping: stats in front of the activity history. */}
      <Box component={motion.div} style={{ scale }} sx={{ position: 'relative', mt: { xs: 7, md: 10 }, mx: 'auto', maxWidth: 1240, pb: { xs: '18%', md: '14%' } }}>
        <Box sx={{ width: '78%', borderRadius: { xs: '10px', md: '16px' }, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.25)' }}>
          <Image src="/images/products/wingwords/activities.webp" alt="" width={1800} height={1022} sizes="(max-width: 900px) 80vw, 960px" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Box>
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 60, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.2 }}
          sx={{ position: 'absolute', right: 0, bottom: 0, width: '62%', borderRadius: { xs: '10px', md: '16px' }, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.35)' }}
        >
          <Image src="/images/products/wingwords/stats.webp" alt={es ? ps.titleEs : ps.title} width={1800} height={1024} sizes="(max-width: 900px) 64vw, 770px" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </Box>
      </Box>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          mt: { xs: 7, md: 10 },
          mx: 'auto',
          maxWidth: 1100,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          columnGap: 5,
          rowGap: 4,
          textAlign: 'left',
        }}
      >
        {ps.highlights.map((h, i) => (
          <Box key={h.text} component={motion.li} {...enter(i * 0.05, 20)} sx={{ fontSize: { xs: 18, md: 20 }, lineHeight: 1.4, fontWeight: 600 }}>
            {es ? h.textEs : h.text}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── Built with + the public code ─────────────────────────────────────────────
export function Making({ id }: { id: ProductId }) {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const p = PRODUCTS[id];
  return (
    <Box component="section" data-tone="paper" aria-labelledby="making-title" sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}>
      <Box sx={{ maxWidth: 1240, mx: 'auto', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, columnGap: 8, rowGap: 8, alignItems: 'start' }}>
        <Box>
          <Box component={motion.h2} {...enter()} id="making-title" sx={{ m: 0, ...display, fontSize: { xs: 40, md: 64 }, lineHeight: 1 }}>
            {copy.product.stackTitle}
          </Box>
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: 5, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {p.techStack.map((t, i) => (
              <Box key={t.name} component={motion.li} {...enter(0.05 * i, 16)} sx={{ '& > div': { background: '#f5f5f7' } }}>
                <ToolChip name={t.name} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box component={motion.div} {...enter(0.1)} sx={{ borderRadius: '24px', background: '#0d1117', color: '#f0f6fc', p: { xs: 3.5, md: 5 } }}>
          <Image src="/icons/github.svg" alt="" width={40} height={40} style={{ filter: 'invert(1)' }} />
          <Box component="h3" sx={{ m: 0, mt: 3, ...display, fontSize: { xs: 30, md: 40 }, lineHeight: 1.05 }}>
            {copy.product.codeTitle}
          </Box>
          <Box component="p" sx={{ m: 0, mt: 1.5, fontSize: 18, lineHeight: 1.47, color: '#9da7b3' }}>
            {copy.product.codeLine}
          </Box>
          <Box sx={{ mt: 4 }}>
            <TextLink href={PRODUCT_REPOS[id]} external>
              {PRODUCT_REPOS[id].replace('https://github.com/', '')}
            </TextLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Next world: the whole screen is the link ─────────────────────────────────
export function NextWorld({ id }: { id: ProductId }) {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const next = PRODUCT_ORDER[(PRODUCT_ORDER.indexOf(id) + 1) % PRODUCT_ORDER.length];
  const n = PRODUCTS[next];
  const [dark] = PRODUCT_TONES[next];
  return (
    <Box component="section" data-tone={dark} sx={{ px: MARGIN }}>
      <Box
        component={Link}
        href={`/products/${next}/`}
        sx={{
          minHeight: { xs: '70svh', md: '90svh' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'inherit',
          textDecoration: 'none',
          '& .arrow': { transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' },
          '&:hover .arrow': { transform: 'translateX(16px)' },
          '& .logo': { transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' },
          '&:hover .logo': { transform: 'rotate(-8deg) scale(1.08)' },
          '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: -12, borderRadius: '24px' },
        }}
      >
        <Box component="span" sx={{ fontSize: { xs: 18, md: 22 }, color: SOFT }}>
          {copy.product.next}
        </Box>
        <Box className="logo" sx={{ mt: 4 }}>
          <Image src={n.logo} alt="" width={88} height={88} style={{ objectFit: 'contain' }} />
        </Box>
        <Box component="span" sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: '0.3em', ...display, fontSize: { xs: 52, md: 'clamp(72px, 9vw, 168px)' }, lineHeight: 1 }}>
          {n.name}
          <Box component="span" className="arrow" aria-hidden sx={{ display: 'inline-block' }}>
            →
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function ProductPageV2({ id }: { id: string }) {
  const { language } = useLanguage();
  const pid = (PRODUCT_ORDER as string[]).includes(id) ? (id as ProductId) : 'wingwords';
  const p = PRODUCTS[pid];
  const [, light] = PRODUCT_TONES[pid];
  return (
    <TonePage initial={PRODUCT_TONES[pid][0]}>
      <ProductHero id={pid} />
      <ScrollWords text={language === 'es' ? p.descriptionEs : p.description} tone={light} size={{ xs: 32, sm: 44, md: 'clamp(44px, 4.2vw, 68px)' }} />
      <Features id={pid} />
      <Profile id={pid} />
      <Making id={pid} />
      <NextWorld id={pid} />
    </TonePage>
  );
}
