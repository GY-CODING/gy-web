'use client';
import { Box } from '@mui/material';
import Hero from './components/home/Hero';
import TechStackGrid from './components/home/TechStackGrid';
import ServicesShowcase from './components/ModularSection/ServicesShowcase';

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
        }}
      >
        <Hero />
        <TechStackGrid />
        <ServicesShowcase />
      </Box>
    </Box>
  );
}
