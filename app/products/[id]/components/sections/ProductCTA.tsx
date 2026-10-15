import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { lexendFont } from '../../../../utils/fonts';
import AuroraBackground from '../../../../components/home/AuroraBackground';
import AnimatedGradientHeadline from '../../../../components/home/AnimatedGradientHeadline';
import type { ProductSectionProps } from '../../types';

export default function ProductCTA({ product, lang, mode }: ProductSectionProps) {
  const isDark = mode === 'dark';

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 18 },
        position: 'relative',
        overflow: 'hidden',
        background: isDark ? 'transparent' : '#f8f8fc',
      }}
    >
      <AuroraBackground
        colors={[product.theme.primary, product.theme.accent, product.theme.secondary]}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 5, md: 8 },
              borderRadius: '32px',
              background: isDark ? 'rgba(17,17,17,0.6)' : 'rgba(255,255,255,0.85)',
              border: `1px solid ${product.theme.primary}33`,
              backdropFilter: 'blur(20px)',
              boxShadow: isDark
                ? `0 30px 80px -10px ${product.theme.primary}33`
                : `0 30px 80px -10px ${product.theme.primary}26, 0 2px 20px rgba(0,0,0,0.06)`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: product.theme.textGradient,
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 3,
                borderRadius: '20px',
                overflow: 'hidden',
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)',
                boxShadow: `0 0 40px ${product.theme.primary}55`,
                border: `1px solid ${product.theme.primary}44`,
              }}
            >
              <Image
                src={product.logo}
                alt={product.name}
                fill
                style={{ objectFit: 'contain', padding: '8px' }}
              />
            </Box>

            <AnimatedGradientHeadline
              text={lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
              component="h2"
              gradient={product.theme.textGradient}
              sx={{
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                textAlign: 'center',
                mb: 2,
              }}
            />

            <Typography
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: isDark ? 'rgba(255,255,255,0.55)' : 'grey.600',
                mb: 5,
                maxWidth: '480px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              {lang === 'es'
                ? `Únete a la comunidad de ${product.name} hoy mismo y descubre todo lo que tiene para ofrecerte.`
                : `Join the ${product.name} community today and discover everything it has to offer.`}
            </Typography>

            <Link
              href={product.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Box
                component={motion.button}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '14px',
                  px: 5,
                  py: 1.9,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  fontFamily: lexendFont.style.fontFamily,
                  color: '#fff',
                  background: product.theme.textGradient,
                  boxShadow: `0 10px 30px -8px ${product.theme.primary}99`,
                }}
              >
                {lang === 'es' ? `Ir a ${product.name}` : `Go to ${product.name}`}
                <OpenInNewIcon sx={{ fontSize: '1.15rem' }} />
              </Box>
            </Link>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
