/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useRef, useState, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Box, Container, Typography, Button, Popover, useTheme, Stack, alpha } from '@mui/material';
import { Download as DownloadIcon, AccountCircle as LoginIcon } from '@mui/icons-material';
import { GiCrossedSwords } from 'react-icons/gi';
import { BiMessageDetail } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { HiDocument } from 'react-icons/hi';
import { lexendFont } from '@/app/utils/fonts';
import ProductFeatures from './ProductFeatures';
import ProductDetails from './ProductDetails';
import FAQ from './FAQ'; // Import the FAQ component
import { products } from '../../data/products';
import RunicBackground from '@/app/components/animations/RunicBackground';
import { useLanguage } from '../../../utils/languageContext';
import ProductDetailsMobile from './ProductDetailsMobile';

// Constantes y temas
const PRODUCT_THEMES = {
  'heralds-of-chaos': {
    primary: '#FFC400',
    secondary: '#FFD740',
    gradient: 'linear-gradient(135deg, #FFC400 0%, #FFD740 100%)',
    icon: DownloadIcon,
    accentColor: '#FFC400',
  },
  'gy-messages': {
    primary: '#34C759',
    secondary: '#4CD964',
    gradient: 'linear-gradient(135deg, #34C759 0%, #4CD964 100%)',
    icon: DownloadIcon,
    accentColor: '#34C759',
  },
  'gy-documents': {
    primary: '#1976D2', // Azul
    secondary: '#2196F3', // Azul más claro
    gradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)', // Degradado azul
    icon: DownloadIcon,
    accentColor: '#1976D2', // Puede ser el mismo que el color primario
  },
  'gy-accounts': {
    primary: '#7A288A',
    secondary: '#8F2D9E',
    gradient: 'linear-gradient(135deg, #7A288A 0%, #8F2D9E 100%)',
    icon: DownloadIcon,
    accentColor: '#662376',
  },
} as const;

const ProductBackground = memo(
  ({ product, opacity = 0.03 }: { product: any; opacity?: number }) => (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        opacity,
        zIndex: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: (theme) =>
            `linear-gradient(to bottom, ${alpha(theme.palette.background.default, 0)} 0%, ${theme.palette.background.default} 100%)`,
        },
      }}
    >
      <Image
        src={product.image}
        alt=""
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
      />
    </Box>
  )
);

ProductBackground.displayName = 'ProductBackground';

const DownloadButton = memo(
  ({
    productId,
    gradient,
    onClick,
    t,
  }: {
    productId: string;
    gradient: string;
    onClick: () => void;
    t: any;
  }) => (
    <Button
      variant="contained"
      size="large"
      onClick={productId === 'gy-accounts' ? undefined : onClick}
      startIcon={productId === 'gy-accounts' ? <LoginIcon /> : <DownloadIcon />}
      href={productId === 'gy-accounts' ? 'https://accounts.gycoding.com' : '#'}
      sx={{
        background:
          productId === 'gy-documents' ? PRODUCT_THEMES['gy-documents'].primary : gradient,
        px: 4,
        py: 1.5,
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: 2,
        textTransform: 'none',
        '&:hover': {
          background:
            productId === 'gy-documents' ? PRODUCT_THEMES['gy-documents'].primary : gradient,
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s ease-in-out',
          boxShadow: (theme) => boxShadow(theme),
        },
      }}
    >
      {productId === 'gy-accounts' ? t('products.download.login') : t('products.download.button')}
    </Button>
  )
);

DownloadButton.displayName = 'DownloadButton';

const DownloadPopover = memo(
  ({
    open,
    anchorEl,
    onClose,
    productTheme,
  }: {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    productTheme: (typeof PRODUCT_THEMES)[keyof typeof PRODUCT_THEMES];
  }) => (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      sx={{
        mt: 1,
        '& .MuiPopover-paper': {
          borderRadius: 2,
          boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
        },
      }}
    >
      <Box sx={{ p: 2, width: 200 }}>
        <Stack spacing={1}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: productTheme.gradient,
              '&:hover': {
                background: productTheme.gradient,
                filter: 'brightness(1.1)',
              },
            }}
          >
            Windows
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: productTheme.gradient,
              '&:hover': {
                background: productTheme.gradient,
                filter: 'brightness(1.1)',
              },
            }}
          >
            macOS
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: productTheme.gradient,
              '&:hover': {
                background: productTheme.gradient,
                filter: 'brightness(1.1)',
              },
            }}
          >
            Linux
          </Button>
        </Stack>
      </Box>
    </Popover>
  )
);

DownloadPopover.displayName = 'DownloadPopover';

function boxShadow(theme: any) {
  return `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`;
}

const HeroSection = memo(
  ({
    product,
    productTheme,
    onDownloadClick,
    theme,
    t,
  }: {
    product: any;
    productTheme: (typeof PRODUCT_THEMES)[keyof typeof PRODUCT_THEMES];
    onDownloadClick: () => void;
    theme: any;
    t: any;
  }) => (
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
        <RunicBackground color="#6366f1" productId={product.id} />
      </Box>

      <ProductBackground product={product} />

      <Container maxWidth="lg" sx={{ position: 'relative', textAlign: 'center' }}>
        {/* Icono de fondo según el producto */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: theme.palette.mode === 'dark' ? 0.15 : 0.15,
            fontSize: '25rem',
            color: product.color,
            zIndex: 0,
          }}
        >
          {product.id === 'heralds-of-chaos' && <GiCrossedSwords />}
          {product.id === 'gy-messages' && <BiMessageDetail />}
          {product.id === 'gy-accounts' && <FaUserCircle />}
          {product.id === 'gy-documents' && <HiDocument />}
        </Box>

        <Stack
          spacing={4}
          alignItems="center"
          sx={{
            position: 'relative',
            zIndex: 1,
            py: { xs: 8, md: 12 },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                fontWeight: 700,
                mb: 2,
                fontFamily: lexendFont.style.fontFamily,
                color: product.color,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {t(`products.items.${product.id}.name`)}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                maxWidth: '800px',
                mx: 'auto',
                mb: 4,
                lineHeight: 1.5,
              }}
            >
              {t(`products.items.${product.id}.description`)}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DownloadButton
              productId={product.id}
              gradient={productTheme.gradient}
              onClick={onDownloadClick}
              t={t}
            />
          </motion.div>
        </Stack>
      </Container>
    </Container>
  )
);

HeroSection.displayName = 'HeroSection';

// Componente principal
interface ProductContentProps {
  productId: string;
}

export default function ProductContent({ productId }: ProductContentProps) {
  const theme = useTheme();
  const mainRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useLanguage();
  // Buscar el producto por ID
  const product = useMemo(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (!foundProduct) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return foundProduct;
  }, [productId]);

  // Memoizar el tema del producto
  const productTheme = useMemo(
    () =>
      PRODUCT_THEMES[product.id as keyof typeof PRODUCT_THEMES] ||
      PRODUCT_THEMES['heralds-of-chaos'],
    [product.id]
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
    setAnchorEl(null);
  };

  return (
    <Box
      ref={mainRef}
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: theme.palette.text.primary,
      }}
    >
      <HeroSection
        product={product}
        productTheme={productTheme}
        onDownloadClick={handlePopoverOpen as any}
        theme={theme}
        t={t}
      />

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Stack spacing={16}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <ProductDetails productId={productId} />
            <ProductDetailsMobile productId={productId} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <ProductFeatures productId={productId} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <FAQ productId={productId} />
          </motion.div>
        </Stack>
      </Container>

      <DownloadPopover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        productTheme={productTheme}
      />
    </Box>
  );
}
