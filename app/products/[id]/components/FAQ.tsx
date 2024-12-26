'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { motion } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { lexendFont } from '@/app/utils/fonts';
import { useLanguage } from '@/app/utils/languageContext';
import { products } from '../../data/products';

export default function FAQ({ productId }: { productId: string }) {
  const { t } = useLanguage();
  const product = products.find((p) => p.id === productId);
  const [expanded, setExpanded] = useState<number | false>(false);

  if (!product) return null;

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        borderRadius: '28px',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? ''
            : 'linear-gradient(180deg, rgba(250,250,255,1) 0%, rgba(245,245,250,1) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              mb: { xs: 6, md: 8 },
              fontFamily: lexendFont.style.fontFamily,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 600,
              background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}80 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t(`products.items.${productId}.faq.title`)}
          </Typography>
        </motion.div>

        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => {
            const question = t(`products.items.${productId}.faq.items.q${index}`);
            const answer = t(`products.items.${productId}.faq.items.a${index}`);

            // Si no hay traducción para esta pregunta, no mostrar el acordeón
            if (question === `products.items.${productId}.faq.items.q${index}`) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Accordion
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                  sx={{
                    mb: 2,
                    background: 'transparent',
                    boxShadow: 'none',
                    '&:before': { display: 'none' },
                    '& .MuiAccordionSummary-root': {
                      borderRadius: 2,
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? expanded === index
                            ? `${product.color}20`
                            : 'rgba(255,255,255,0.05)'
                          : expanded === index
                            ? `${product.color}10`
                            : 'rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? expanded === index
                              ? `${product.color}30`
                              : 'rgba(255,255,255,0.1)'
                            : expanded === index
                              ? `${product.color}20`
                              : 'rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiAccordionDetails-root': {
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.02)'
                          : 'rgba(0,0,0,0.02)',
                      borderBottomLeftRadius: 2,
                      borderBottomRightRadius: 2,
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <IoIosArrowDown
                        style={{
                          transform: expanded === index ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                          color: expanded === index ? product.color : 'inherit',
                        }}
                      />
                    }
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        my: 2,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: lexendFont.style.fontFamily,
                        fontWeight: 500,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                        color: expanded === index ? product.color : 'inherit',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      }}
                    >
                      {answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
