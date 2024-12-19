'use client';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion, MotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { lexendFont } from '../../utils/fonts';
import { ServiceModule } from '../../utils/services';
import { springTransition, iconSpringVariants } from '../../utils/animations';
import { cardStyles, iconStyles, smallIconStyles, gradientTextStyles } from '../../utils/styles';

interface ModuleCardProps extends ServiceModule {
  delay: number;
  progress: MotionValue<number>;
  index: number;
}

export default function ModuleCard({
  title,
  description,
  gradient,
  icon,
  techIcons = [],
  delay,
  progress,
}: ModuleCardProps) {
  const theme = useTheme();

  const scaleCard = useTransform(progress, [0, 0.5, 1], [0.8, 1, 1]);
  const opacityCard = useTransform(progress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        opacity: opacityCard,
        scale: scaleCard,
        width: '100%',
        maxWidth: '360px',
      }}
      transition={{
        ...springTransition,
        delay,
      }}
    >
      <Box sx={cardStyles(theme)}>
        <Box sx={iconStyles(theme)}>
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

        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            fontWeight: 600,
            fontFamily: lexendFont.style.fontFamily,
            ...gradientTextStyles(gradient),
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {techIcons.map((tech, i) => (
            <TechIcon key={tech} name={tech} />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}

function TechIcon({ name }: { name: string }) {
  const theme = useTheme();
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={iconSpringVariants}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Box sx={smallIconStyles(theme)}>
          <Image
            src={`/icons/${name.toLowerCase().replace('.', '').replace(' ', '')}.svg`}
            alt={name}
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
          {name}
        </Typography>
      </Box>
    </motion.div>
  );
}
