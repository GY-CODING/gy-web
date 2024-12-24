'use client';

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Code as CodeIcon,
  Storage as DatabaseIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  Speed as PerformanceIcon,
  Devices as CrossPlatformIcon,
} from '@mui/icons-material';
import { lexendFont } from '@/app/utils/fonts';

interface Technology {
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const technologies: { [key: string]: Technology[] } = {
  'heralds-of-chaos': [
    {
      name: 'Unity Engine',
      icon: CodeIcon,
      description: 'Motor de juego principal',
      color: '#FF4081',
    },
    {
      name: 'C# Scripting',
      icon: CodeIcon,
      description: 'Lenguaje de programación principal',
      color: '#7C4DFF',
    },
    {
      name: 'Cross-Platform',
      icon: CrossPlatformIcon,
      description: 'Disponible en múltiples plataformas',
      color: '#00BCD4',
    },
  ],
  'gy-messages': [
    {
      name: 'WebSocket',
      icon: CloudIcon,
      description: 'Comunicación en tiempo real',
      color: '#2196F3',
    },
    {
      name: 'End-to-End Encryption',
      icon: SecurityIcon,
      description: 'Cifrado de extremo a extremo',
      color: '#4CAF50',
    },
    {
      name: 'High Performance',
      icon: PerformanceIcon,
      description: 'Alto rendimiento',
      color: '#F44336',
    },
  ],
  'gy-documents': [
    {
      name: 'MongoDB',
      icon: DatabaseIcon,
      description: 'Base de datos NoSQL',
      color: '#4CAF50',
    },
    {
      name: 'Node.js',
      icon: CodeIcon,
      description: 'Backend en JavaScript',
      color: '#FFC107',
    },
    {
      name: 'React',
      icon: CodeIcon,
      description: 'Frontend interactivo',
      color: '#2196F3',
    },
  ],
  'gy-accounts': [
    {
      name: 'OAuth 2.0',
      icon: SecurityIcon,
      description: 'Autenticación segura',
      color: '#FF9800',
    },
    {
      name: 'PostgreSQL',
      icon: DatabaseIcon,
      description: 'Base de datos relacional',
      color: '#9C27B0',
    },
    {
      name: 'Redis Cache',
      icon: PerformanceIcon,
      description: 'Caché de alto rendimiento',
      color: '#E91E63',
    },
  ],
};

interface TechnologiesUsedProps {
  productId: string;
  theme: any;
}

export default function TechnologiesUsed({ productId }: TechnologiesUsedProps) {
  const productTechnologies = technologies[productId] || technologies['heralds-of-chaos'];

  return (
    <Box sx={{ py: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 800,
            mb: 6,
            textAlign: 'center',
            fontFamily: lexendFont.style.fontFamily,
          }}
        >
          Stack Tecnológico
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {productTechnologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={tech.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    p: 4,
                    borderRadius: '16px',
                    background: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease-in-out',
                    overflow: 'hidden',
                    '&:hover': {
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.08)'
                          : 'rgba(0,0,0,0.04)',
                      '& .tech-icon': {
                        color: tech.color,
                        transform: 'scale(1.2) rotate(10deg)',
                      },
                      '& .tech-glow': {
                        opacity: 0.15,
                      },
                    },
                  }}
                >
                  {/* Efecto de brillo */}
                  <Box
                    className="tech-glow"
                    sx={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease-in-out',
                      pointerEvents: 'none',
                    }}
                  />

                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Icon
                        className="tech-icon"
                        sx={{
                          fontSize: '2.5rem',
                          color: (theme: { palette: { mode: string } }) =>
                            theme.palette.mode === 'dark'
                              ? 'rgba(255,255,255,0.7)'
                              : 'rgba(0,0,0,0.7)',
                          transition: 'all 0.3s ease-in-out',
                          mr: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontFamily: lexendFont.style.fontFamily,
                          background: `linear-gradient(135deg, ${tech.color}, ${tech.color}88)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {tech.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.7)'
                            : 'rgba(0,0,0,0.7)',
                        lineHeight: 1.6,
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
