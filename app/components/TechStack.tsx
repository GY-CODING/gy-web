'use client';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { lexendFont } from '../utils/fonts';
import FadeIn from './animations/FadeIn';

const technologies = [
  { name: 'Next.js', icon: '/icons/nextjs.svg' },
  { name: 'Vercel', icon: '/icons/vercel.svg' },
  { name: 'MongoDB', icon: '/icons/mongodb.svg' },
  { name: 'Cloudflare', icon: '/icons/cloudflare.svg' },
  { name: 'Koyeb', icon: '/icons/koyeb.svg' },
  { name: 'Spring Boot', icon: '/icons/springboot.svg' },
  { name: 'Postman', icon: '/icons/postman.svg' },
  { name: 'GitHub', icon: '/icons/github.svg' },
  { name: 'Git', icon: '/icons/git.svg' },
  { name: 'Figma', icon: '/icons/figma.svg' },
];

const TechStack = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      <FadeIn>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: lexendFont.style.fontFamily,
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 600,
            marginBottom: '4rem',
            textAlign: 'center',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        >
          Tech Stack
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
                width: { xs: '40px', sm: '50px', md: '60px' },
                height: { xs: '40px', sm: '50px', md: '60px' },
                position: 'relative',
                filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                fill
                style={{ 
                  objectFit: 'contain',
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
  );
};

export default TechStack;
