'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { lexendFont } from '@/app/utils/fonts';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle = ({ text, className = '' }: AnimatedTitleProps) => {
  const theme = useTheme();
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        fontFamily: lexendFont.style.fontFamily,
        fontWeight: 600,
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        alignItems: 'center',
        fontSize: 'inherit',
        lineHeight: 1.2,
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTitle;
