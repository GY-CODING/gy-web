import { Box, Container, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { lexendFont } from '../../../../utils/fonts';
import SectionBadge from '../shared/SectionBadge';
import type { ProductSectionProps } from '../../types';

export default function ProductProfileSection({ product, lang, mode }: ProductSectionProps) {
  const { profileSection } = product;
  if (!profileSection) return null;

  const isDark = mode === 'dark';
  const title = lang === 'es' ? profileSection.titleEs : profileSection.title;
  const desc = lang === 'es' ? profileSection.descriptionEs : profileSection.description;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: isDark
          ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,20,0.6) 50%, rgba(0,0,0,0) 100%)'
          : product.theme.lightSectionBg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <SectionBadge
              label={lang === 'es' ? 'Tu perfil' : 'Your profile'}
              primaryColor={product.theme.primary}
              labelColor={isDark ? product.theme.accent : product.theme.secondary}
            />

            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '2rem', md: '2.6rem' },
                fontWeight: 700,
                color: isDark ? '#fff' : 'grey.900',
                mb: 1.5,
                lineHeight: 1.2,
              }}
            >
              <Box
                component="span"
                sx={{
                  background: product.theme.textGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {title}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1rem', md: '1.05rem' },
                color: isDark ? 'rgba(255,255,255,0.55)' : 'grey.600',
                lineHeight: 1.7,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              {desc}
            </Typography>
          </Box>
        </motion.div>

        {/* Highlights grid */}
        <Grid container spacing={2} sx={{ mb: { xs: 5, md: 6 } }}>
          {profileSection.highlights.map((h, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    height: '100%',
                    borderRadius: '14px',
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.75)',
                    border: `1px solid ${product.theme.primary}22`,
                    backdropFilter: 'blur(8px)',
                    boxShadow: isDark ? 'none' : '0 2px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography sx={{ fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>
                    {h.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: lexendFont.style.fontFamily,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: isDark ? 'rgba(255,255,255,0.8)' : 'grey.800',
                      lineHeight: 1.4,
                    }}
                  >
                    {lang === 'es' ? h.textEs : h.text}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Full-width screenshot */}
        {profileSection.image && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={profileSection.image}
              alt={`${product.name} profile`}
              width={1200}
              height={700}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
