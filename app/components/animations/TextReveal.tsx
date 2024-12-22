/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const TextReveal = ({ text, delay = 0, duration = 0.5, className = '' }: TextRevealProps) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="mr-1">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextReveal;
