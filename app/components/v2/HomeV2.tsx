'use client';

// GYCODING homepage prototype at /v2 ("the name as a monument" hero + "exhibition" body, see
// frontend/.claude/docs/home-v2.md). No header: language, theme and pause live in the footer/hero.
//
// Opening scene: the hero stays pinned and recedes (scales down, dims) while the light sheet of
// the statement slides over it with rounded shoulders; once covered, the hero's shader stops.

import { Box } from '@mui/material';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '../../utils/languageContext';
import { getCopy, WorldKey } from './copy';
import { TonePage, useInk, useMotionPause } from './kit';
import WordmarkHero from './WordmarkHero';
import { Build, InvertedCta, Statement, Story, Worlds } from './Sections';

function OpeningScene({ onExplore }: { onExplore: (w: WorldKey) => void }) {
  const { language } = useLanguage();
  const copy = getCopy(language);
  const { paused } = useMotionPause();
  const { c } = useInk();
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  // 0 → 1 over the first screen of scroll: the sheet travels from the bottom edge to the top.
  const { scrollYProgress } = useScroll({ target: stage, offset: ['0 0', '0 -100vh'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.88]);
  const veil = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 0.75]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCovered(v >= 0.999));

  return (
    // The stage keeps the theme's ground behind the receding hero, so the sheet's rounded
    // shoulders show against it.
    <Box ref={stage} sx={{ position: 'relative', background: c.ground }}>
      <Box sx={{ position: 'sticky', top: 0, zIndex: 0, overflow: 'hidden' }}>
        <Box component={motion.div} style={{ scale, y }} sx={{ transformOrigin: '50% 35%' }}>
          <WordmarkHero copy={copy} lang={language} onExplore={onExplore} paused={paused || covered} />
        </Box>
        {/* Dims the hero into the ground as it recedes. */}
        <Box component={motion.div} aria-hidden style={{ opacity: veil }} sx={{ position: 'absolute', inset: 0, background: c.ground, pointerEvents: 'none' }} />
      </Box>
      <Statement copy={copy} />
    </Box>
  );
}

export default function HomeV2() {
  const { language } = useLanguage();
  const copy = getCopy(language);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const explore = (w: WorldKey) => {
    if (w === 'gycoding') return goTo('worlds');
    // In the horizontal reel a world is a scroll position, not an element position.
    const reel = document.getElementById('worlds-reel');
    if (reel) {
      const order: WorldKey[] = ['wingwords', 'gy-accounts', 'heralds-of-chaos'];
      const n = Number(reel.dataset.count) || 3;
      const travel = reel.offsetHeight - window.innerHeight;
      const top = reel.getBoundingClientRect().top + window.scrollY + (order.indexOf(w) / (n - 1)) * travel;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }
    goTo(`world-${w}`);
  };

  return (
    <TonePage revealNav>
      <OpeningScene onExplore={explore} />
      <Worlds copy={copy} lang={language} />
      <Build copy={copy} />
      <Story copy={copy} />
      <InvertedCta copy={copy} />
    </TonePage>
  );
}
