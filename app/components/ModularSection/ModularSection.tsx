'use client';
import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import ModuleCard from './ModuleCard';
import { useScroll, motion } from 'framer-motion';
import { useRef } from 'react';
import { lexendFont } from '../../utils/fonts';
import AnimatedGrid from './AnimatedGrid';
import MobileServices from './MobileServices';
import { services } from '../../utils/services';
import { fadeInUpVariants, fadeInScaleVariants } from '../../utils/animations';
import { gradientTextStyles } from '../../utils/styles';

export default function ModularSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerRef = useRef(null);
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          style={{ width: '100%' }}
        >
          <Box sx={{
            textAlign: 'center',
            mb: { xs: 6, sm: 10, md: 12 },
            width: '100%',
          }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                fontFamily: lexendFont.style.fontFamily,
                ...gradientTextStyles('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'),
                mb: { xs: 2, sm: 3 },
              }}
            >
              Our Services
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                px: { xs: 2, sm: 4, md: 0 },
              }}
            >
              Transforming ideas into digital reality with cutting-edge technology and innovative solutions
            </Typography>
          </Box>
        </motion.div>

        {isMobile ? (
          <MobileServices modules={services} />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInScaleVariants}
            style={{ width: '100%' }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: { sm: 4, md: 6 },
                width: '100%',
              }}
            >
              {services.map((module, index) => (
                <Box
                  key={module.title}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <ModuleCard
                    {...module}
                    delay={index * 0.2}
                    progress={scrollYProgress}
                    index={index}
                  />
                </Box>
              ))}
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
