'use client';

import React from 'react';
import { Box, Grid, Typography, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import { PRODUCT_THEMES } from '@/app/utils/productConstants';
import { useLanguage } from '@/app/utils/languageContext';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const theme = useTheme();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          p: 4,
          height: '100%',
          borderRadius: '20px',
          background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          '&:hover': {
            transform: 'translateY(-5px)',
            background:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            '& .feature-icon': {
              color: feature.color,
              transform: 'scale(1.1) rotate(5deg)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 0.5,
          },
        }}
      >
        <Icon
          className="feature-icon"
          sx={{
            fontSize: '2.5rem',
            mb: 2,
            transition: 'all 0.3s ease',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontFamily: lexendFont.style.fontFamily,
          }}
        >
          {feature.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {feature.description}
        </Typography>
      </Box>
    </motion.div>
  );
};

interface ProductFeaturesProps {
  productId: string;
}

export default function ProductFeatures({ productId }: ProductFeaturesProps) {
  const { t } = useLanguage();
  const productTheme = PRODUCT_THEMES[productId as keyof typeof PRODUCT_THEMES];

  const productFeatures = t(`products.items.${productId}.caracteristics.items`);

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 800,
              mb: 6,
              fontFamily: lexendFont.style.fontFamily,
              background: productTheme.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t(`products.items.${productId}.caracteristics.title`)}
          </Typography>
        </motion.div>

        <Grid
          container
          spacing={4}
          sx={{
            px: { xs: 2, md: 0 },
          }}
        >
          {Array.isArray(productFeatures) &&
            productFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} md={6} key={feature.title}>
                <FeatureCard feature={feature} index={index} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
