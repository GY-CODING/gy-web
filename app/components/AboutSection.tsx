'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { lexendFont, valorantFont } from '../utils/fonts';
import { gradientTextStyles } from '../utils/styles';
import LottieAnimation from './lottieAnimation';
import FadeIn from './animations/FadeIn';
import ParallaxScroll from './animations/ParallaxScroll';
import AnimatedTitle from './animations/AnimatedTitle';
import { useLanguage } from '../utils/languageContext';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const renderStyledText = (text: string) => {
    const parts = text.split(/(\[company\].*?\[\/company\])/);
    return parts.map((part, index) => {
      if (part.startsWith('[company]')) {
        const content = part.replace('[company]', '').replace('[/company]', '');
        return (
          <span
            key={index}
            style={{
              color: '#8C54FF',
              fontWeight: 400,
              fontFamily: valorantFont.style.fontFamily
            }}
          >
            {content}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        minHeight: { xs: '140vh', md: '100vh' },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 6, sm: 8, md: 12 },
        px: { xs: 2, sm: 4, md: '100px' },
        background: theme.palette.mode === 'dark' ? 'transparent' : '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'center',
          gap: { xs: 4, md: 10 },
          height: '100%',
          py: { md: 4 },
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
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  ...gradientTextStyles('linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'),
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.2rem' },
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {t('about.title')}
              </Typography>
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
                {renderStyledText(t('about.description1'))}
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
                  mb: 1,
                }}
              >
                {renderStyledText(t('about.description2'))}
              </Typography>
            </FadeIn>
          </ParallaxScroll>

          <ParallaxScroll offset={60}>
            <FadeIn direction="up" delay={0.8}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    mt: { xs: 4, sm: 6 },
                    display: 'inline-block',
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '16px 32px',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      fontFamily: lexendFont.style.fontFamily,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                    }}
                    onClick={() => {
                      // Handle click
                    }}
                  >
                    {t('about.buttons.button1')}
                  </Box>
                </Box>

                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    mt: { xs: 4, sm: 6 },
                    display: 'inline-block',
                  }}
                >
                  <Box
                    component="button"
                    sx={{
                      fontFamily: lexendFont.style.fontFamily,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      padding: '16px 32px',
                      borderRadius: '12px',
                      border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
                      backgroundColor: 'transparent',
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    {t('about.buttons.button2')}
                  </Box>
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
            marginTop: { xs: 4, md: 0 },
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
                <LottieAnimation animationPath="/lottie/lottie.json" />
              </Box>
            </FadeIn>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
