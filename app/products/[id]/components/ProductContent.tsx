'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  Button,
  Popover,
  useTheme,
  Divider,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Microsoft as WindowsIcon,
  Apple as AppleIcon,
  Apple as LinuxIcon,
  Gamepad as GamepadIcon,
  Message as MessageIcon,
  Code as CodeIcon,
  AccountCircle as AccountCircleIcon,
  Download as DownloadIcon,
  Login as LoginIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import { lexendFont } from '@/app/utils/fonts';
import AnimatedBackground from '@/app/components/animations/AnimatedBackground';
import { Product } from '../../data/products';

const PRODUCT_THEMES = {
  'heralds-of-chaos': {
    primary: '#8E44AD',
    secondary: '#9B59B6',
    gradient: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
    icon: GamepadIcon,
    accentColor: '#6A1B9A',
  },
  'gy-messages': {
    primary: '#2980B9',
    secondary: '#3498DB',
    gradient: 'linear-gradient(135deg, #2980B9 0%, #3498DB 100%)',
    icon: MessageIcon,
    accentColor: '#1976D2',
  },
  'gy-documents': {
    primary: '#E67E22',
    secondary: '#F39C12',
    gradient: 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
    icon: CodeIcon,
    accentColor: '#D35400',
  },
  'gy-accounts': {
    primary: '#16A085',
    secondary: '#1ABC9C',
    gradient: 'linear-gradient(135deg, #16A085 0%, #1ABC9C 100%)',
    icon: AccountCircleIcon,
    accentColor: '#00897B',
  },
};

interface ProductContentProps {
  product: Product;
}

export default function ProductContent({ product }: ProductContentProps) {
  const theme = useTheme();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const productTheme =
    PRODUCT_THEMES[product.id as keyof typeof PRODUCT_THEMES] || PRODUCT_THEMES['heralds-of-chaos'];
  const ProductIcon = productTheme.icon;

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '5deg']);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenPopover(false);
  };

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)'
            : 'linear-gradient(180deg, #f4f4f4 0%, #ffffff 100%)',
        color: theme.palette.text.primary,
      }}
    >
      <AnimatedBackground color={productTheme.primary} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
        {/* Hero Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    background: productTheme.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    mb: 2,
                    fontFamily: lexendFont.style.fontFamily,
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                  }}
                >
                  {product.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handlePopoverOpen}
                    startIcon={product.id === 'gy-accounts' ? <LoginIcon /> : <DownloadIcon />}
                    sx={{
                      background: productTheme.gradient,
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 10px 20px ${productTheme.primary}33`,
                      },
                    }}
                  >
                    {product.id === 'gy-accounts' ? 'Iniciar Sesión' : 'Descargar'}
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              style={{
                y,
                scale,
                rotate,
                transformOrigin: 'center',
                transition: 'transform 0.3s ease-out',
              }}
            >
              <Card
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: `0 30px 60px ${productTheme.primary}33`,
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${productTheme.primary}22`,
                }}
              >
                <Box
                  sx={{ position: 'relative', width: '100%', height: { xs: '300px', md: '500px' } }}
                >
                  <Image
                    src={`/images/products/${product.id}.webp`}
                    alt={product.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      filter: 'brightness(0.9) contrast(1.1)',
                    }}
                  />
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ my: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              mb: 6,
              textAlign: 'center',
              background: productTheme.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: lexendFont.style.fontFamily,
            }}
          >
            Características Principales
          </Typography>

          <Grid container spacing={4}>
            {product.features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '24px',
                    background:
                      theme.palette.mode === 'dark'
                        ? 'rgba(30, 30, 40, 0.5)'
                        : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(15px)',
                    border: `1px solid ${productTheme.primary}22`,
                    boxShadow:
                      theme.palette.mode === 'dark'
                        ? `0 10px 30px ${productTheme.primary}22`
                        : '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 20px 40px ${productTheme.primary}33`,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      mb: 3,
                      width: 80,
                      height: 80,
                      background: productTheme.gradient,
                      color: 'white',
                    }}
                  >
                    <ProductIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      color: productTheme.primary,
                      fontFamily: lexendFont.style.fontFamily,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQs Section */}
        <Box sx={{ my: { xs: 8, md: 12 } }}>
          <Typography
            variant="h3"
            sx={{
              mb: 6,
              textAlign: 'center',
              background: productTheme.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: lexendFont.style.fontFamily,
            }}
          >
            Preguntas Frecuentes
          </Typography>

          {product.faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, borderRadius: '24px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${index}-content`}
                id={`faq-${index}-header`}
              >
                <Typography variant="h6" sx={{ color: productTheme.primary }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Popover for Download/Login */}
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
            '& .MuiPaper-root': {
              borderRadius: '24px !important',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(15px)',
              boxShadow: `0 15px 50px ${productTheme.primary}33`,
              border: `1px solid ${productTheme.primary}22`,
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
            },
          }}
          slotProps={{
            paper: {
              elevation: 12,
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            <Box
              sx={{
                p: 4,
                minWidth: '300px',
                maxWidth: '400px',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  textAlign: 'center',
                  color: productTheme.primary,
                  fontFamily: lexendFont.style.fontFamily,
                }}
              >
                {product.id === 'gy-accounts' ? 'Iniciar Sesión' : 'Descargar'}
              </Typography>

              {product.id !== 'gy-accounts' ? (
                <Box>
                  <Grid container spacing={2}>
                    {[
                      {
                        os: 'Windows',
                        icon: <WindowsIcon />,
                        link: product.downloads?.windows,
                      },
                      {
                        os: 'macOS',
                        icon: <AppleIcon />,
                        link: product.downloads?.mac,
                      },
                      {
                        os: 'Linux',
                        icon: <LinuxIcon />,
                        link: product.downloads?.linux,
                      },
                    ].map((download, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Button
                          variant="outlined"
                          startIcon={download.icon}
                          fullWidth
                          disabled={!download.link}
                          href={download.link}
                          sx={{
                            borderRadius: '16px',
                            py: 1.5,
                            borderColor: productTheme.primary,
                            color: productTheme.primary,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: `${productTheme.primary}11`,
                              borderColor: productTheme.primary,
                              transform: 'scale(1.05)',
                            },
                          }}
                        >
                          {download.os}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    variant="subtitle1"
                    sx={{
                      textAlign: 'center',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Versión {product.version}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
                  Próximamente...
                </Typography>
              )}
            </Box>
          </motion.div>
        </Popover>
      </Container>
    </Box>
  );
}
