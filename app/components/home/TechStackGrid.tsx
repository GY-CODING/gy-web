'use client';

import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { lexendFont } from '../../utils/fonts';
import { useLanguage } from '../../utils/languageContext';
import { gradientTextStyles } from '../../utils/styles';
import { getAssetPath } from '../../utils/useImagePath';
import EyebrowBadge from './EyebrowBadge';
import TiltCard from './TiltCard';

const technologies = [
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#818cf8' },
  { name: 'Vercel', icon: '/icons/vercel.svg', color: '#9ca3af' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg', color: '#47A248' },
  { name: 'Cloudflare', icon: '/icons/cloudflare.svg', color: '#F38020' },
  { name: 'Dokploy', icon: '/icons/dokploy.svg', color: '#8C54FF' },
  { name: 'Spring Boot', icon: '/icons/springboot.svg', color: '#6DB33F' },
  { name: 'Apidog', icon: '/icons/apidog.svg', color: '#0255FA' },
  { name: 'GitHub', icon: '/icons/github.svg', color: '#9ca3af' },
  { name: 'Git', icon: '/icons/git.svg', color: '#F05032' },
  { name: 'Figma', icon: '/icons/figma.svg', color: '#F24E1E' },
];

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function TechStackGrid() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <Box id="tech-stack" component="section" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <EyebrowBadge>{t('techStack.eyebrow')}</EyebrowBadge>
          </Box>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              ...gradientTextStyles('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'),
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 600,
              mb: 2,
            }}
          >
            {t('techStack.title')}
          </Typography>
          <Typography
            sx={{
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: isDark ? 'grey.300' : 'grey.700',
              maxWidth: 640,
              mx: 'auto',
            }}
          >
            {t('techStack.description')}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
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
          }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 100, damping: 12 },
                },
              }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: 4 + (index % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
              >
                <TiltCard maxTilt={14}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      p: { xs: 2, sm: 3 },
                      borderRadius: '20px',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.015)',
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                      '&:hover': {
                        borderColor: tech.color,
                        boxShadow: `0 20px 50px -15px ${hexToRgba(tech.color, isDark ? 0.45 : 0.3)}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: { xs: '56px', sm: '64px', md: '72px' },
                        height: { xs: '56px', sm: '64px', md: '72px' },
                        borderRadius: '16px',
                        backgroundColor: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(255,255,255,0.9)',
                        border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        p: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={getAssetPath(tech.icon)}
                        alt={tech.name}
                        width={40}
                        height={40}
                        style={{
                          filter: isDark ? 'brightness(0) invert(1)' : 'none',
                          opacity: isDark ? 0.9 : 0.8,
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: lexendFont.style.fontFamily,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 500,
                        color: isDark ? 'grey.300' : 'grey.700',
                      }}
                    >
                      {tech.name}
                    </Typography>
                  </Box>
                </TiltCard>
              </motion.div>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
