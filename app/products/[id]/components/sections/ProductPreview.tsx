import { Box, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { lexendFont } from '../../../../utils/fonts';
import SectionBadge from '../shared/SectionBadge';
import type { ProductSectionProps } from '../../types';

export default function ProductPreview({ product, lang, mode }: ProductSectionProps) {
  const isDark = mode === 'dark';
  const desc = lang === 'es' ? product.descriptionEs : product.description;
  const hasImage = !!product.image;
  const imageSrc = isDark && product.imageDark ? product.imageDark : product.image;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: isDark
          ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,20,0.6) 50%, rgba(0,0,0,0) 100%)'
          : '#f8f8fc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: hasImage ? 'row' : 'column' },
            alignItems: 'center',
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* Text side */}
          <Box
            sx={{
              flex: hasImage ? '0 0 42%' : '0 0 100%',
              maxWidth: hasImage ? '42%' : '700px',
              '@media (max-width: 900px)': { maxWidth: '100%' },
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <SectionBadge
                label={lang === 'es' ? 'Sobre la app' : 'About the app'}
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
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                {lang === 'es' ? '¿Qué es ' : 'What is '}
                <Box
                  component="span"
                  sx={{
                    background: product.theme.textGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {product.name}
                </Box>
                {'?'}
              </Typography>

              <Typography
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: isDark ? 'rgba(255,255,255,0.65)' : 'grey.700',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                {desc}
              </Typography>

              <Button
                component={Link}
                href={product.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon fontSize="small" />}
                sx={{
                  fontFamily: lexendFont.style.fontFamily,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 3.5,
                  py: 1.25,
                  borderRadius: '50px',
                  border: `2px solid ${product.theme.primary}`,
                  color: isDark ? product.theme.accent : product.theme.secondary,
                  background: `${product.theme.primary}18`,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `${product.theme.primary}35`,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {lang === 'es'
                  ? (product.ctaLabel?.es ?? 'Visitar aplicación')
                  : (product.ctaLabel?.en ?? 'Visit application')}{' '}
                →
              </Button>
            </motion.div>
          </Box>

          {/* Screenshot */}
          {hasImage && (
            <Box sx={{ flex: '0 0 55%', width: '100%' }}>
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src={imageSrc!}
                  alt={`${product.name} screenshot`}
                  width={900}
                  height={560}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </motion.div>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
