/* eslint-disable indent */
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import { useLanguage } from '@/app/utils/languageContext';
import Image from 'next/image';
import { TECHNOLOGIES } from '../../data/products';

// Constantes para la configuración del sistema solar
const ORBIT_RADII = [180, 280, 380];
const ROTATION_DURATION = 20; // Duración base de la rotación en segundos

const PRODUCT_COLORS: any = {
  'heralds-of-chaos': '#FFB300',
  'gy-accounts': '#7B1FA2',
  'gy-documents': '#2196F3',
  'gy-messages': '#00C853',
};

// Componente para la órbita
const Orbit = ({
  radius,
  index,
  theme,
  color,
}: {
  radius: number;
  index: number;
  theme: any;
  color: string;
}) => (
  <Box
    sx={{
      position: 'absolute',
      width: radius * 2,
      height: radius * 2,
      borderRadius: '50%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      '&:before': {
        content: '""',
        position: 'absolute',
        inset: -1,
        padding: 1,
        borderRadius: 'inherit',
        background: `linear-gradient(${45 + index * 30}deg, ${alpha(color, 0.15)}, ${alpha(color, 0.15)})`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        inset: -2,
        borderRadius: 'inherit',
        background: `radial-gradient(circle at 50% 50%, 
          ${
            theme.palette.mode === 'dark'
              ? `${alpha(color, 0.2)} 0%,
               ${alpha(color, 0.2)} 25%,
               transparent 50%`
              : `${alpha(color, 0.25)} 0%,
               ${alpha(color, 0.25)} 25%,
               transparent 50%`
          })`,
        filter: 'blur(8px)',
        opacity: 0.6,
      },
    }}
  />
);

// Componente para un planeta tecnológico
const TechPlanet = ({
  tech,
  angle,
  radius,
  theme,
  color,
  onHover,
  productId,
}: {
  tech: { name: string; icon: string; orbit: number; speed: number };
  angle: number;
  radius: number;
  theme: any;
  color: string;
  productId: string;
  onHover: (name: string | null) => void;
}) => {
  const [currentAngle, setCurrentAngle] = React.useState(angle);

  React.useEffect(() => {
    const duration = ROTATION_DURATION / tech.speed;
    const interval = 16; // ~60fps
    const angleIncrement = (2 * Math.PI) / ((duration * 1000) / interval);

    const timer = setInterval(() => {
      setCurrentAngle((prev) => (prev + angleIncrement) % (2 * Math.PI));
    }, interval);

    return () => clearInterval(timer);
  }, [tech.speed]);

  const x = Math.cos(currentAngle) * radius;
  const y = Math.sin(currentAngle) * radius;

  const productColor = PRODUCT_COLORS[productId];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
    >
      <Box
        onMouseEnter={() => onHover(tech.name)}
        onMouseLeave={() => onHover(null)}
        sx={{
          p: 3,
          borderRadius: '50%',
          background:
            theme.palette.mode === 'dark'
              ? `radial-gradient(circle at 30% 30%, ${alpha(color, 0.25)}, ${alpha(color, 0.1)})`
              : `radial-gradient(circle at 30% 30%, ${alpha(color, 0.2)}, ${alpha(color, 0.05)})`,
          backdropFilter: 'blur(10px)',
          border: '2px solid',
          borderColor: alpha(color, theme.palette.mode === 'dark' ? 0.4 : 0.3),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.mode === 'dark' ? alpha(color, 0.7) : alpha(color, 0.6),
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.2)',
            borderColor: color,
            background:
              theme.palette.mode === 'dark'
                ? `radial-gradient(circle at 30% 30%, ${alpha(color, 0.35)}, ${alpha(color, 0.15)})`
                : `radial-gradient(circle at 30% 30%, ${alpha(color, 0.3)}, ${alpha(color, 0.1)})`,
          },
        }}
      >
        <Image
          src={tech.icon}
          alt={tech.name}
          width={40}
          height={40}
          style={{
            filter: `invert(0%) sepia(100%) saturate(500%) hue-rotate(${productColor}deg)`,
          }}
        />
      </Box>
    </motion.div>
  );
};

// Componente principal
export default function ProductDetails({ productId }: { productId: string }) {
  const theme = useTheme();
  const [hoveredTech, setHoveredTech] = React.useState<string | null>(null);
  const { t } = useLanguage();
  const technologies = TECHNOLOGIES[productId] || [];

  if (technologies.length === 0) return null;

  const productColor = PRODUCT_COLORS[productId];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 15, md: 20 },
        display: ['none', 'none', 'block'],
        minHeight: '100vh',
        overflow: 'hidden',
        background:
          theme.palette.mode === 'dark'
            ? 'transparent'
            : 'radial-gradient(circle at 50% 50%, rgba(250,250,255,1) 0%, rgba(240,240,250,1) 100%)',
        borderRadius: '30px',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '30px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
              fontFamily: lexendFont.style.fontFamily,
              color: productColor,
              letterSpacing: '-0.02em',
            }}
          >
            {t(`products.items.${productId}.techStack.title`)}
          </Typography>
        </motion.div>

        {/* Sistema Solar Tecnológico */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 800,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Órbitas */}
          {ORBIT_RADII.map((radius, index) => (
            <Orbit key={index} radius={radius} index={index} theme={theme} color={productColor} />
          ))}

          {/* Planeta Central - Orbit 3 */}
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              '&:after': {
                content: '""',
                position: 'absolute',
                inset: -20,
                borderRadius: '50%',
                background: `radial-gradient(circle at 50% 50%, 
                  ${
                    theme.palette.mode === 'dark'
                      ? `${alpha(productColor, 0.4)} 0%,
                         ${alpha(productColor, 0.2)} 50%,
                         transparent 70%`
                      : `${alpha(productColor, 0.5)} 0%,
                         ${alpha(productColor, 0.3)} 50%,
                         transparent 70%`
                  })`,
                filter: 'blur(10px)',
                animation: 'pulseCore 4s ease-in-out infinite alternate',
              },
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: '50%',
                  background:
                    theme.palette.mode === 'dark'
                      ? `radial-gradient(circle at 30% 30%, ${alpha(productColor, 0.3)}, ${alpha(productColor, 0.1)})`
                      : `radial-gradient(circle at 30% 30%, ${alpha(productColor, 0.2)}, ${alpha(productColor, 0.05)})`,
                  backdropFilter: 'blur(10px)',
                  border: '2px solid',
                  borderColor: alpha(productColor, theme.palette.mode === 'dark' ? 0.4 : 0.3),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color:
                    theme.palette.mode === 'dark'
                      ? alpha(productColor, 0.9)
                      : alpha(productColor, 0.8),
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    borderColor: productColor,
                  },
                }}
              >
                <Image src={technologies[0].icon} alt="Next.js" width={60} height={60} />
              </Box>
            </motion.div>
          </Box>

          {/* Planetas Tecnológicos */}
          {technologies.slice(1).map((tech: any, index: any) => {
            const angleOffset = (Math.PI * 2) / technologies.length;
            const angle = angleOffset * index;

            return (
              <TechPlanet
                key={tech.name}
                tech={tech}
                angle={angle}
                radius={ORBIT_RADII[tech.orbit]}
                theme={theme}
                color={productColor}
                onHover={setHoveredTech}
                productId={productId}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
