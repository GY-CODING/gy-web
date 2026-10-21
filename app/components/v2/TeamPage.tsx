'use client';

// Team pages of the /v2 prototype: /team/ (both founders) and /team/<slug>/ (one person).
// Content comes from utils/locales.ts (team.members: role, description, skills, links;
// company.values) plus the public facts in copy.ts (base city, founding year).

import { Box } from '@mui/material';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useLanguage } from '../../utils/languageContext';
import { locales } from '../../utils/locales';
import { getCopy, TEAM_SLUGS } from './copy';
import { display, easeOut, enter, MARGIN, ScrollWords, SOFT, TonePage, ToolChip } from './kit';

type Member = (typeof locales)['en']['team']['members'][number];

const IMAGES: Record<string, string> = {
  'guillermo-figueras': '/images/gfigueras.png',
  'ivan-vicente': '/images/toxyc.png',
};
const SLUGS = Object.keys(TEAM_SLUGS);

function useTeam() {
  const { language } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const members = locales[lang].team.members as Member[];
  const bySlug = (slug: string) => members.find((m) => m.name === TEAM_SLUGS[slug]) ?? members[0];
  return { lang, copy: getCopy(language), members, bySlug, team: locales[lang].team, values: locales[lang].company.values };
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
        '@keyframes gy-bob': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-12px)' } },
        animation: 'gy-bob 4.5s ease-in-out infinite alternate',
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      <Image src={IMAGES[slug]} alt={name} fill sizes="(max-width: 900px) 70vw, 480px" style={{ objectFit: 'contain', padding: '9%' }} priority />
    </Box>
  );
}

// ─── Values: four lines from the company page, large ──────────────────────────
export function Values() {
  const { values } = useTeam();
  return (
    <Box component="section" data-tone="mist" aria-labelledby="values-title" sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}>
      <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Box component={motion.h2} {...enter()} id="values-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1 }}>
          {values.title}
        </Box>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 6, md: 9 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, columnGap: 10, rowGap: { xs: 5, md: 8 } }}>
          {values.items.map((v, i) => (
            <Box key={v.title} component={motion.li} {...enter(i * 0.07)}>
              <Box component="h3" sx={{ m: 0, ...display, fontSize: { xs: 30, md: 40 }, lineHeight: 1.05 }}>
                {v.title}
              </Box>
              <Box component="p" sx={{ m: 0, mt: 1.5, maxWidth: 520, fontSize: { xs: 18, md: 20 }, lineHeight: 1.47, color: SOFT }}>
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
      <Box component="section" data-tone="night" sx={{ px: MARGIN, pt: { xs: 16, md: 22 }, pb: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <Box
          component={motion.h1}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut }}
          sx={{ m: 0, ...display, fontSize: { xs: 64, md: 'clamp(80px, 10vw, 184px)' }, lineHeight: 0.95 }}
        >
          {copy.team.title}
        </Box>
        <Box component={motion.p} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: easeOut, delay: 0.12 }} sx={{ m: 0, mt: 3, mx: 'auto', maxWidth: 680, fontSize: { xs: 20, md: 26 }, lineHeight: 1.35, color: SOFT }}>
          {team.description}
        </Box>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 8, md: 12 }, mx: 'auto', maxWidth: 1240, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
          {SLUGS.map((slug, i) => {
            const m = bySlug(slug);
            return (
              <Box key={slug} component={motion.li} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: easeOut, delay: 0.25 + i * 0.12 }}>
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
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
                    '&:hover': { transform: 'translateY(-6px)', background: 'rgba(255,255,255,0.08)' },
                    '&:hover .chev': { transform: 'translateX(4px)' },
                    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 4 },
                  }}
                >
                  <Portrait slug={slug} name={m.name} size={{ xs: 200, md: 280 }} />
                  <Box component="h2" sx={{ m: 0, mt: 4, ...display, fontSize: { xs: 34, md: 44 }, lineHeight: 1.05 }}>
                    {m.name}
                  </Box>
                  <Box component="p" sx={{ m: 0, mt: 1, fontSize: 18, color: SOFT }}>
                    {m.role}
                  </Box>
                  <Box component="span" sx={{ mt: 3, fontSize: 17, fontWeight: 600 }}>
                    {copy.team.view}{' '}
                    <Box component="span" className="chev" sx={{ display: 'inline-block', transition: 'transform 0.2s ease' }}>
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
function MemberHero({ slug }: { slug: string }) {
  const { copy, bySlug } = useTeam();
  const m = bySlug(slug);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const py = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const pr = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -8]);
  return (
    <Box
      ref={ref}
      component="section"
      data-tone="night"
      sx={{
        minHeight: '100svh',
        px: MARGIN,
        pt: { xs: 14, md: 12 },
        pb: { xs: 8, md: 10 },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, minmax(0, 1fr))' },
        columnGap: 4,
        rowGap: 6,
        alignItems: 'center',
      }}
    >
      <Box sx={{ gridColumn: { md: '1 / span 7' }, order: { xs: 2, md: 1 } }}>
        <Box component={motion.p} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeOut }} sx={{ m: 0, fontSize: { xs: 17, md: 20 }, color: SOFT }}>
          {copy.team.based} · {copy.team.founded}
        </Box>
        <Box
          component={motion.h1}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOut, delay: 0.08 }}
          sx={{ m: 0, mt: 2, ...display, fontSize: { xs: 60, md: 'clamp(80px, 8.4vw, 160px)' }, lineHeight: 0.92 }}
        >
          {m.name}
        </Box>
        <Box component={motion.p} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: easeOut, delay: 0.2 }} sx={{ m: 0, mt: 3, fontSize: { xs: 22, md: 30 }, lineHeight: 1.3 }}>
          {m.role}
        </Box>
      </Box>
      <Box sx={{ gridColumn: { md: '8 / span 5' }, order: { xs: 1, md: 2 }, display: 'flex', justifyContent: 'center' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.1 }}
        >
          <motion.div style={{ y: py, rotate: pr }}>
            <Portrait slug={slug} name={m.name} size={{ xs: 220, sm: 300, md: 'min(34vw, 480px)' }} />
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}

function Skills({ slug }: { slug: string }) {
  const { copy, bySlug } = useTeam();
  const m = bySlug(slug);
  return (
    <Box component="section" data-tone="paper" aria-labelledby="skills-title" sx={{ px: MARGIN, py: { xs: 12, md: 18 }, textAlign: 'center' }}>
      <Box component={motion.h2} {...enter()} id="skills-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1 }}>
        {copy.team.skills}
      </Box>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 6, md: 8 }, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, maxWidth: 900, mx: 'auto' }}>
        {m.skills.map((s, i) => (
          <Box
            key={s}
            component={motion.li}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: easeOut }}
            sx={{ '& > div': { background: '#f5f5f7', height: 64, px: 3, fontSize: 18 } }}
          >
            <ToolChip name={s} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Links({ slug }: { slug: string }) {
  const { copy, bySlug } = useTeam();
  const m = bySlug(slug);
  const rows: [string, string, string][] = [
    ['GitHub', m.social.github, m.social.github.replace('https://github.com/', '@')],
    ['LinkedIn', m.social.linkedin, m.social.linkedin.replace('https://www.linkedin.com/in/', '').replace(/\/$/, '')],
    [copy.team.portfolio, m.social.portfolio, m.social.portfolio.replace('https://', '')],
    [copy.team.email, `mailto:${m.social.email}`, m.social.email],
  ];
  return (
    <Box component="section" data-tone="night" aria-labelledby="links-title" sx={{ px: MARGIN, py: { xs: 12, md: 18 } }}>
      <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Box component={motion.h2} {...enter()} id="links-title" sx={{ m: 0, ...display, fontSize: { xs: 44, md: 'clamp(56px, 5.4vw, 88px)' }, lineHeight: 1 }}>
          {copy.team.links}
        </Box>
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, mt: { xs: 5, md: 8 }, display: 'grid', gap: 1.5 }}>
          {rows.map(([label, href, shown], i) => (
            <Box key={label} component={motion.li} {...enter(i * 0.06, 20)}>
              <Box
                component="a"
                href={href}
                {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr auto', md: '220px 1fr auto' },
                  alignItems: 'center',
                  columnGap: 3,
                  rowGap: 0.5,
                  px: { xs: 3, md: 4 },
                  py: { xs: 2.5, md: 3.5 },
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s ease',
                  '& .arrow': { transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' },
                  '&:hover': { background: 'rgba(255,255,255,0.1)' },
                  '&:hover .arrow': { transform: 'translate(4px, -4px)' },
                  '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 3 },
                }}
              >
                <Box sx={{ fontSize: 17, color: SOFT, gridColumn: { xs: '1', md: 'auto' } }}>{label}</Box>
                <Box sx={{ ...display, fontSize: { xs: 22, md: 34 }, lineHeight: 1.1, minWidth: 0, overflowWrap: 'anywhere', gridColumn: { xs: '1', md: 'auto' }, gridRow: { xs: 2, md: 'auto' } }}>
                  {shown}
                </Box>
                <Box className="arrow" aria-hidden sx={{ fontSize: { xs: 24, md: 32 }, gridRow: { xs: '1 / span 2', md: 'auto' }, gridColumn: { xs: 2, md: 'auto' } }}>
                  ↗
                </Box>
              </Box>
            </Box>
          ))}
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
          '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: 8, borderRadius: '24px' },
        }}
      >
        <Box component="span" sx={{ fontSize: { xs: 18, md: 22 }, color: SOFT }}>
          {copy.team.other}
        </Box>
        <Box sx={{ mt: 4, color: '#1d1d1f' }}>
          <Portrait slug={other} name={m.name} size={{ xs: 160, md: 200 }} />
        </Box>
        <Box component="span" sx={{ mt: 3, display: 'inline-flex', alignItems: 'center', gap: '0.3em', ...display, fontSize: { xs: 44, md: 'clamp(56px, 7vw, 120px)' }, lineHeight: 1 }}>
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
      <MemberHero slug={s} />
      <ScrollWords text={m.description} tone="mist" size={{ xs: 32, sm: 44, md: 'clamp(44px, 4.4vw, 72px)' }} />
      <Skills slug={s} />
      <Links slug={s} />
      <Values />
      <Other slug={s} />
    </TonePage>
  );
}
