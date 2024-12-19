'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { lexendFont } from '../utils/fonts';
import LottieAnimation from './lottieAnimation';
import FadeIn from './animations/FadeIn';
import ParallaxScroll from './animations/ParallaxScroll';
import AnimatedTitle from './animations/AnimatedTitle';

const AboutSection = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: '100px' },
        background: theme.palette.mode === 'dark' ? 'transparent' : '#fff',
      }}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: { xs: 4, md: 10 },
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '1 1 50%' },
            pr: { md: 4 },
            width: '100%',
          }}
        >
          <FadeIn direction="up" delay={0.2}>
            <Box sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 3 }}>
              <AnimatedTitle text="Building Digital Dreams" />
            </Box>
          </FadeIn>

          <ParallaxScroll offset={20}>
            <FadeIn direction="up" delay={0.4}>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                  mb: 3,
                }}
              >
                At <span style={{ color: '#8C54FF', fontWeight: 600 }}>GYCODING</span>,
                we merge passion with technology. We are a team of developers 
                specialized in creating innovative digital solutions, 
                covering both frontend and backend development.
              </Typography>
            </FadeIn>
          </ParallaxScroll>

          <ParallaxScroll offset={40}>
            <FadeIn direction="up" delay={0.6}>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                  mb: 6,
                }}
              >
                Our commitment to continuous learning and innovation
                keeps us at the forefront of the latest web development
                technologies and trends.
              </Typography>
            </FadeIn>
          </ParallaxScroll>

          <ParallaxScroll offset={60}>
            <FadeIn direction="up" delay={0.8}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  component="button"
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontSize: '1rem',
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 3, sm: 4 },
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  Get Started
                </Box>
                <Box
                  component="button"
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontSize: '1rem',
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 3, sm: 4 },
                    borderRadius: '12px',
                    border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
                    backgroundColor: 'transparent',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  Learn More
                </Box>
              </Box>
            </FadeIn>
          </ParallaxScroll>
        </Box>

        <Box
          sx={{
            flex: { xs: '1 1 100%', md: '1 1 50%' },
            width: '100%',
            height: { xs: '300px', sm: '400px', md: '500px' },
            position: 'relative',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '280px', sm: '350px', md: '100%' },
              height: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
            }}
          >
            <FadeIn direction="left" delay={0.8}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: { xs: 'scale(1)', md: 'scale(1)' },
                }}
              >
                <LottieAnimation />
              </Box>
            </FadeIn>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
