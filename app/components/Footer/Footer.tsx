'use client';
import React from 'react';
import { Box, Container, Typography, useTheme, Grid } from '@mui/material';
import Image from 'next/image';
import FooterLink from './FooterLink';
import SocialIcon from './SocialIcon';
import { lexendFont, valorantFont } from '../../utils/fonts';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    { name: 'GitHub', href: 'https://github.com', icon: '/icons/github.svg' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: '/icons/linkedin.svg' },
    { name: 'Twitter', href: 'https://twitter.com', icon: '/icons/twitter.svg' },
  ],
};

const MotionBox = motion(Box);
const MotionContainer = motion(Container);

export default function Footer() {
  const theme = useTheme();

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          position: 'relative',
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.85)'
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)'
            }`,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 -10px 30px -10px rgba(0, 0, 0, 0.3)'
            : '0 -10px 30px -10px rgba(0, 0, 0, 0.1)',
          py: 6,
          mt: '20px',
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
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(45deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
                        : 'linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                      p: 2,
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box sx={{ position: 'relative', width: 40, height: 40, mr: 1 }}>
                        <Image
                          src="icons/gy_icon.svg"
                          alt="GYCoding Logo"
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
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
                          textShadow: theme.palette.mode === 'dark'
                            ? '0 0 20px rgba(236, 72, 153, 0.3)'
                            : '0 0 20px rgba(236, 72, 153, 0.2)',
                        }}
                      >
                        GyCoding
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
                        textShadow: theme.palette.mode === 'dark'
                          ? '0 0 10px rgba(0, 0, 0, 0.3)'
                          : 'none',
                      }}
                    >
                      Transforming ideas into digital reality. We create innovative solutions
                      that drive business growth and user engagement.
                    </Typography>
                  </motion.div>
                </Box>

                {/* Social Icons */}
                <Box sx={{ display: 'flex', gap: 2, mb: { xs: 4, md: 0 } }}>
                  {navigation.social.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{
                        y: -5,
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <SocialIcon {...item} />
                    </motion.div>
                  ))}
                </Box>
              </MotionBox>
            </Grid>

            {/* Navigation Links */}
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontWeight: 600,
                    mb: 2,
                    color: theme.palette.mode === 'dark' ? 'grey.200' : 'grey.800',
                  }}
                >
                  Navigation
                </Typography>
                <Grid container spacing={2}>
                  {navigation.main.map((item, index) => (
                    <Grid item key={item.name} xs={6}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <FooterLink {...item} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
            </Grid>

            {/* Legal Links */}
            <Grid item xs={12} md={4}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: lexendFont.style.fontFamily,
                    fontWeight: 600,
                    mb: 2,
                    color: theme.palette.mode === 'dark' ? 'grey.200' : 'grey.800',
                  }}
                >
                  Legal
                </Typography>
                <Grid container spacing={2}>
                  {navigation.legal.map((item, index) => (
                    <Grid item key={item.name} xs={12}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <FooterLink {...item} />
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </MotionBox>
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
                borderTop: `1px solid ${theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)'
                  }`,
                textAlign: 'center',
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)'
                  : 'linear-gradient(to top, rgba(255, 255, 255, 0.2), transparent)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.600',
                  fontFamily: lexendFont.style.fontFamily,
                }}
              >
                {new Date().getFullYear()} @GYCODING. All rights reserved.
              </Typography>
            </Box>
          </motion.div>
        </MotionContainer>
      </MotionBox>
    </AnimatePresence>
  );
}
