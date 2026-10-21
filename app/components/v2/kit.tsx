'use client';

// Shared language of the /v2 prototype (home, product pages, team pages): tokens, entrances,
// the tone engine (the page's ground and ink ease to the tone of the screen at the middle of the
// viewport), the global "pause animations" control, corner navigation and small controls.

import { Box } from '@mui/material';
import { AnimatePresence, motion, MotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { valorantFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import { PRODUCT_ORDER, PRODUCTS } from '../../products/data/products';
import { ACCOUNTS_URL, BRAND_GRADIENT, getCopy, ink, ToneKey, TONES } from './copy';
import { MonumentFooter } from './Footer';
import { getLenis } from '../../hooks/useSmoothScroll';

export const MARGIN = { xs: '20px', md: '32px' };
export const easeOut = [0.16, 1, 0.3, 1] as const;
export const SOFT = 'var(--tone-soft)';

export const enter = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: easeOut },
});

// Valorant is only for the GYCODING wordmark.
export const brandFont = {
  fontFamily: valorantFont.style.fontFamily,
  fontWeight: 400,
  fontSynthesis: 'none',
} as const;

// Display lines: Lexend semibold, Apple-tight tracking, balanced wrapping (no widows).
export const display = { fontWeight: 600, letterSpacing: '-0.045em', textWrap: 'balance' } as const;

// Pixel strings: MUI reads a bare 1 as 100%.
export const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
} as const;

// /v2 es oscuro siempre: no hay interruptor de tema (decisión del equipo). Las baldosas claras
// de las secciones siguen ahí — son parte de la composición, no el tema.
export function useInk() {
  return { isDark: true, c: ink(true) };
}

// ─── Tone engine ──────────────────────────────────────────────────────────────
// Scenes that change tone without crossing the middle line (horizontal reels) call this.
export const ToneContext = createContext<(t: ToneKey) => void>(() => {});

// ─── Global pause for the decorative loops (WCAG 2.2.2: motion > 5 s needs a pause) ─────
export const MotionPause = createContext<{ paused: boolean; toggle: () => void }>({
  paused: false,
  toggle: () => {},
});
export const useMotionPause = () => useContext(MotionPause);

export function PauseButton({ tone = 'inherit' }: { tone?: string }) {
  const { paused, toggle } = useMotionPause();
  const { language } = useLanguage();
  const copy = getCopy(language);
  const label = paused ? copy.motionPlay : copy.motionPause;
  return (
    <Box
      component="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      sx={{
        width: 40,
        height: 40,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '14px',
        border: '1.5px solid color-mix(in srgb, currentColor 22%, transparent)',
        background: 'transparent',
        color: tone,
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        '&:hover': { borderColor: 'currentColor' },
        '&:active': { transform: 'scale(0.95)' },
        '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 2 },
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        {paused ? (
          <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
        ) : (
          <>
            <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
            <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
          </>
        )}
      </svg>
    </Box>
  );
}

// The page frame shared by every /v2 page: skip link, <main> with the tone engine, footer.
export function TonePage({
  children,
  initial = 'ground',
  revealNav = false,
}: {
  children: ReactNode;
  initial?: ToneKey;
  // Home: the bar slides in only after the hero; other pages show it from the start.
  revealNav?: boolean;
}) {
  const { c } = useInk();
  const { language } = useLanguage();
  const copy = getCopy(language);
  const mainRef = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<ToneKey>(initial);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const toggle = useCallback(() => setPaused((p) => !p), []);

  // A new page starts at the top. Lenis (smooth scroll) keeps its own position and would put the
  // visitor back where they were on the previous page (e.g. at the end, after "Next world").
  // Links to an anchor (/#worlds) keep their target.
  const path = usePathname();
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        getLenis()?.scrollTo(el, { immediate: true, force: true });
        return;
      }
    }
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [path]);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setTone((e.target as HTMLElement).dataset.tone as ToneKey);
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    root.querySelectorAll('[data-tone]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [language]);

  const t = tone === 'ground' ? { bg: c.ground, ink: c.ink, soft: c.soft } : TONES[tone];

  return (
    <MotionPause.Provider value={{ paused: paused || !!reduce, toggle }}>
      <ToneContext.Provider value={setTone}>
        <Box sx={{ background: c.ground, color: c.ink, minHeight: '100vh' }}>
          <Box
            component="a"
            href="#main"
            sx={{
              position: 'fixed',
              left: 16,
              top: 16,
              zIndex: 20,
              px: 2,
              py: 1.25,
              borderRadius: '14px',
              background: c.ink,
              color: c.ground,
              fontWeight: 600,
              textDecoration: 'none',
              transform: 'translateY(-200%)',
              transition: 'transform 0.2s ease',
              '&:focus-visible': { transform: 'none', outline: `2px solid ${c.ground}` },
            }}
          >
            {copy.skip}
          </Box>
          {/* Above the sticky footer, so the footer is revealed only when the page scrolls past. */}
          <Box
            component="main"
            id="main"
            ref={mainRef}
            data-paused={paused ? 'true' : 'false'}
            style={{ '--tone-bg': t.bg, '--tone-ink': t.ink, '--tone-soft': t.soft } as React.CSSProperties}
            sx={{
              position: 'relative',
              zIndex: 1,
              background: 'var(--tone-bg)',
              color: 'var(--tone-ink)',
              transition:
                'background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1), color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              '&[data-paused="true"] *': { animationPlayState: 'paused !important' },
              '& h1, & h2, & h3': { textWrap: 'balance' },
              '& section, & article': { scrollMarginTop: '56px' },
              '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
            }}
          >
            <SiteNav reveal={revealNav} />
            {children}
          </Box>
          <MonumentFooter copy={copy} />
        </Box>
      </ToneContext.Provider>
    </MotionPause.Provider>
  );
}

// ─── Site navigation (every /v2 page) ─────────────────────────────────────────
// Dos grupos en vez de cinco enlaces sueltos — Productos y Equipo —, cada uno con su panel de
// iconos y una línea por destino (el desplegable de la v1). A la derecha, pausar animaciones y
// GY Accounts. Sin interruptor de tema: /v2 es oscuro y punto.

type NavChild = { href: string; label: string; line: string; icon: string };

export function SiteNav({ reveal = false }: { reveal?: boolean }) {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const path = usePathname() || '';
  const [shown, setShown] = useState(!reveal);
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!reveal) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      setShown(window.scrollY > window.innerHeight * 0.85);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reveal]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Al cambiar de página se cierra todo.
  useEffect(() => {
    setGroup(null);
    setOpen(false);
  }, [path]);

  // Escape y clic fuera cierran el desplegable.
  useEffect(() => {
    if (group === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setGroup(null);
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setGroup(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [group]);

  const groups: { label: string; children: NavChild[] }[] = [
    {
      label: copy.footer.products,
      children: PRODUCT_ORDER.map((id) => ({
        href: `/products/${id}/`,
        label: PRODUCTS[id].name,
        line: language === 'es' ? PRODUCTS[id].taglineEs : PRODUCTS[id].tagline,
        icon: PRODUCTS[id].logo,
      })),
    },
    {
      label: copy.footer.team,
      children: [
        { href: '/team/', label: copy.footer.team, line: copy.nav.teamLine, icon: '/icons/team.svg' },
        { href: '/company/', label: copy.footer.company, line: copy.nav.companyLine, icon: '/icons/company.svg' },
      ],
    },
  ];
  const isCurrent = (href: string) => path.replace(/\/?$/, '/').startsWith(href);
  const groupActive = (children: NavChild[]) => children.some((c) => isCurrent(c.href));

  const panelItem = (c: NavChild, onPick: () => void) => (
    <Box
      key={c.href}
      component={Link}
      href={c.href}
      onClick={onPick}
      aria-current={isCurrent(c.href) ? 'page' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.75,
        p: 1.75,
        borderRadius: '14px',
        color: 'inherit',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease',
        '&:hover': { background: 'color-mix(in srgb, currentColor 8%, transparent)' },
        '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: -2 },
      }}
    >
      <Image src={c.icon} alt="" width={28} height={28} style={{ objectFit: 'contain', flexShrink: 0 }} />
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ fontSize: 15.5, fontWeight: 600, lineHeight: 1.2 }}>{c.label}</Box>
        <Box sx={{ mt: 0.5, fontSize: 13.5, lineHeight: 1.4, color: SOFT }}>{c.line}</Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        component="nav"
        ref={navRef}
        aria-label="GYCODING"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          height: 56,
          px: MARGIN,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'var(--tone-ink)',
          background: 'color-mix(in srgb, var(--tone-bg) 84%, transparent)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          transform: shown || open ? 'translateY(0)' : 'translateY(-100%)',
          transition:
            'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.9s cubic-bezier(0.16, 1, 0.3, 1), color 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        <Box
          component={Link}
          href="/"
          aria-label="GYCODING"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, color: 'inherit', textDecoration: 'none', '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 4, borderRadius: '8px' } }}
        >
          <Image src="/gy-logo.png" alt="" width={26} height={26} />
          {/* Valorant kerns the C under the y's arm until they touch; without kerning they stay apart. */}
          <Box component="span" sx={{ ...brandFont, fontSize: 18, lineHeight: 1, fontKerning: 'none' }}>
            GyCODING
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
          {groups.map((g, i) => {
            const on = groupActive(g.children);
            const isOpen = group === i;
            return (
              <Box
                key={g.label}
                sx={{ position: 'relative' }}
                onMouseEnter={() => setGroup(i)}
                onMouseLeave={() => setGroup((cur) => (cur === i ? null : cur))}
              >
                <Box
                  component="button"
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setGroup(isOpen ? null : i)}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    height: 36,
                    px: 1.5,
                    border: 0,
                    borderRadius: '12px',
                    background: isOpen ? 'color-mix(in srgb, currentColor 8%, transparent)' : 'transparent',
                    color: on || isOpen ? 'var(--tone-ink)' : SOFT,
                    fontFamily: 'inherit',
                    fontSize: 15,
                    fontWeight: on ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease, background-color 0.2s ease',
                    '&:hover': { color: 'var(--tone-ink)' },
                    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 2 },
                  }}
                >
                  {g.label}
                  <Box
                    component="span"
                    aria-hidden
                    sx={{
                      display: 'inline-block',
                      fontSize: 11,
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    ▾
                  </Box>
                </Box>

                <AnimatePresence>
                  {isOpen && (
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        // Anchored to the trigger's right edge, not centred: both groups sit near
                        // the bar's right side (pause/accounts are further right still), so a
                        // centred 320-340px panel ran off the viewport. Right-anchoring keeps it
                        // inside no matter how close the trigger is to the edge.
                        right: 0,
                        pt: '10px',
                        zIndex: 31,
                      }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          width: g.children.length > 2 ? 340 : 320,
                          borderRadius: '20px',
                          background: 'color-mix(in srgb, var(--tone-bg) 94%, transparent)',
                          backdropFilter: 'saturate(180%) blur(20px)',
                          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                          border: '1px solid color-mix(in srgb, currentColor 12%, transparent)',
                          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)',
                          display: 'grid',
                          gap: 0.25,
                        }}
                      >
                        {g.children.map((c) => panelItem(c, () => setGroup(null)))}
                      </Box>
                    </Box>
                  )}
                </AnimatePresence>
              </Box>
            );
          })}

          <Box sx={{ ml: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <PauseButton />
            <Box
              component="a"
              href={ACCOUNTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.accountsAction}
              title={copy.accountsAction}
              sx={{
                width: 40,
                height: 40,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '14px',
                border: '1.5px solid color-mix(in srgb, currentColor 22%, transparent)',
                color: 'inherit',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                '&:hover': { borderColor: 'currentColor' },
                '&:active': { transform: 'scale(0.95)' },
                '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 2 },
              }}
            >
              <Image src="/icons/gy_accounts.svg" alt="" width={20} height={20} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5, mr: -1.5 }}>
          <PauseButton />
          <Box
            component="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="v2-menu"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 40,
              px: 1.5,
              border: 0,
              borderRadius: '14px',
              background: 'transparent',
              color: 'inherit',
              fontFamily: 'inherit',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              touchAction: 'manipulation',
              '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 2 },
            }}
          >
            {open ? copy.menuClose : copy.menu}
          </Box>
        </Box>
      </Box>

      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            id="v2-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 29,
              background: 'var(--tone-bg)',
              color: 'var(--tone-ink)',
              px: MARGIN,
              pt: '88px',
              pb: 4,
              overflowY: 'auto',
              overscrollBehavior: 'contain',
            }}
          >
            {groups.map((g, gi) => (
              <Box
                key={g.label}
                component={motion.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + gi * 0.06, ease: easeOut }}
                sx={{ mb: 4 }}
              >
                <Box sx={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: SOFT, mb: 1 }}>
                  {g.label}
                </Box>
                <Box sx={{ display: 'grid', gap: 0.5, mx: -1.75 }}>
                  {g.children.map((c) => panelItem(c, () => setOpen(false)))}
                </Box>
              </Box>
            ))}
            <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <ActionButton href={ACCOUNTS_URL} bg={BRAND_GRADIENT}>
                {copy.accountsAction}
              </ActionButton>
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}

// Apple-style text link with a chevron that nudges on hover.
export function TextLink({
  href,
  children,
  external = false,
  back = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  back?: boolean;
}) {
  const sx = {
    fontSize: 17,
    fontWeight: 600,
    color: 'inherit',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35em',
    '& .chev': { display: 'inline-block', transition: 'transform 0.2s ease' },
    '&:hover .chev': { transform: back ? 'translateX(-4px)' : 'translateX(4px)' },
    '&:hover': { textDecoration: 'underline', textUnderlineOffset: '5px' },
    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 3, borderRadius: '4px' },
  } as const;
  const inner = back ? (
    <>
      <span className="chev">‹</span> {children}
    </>
  ) : (
    <>
      {children} <span className="chev">{external ? '↗' : '›'}</span>
    </>
  );
  return external ? (
    <Box component="a" href={href} target="_blank" rel="noopener noreferrer" sx={sx}>
      {inner}
    </Box>
  ) : (
    <Box component={Link} href={href} sx={sx}>
      {inner}
    </Box>
  );
}

// Solid action button (radius 14, press scale), in a given colour.
export function ActionButton({
  href,
  children,
  bg,
  fg = '#ffffff',
  external = true,
}: {
  href: string;
  children: ReactNode;
  bg: string;
  fg?: string;
  external?: boolean;
}) {
  const sx = {
    display: 'inline-flex',
    alignItems: 'center',
    height: 52,
    px: 3,
    borderRadius: '14px',
    fontWeight: 600,
    fontSize: 17,
    textDecoration: 'none',
    color: fg,
    background: bg,
    transition: 'transform 0.2s ease',
    '&:hover': { transform: 'translateY(-2px)' },
    '&:active': { transform: 'scale(0.95)' },
    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 3 },
  } as const;
  return external ? (
    <Box component="a" href={href} target="_blank" rel="noopener noreferrer" sx={sx}>
      {children}
    </Box>
  ) : (
    <Box component={Link} href={href} sx={sx}>
      {children}
    </Box>
  );
}

// ─── Scroll words: a pinned sentence that lights up word by word ───────────────
// The dim copy of each word is a CSS pseudo-element (decoration); the real word fades in on
// top from 0 to full ink, so readable text is never shown at low contrast.
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <Box
      component="span"
      data-w={children}
      sx={{ position: 'relative', display: 'inline-block', mr: '0.25em', '&::before': { content: 'attr(data-w)', opacity: 0.14 } }}
    >
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>{children}</motion.span>
    </Box>
  );
}

export function ScrollWords({
  text,
  sub,
  tone,
  size = { xs: 40, sm: 56, md: 'clamp(56px, 5.6vw, 88px)' },
  sheet = false,
}: {
  text: string;
  sub?: string;
  tone: ToneKey;
  size?: object;
  sheet?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = text.split(' ');
  const subOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.78, 0.92], [16, 0]);
  const bg = tone !== 'ground' ? TONES[tone].bg : undefined;
  return (
    <Box
      ref={ref}
      component="section"
      data-tone={tone}
      sx={{
        position: 'relative',
        zIndex: 2,
        height: { xs: '200svh', md: '240svh' },
        // As a sheet it slides over the previous screen with rounded shoulders, in its own colour.
        ...(sheet && bg
          ? { background: bg, color: TONES[tone as Exclude<ToneKey, 'ground'>].ink, borderRadius: { xs: '28px 28px 0 0', md: '40px 40px 0 0' } }
          : {}),
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          px: MARGIN,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box component="p" sx={{ m: 0, maxWidth: 1100, ...display, fontSize: size, lineHeight: 1.05 }}>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={reduce ? [0, 0.0001] : [(i / words.length) * 0.75, ((i + 1) / words.length) * 0.75]}>
              {w}
            </Word>
          ))}
        </Box>
        {sub && (
          <Box
            component={motion.p}
            style={reduce ? undefined : { opacity: subOpacity, y: subY }}
            sx={{ m: 0, mt: { xs: 3, md: 4 }, fontSize: { xs: 19, md: 24 }, color: sheet && tone !== 'ground' ? TONES[tone].soft : SOFT }}
          >
            {sub}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// The logos we have for the tools named across the site (public/icons).
export const TOOL_ICONS: Record<string, string> = {
  'Next.js': 'nextjs',
  NextJS: 'nextjs',
  React: 'react',
  TypeScript: 'typescript',
  Java: 'java',
  'Spring Boot': 'springboot',
  MongoDB: 'mongodb',
  Unity: 'unity',
  'C#': 'csharp',
  Blender: 'blender',
  Figma: 'figma',
  Cloudflare: 'cloudflare',
  Vercel: 'vercel',
  Git: 'git',
  GitHub: 'github',
};

export function ToolChip({ name, light = true }: { name: string; light?: boolean }) {
  const icon = TOOL_ICONS[name];
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        height: 56,
        px: 2.25,
        borderRadius: '14px',
        background: light ? '#ffffff' : 'rgba(255,255,255,0.08)',
        fontSize: 16,
        fontWeight: 600,
        color: light ? '#1d1d1f' : '#f5f5f7',
        whiteSpace: 'nowrap',
      }}
    >
      {icon ? (
        <Image src={`/icons/${icon}.svg`} alt="" width={24} height={24} />
      ) : (
        <Box aria-hidden sx={{ width: 24, height: 24, borderRadius: '8px', background: 'currentColor', opacity: 0.15 }} />
      )}
      {name}
    </Box>
  );
}
