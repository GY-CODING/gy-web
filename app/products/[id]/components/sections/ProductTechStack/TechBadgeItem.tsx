import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '../../../../../utils/fonts';
import type { TechBadge } from '../../../../data/products';

interface TechBadgeItemProps {
  tech: TechBadge;
  isDark: boolean;
  index: number;
}

export default function TechBadgeItem({ tech, isDark, index }: TechBadgeItemProps) {
  const iconColor = isDark ? tech.color : tech.color === '#ffffff' ? '#000000' : tech.color;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      // The stagger delay lives inside the entrance target only: on the shared `transition`
      // prop it would also delay the hover, making later badges react slower.
      whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.4, delay: index * 0.08 } }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.2 } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: { xs: 2.5, md: 3 },
          py: { xs: 1.25, md: 1.5 },
          borderRadius: '14px',
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
          cursor: 'default',
          '&:hover': {
            borderColor: `${tech.color}55`,
            background: isDark ? `${tech.color}11` : `${tech.color}18`,
            boxShadow: `0 20px 50px -15px ${tech.color}66`,
          },
        }}
      >
        <Box
          component={tech.icon as React.ElementType}
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            color: iconColor,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: { xs: '0.85rem', md: '0.95rem' },
            fontWeight: 500,
            color: isDark ? 'rgba(255,255,255,0.75)' : 'grey.800',
            whiteSpace: 'nowrap',
          }}
        >
          {tech.name}
        </Typography>
      </Box>
    </motion.div>
  );
}
