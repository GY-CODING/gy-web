'use client';
import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '../utils/fonts';
import { useLanguage } from '../utils/languageContext';
import { gradientTextStyles } from '../utils/styles';
import Image from 'next/image';
import FadeIn from './animations/FadeIn';
import { useAssetPath } from '../utils/useImagePath';

const technologies = [
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#000000' },
  { name: 'Vercel', icon: '/icons/vercel.svg', color: '#000000' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg', color: '#47A248' },
  { name: 'Cloudflare', icon: '/icons/cloudflare.svg', color: '#F38020' },
  { name: 'Koyeb', icon: '/icons/koyeb.svg', color: '#121212' },
  { name: 'Spring Boot', icon: '/icons/springboot.svg', color: '#6DB33F' },
  { name: 'Postman', icon: '/icons/postman.svg', color: '#FF6C37' },
  { name: 'GitHub', icon: '/icons/github.svg', color: '#181717' },
  { name: 'Git', icon: '/icons/git.svg', color: '#F05032' },
  { name: 'Figma', icon: '/icons/figma.svg', color: '#F24E1E' },
];

export default function TechStack() {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Box
      id="tech-stack"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <FadeIn>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              ...gradientTextStyles('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'),
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 600,
              textAlign: 'center',
              mb: { xs: 4, sm: 6, md: 8 },
            }}
          >
            {t('techStack.title')}
          </Typography>
        </FadeIn>

        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
              },
            },
          }}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)',
            },
            gap: { xs: 3, sm: 4, md: 5 },
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            px: { xs: 2, sm: 4, md: 6 },
          }}
        >
          {technologies.map((tech) => (
            <Box
              key={tech.name}
              component={motion.div}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  scale: 0.95
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    duration: 0.5
                  }
                }
              }}
              whileHover={{
                y: -8,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: { xs: 2, sm: 3 },
                borderRadius: '16px',
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.03)'
                  : 'rgba(0, 0, 0, 0.02)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: theme.palette.mode === 'dark'
                    ? 'radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)'
                    : 'radial-gradient(circle at center, rgba(0,0,0,0.05), transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                  opacity: 1,
                },
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.03)',
                  '& .tech-icon': {
                    transform: 'scale(1.1)',
                  }
                },
              }}
            >
              <Box
                className="tech-icon"
                sx={{
                  position: 'relative',
                  width: { xs: '60px', sm: '70px', md: '80px' },
                  height: { xs: '60px', sm: '70px', md: '80px' },
                  borderRadius: '16px',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.9)',
                  border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 16px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    borderColor: tech.color,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? `rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, 0.1)`
                      : `rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, 0.05)`,
                  },
                }}
              >
                <Image
                  src={useAssetPath(tech.icon)}
                  alt={tech.name}
                  width={40}
                  height={40}
                  style={{
                    filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                    opacity: theme.palette.mode === 'dark' ? 0.9 : 0.8,
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  textAlign: 'center',
                  color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                  fontWeight: 500,
                }}
              >
                {tech.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};
