'use client';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { lexendFont } from '../../utils/fonts';

interface ServiceProps {
  title: string;
  description: string;
  gradient: string;
  icon: string;
  techIcons: string[];
  delay: number;
}

const MobileService = ({ title, description, gradient, icon, techIcons, delay }: ServiceProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: delay * 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
          p: 3,
          borderRadius: '16px',
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: theme.palette.mode === 'dark'
            ? `0 8px 16px rgba(0,0,0,0.4)`
            : `0 8px 16px rgba(0,0,0,0.1)`,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '60px',
            height: '60px',
            flexShrink: 0,
            filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 0 20px rgba(255,255,255,0.1))' : 'drop-shadow(0 0 20px rgba(0,0,0,0.1))',
          }}
        >
          <Image
            src={`/icons/${icon}.svg`}
            alt={title}
            fill
            style={{
              objectFit: 'contain',
              filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
              opacity: theme.palette.mode === 'dark' ? 0.9 : 0.8,
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              fontFamily: lexendFont.style.fontFamily,
              background: gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
              mb: 2,
              fontSize: '0.875rem',
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {techIcons.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: '20px',
                      height: '20px',
                      filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                      opacity: theme.palette.mode === 'dark' ? 0.9 : 0.7,
                    }}
                  >
                    <Image
                      src={`/icons/${tech.toLowerCase().replace('.', '').replace(' ', '')}.svg`}
                      alt={tech}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.75rem',
                      color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.600',
                    }}
                  >
                    {tech}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default function MobileServices({ modules }: { modules: any[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
      }}
    >
      {modules.map((module, index) => (
        <MobileService
          key={module.title}
          {...module}
          techIcons={
            module.icon === 'nextjs'
              ? ['React', 'Next.js', 'TypeScript']
              : module.icon === 'springboot'
              ? ['Spring Boot', 'Java', 'MongoDB']
              : ['Unity', 'C#', 'Blender']
          }
          delay={index}
        />
      ))}
    </Box>
  );
}
