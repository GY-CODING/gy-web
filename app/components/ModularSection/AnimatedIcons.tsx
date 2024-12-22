'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material';

export const FrontendIcon = () => {
  const theme = useTheme();
  const color = theme.palette.mode === 'dark' ? '#fff' : '#000';

  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      initial="hidden"
      animate="visible"
    >
      <motion.rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.path
        d="M8 10L5 8L8 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.path
        d="M16 10L19 8L16 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.path
        d="M2 20H22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  );
};

export const BackendIcon = () => {
  const theme = useTheme();
  const color = theme.palette.mode === 'dark' ? '#fff' : '#000';

  return (
    <motion.svg width="120" height="120" viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M12 4L3 9L12 14L21 9L12 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.path
        d="M3 14L12 19L21 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        stroke={color}
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 2.5 }}
      />
    </motion.svg>
  );
};

export const MobileIcon = () => {
  const theme = useTheme();
  const color = theme.palette.mode === 'dark' ? '#fff' : '#000';

  return (
    <motion.svg width="120" height="120" viewBox="0 0 24 24" fill="none">
      <motion.rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
      <motion.line
        x1="9"
        y1="18"
        x2="15"
        y2="18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.path
        d="M9 3H15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  );
};
