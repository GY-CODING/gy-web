'use client';
import Image from 'next/image';
import { Box } from '@mui/material';
import AboutSection from './components/AboutSection';
import TechStack from './components/TechStack';
import ModularSection from './components/ModularSection/ModularSection';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        component="main"
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <AboutSection />
        <TechStack />
        <ModularSection />
      </Box>
    </Box>
  );
}
