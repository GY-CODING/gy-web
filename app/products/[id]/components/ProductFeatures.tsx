'use client';

import React from 'react';
import { Box, Grid, Typography, useTheme, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import {
  Code as CodeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  Group as GroupIcon,
  Games as GamesIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const features: { [key: string]: Feature[] } = {
  'heralds-of-chaos': [
    {
      icon: GamesIcon,
      title: 'Jugabilidad Inmersiva',
      description: 'Experiencia de juego fluida y envolvente con gráficos optimizados',
      color: '#FF4081',
    },
    {
      icon: SpeedIcon,
      title: 'Alto Rendimiento',
      description: 'Motor optimizado para mantener 60+ FPS en la mayoría de sistemas',
      color: '#7C4DFF',
    },
    {
      icon: CloudIcon,
      title: 'Multijugador Online',
      description: 'Servidores dedicados con baja latencia para PvP competitivo',
      color: '#00BCD4',
    },
    {
      icon: SecurityIcon,
      title: 'Anti-Cheat Robusto',
      description: 'Sistema de seguridad para garantizar partidas justas',
      color: '#4CAF50',
    },
  ],
  'gy-messages': [
    {
      icon: SecurityIcon,
      title: 'Cifrado E2E',
      description: 'Mensajes protegidos con cifrado de extremo a extremo',
      color: '#4CAF50',
    },
    {
      icon: SpeedIcon,
      title: 'Tiempo Real',
      description: 'Mensajería instantánea con latencia ultrabaja',
      color: '#00BCD4',
    },
    {
      icon: DevicesIcon,
      title: 'Multiplataforma',
      description: 'Disponible en web, iOS y Android con sincronización',
      color: '#FF4081',
    },
    {
      icon: StorageIcon,
      title: 'Respaldo Seguro',
      description: 'Historial de mensajes con backup automático',
      color: '#7C4DFF',
    },
  ],
  'gy-documents': [
    {
      icon: CloudIcon,
      title: 'Cloud-Native',
      description: 'Documentos accesibles desde cualquier lugar',
      color: '#2196F3',
    },
    {
      icon: GroupIcon,
      title: 'Colaboración',
      description: 'Edición en tiempo real con múltiples usuarios',
      color: '#4CAF50',
    },
    {
      icon: SecurityIcon,
      title: 'Encriptación',
      description: 'Documentos protegidos con cifrado AES-256',
      color: '#FF4081',
    },
    {
      icon: StorageIcon,
      title: 'Versionado',
      description: 'Control de versiones automático',
      color: '#9C27B0',
    },
  ],
  'gy-accounts': [
    {
      icon: SecurityIcon,
      title: '2FA Avanzado',
      description: 'Autenticación de dos factores con múltiples opciones',
      color: '#4CAF50',
    },
    {
      icon: SpeedIcon,
      title: 'SSO',
      description: 'Inicio de sesión único para todas las apps',
      color: '#2196F3',
    },
    {
      icon: CloudIcon,
      title: 'OAuth 2.0',
      description: 'Integración con proveedores de identidad',
      color: '#FF4081',
    },
    {
      icon: CodeIcon,
      title: 'API Robusta',
      description: 'API RESTful con documentación completa',
      color: '#9C27B0',
    },
  ],
};

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  const theme = useTheme();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          p: 4,
          height: '100%',
          borderRadius: '20px',
          background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          '&:hover': {
            transform: 'translateY(-5px)',
            background:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            '& .feature-icon': {
              color: feature.color,
              transform: 'scale(1.1) rotate(5deg)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 0.5,
          },
        }}
      >
        <Icon
          className="feature-icon"
          sx={{
            fontSize: '2.5rem',
            mb: 2,
            transition: 'all 0.3s ease',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1,
            fontFamily: lexendFont.style.fontFamily,
          }}
        >
          {feature.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {feature.description}
        </Typography>
      </Box>
    </motion.div>
  );
};

interface ProductFeaturesProps {
  productId: string;
}

export default function ProductFeatures({ productId }: ProductFeaturesProps) {
  const productFeatures = features[productId] || features['heralds-of-chaos'];

  return (
    <Box
      component="section"
      sx={{
        py: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
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
              mb: 8,
              textAlign: 'center',
              fontFamily: lexendFont.style.fontFamily,
              background: (theme) => `linear-gradient(135deg, 
                ${theme.palette.text.primary}, 
                ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              )`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Características Principales
          </Typography>
        </motion.div>

        <Grid
          container
          spacing={4}
          sx={{
            px: { xs: 2, md: 0 },
          }}
        >
          {productFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={feature.title}>
              <FeatureCard feature={feature} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
