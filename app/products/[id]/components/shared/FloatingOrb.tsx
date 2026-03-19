import { motion } from 'framer-motion';

interface FloatingOrbProps {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}

export default function FloatingOrb({ size, color, top, left, delay }: FloatingOrbProps) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}44 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}
