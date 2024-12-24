/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable indent */
'use client';

import React, { memo, useRef, useState, useMemo } from 'react';
import { Box, Container, Stack, Typography, useTheme, alpha, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import { useLanguage } from '@/app/utils/languageContext';
import { products } from '../../data/products';
import { FaWindows, FaApple, FaLinux, FaMobileAlt } from 'react-icons/fa';
import { SiAndroid, SiApple } from 'react-icons/si';
import { IoLogIn } from 'react-icons/io5';
import { GiCrossedSwords } from 'react-icons/gi';
import { BiMessageDetail } from 'react-icons/bi';
import { HiDocument } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Constantes y temas
const PRODUCT_THEMES = {
  'heralds-of-chaos': {
    primary: '#FF4D4D',
    secondary: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF4D4D 0%, #FF6B6B 100%)',
    icon: GiCrossedSwords,
    accentColor: '#FF4D4D',
  },
  'gy-messages': {
    primary: '#34C759',
    secondary: '#4CD964',
    gradient: 'linear-gradient(135deg, #34C759 0%, #4CD964 100%)',
    icon: BiMessageDetail,
    accentColor: '#34C759',
  },
  'gy-documents': {
    primary: '#1976D2',
    secondary: '#2196F3',
    gradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
    icon: HiDocument,
    accentColor: '#1976D2',
  },
  'gy-accounts': {
    primary: '#7A288A',
    secondary: '#8F2D9E',
    gradient: 'linear-gradient(135deg, #7A288A 0%, #8F2D9E 100%)',
    icon: FaUserCircle,
    accentColor: '#7A288A',
  },
} as const;

// Cargar el fondo de manera dinámica
const RunicBackground = dynamic(() => import('@/app/components/animations/RunicBackground'), {
  ssr: false,
  loading: () => null,
});

// Componente de fondo del producto
const ProductBackground = memo(({ product }: { product: any }) => (
  <Box
    sx={{
      position: 'absolute',
      inset: 0,
      opacity: 0.03,
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
    <Image src={product.image} alt="" fill style={{ objectFit: 'cover' }} quality={100} priority />
  </Box>
));

ProductBackground.displayName = 'ProductBackground';

// Botón de descarga
const DownloadButton = memo(
  ({
    productId,
    gradient,
    onClick,
  }: {
    productId: string;
    gradient: string;
    onClick: () => void;
  }) => {
    const { t } = useLanguage();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handlePlatformClick = (platform: string) => {
      console.log(`Downloading for ${platform}`);
      handleClose();
      onClick();
    };

    const getPlatformIcon = (platform: string) => {
      switch (platform) {
        case 'windows':
          return <FaWindows style={{ marginRight: 8 }} />;
        case 'macos':
          return <FaApple style={{ marginRight: 8 }} />;
        case 'linux':
          return <FaLinux style={{ marginRight: 8 }} />;
        case 'android':
          return <SiAndroid style={{ marginRight: 8 }} />;
        case 'ios':
          return <SiApple style={{ marginRight: 8 }} />;
        case 'login':
          return <IoLogIn style={{ marginRight: 8 }} />;
        default:
          return <FaMobileAlt style={{ marginRight: 8 }} />;
      }
    };

    const renderPlatforms = () => {
      switch (productId) {
        case 'heralds-of-chaos':
          return (
            <>
              <MenuItem onClick={() => handlePlatformClick('windows')} sx={menuItemStyle}>
                {getPlatformIcon('windows')} Windows
              </MenuItem>
              <MenuItem onClick={() => handlePlatformClick('macos')} sx={menuItemStyle}>
                {getPlatformIcon('macos')} macOS
              </MenuItem>
              <MenuItem onClick={() => handlePlatformClick('linux')} sx={menuItemStyle}>
                {getPlatformIcon('linux')} Linux
              </MenuItem>
            </>
          );
        case 'gy-messages':
          return (
            <>
              <MenuItem onClick={() => handlePlatformClick('android')} sx={menuItemStyle}>
                {getPlatformIcon('android')} Android
              </MenuItem>
              <MenuItem onClick={() => handlePlatformClick('ios')} sx={menuItemStyle}>
                {getPlatformIcon('ios')} iOS
              </MenuItem>
            </>
          );
        case 'gy-documents':
          return (
            <>
              <MenuItem onClick={() => handlePlatformClick('windows')} sx={menuItemStyle}>
                {getPlatformIcon('windows')} Windows
              </MenuItem>
              <MenuItem onClick={() => handlePlatformClick('macos')} sx={menuItemStyle}>
                {getPlatformIcon('macos')} macOS
              </MenuItem>
              <MenuItem onClick={() => handlePlatformClick('linux')} sx={menuItemStyle}>
                {getPlatformIcon('linux')} Linux
              </MenuItem>
            </>
          );
        case 'gy-accounts':
          return (
            <MenuItem onClick={() => handlePlatformClick('login')} sx={menuItemStyle}>
              {getPlatformIcon('login')} {t('products.download.login')}
            </MenuItem>
          );
        default:
          return null;
      }
    };

    const buttonText =
      productId === 'heralds-of-chaos'
        ? t('products.download.demo')
        : productId === 'gy-accounts'
          ? t('products.download.login')
          : t('products.download.now');

    const menuItemStyle = {
      fontFamily: lexendFont.style.fontFamily,
      fontSize: '1rem',
      py: 1.5,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        color: gradient.split(' ')[0].replace('linear-gradient(', ''),
      },
    };

    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: gradient,
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: lexendFont.style.fontFamily,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onClick={handleClick}
        >
          {buttonText}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              ml: 1,
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                width: '8px',
                height: '2px',
                backgroundColor: 'white',
                borderRadius: '1px',
                transition: 'transform 0.3s ease',
              },
              '&::before': {
                transform: open ? 'rotate(-45deg)' : 'rotate(45deg)',
                right: '6px',
                top: '11px',
              },
              '&::after': {
                transform: open ? 'rotate(45deg)' : 'rotate(-45deg)',
                right: '12px',
                top: '11px',
              },
            }}
          />
        </motion.button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '12px',
              mt: 1,
              minWidth: 180,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 4px 20px rgba(0,0,0,0.3)'
                  : '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#ffffff',
            },
          }}
        >
          {renderPlatforms()}
        </Menu>
      </>
    );
  }
);

DownloadButton.displayName = 'DownloadButton';

// Componente Principal
export default function ProductContent({ productId }: { productId: string }) {
  const theme = useTheme();
  const { t } = useLanguage();
  const mainRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    () => PRODUCT_THEMES[product.id as keyof typeof PRODUCT_THEMES],
    [product.id]
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  return (
    <Box
      component="section"
      ref={mainRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 4, md: 8 },
        pb: { xs: 8, md: 12 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(15,15,20,1) 0%, rgba(20,20,25,1) 100%)'
            : 'linear-gradient(180deg, rgba(250,250,255,1) 0%, rgba(245,245,250,1) 100%)',
      }}
    >
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <RunicBackground color={product.color} />
      </Box>

      <ProductBackground product={product} />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
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
              {t(`products.items.${productId}.name`)}
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
              {t(`products.items.${productId}.description`)}
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
              onClick={() => handlePopoverOpen}
            />
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
}
