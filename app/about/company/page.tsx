'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { lexendFont, valorantFont } from '../../utils/fonts';
import { motion } from 'framer-motion';
import { useLanguage } from '../../utils/languageContext';
import AuroraBackground from '../../components/home/AuroraBackground';
import EyebrowBadge from '../../components/home/EyebrowBadge';
import AnimatedGradientHeadline from '../../components/home/AnimatedGradientHeadline';
import TiltCard from '../../components/home/TiltCard';
import GlassTile from '../../components/home/GlassTile';

interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

const VALUE_GRADIENTS = [
  'linear-gradient(135deg, #6366f1 0%, #8C54FF 100%)',
  'linear-gradient(135deg, #ec4899 0%, #8C54FF 100%)',
  'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  'linear-gradient(135deg, #8C54FF 0%, #ec4899 100%)',
];

const renderStyledText = (text: string) => {
  const parts = text.split(/(\[company\].*?\[\/company\])/g);
  return parts.map((part, index) => {
    if (part.startsWith('[company]')) {
      const content = part.replace('[company]', '').replace('[/company]', '');
      return (
        <Box
          key={index}
          component="span"
          sx={{
            fontFamily: valorantFont.style.fontFamily,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            px: 0.5,
          }}
        >
          {content}
        </Box>
      );
    }
    return part;
  });
};

const ValueCard = ({ value, index }: { value: ValueItem; index: number }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ height: '100%' }}
    >
      <TiltCard maxTilt={6}>
        <Box
          sx={{
            p: { xs: 3, sm: 4 },
            height: '100%',
            borderRadius: '24px',
            backgroundColor: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <GlassTile
            icon={<span>{value.icon}</span>}
            gradient={VALUE_GRADIENTS[index % VALUE_GRADIENTS.length]}
            size={60}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: lexendFont.style.fontFamily,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {value.title}
          </Typography>
          <Typography
            sx={{
              color: isDark ? 'grey.400' : 'grey.600',
              lineHeight: 1.7,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            {value.description}
          </Typography>
        </Box>
      </TiltCard>
    </motion.div>
  );
};

export default function CompanyPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLanguage();

  const values = t('company.values.items') as unknown as ValueItem[];

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        pt: { xs: '112px', sm: '120px', md: '128px' },
        pb: { xs: 10, md: 14 },
      }}
    >
      <AuroraBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 8, md: 12 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <EyebrowBadge>{t('company.eyebrow')}</EyebrowBadge>
          </Box>

          <AnimatedGradientHeadline
            text={t('company.title')}
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.2rem' },
              lineHeight: 1.08,
              mb: 3,
              textAlign: 'center',
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: '1.125rem', sm: '1.25rem' },
              color: isDark ? 'grey.300' : 'grey.700',
              lineHeight: 1.6,
            }}
          >
            {t('company.description')}
          </Typography>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: '28px',
              backgroundColor: isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.08)',
              mb: { xs: 8, md: 12 },
              maxWidth: 820,
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.8rem', md: '0.85rem' },
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(236,72,153,0.9)' : 'rgba(140,84,255,0.9)',
                mb: 2,
              }}
            >
              {t('company.story.eyebrow')}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: isDark ? 'grey.300' : 'grey.700',
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {renderStyledText(t('company.story.part1'))}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: isDark ? 'grey.300' : 'grey.700',
                lineHeight: 1.8,
              }}
            >
              {renderStyledText(t('company.story.part2'))}
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <EyebrowBadge>{t('company.values.eyebrow')}</EyebrowBadge>
            </Box>
            <AnimatedGradientHeadline
              text={t('company.values.title')}
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: { xs: 3, sm: 4 },
            }}
          >
            {Array.isArray(values) &&
              values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
