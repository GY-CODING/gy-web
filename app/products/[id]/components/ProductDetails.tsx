'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import { useLanguage } from '@/app/utils/languageContext';
import { products } from '../../data/products';
import {
  SiNextdotjs,
  SiTypescript,
  SiPostgresql,
  SiUnity,
  SiUnity as SiCsharp,
  SiRedis,
  SiElasticsearch,
  SiAmazon,
  SiJsonwebtokens,
  SiBlender,
} from 'react-icons/si';
import { FaServer } from 'react-icons/fa';

// Mapa de iconos para las tecnologías
const TECH_ICONS: { [key: string]: JSX.Element } = {
  'Next.js': <SiNextdotjs />,
  TypeScript: <SiTypescript />,
  PostgreSQL: <SiPostgresql />,
  Unity: <SiUnity />,
  'C#': <SiCsharp />,
  Photon: <FaServer />,
  WebSocket: <FaServer />,
  Redis: <SiRedis />,
  'AWS S3': <SiAmazon />,
  ElasticSearch: <SiElasticsearch />,
  JWT: <SiJsonwebtokens />,
  OAuth2: <FaServer />,
  Blender: <SiBlender />,
};

export default function ProductDetails({ productId }: { productId: string }) {
  const { t } = useLanguage();
  const product = products.find((p) => p.id === productId);

  if (!product) return null;

  // Obtener las tecnologías del proyecto actual
  const technologies = Array.from({ length: 4 }, (_, i) => i + 1).map((index) => ({
    name: t(`products.items.${productId}.techStack.technologies.tech${index}.name`),
    description: t(`products.items.${productId}.techStack.technologies.tech${index}.description`),
  }));

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 12 },
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, rgba(15,15,20,1) 0%, rgba(20,20,25,1) 100%)'
            : 'linear-gradient(180deg, rgba(250,250,255,1) 0%, rgba(245,245,250,1) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            mb: { xs: 4, md: 8 },
            fontFamily: lexendFont.style.fontFamily,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 600,
            color: product.color,
          }}
        >
          {t(`products.items.${productId}.techStack.title`)}
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Línea central - solo visible en desktop */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'center', md: 'center' },
                  justifyContent: {
                    xs: 'center',
                    md: index % 2 === 0 ? 'flex-end' : 'flex-start',
                  },
                  gap: { xs: 2, md: 3 },
                  mb: { xs: 4, md: 6 },
                  px: { xs: 2, md: 4 },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                {index % 2 === 0 && (
                  <Box
                    sx={{
                      flex: { xs: 'none', md: 1 },
                      textAlign: { xs: 'center', md: 'right' },
                      maxWidth: '300px',
                      order: { xs: 2, md: 1 },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: lexendFont.style.fontFamily,
                        fontWeight: 500,
                        mb: 1,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {tech.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    width: { xs: 50, md: 60 },
                    height: { xs: 50, md: 60 },
                    borderRadius: '50%',
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '1.5rem', md: '1.75rem' },
                    color: product.color,
                    position: 'relative',
                    zIndex: 1,
                    transition: 'all 0.2s',
                    order: { xs: 1, md: 2 },
                    '&:hover': {
                      transform: 'scale(1.1)',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {TECH_ICONS[tech.name] || <FaServer />}
                </Box>

                {index % 2 === 1 && (
                  <Box
                    sx={{
                      flex: { xs: 'none', md: 1 },
                      maxWidth: '300px',
                      order: { xs: 2, md: 3 },
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: lexendFont.style.fontFamily,
                        fontWeight: 500,
                        mb: 1,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {tech.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </Box>
                )}
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
