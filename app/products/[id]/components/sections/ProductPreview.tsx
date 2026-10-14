import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { lexendFont } from '../../../../utils/fonts';
import EyebrowBadge from '../../../../components/home/EyebrowBadge';
import TiltCard from '../../../../components/home/TiltCard';
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
              <Box sx={{ mb: 3 }}>
                <EyebrowBadge accent={product.theme.textGradient}>
                  {lang === 'es' ? 'Sobre la app' : 'About the app'}
                </EyebrowBadge>
              </Box>

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

              <Link
                href={product.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  component={motion.button}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    borderRadius: '14px',
                    px: 3.5,
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    fontFamily: lexendFont.style.fontFamily,
                    border: `1.5px solid ${product.theme.primary}66`,
                    color: isDark ? product.theme.accent : product.theme.secondary,
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(10px)',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                    '&:hover': {
                      background: `${product.theme.primary}22`,
                      borderColor: product.theme.primary,
                    },
                  }}
                >
                  {lang === 'es'
                    ? (product.ctaLabel?.es ?? 'Visitar aplicación')
                    : (product.ctaLabel?.en ?? 'Visit application')}
                  <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                </Box>
              </Link>
            </motion.div>
          </Box>

          {/* Screenshot */}
          {hasImage && (
            <Box sx={{ flex: '0 0 55%', width: '100%', position: 'relative' }}>
              {/* Product-tinted glow behind the mockup */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: '10%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${product.theme.primary}${isDark ? '44' : '2e'}, transparent 70%)`,
                  filter: 'blur(50px)',
                  pointerEvents: 'none',
                }}
              />
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <TiltCard maxTilt={5}>
                  <Image
                    src={imageSrc!}
                    alt={`${product.name} screenshot`}
                    width={900}
                    height={560}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </TiltCard>
              </motion.div>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
