'use client';
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { lexendFont } from '../../utils/fonts';
import { ServiceModule } from '../../utils/services';
import { springTransition } from '../../utils/animations';
import { cardStyles, iconStyles, smallIconStyles, gradientTextStyles } from '../../utils/styles';

interface MobileServicesProps {
  services: ServiceModule[];
}

const MobileServices = ({ services }: MobileServicesProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ...springTransition,
            delay: index * 0.2,
          }}
        >
          <Box sx={cardStyles(theme)}>
            <Box sx={iconStyles(theme)}>
              <Image
                src={`/icons/${service.icon}.svg`}
                alt={service.title}
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
                ...gradientTextStyles(service.gradient),
              }}
            >
              {service.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                fontSize: '1rem',
                lineHeight: 1.6,
              }}
            >
              {service.description}
            </Typography>

            <Box
              sx={{
                mt: 'auto',
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              {service.techIcons?.map((tech) => (
                <Box
                  key={tech}
                  sx={{
                    ...smallIconStyles(theme),
                    position: 'relative',
                  }}
                >
                  <Image
                    src={`/icons/tech/${tech.toLowerCase()}.svg`}
                    alt={tech}
                    fill
                    style={{
                      objectFit: 'contain',
                      filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                      opacity: theme.palette.mode === 'dark' ? 0.9 : 0.8,
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

export default MobileServices;
