'use client';

import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Computer as ComputerIcon,
  PhoneIphone as MobileIcon,
  Language as WebIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Memory as MemoryIcon,
  Gamepad as GamepadIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { lexendFont } from '@/app/utils/fonts';

interface Requirement {
  icon: React.ElementType;
  title: string;
  value: string;
  color: string;
}

const requirements: { [key: string]: { title: string; items: Requirement[] } } = {
  'heralds-of-chaos': {
    title: 'Requisitos del Sistema',
    items: [
      {
        icon: ComputerIcon,
        title: 'Sistema',
        value: 'Windows 10 64-bit',
        color: '#FF4081',
      },
      {
        icon: MemoryIcon,
        title: 'Procesador',
        value: 'Intel i5 o AMD equivalente',
        color: '#7C4DFF',
      },
      {
        icon: GamepadIcon,
        title: 'Gráficos',
        value: 'NVIDIA GTX 1060 6GB',
        color: '#00BCD4',
      },
      {
        icon: SpeedIcon,
        title: 'Memoria',
        value: '8 GB RAM',
        color: '#4CAF50',
      },
    ],
  },
  'gy-messages': {
    title: 'Compatibilidad',
    items: [
      {
        icon: WebIcon,
        title: 'Web',
        value: 'Chrome, Firefox, Safari',
        color: '#2196F3',
      },
      {
        icon: MobileIcon,
        title: 'Móvil',
        value: 'iOS 12+, Android 8+',
        color: '#FF4081',
      },
      {
        icon: SecurityIcon,
        title: 'Seguridad',
        value: 'Cifrado de extremo a extremo',
        color: '#4CAF50',
      },
      {
        icon: SpeedIcon,
        title: 'Red',
        value: 'Conexión estable a Internet',
        color: '#FFC107',
      },
    ],
  },
  'gy-documents': {
    title: 'Especificaciones',
    items: [
      {
        icon: WebIcon,
        title: 'Navegador',
        value: 'Cualquier navegador moderno',
        color: '#2196F3',
      },
      {
        icon: StorageIcon,
        title: 'Almacenamiento',
        value: 'Espacio en la nube',
        color: '#9C27B0',
      },
      {
        icon: SecurityIcon,
        title: 'Privacidad',
        value: 'Documentos encriptados',
        color: '#4CAF50',
      },
      {
        icon: SpeedIcon,
        title: 'Sincronización',
        value: 'Tiempo real',
        color: '#FF4081',
      },
    ],
  },
  'gy-accounts': {
    title: 'Características',
    items: [
      {
        icon: SecurityIcon,
        title: 'Autenticación',
        value: 'Multi-factor',
        color: '#4CAF50',
      },
      {
        icon: WebIcon,
        title: 'Acceso',
        value: 'Web y móvil',
        color: '#2196F3',
      },
      {
        icon: SpeedIcon,
        title: 'Respuesta',
        value: 'Inmediata',
        color: '#FF4081',
      },
      {
        icon: StorageIcon,
        title: 'Datos',
        value: 'Respaldo automático',
        color: '#9C27B0',
      },
    ],
  },
};

const RequirementCard = ({ requirement, index }: { requirement: Requirement; index: number }) => {
  const theme = useTheme();
  const Icon = requirement.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Box
        sx={{
          p: 3,
          height: '100%',
          borderRadius: '16px',
          background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            background:
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            '& .requirement-icon': {
              color: requirement.color,
              transform: 'scale(1.1)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${requirement.color}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 0.5,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Icon
            className="requirement-icon"
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
              fontSize: '1rem',
              fontWeight: 600,
              mb: 1,
              fontFamily: lexendFont.style.fontFamily,
            }}
          >
            {requirement.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '0.9rem',
              color: theme.palette.text.secondary,
            }}
          >
            {requirement.value}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

interface SystemRequirementsProps {
  productId: string;
}

export default function SystemRequirements({ productId }: SystemRequirementsProps) {
  const productRequirements = requirements[productId] || requirements['heralds-of-chaos'];

  return (
    <Box sx={{ py: 12 }}>
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
          {productRequirements.title}
        </Typography>
      </motion.div>

      <Grid
        container
        spacing={4}
        sx={{
          px: { xs: 2, md: 8 },
        }}
      >
        {productRequirements.items.map((req, index) => (
          <Grid item xs={12} sm={6} md={3} key={req.title}>
            <RequirementCard requirement={req} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
