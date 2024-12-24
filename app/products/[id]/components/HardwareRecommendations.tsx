'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import {
  Memory as MemoryIcon,
  GraphicEq as GraphicsIcon,
  Storage as StorageIcon,
  Laptop as LaptopIcon,
  Headset as HeadsetIcon,
  Mouse as MouseIcon,
} from '@mui/icons-material';

interface Hardware {
  name: string;
  description: string;
  icon: React.ElementType;
  imageUrl?: string;
  color: string;
}

const hardware: { [key: string]: Hardware[] } = {
  'heralds-of-chaos': [
    {
      name: 'Tarjeta Gráfica Gaming',
      description: 'NVIDIA RTX 3060 o superior para una experiencia visual óptima',
      icon: GraphicsIcon,
      color: '#76FF03',
    },
    {
      name: 'Procesador Gaming',
      description: 'Intel Core i7 o AMD Ryzen 7 para máximo rendimiento',
      icon: MemoryIcon,
      color: '#FF4081',
    },
    {
      name: 'SSD NVMe',
      description: 'SSD NVMe de 1TB para tiempos de carga rápidos',
      icon: StorageIcon,
      color: '#00BCD4',
    },
    {
      name: 'Monitor Gaming',
      description: 'Monitor 144Hz con G-Sync/FreeSync para juego fluido',
      icon: LaptopIcon,
      color: '#FFC107',
    },
    {
      name: 'Auriculares Gaming',
      description: 'Auriculares con sonido envolvente 7.1',
      icon: HeadsetIcon,
      color: '#9C27B0',
    },
    {
      name: 'Ratón Gaming',
      description: 'Ratón con sensor óptico de alta precisión',
      icon: MouseIcon,
      color: '#F44336',
    },
  ],
  'gy-messages': [
    {
      name: 'Smartphone',
      description: 'iPhone 12 o superior / Samsung Galaxy S21 o superior',
      icon: LaptopIcon,
      color: '#2196F3',
    },
    {
      name: 'Auriculares',
      description: 'Auriculares con cancelación de ruido para videollamadas',
      icon: HeadsetIcon,
      color: '#4CAF50',
    },
    {
      name: 'Webcam HD',
      description: 'Webcam 1080p para videollamadas de alta calidad',
      icon: LaptopIcon,
      color: '#FF9800',
    },
  ],
  'gy-documents': [
    {
      name: 'Monitor',
      description: 'Monitor 4K para mejor visualización de documentos',
      icon: LaptopIcon,
      color: '#E91E63',
    },
    {
      name: 'SSD',
      description: 'SSD para acceso rápido a documentos',
      icon: StorageIcon,
      color: '#673AB7',
    },
    {
      name: 'Escáner',
      description: 'Escáner de documentos de alta resolución',
      icon: LaptopIcon,
      color: '#009688',
    },
  ],
  'gy-accounts': [
    {
      name: 'Smartphone',
      description: 'Para autenticación de dos factores',
      icon: LaptopIcon,
      color: '#FF5722',
    },
    {
      name: 'Lector Biométrico',
      description: 'Para inicio de sesión seguro',
      icon: LaptopIcon,
      color: '#795548',
    },
    {
      name: 'Token de Seguridad',
      description: 'YubiKey o similar para autenticación física',
      icon: StorageIcon,
      color: '#607D8B',
    },
  ],
};

interface HardwareRecommendationsProps {
  productId: string;
  theme: any;
}

export default function HardwareRecommendations({
  productId,
  theme,
}: HardwareRecommendationsProps) {
  const productHardware = hardware[productId] || hardware['heralds-of-chaos'];

  return (
    <Box>
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
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
            fontFamily: lexendFont.style.fontFamily,
            background: theme.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Hardware Recomendado
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center">
        {productHardware.map((item, index) => {
          const Icon = item.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.primary}22`,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: `0 10px 30px ${item.color}33`,
                      '& .hardware-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: item.color,
                      },
                      '& .hardware-bg': {
                        opacity: 0.1,
                      },
                    },
                  }}
                >
                  <Box
                    className="hardware-bg"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      opacity: 0.05,
                      background: `linear-gradient(135deg, ${item.color}44 0%, transparent 100%)`,
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <Icon
                        className="hardware-icon"
                        sx={{
                          fontSize: '3.5rem',
                          mb: 3,
                          color: theme.primary,
                          transition: 'all 0.3s ease',
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          fontFamily: lexendFont.style.fontFamily,
                          color: item.color,
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
