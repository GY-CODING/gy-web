import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '../../../../../utils/fonts';
import SectionBadge from '../../shared/SectionBadge';
import FeatureCard from './FeatureCard';
import type { ProductSectionProps } from '../../../types';

export default function ProductFeatures({ product, lang, mode }: ProductSectionProps) {
  const isDark = mode === 'dark';

  return (
    <Box
      id="features"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark ? 'transparent' : '#ffffff',
      }}
    >
      {/* Background accent orb */}
      <Box
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${product.theme.primary}${isDark ? '12' : '0a'} 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 } }}>
            <SectionBadge
              label={lang === 'es' ? 'Características' : 'Features'}
              primaryColor={product.theme.primary}
              labelColor={isDark ? product.theme.accent : product.theme.secondary}
            />

            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2rem', md: '2.8rem' },
                fontWeight: 700,
                color: isDark ? '#fff' : 'grey.900',
                mb: 2,
              }}
            >
              {lang === 'es' ? 'Todo lo que necesitas' : 'Everything you need'}
            </Typography>

            <Typography
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255,255,255,0.5)' : 'grey.600',
                maxWidth: '550px',
                mx: 'auto',
              }}
            >
              {lang === 'es'
                ? `Descubre lo que hace especial a ${product.name}`
                : `Discover what makes ${product.name} special`}
            </Typography>
          </Box>
        </motion.div>

        {/* Feature cards grid */}
        <Grid container spacing={3}>
          {product.features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <FeatureCard
                feature={feature}
                lang={lang}
                isDark={isDark}
                primaryColor={product.theme.primary}
                textGradient={product.theme.textGradient}
                index={i}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
