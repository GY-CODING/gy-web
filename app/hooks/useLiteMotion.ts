'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// True when continuous decorative animation should be skipped: the user asked for reduced
// motion, or the device is touch-first (phones/tablets), where infinite blur/backdrop-filter
// animations are the main source of scroll jank.
export function useLiteMotion() {
  const reduceMotion = useReducedMotion();
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return !!reduceMotion || coarse;
}
