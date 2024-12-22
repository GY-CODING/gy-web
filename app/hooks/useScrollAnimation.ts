'use client';
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationConfig {
  offset?: [string, string] | [number, number] | any;
  inputRange?: [number, number];
  outputRange?: number[];
  smooth?: number;
}

export const useScrollAnimation = (config: ScrollAnimationConfig = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    offset = ['start start', 'end center'],
    inputRange = [0, 1],
    outputRange = [0, 1],
    smooth = 0.5,
  } = config;

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset,
  });

  const smoothProgress = useTransform(scrollYProgress, inputRange, outputRange, {
    ease: (t) => 1 - Math.pow(1 - t, smooth * 4),
  });

  return { elementRef, scrollYProgress, smoothProgress };
};
