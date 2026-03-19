import { Box, Container, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { lexendFont } from '../../../../utils/fonts';
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
      {/* Background accent */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${product.theme.primary}${isDark ? '18' : '10'} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
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
              background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.85)',
              border: `1px solid ${product.theme.primary}33`,
              backdropFilter: 'blur(20px)',
              boxShadow: isDark
                ? 'none'
                : `0 8px 40px ${product.theme.primary}14, 0 2px 20px rgba(0,0,0,0.06)`,
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
                borderRadius: '18px',
                overflow: 'hidden',
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

            <Typography
              variant="h2"
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 700,
                color: isDark ? '#fff' : 'grey.900',
                mb: 2,
              }}
            >
              {lang === 'es' ? '¿Listo para empezar?' : 'Ready to get started?'}
            </Typography>

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

            <Button
              component={Link}
              href={product.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
              sx={{
                fontFamily: lexendFont.style.fontFamily,
                fontWeight: 700,
                fontSize: '1rem',
                px: 5,
                py: 1.75,
                borderRadius: '50px',
                background: product.theme.textGradient,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: `0 0 40px ${product.theme.primary}55`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: `0 0 60px ${product.theme.primary}88`,
                },
              }}
            >
              {lang === 'es' ? `Ir a ${product.name}` : `Go to ${product.name}`}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
