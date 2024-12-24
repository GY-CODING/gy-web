'use client';

import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';

interface Requirement {
  title: string;
  description: string[];
  icon?: React.ElementType;
}

const requirements: { [key: string]: Requirement[] } = {
  'heralds-of-chaos': [
    {
      title: 'Requisitos Mínimos',
      description: [
        'Sistema Operativo: Windows 10 64-bit',
        'Procesador: Intel Core i5-4460 o AMD FX-6300',
        'Memoria: 8 GB RAM',
        'Gráficos: NVIDIA GeForce GTX 760 o AMD Radeon R7 260x',
        'DirectX: Versión 11',
        'Almacenamiento: 20 GB de espacio disponible',
      ],
    },
    {
      title: 'Requisitos Recomendados',
      description: [
        'Sistema Operativo: Windows 10 64-bit',
        'Procesador: Intel Core i7-4790 o AMD Ryzen 5 1500X',
        'Memoria: 16 GB RAM',
        'Gráficos: NVIDIA GeForce GTX 1060 o AMD Radeon RX 580',
        'DirectX: Versión 12',
        'Almacenamiento: 20 GB de espacio disponible (SSD recomendado)',
      ],
    },
  ],
  'gy-messages': [
    {
      title: 'Requisitos de Sistema',
      description: [
        'Navegador web moderno (Chrome, Firefox, Safari, Edge)',
        'Conexión a Internet estable',
        'Resolución de pantalla mínima: 1280x720',
        'JavaScript habilitado',
      ],
    },
    {
      title: 'Requisitos Móviles',
      description: [
        'iOS 12.0 o superior',
        'Android 8.0 o superior',
        '100 MB de espacio disponible',
        'Conexión a Internet 4G/5G o WiFi',
      ],
    },
  ],
  'gy-documents': [
    {
      title: 'Requisitos de Sistema',
      description: [
        'Navegador web actualizado',
        'Conexión a Internet',
        '500 MB de espacio libre para caché',
        'Resolución de pantalla mínima: 1366x768',
      ],
    },
    {
      title: 'Requisitos de Almacenamiento',
      description: [
        'Espacio mínimo recomendado: 1 GB',
        'Tipos de archivo soportados: PDF, DOC, DOCX, XLS, XLSX',
        'Tamaño máximo por archivo: 100 MB',
      ],
    },
  ],
  'gy-accounts': [
    {
      title: 'Requisitos de Acceso',
      description: [
        'Correo electrónico válido',
        'Número de teléfono para verificación',
        'Contraseña segura (mínimo 8 caracteres)',
        'Autenticación de dos factores habilitada',
      ],
    },
    {
      title: 'Requisitos de Seguridad',
      description: [
        'Conexión HTTPS',
        'Cookies habilitadas',
        'Navegador actualizado con soporte para encriptación moderna',
        'JavaScript habilitado',
      ],
    },
  ],
};

interface SystemRequirementsProps {
  productId: string;
  theme: any;
}

export default function SystemRequirements({ productId, theme }: SystemRequirementsProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const productRequirements = requirements[productId] || requirements['heralds-of-chaos'];

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
            fontFamily: lexendFont.style.fontFamily,
            background: theme.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Requisitos del Sistema
        </Typography>
      </motion.div>

      <Stack spacing={2} sx={{ maxWidth: '800px', mx: 'auto' }}>
        {productRequirements.map((req, index) => (
          <motion.div
            key={req.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${theme.primary}22`,
                borderRadius: '16px !important',
                mb: 2,
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                },
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: `${theme.primary}44`,
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: theme.primary,
                      transition: 'transform 0.3s ease',
                      transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                }
                sx={{
                  borderRadius: '16px',
                  '& .MuiAccordionSummary-content': {
                    transition: 'all 0.3s ease',
                  },
                  '&.Mui-expanded': {
                    '& .MuiAccordionSummary-content': {
                      color: theme.primary,
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    fontFamily: lexendFont.style.fontFamily,
                  }}
                >
                  {req.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AnimatePresence>
                  {expanded === `panel${index}` && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Stack spacing={1.5}>
                        {req.description.map((desc, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                          >
                            <Typography
                              sx={{
                                color: 'text.secondary',
                                display: 'flex',
                                alignItems: 'center',
                                '&:before': {
                                  content: '""',
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: theme.primary,
                                  marginRight: '12px',
                                  opacity: 0.7,
                                },
                              }}
                            >
                              {desc}
                            </Typography>
                          </motion.div>
                        ))}
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
