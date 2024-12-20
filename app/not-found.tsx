'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material';
import { lexendFont } from './utils/fonts';
import LottieAnimation from './components/lottieAnimation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              width: { xs: 280, sm: 400 },
              height: { xs: 280, sm: 400 },
              mx: 'auto',
              mb: 4,
              position: 'relative',
            }}
          >
            <LottieAnimation animationPath="/lottie/not_found.json" />
          </Box>

          <Typography
            variant="h1"
            sx={{
              ...lexendFont.style,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(to right, #6366f1, #a855f7)'
                : 'linear-gradient(to right, #4f46e5, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              ...lexendFont.style,
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.700',
              mb: 4,
            }}
          >
            Oops! The page you're looking for doesn't exist or has been moved.
          </Typography>

          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              sx={{
                ...lexendFont.style,
                backgroundColor: theme.palette.mode === 'dark' ? '#6366f1' : '#4f46e5',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#4f46e5' : '#3730a3',
                },
              }}
            >
              Back to Home
            </Button>
          </Link>
        </Box>
      </motion.div>
    </Container>
  );
}
