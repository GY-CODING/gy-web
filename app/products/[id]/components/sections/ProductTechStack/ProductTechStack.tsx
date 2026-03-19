import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '../../../../../utils/fonts';
import TechBadgeItem from './TechBadgeItem';
import type { ProductSectionProps } from '../../../types';

export default function ProductTechStack({ product, mode }: ProductSectionProps) {
  const isDark = mode === 'dark';

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        overflow: 'hidden',
        position: 'relative',
        background: isDark ? 'transparent' : product.theme.lightSectionBg,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            sx={{
              fontFamily: lexendFont.style.fontFamily,
              fontSize: '0.75rem',
              fontWeight: 500,
              color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
              mb: 4,
            }}
          >
            Built with
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 3 },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {product.techStack.map((tech, i) => (
              <TechBadgeItem key={tech.name} tech={tech} isDark={isDark} index={i} />
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
