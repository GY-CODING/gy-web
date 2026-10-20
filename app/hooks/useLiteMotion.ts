'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Chromium exposes deviceMemory and connection; Safari/Firefox don't.
type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

// Whether continuous decorative work (aurora loops, cursor spotlight, parallax, glass blur)
// should be skipped:
// - touch-first devices (phones/tablets), where blur + backdrop-filter cause scroll jank;
// - modest machines: ≤4 CPU cores, ≤4 GB RAM or data-saver mode (tilt/parallax lagged there);
// - prefers-reduced-motion (handled by the hook below).
// Same name and API as gy-accounts' hook so the whole suite behaves the same.
export function detectLiteMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = navigator as NavigatorHints;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const lowCpu = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const saveData = !!nav.connection?.saveData;
  return coarse || lowCpu || lowMemory || saveData;
}

export function useLiteMotion() {
  const reduceMotion = useReducedMotion();
  const [lite, setLite] = useState(false);

  useEffect(() => {
    // Re-evaluated if the pointer type changes (e.g. a mouse plugged into a tablet).
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setLite(detectLiteMotion());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return !!reduceMotion || lite;
}
