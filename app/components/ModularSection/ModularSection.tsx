'use client';
import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import ModuleCard from './ModuleCard';
import { useScroll, motion } from 'framer-motion';
import { useRef } from 'react';
import { lexendFont } from '../../utils/fonts';
import AnimatedGrid from './AnimatedGrid';
import MobileServices from './MobileServices';
import { useLanguage } from '../../utils/languageContext';
import { fadeInUpVariants, fadeInScaleVariants } from '../../utils/animations';
import { gradientTextStyles } from '../../utils/styles';

const getLocalizedServices = (t: (key: string) => string) => [
  {
    title: t('services.modules.webDev.title'),
    description: t('services.modules.webDev.description'),
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    icon: 'nextjs',
    techIcons: ['React', 'Next.js', 'TypeScript'],
  },
  {
    title: t('services.modules.backend.title'),
    description: t('services.modules.backend.description'),
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
    icon: 'springboot',
    techIcons: ['Spring Boot', 'Java', 'MongoDB'],
  },
  {
    title: t('services.modules.gameDev.title'),
    description: t('services.modules.gameDev.description'),
    gradient: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    icon: 'unity',
    techIcons: ['Unity', 'csharp', 'Blender'],
  },
];

export default function ModularSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const localizedServices = getLocalizedServices(t);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <Box
      ref={containerRef}
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, sm: 10, md: 12 },
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.920' : 'grey.00',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <AnimatedGrid />

      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              ...gradientTextStyles('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'),
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
            }}
          >
            {t('services.title')}
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' },
              color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
              maxWidth: '800px',
              margin: '0 auto',
              mb: { xs: 6, sm: 8, md: 10 },
            }}
          >
            {t('services.description')}
          </Typography>
        </motion.div>

        {isMobile ? (
          <MobileServices services={localizedServices} />
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 4, sm: 6, md: 8 },
              width: '100%',
            }}
          >
            {localizedServices.map((service, index) => (
              <ModuleCard
                key={service.title}
                module={service}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
