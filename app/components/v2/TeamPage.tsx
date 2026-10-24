'use client';

// Team pages of the /v2 prototype: /team/ (both founders) and /team/<slug>/ (one person).
// Content comes from utils/locales.ts (team.members: role, description, skills, links;
// company.values) plus the public facts in copy.ts (base city, founding year).

import { Box } from '@mui/material';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../utils/languageContext';
import { locales } from '../../utils/locales';
import { getCopy, TEAM_SLUGS } from './copy';
import {
  brandFont,
  display,
  easeOut,
  enter,
  MARGIN,
  ScrollWords,
  SOFT,
  TonePage,
  ToolChip,
} from './kit';

type Member = (typeof locales)['en']['team']['members'][number];

const IMAGES: Record<string, string> = {
  'guillermo-figueras': '/images/gfigueras.png',
  'ivan-vicente': '/images/toxyc.png',
};
const SLUGS = Object.keys(TEAM_SLUGS);

// The tilt's spring: soft enough that the card follows the pointer without wobbling.
const SPRING = { stiffness: 140, damping: 18, mass: 0.6 } as const;

function useTeam() {
  const { language } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const members = locales[lang].team.members as Member[];
  const bySlug = (slug: string) => members.find((m) => m.name === TEAM_SLUGS[slug]) ?? members[0];
  return {
    lang,
    copy: getCopy(language),
    members,
    bySlug,
    team: locales[lang].team,
    values: locales[lang].company.values,
  };
}

// A Memoji on its tile, floating; tilts toward the pointer on desktop (transform only).
function Portrait({ slug, name, size }: { slug: string; name: string; size: object }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        aspectRatio: '1',
        borderRadius: { xs: '28px', md: '40px' },
        background: 'color-mix(in srgb, currentColor 8%, transparent)',
        '@keyframes gy-bob': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-12px)' },
        },
        animation: 'gy-bob 4.5s ease-in-out infinite alternate',
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      <Image
        src={IMAGES[slug]}
        alt={name}
        fill
        sizes="(max-width: 900px) 70vw, 480px"
        style={{ objectFit: 'contain', padding: '9%' }}
        priority
      />
    </Box>
  );
}

// ─── Values: four lines from the company page, large ──────────────────────────
export function Values() {
  const { values } = useTeam();
  return (
    <Box
      component="section"
      data-tone="mist"
      aria-labelledby="values-title"
      sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}
    >
      <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Box
          component={motion.h2}
          {...enter()}
          id="values-title"
          sx={{
            m: 0,
            ...display,
            fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' },
            lineHeight: 1,
          }}
        >
          {values.title}
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            mt: { xs: 6, md: 9 },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            columnGap: 10,
            rowGap: { xs: 5, md: 8 },
          }}
        >
          {values.items.map((v, i) => (
            <Box key={v.title} component={motion.li} {...enter(i * 0.07)}>
              <Box
                component="h3"
                sx={{ m: 0, ...display, fontSize: { xs: 30, md: 40 }, lineHeight: 1.05 }}
              >
                {v.title}
              </Box>
              <Box
                component="p"
                sx={{
                  m: 0,
                  mt: 1.5,
                  maxWidth: 520,
                  fontSize: { xs: 18, md: 20 },
                  lineHeight: 1.47,
                  color: SOFT,
                }}
              >
                {v.description}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── /team/ ────────────────────────────────────────────────────────────────
export function TeamIndexV2() {
  const { copy, team, bySlug } = useTeam();
  return (
    <TonePage initial="night">
      <Box
        component="section"
        data-tone="night"
        sx={{ px: MARGIN, pt: { xs: 16, md: 22 }, pb: { xs: 10, md: 16 }, textAlign: 'center' }}
      >
        <Box
          component={motion.h1}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut }}
          sx={{
            m: 0,
            ...display,
            fontSize: { xs: 64, md: 'clamp(80px, 10vw, 184px)' },
            lineHeight: 0.95,
          }}
        >
          {copy.team.title}
        </Box>
        <Box
          component={motion.p}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.12 }}
          sx={{
            m: 0,
            mt: 3,
            mx: 'auto',
            maxWidth: 680,
            fontSize: { xs: 20, md: 26 },
            lineHeight: 1.35,
            color: SOFT,
          }}
        >
          {team.description}
        </Box>
        <Box
          component="ul"
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            mt: { xs: 8, md: 12 },
            mx: 'auto',
            maxWidth: 1240,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {SLUGS.map((slug, i) => {
            const m = bySlug(slug);
            return (
              <Box
                key={slug}
                component={motion.li}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: easeOut, delay: 0.25 + i * 0.12 }}
              >
                <Box
                  component={Link}
                  href={`/team/${slug}/`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '32px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'inherit',
                    textDecoration: 'none',
                    p: { xs: 4, md: 6 },
                    transition:
                      'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      background: 'rgba(255,255,255,0.08)',
                    },
                    '&:hover .chev': { transform: 'translateX(4px)' },
                    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 4 },
                  }}
                >
                  <Portrait slug={slug} name={m.name} size={{ xs: 200, md: 280 }} />
                  <Box
                    component="h2"
                    sx={{ m: 0, mt: 4, ...display, fontSize: { xs: 34, md: 44 }, lineHeight: 1.05 }}
                  >
                    {m.name}
                  </Box>
                  <Box component="p" sx={{ m: 0, mt: 1, fontSize: 18, color: SOFT }}>
                    {m.role}
                  </Box>
                  <Box component="span" sx={{ mt: 3, fontSize: 17, fontWeight: 600 }}>
                    {copy.team.view}{' '}
                    <Box
                      component="span"
                      className="chev"
                      sx={{ display: 'inline-block', transition: 'transform 0.2s ease' }}
                    >
                      ›
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Values />
    </TonePage>
  );
}

// ─── /team/<slug>/ ─────────────────────────────────────────────────────────
// ─── The member card: an ID card, like the GY Accounts one ────────────────────
// Same language as the GY Accounts card: landscape credential, wordmark and logo on top, the
// portrait in a gradient ring, the name, then — where the account card shows roles — the tools
// they use, and the links at the foot. One face, everything visible. It tilts toward the pointer
// with a sheen that follows it; only transform and the sheen's background move, and both are off
// for a coarse pointer or `prefers-reduced-motion`.

// Monochrome marks (currentColor): the brand icons in `public/icons` are black and vanish on the
// dark card.
const LINK_ICONS: Record<string, string> = {
  github:
    'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  web: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 9h-3.05a15.7 15.7 0 0 0-1.38-6.02A8.02 8.02 0 0 1 18.93 11ZM12 4.04c.83 1.2 1.9 3.37 2.12 6.96H9.88C10.1 7.41 11.17 5.24 12 4.04ZM4.26 13h3.05c.14 2.2.6 4.25 1.38 6.02A8.02 8.02 0 0 1 4.26 13Zm3.05-2H4.26a8.02 8.02 0 0 1 4.43-6.02A15.7 15.7 0 0 0 7.31 11ZM12 19.96c-.83-1.2-1.9-3.37-2.12-6.96h4.24c-.22 3.59-1.29 5.76-2.12 6.96Zm3.31-.94c.78-1.77 1.24-3.82 1.38-6.02h3.05a8.02 8.02 0 0 1-4.43 6.02ZM9.7 11c.07-1.9.4-3.7 1.06-5.3.12-.28.25-.55.4-.8a5.2 5.2 0 0 0-.4.8C10.1 7.3 9.77 9.1 9.7 11Z',
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 8.2L20 7V6l-8 5.2L4 6v1l8 5.2Z',
};

function LinkPill({ kind, label, href }: { kind: string; label: string; href: string }) {
  return (
    <Box
      component="a"
      href={href}
      {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        height: 40,
        px: 1.75,
        borderRadius: '12px',
        fontSize: 14,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: 'inherit',
        textDecoration: 'none',
        background: 'rgba(255,255,255,0.07)',
        transition: 'background-color 0.25s ease, transform 0.25s ease',
        '&:hover': { background: 'rgba(255,255,255,0.16)', transform: 'translateY(-2px)' },
        '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 2 },
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden fill="currentColor">
        <path d={LINK_ICONS[kind]} />
      </svg>
      {label}
    </Box>
  );
}

function MemberCard({ slug }: { slug: string }) {
  const { copy, bySlug } = useTeam();
  const m = bySlug(slug);
  const reduce = useReducedMotion();

  // Tilt: the pointer's position on the card, in degrees, smoothed by a spring.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), SPRING);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), SPRING);
  const sheen = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(520px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.13), rgba(255,255,255,0) 60%)`,
  );

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const links: [string, string, string][] = [
    ['github', 'GitHub', m.social.github],
    ['linkedin', 'LinkedIn', m.social.linkedin],
    ['web', copy.team.portfolio, m.social.portfolio],
    ['mail', copy.team.email, `mailto:${m.social.email}`],
  ];

  return (
    <Box
      component="section"
      data-tone="night"
      aria-labelledby="member-name"
      sx={{
        minHeight: '100svh',
        px: MARGIN,
        pt: { xs: 13, md: 12 },
        pb: { xs: 8, md: 10 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component={motion.div}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        sx={{ perspective: '1800px', width: 'min(100%, 760px)' }}
      >
        <Box
          component={motion.div}
          style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry }}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: '24px', md: '32px' },
            p: { xs: 3, md: 5 },
            minHeight: { md: 440 },
            display: 'flex',
            flexDirection: 'column',
            background:
              'radial-gradient(120% 80% at 0% 0%, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0) 60%), radial-gradient(90% 70% at 100% 100%, rgba(236,72,153,0.18) 0%, rgba(236,72,153,0) 60%), #0e0e14',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 50px 100px -40px rgba(0,0,0,0.9)',
          }}
        >
          {/* fine grid, as on the account card */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 80% at 80% 0%, black 10%, transparent 70%)',
              maskImage: 'radial-gradient(ellipse 90% 80% at 80% 0%, black 10%, transparent 70%)',
            }}
          />
          {!reduce && (
            <Box
              component={motion.div}
              aria-hidden
              style={{ background: sheen }}
              sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            />
          )}

          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              component="span"
              sx={{ ...brandFont, fontSize: { xs: 15, md: 20 }, letterSpacing: '0.04em', fontKerning: 'none' }}
            >
              GyCODING
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="span"
                sx={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: SOFT }}
              >
                {copy.team.based}
              </Box>
              <Image src="/gy-logo.png" alt="" width={30} height={30} />
            </Box>
          </Box>

          <Box
            sx={{
              position: 'relative',
              mt: 'auto',
              pt: { xs: 5, md: 6 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 2.5, md: 4 },
            }}
          >
            {/* The PNG as is: no circle, no ring, no fill. A soft glow behind keeps it from floating. */}
            <Box
              sx={{
                position: 'relative',
                flexShrink: 0,
                width: { xs: 120, md: 180 },
                aspectRatio: '1',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '-10%',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(139,92,246,0.32) 0%, rgba(139,92,246,0) 65%)',
                },
              }}
            >
              <Image
                src={IMAGES[slug]}
                alt={m.name}
                fill
                sizes="180px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Box
                component="h1"
                id="member-name"
                sx={{ m: 0, ...display, fontSize: { xs: 34, md: 52 }, lineHeight: 1.04 }}
              >
                {m.name}
              </Box>
              <Box component="p" sx={{ m: 0, mt: 1, fontSize: { xs: 15, md: 18 }, color: SOFT }}>
                {m.role}
              </Box>
            </Box>
          </Box>

          {/* Where the account card lists roles, the card lists the tools. */}
          <Box
            component="ul"
            aria-label={copy.team.skills}
            sx={{
              position: 'relative',
              listStyle: 'none',
              m: 0,
              p: 0,
              mt: { xs: 3, md: 4 },
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              '& > li > div': { height: 40, px: 1.5, fontSize: 14 },
            }}
          >
            {m.skills.map((skill) => (
              <li key={skill}>
                <ToolChip name={skill} />
              </li>
            ))}
          </Box>

          <Box
            component="ul"
            aria-label={copy.team.links}
            sx={{
              position: 'relative',
              listStyle: 'none',
              m: 0,
              p: 0,
              mt: { xs: 3, md: 4 },
              pt: { xs: 3, md: 3.5 },
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {links.map(([kind, label, href]) => (
              <li key={kind}>
                <LinkPill kind={kind} label={label} href={href} />
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Other({ slug }: { slug: string }) {
  const { copy, bySlug } = useTeam();
  const other = SLUGS.find((s) => s !== slug) ?? SLUGS[0];
  const m = bySlug(other);
  return (
    <Box component="section" data-tone="paper" sx={{ px: MARGIN, py: { xs: 12, md: 16 } }}>
      <Box
        component={Link}
        href={`/team/${other}/`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'inherit',
          textDecoration: 'none',
          '& .arrow': { transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' },
          '&:hover .arrow': { transform: 'translateX(14px)' },
          '&:focus-visible': {
            outline: '2px solid currentColor',
            outlineOffset: 8,
            borderRadius: '24px',
          },
        }}
      >
        <Box component="span" sx={{ fontSize: { xs: 18, md: 22 }, color: SOFT }}>
          {copy.team.other}
        </Box>
        <Box sx={{ mt: 4, color: '#1d1d1f' }}>
          <Portrait slug={other} name={m.name} size={{ xs: 160, md: 200 }} />
        </Box>
        <Box
          component="span"
          sx={{
            mt: 3,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3em',
            ...display,
            fontSize: { xs: 44, md: 'clamp(56px, 7vw, 120px)' },
            lineHeight: 1,
          }}
        >
          {m.name}
          <Box component="span" className="arrow" aria-hidden sx={{ display: 'inline-block' }}>
            →
          </Box>
        </Box>
        <Box component="span" sx={{ mt: 1.5, fontSize: 18, color: SOFT }}>
          {m.role}
        </Box>
      </Box>
    </Box>
  );
}

export function TeamMemberV2({ slug }: { slug: string }) {
  const { bySlug } = useTeam();
  const s = TEAM_SLUGS[slug] ? slug : SLUGS[0];
  const m = bySlug(s);
  return (
    <TonePage initial="night">
      <MemberCard slug={s} />
      <ScrollWords
        text={m.description}
        tone="mist"
        size={{ xs: 32, sm: 44, md: 'clamp(44px, 4.4vw, 72px)' }}
      />
      <Values />
      <Other slug={s} />
    </TonePage>
  );
}
