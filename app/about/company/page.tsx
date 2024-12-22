'use client';

import { Box, Container, Typography, useTheme, Grid } from '@mui/material';
import { lexendFont, valorantFont } from '../../utils/fonts';
import FadeIn from '../../components/animations/FadeIn';
import FlowingGrid from '../../components/animations/FlowingGrid';
import { motion } from 'framer-motion';
import { useLanguage } from '../../utils/languageContext';

interface ValueCard {
  title: string;
  description: string;
  icon: string;
}

const ValueCard = ({ value, index }: { value: ValueCard; index: number }) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          p: { xs: 3, sm: 4 },
          height: '100%',
          borderRadius: '20px',
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '2.5rem', mb: 2 }}>
          {value.icon}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontWeight: 600,
            mb: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value.title}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
            lineHeight: 1.7,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {value.description}
        </Typography>
      </Box>
    </motion.div>
  );
};

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

export default function CompanyPage() {
  const theme = useTheme();
  const { t } = useLanguage();

  const values = t('company.values.items');

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        pt: { xs: '80px', sm: '100px', md: '120px' },
        pb: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FlowingGrid />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FadeIn direction="up">
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 8, md: 12 },
              maxWidth: '800px',
              mx: 'auto',
              px: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 600,
                mb: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              {t('company.title')}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {t('company.description')}
            </Typography>
          </Box>
        </FadeIn>

        <FadeIn direction="up">
          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: '24px',
              backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              mb: { xs: 8, md: 12 },
              maxWidth: '800px',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              {renderStyledText(t('company.story.part1'))}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                lineHeight: 1.8,
              }}
            >
              {renderStyledText(t('company.story.part2'))}
            </Typography>
          </Box>
        </FadeIn>

        <Box sx={{ mb: { xs: 8, md: 12 }, width: '100%' }}>
          <FadeIn direction="up">
            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                mb: 6,
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('company.values.title')}
            </Typography>
          </FadeIn>

          <Grid container spacing={{ xs: 3, sm: 4 }}>
            {Array.isArray(values) &&
              values.map((value: ValueCard, index: number) => (
                <Grid item xs={12} md={6} key={value.title}>
                  <ValueCard value={value} index={index} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
