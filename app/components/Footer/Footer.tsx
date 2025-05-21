/* eslint-disable indent */
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, Grid } from '@mui/material';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/utils/languageContext';
import { lexendFont, valorantFont } from '../../utils/fonts';
import SmartLink from '../SmartLink';
import SocialIcon from './SocialIcon';
import { useAssetPath } from '@/app/utils/useImagePath';

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

const renderStyledText = (text: string) => {
  const parts = text.split(/(\[company\].*?\[\/company\])/g);
  return parts.map((part, index) => {
    if (part.startsWith('[company]')) {
      const content = part.replace('[company]', '').replace('[/company]', '');
      return (
        <Box
          key={index}
          component="span"
          sx={{
            fontFamily: valorantFont.style.fontFamily,
            fontWeight: 600,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            px: 0.5,
          }}
        >
          {content}
        </Box>
      );
    }
    return part;
  });
};

const FooterLinkBox = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      whileHover={{ x: 8 }}
      sx={{
        color: theme.palette.text.secondary,
        fontSize: '0.875rem',
        transition: 'color 0.2s ease',
        display: 'inline-block',
        '&:hover': {
          color: theme.palette.text.primary,
        },
      }}
    >
      {children}
    </Box>
  );
};

export default function Footer() {
  const theme = useTheme();
  const { t } = useLanguage();

  const homeLinks = [
    { name: t('footer.home.items.home'), href: '/' },
    { name: t('footer.home.items.services'), href: '/#modular-section', scroll: true },
    { name: t('footer.home.items.techstack'), href: '/#tech-stack', scroll: true },
  ];

  const projectLinks = [
    { name: 'Heralds of Chaos', href: '/products/heralds-of-chaos' },
    { name: 'GY Accounts', href: '/products/gy-accounts' },
    { name: 'GY Messages', href: '/products/gy-messages' },
    { name: 'GY Documents', href: '/products/gy-documents' },
  ];

  const aboutLinks = [
    { name: t('footer.about.items.team'), href: '/about/team' },
    { name: t('footer.about.items.company'), href: '/about/company' },
  ];

  const legalLinks = [
    { name: t('footer.legal.items.privacy'), href: '/privacy' },
    { name: t('footer.legal.items.terms'), href: '/terms' },
    { name: t('footer.legal.items.cookies'), href: '/cookies' },
  ];

  const socialLinks = [
    { name: 'Contact', href: 'mailto:it@gycoding.com' },
    { name: 'GitHub', href: 'https://github.com/GY-CODING' },
    { name: 'X', href: 'https://x.com/GYCODING' },
    { name: 'Discord', href: 'https://discord.com/invite/YpEZtsXf6c' },
    { name: 'Support', href: 'https://github.com/orgs/GY-CODING/discussions/new?category=support' },
  ];

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        sx={{
          position: 'relative',
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          }`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 -10px 30px -10px rgba(0, 0, 0, 0.3)'
              : '0 -10px 30px -10px rgba(0, 0, 0, 0.1)',
          py: 6,
        }}
      >
        <MotionContainer maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo y descripción */}
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      background:
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                          : 'linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                      p: 2,
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Box sx={{ position: 'relative', width: 40, height: 40, mr: 1 }}>
                        <Image
                          src={useAssetPath('/gy-logo.png')}
                          alt="GYCoding Logo"
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: valorantFont.style.fontFamily,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '0.1em',
                          fontSize: '1.5rem',
                          textShadow:
                            theme.palette.mode === 'dark'
                              ? '0 0 20px rgba(236, 72, 153, 0.3)'
                              : '0 0 20px rgba(236, 72, 153, 0.2)',
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        {t('footer.company')}
                      </Typography>
                    </motion.div>
                  </Box>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
                        maxWidth: '300px',
                        lineHeight: 1.6,
                        textShadow:
                          theme.palette.mode === 'dark' ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
                      }}
                    >
                      {renderStyledText(t('about.description1'))}
                    </Typography>
                  </motion.div>
                </Box>

                {/* Social Icons */}
                <Box sx={{ display: 'flex', gap: 2, mb: { xs: 4, md: 0 } }}>
                  {socialLinks.map((link) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{
                        y: -5,
                        scale: 1.1,
                        transition: { type: 'spring', stiffness: 400 },
                      }}
                    >
                      <SocialIcon name={link.name} href={link.href} />
                    </motion.div>
                  ))}
                </Box>
              </MotionBox>
            </Grid>

            {/* Links de home */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {t('footer.home.title')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {homeLinks.map((item: any) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <SmartLink href={item.href}>{item.name}</SmartLink>
                  </motion.div>
                ))}
              </Box>
            </Grid>

            {/* Projects */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {t('footer.projects.title')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {projectLinks.map((item: any) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <SmartLink href={item.href}>{item.name}</SmartLink>
                  </motion.div>
                ))}
              </Box>
            </Grid>

            {/* Links de About */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {t('footer.about.title')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {aboutLinks.map((link) => (
                  <SmartLink key={link.name} href={link.href} className="footer-link">
                    <FooterLinkBox>{link.name}</FooterLinkBox>
                  </SmartLink>
                ))}
              </Box>
            </Grid>

            {/* Links legales */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {t('footer.legal.title')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {legalLinks.map((item: any) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <SmartLink href={item.href}>{item.name}</SmartLink>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: `1px solid ${
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }`,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
                  fontFamily: lexendFont.style.fontFamily,
                }}
              >
                {new Date().getFullYear()} @{t('footer.company').toUpperCase()} - {t('footer.rights')}
              </Typography>
            </Box>
          </motion.div>
        </MotionContainer>
      </MotionBox>
    </AnimatePresence>
  );
}
