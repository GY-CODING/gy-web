'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
//* THIS COMPONENT IS USED IN SOME COMPONENTS IN ABOUT SECTION
interface ParallaxScrollProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

const ParallaxScroll = ({ children, offset = 50, className = '' }: ParallaxScrollProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxScroll;
