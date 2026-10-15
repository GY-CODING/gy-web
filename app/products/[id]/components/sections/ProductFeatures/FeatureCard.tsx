import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '../../../../../utils/fonts';
import GlassTile from '../../../../../components/home/GlassTile';
import type { Feature } from '../../../../data/products';

interface FeatureCardProps {
  feature: Feature;
  lang: 'en' | 'es';
  isDark: boolean;
  primaryColor: string;
  textGradient: string;
  index: number;
}

export default function FeatureCard({
  feature,
  lang,
  isDark,
  primaryColor,
  textGradient,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          height: '100%',
          p: { xs: 3, md: 3.5 },
          borderRadius: '24px',
          background: isDark ? 'rgba(17,17,17,0.6)' : 'rgba(255,255,255,0.9)',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
          backdropFilter: 'blur(10px)',
          boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.35)' : '0 20px 60px rgba(0,0,0,0.06)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: `${primaryColor}55`,
            boxShadow: isDark ? `0 8px 40px ${primaryColor}22` : `0 8px 32px ${primaryColor}22`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: textGradient,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
      >
        <Box sx={{ mb: 2.5 }}>
          <GlassTile icon={<span>{feature.icon}</span>} gradient={textGradient} size={60} />
        </Box>
        <Typography
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: '1.05rem',
            fontWeight: 600,
            color: isDark ? '#fff' : 'grey.900',
            mb: 1.5,
          }}
        >
          {lang === 'es' ? feature.titleEs : feature.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: '0.9rem',
            color: isDark ? 'rgba(255,255,255,0.5)' : 'grey.600',
            lineHeight: 1.7,
          }}
        >
          {lang === 'es' ? feature.descriptionEs : feature.description}
        </Typography>
      </Box>
    </motion.div>
  );
}
