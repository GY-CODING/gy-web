import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export function useHeroScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  return { heroRef, yTitle, opacity, scale, cueOpacity };
}
