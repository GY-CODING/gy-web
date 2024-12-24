'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Box, Container, Typography, Button, Popover, useTheme, Stack, alpha } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiPrisma, SiPostgresql } from 'react-icons/si';

import { lexendFont } from '@/app/utils/fonts';
import MatrixBackground from '@/app/components/animations/MatrixBackground';
import TechTerminal from './TechTerminal';
import SystemRequirements from './SystemRequirements';
import HardwareRecommendations from './HardwareRecommendations';
import { Product } from '../../data/products';

const PRODUCT_THEMES = {
  'heralds-of-chaos': {
    primary: '#FFC400',
    secondary: '#FFD740',
    gradient: 'linear-gradient(135deg, #FFC400 0%, #FFD740 100%)',
    icon: DownloadIcon,
    accentColor: '#FFB300',
  },
  'gy-messages': {
    primary: '#34C759',
    secondary: '#4CD964',
    gradient: 'linear-gradient(135deg, #34C759 0%, #4CD964 100%)',
    icon: DownloadIcon,
    accentColor: '#28B14B',
  },
  'gy-documents': {
    primary: '#FFA07A',
    secondary: '#FFB299',
    gradient: 'linear-gradient(135deg, #FFA07A 0%, #FFB299 100%)',
    icon: DownloadIcon,
    accentColor: '#FF8C61',
  },
  'gy-accounts': {
    primary: '#7A288A',
    secondary: '#8F2D9E',
    gradient: 'linear-gradient(135deg, #7A288A 0%, #8F2D9E 100%)',
    icon: DownloadIcon,
    accentColor: '#662376',
  },
};

interface ProductContentProps {
  product: Product;
}

export default function ProductContent({ product }: ProductContentProps) {
  const theme = useTheme();
  const mainRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const productTheme =
    PRODUCT_THEMES[product.id as keyof typeof PRODUCT_THEMES] || PRODUCT_THEMES['heralds-of-chaos'];
  const ProductIcon = productTheme.icon;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenPopover(false);
  };

  return (
    <Box
      ref={mainRef}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        '--background-color': theme.palette.mode === 'dark' ? '#000' : '#fff',
        background: 'var(--background-color)',
        color: theme.palette.text.primary,
      }}
    >
      {/* Hero Section */}
      <Container
        maxWidth={false}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 8, md: 0 },
          pb: { xs: 8, md: 0 },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <MatrixBackground color={product.color} />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.03,
            zIndex: 0,
          }}
        >
          {product.icon && (
            <Image
              src={product.icon}
              alt={product.name}
              width={800}
              height={800}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Stack
            spacing={4}
            alignItems="center"
            sx={{
              textAlign: 'center',
              width: '100%',
              mx: 'auto',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  background: productTheme.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '3rem', md: '5rem' },
                  fontWeight: 800,
                  mb: 2,
                  fontFamily: lexendFont.style.fontFamily,
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <Typography
                variant="h4"
                sx={{
                  mb: 4,
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                {product.description}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <Button
                variant="contained"
                onClick={handlePopoverOpen}
                startIcon={product.id === 'gy-accounts' ? <DownloadIcon /> : <DownloadIcon />}
                sx={{
                  background: productTheme.gradient,
                  color: 'white',
                  px: 6,
                  py: 2,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 10px 20px ${productTheme.primary}33`,
                  },
                }}
              >
                {product.id === 'gy-accounts' ? 'Iniciar Sesión' : 'Descargar'}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            >
              <ProductIcon
                sx={{
                  position: 'absolute',
                  fontSize: '400px',
                  opacity: 0.1,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: productTheme.primary,
                }}
              />
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      {/* Contenido Principal */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Stack spacing={16}>
          {/* Tecnologías */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 6,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.6)})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              Stack Tecnológico
            </Typography>

            <TechTerminal
              technologies={[
                {
                  name: 'Next.js',
                  icon: <SiNextdotjs size={32} />,
                  description:
                    'Framework React con renderizado híbrido y optimizaciones de rendimiento integradas.',
                },
                {
                  name: 'TypeScript',
                  icon: <SiTypescript size={32} />,
                  description:
                    'Desarrollo robusto y tipado para una mejor calidad de código y experiencia de desarrollo.',
                },
                {
                  name: 'Prisma',
                  icon: <SiPrisma size={32} />,
                  description: 'ORM moderno con soporte TypeScript y migraciones automáticas.',
                },
                {
                  name: 'PostgreSQL',
                  icon: <SiPostgresql size={32} />,
                  description: 'Base de datos relacional con más de 30 años de desarrollo activo.',
                },
                {
                  name: 'Docker',
                  icon: <FaDocker size={32} />,
                  description: 'Contenedorización para un despliegue consistente y reproducible.',
                },
                {
                  name: 'AWS',
                  icon: <FaAws size={32} />,
                  description: 'Infraestructura cloud escalable y servicios de última generación.',
                },
              ]}
            />
          </motion.div>

          {/* Requisitos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <SystemRequirements productId={product.id} theme={productTheme} />
          </motion.div>

          {/* Hardware */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <HardwareRecommendations productId={product.id} theme={productTheme} />
          </motion.div>
        </Stack>
      </Container>

      {/* Popover de Descarga */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${productTheme.primary}22`,
            p: 2,
            minWidth: 250,
          },
        }}
      >
        <Stack spacing={2}>
          <Button
            startIcon={<DownloadIcon />}
            fullWidth
            sx={{
              color: 'white',
              background: productTheme.gradient,
              borderRadius: '8px',
              py: 1,
              '&:hover': {
                background: productTheme.gradient,
                opacity: 0.9,
              },
            }}
          >
            Windows
          </Button>
          <Button
            startIcon={<DownloadIcon />}
            fullWidth
            sx={{
              color: 'white',
              background: productTheme.gradient,
              borderRadius: '8px',
              py: 1,
              '&:hover': {
                background: productTheme.gradient,
                opacity: 0.9,
              },
            }}
          >
            macOS
          </Button>
          <Button
            startIcon={<DownloadIcon />}
            fullWidth
            sx={{
              color: 'white',
              background: productTheme.gradient,
              borderRadius: '8px',
              py: 1,
              '&:hover': {
                background: productTheme.gradient,
                opacity: 0.9,
              },
            }}
          >
            Linux
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
}
