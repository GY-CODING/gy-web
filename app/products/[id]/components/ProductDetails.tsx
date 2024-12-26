/* eslint-disable react/no-unknown-property */
/* eslint-disable indent */
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, alpha } from '@mui/material';
import { SiNextdotjs, SiTypescript, SiPrisma, SiPostgresql } from 'react-icons/si';
import { FaDocker, FaAws } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { lexendFont } from '@/app/utils/fonts';
import { products } from '../../data/products';
import { useLanguage } from '@/app/utils/languageContext';

// Constantes para la configuración del sistema solar
const ORBIT_RADII = [180, 280, 380];
const ROTATION_DURATION = 20; // Duración base de la rotación en segundos

const TECHNOLOGIES = [
  {
    name: 'Next.js 14',
    icon: <SiNextdotjs size={40} />,
    description: 'Framework React de última generación',
    orbit: 0,
    speed: 1, // Multiplicador de velocidad
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript size={35} />,
    description: 'Desarrollo tipado y seguro',
    orbit: 1,
    speed: 0.8,
  },
  {
    name: 'Prisma',
    icon: <SiPrisma size={38} />,
    description: 'ORM moderno y tipado',
    orbit: 2,
    speed: 0.6,
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql size={36} />,
    description: 'Base de datos relacional',
    orbit: 1,
    speed: 0.7,
  },
  {
    name: 'Docker',
    icon: <FaDocker size={38} />,
    description: 'Contenedorización',
    orbit: 2,
    speed: 0.5,
  },
  {
    name: 'AWS',
    icon: <FaAws size={35} />,
    description: 'Cloud Computing',
    orbit: 0,
    speed: 0.9,
  },
] as const;

// Componente para el fondo de estrellas
const StarryBackground = ({ theme }: { theme: any }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      opacity: theme.palette.mode === 'dark' ? 0.5 : 0.3,
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '200%',
        height: '200%',
        top: '-50%',
        left: '-50%',
        background: `radial-gradient(1px 1px at ${Array(100)
          .fill(0)
          .map(() => `${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%`)
          .join(', ')}, ${
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary.main, 0.4)
            : alpha(theme.palette.primary.main, 0.6)
        } 2px, transparent 0)`,
        animation: 'rotate 200s linear infinite',
      },
    }}
  />
);

// Componente para una órbita
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
}: {
  tech: (typeof TECHNOLOGIES)[number];
  angle: number;
  radius: number;
  theme: any;
  color: string;
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
        {tech.icon}
      </Box>
    </motion.div>
  );
};

// Componente principal
export default function ProductDetails({ productId }: { productId: string }) {
  const theme = useTheme();
  const [hoveredTech, setHoveredTech] = React.useState<string | null>(null);
  const product = products.find((p) => p.id === productId);
  const { t } = useLanguage();

  if (!product) return null;

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
      <StarryBackground theme={theme} />

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
              color: product.color,
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
            <Orbit key={index} radius={radius} index={index} theme={theme} color={product.color} />
          ))}

          {/* Centro - Next.js */}
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
                      ? `${alpha(product.color, 0.4)} 0%,
                       ${alpha(product.color, 0.2)} 50%,
                       transparent 70%`
                      : `${alpha(product.color, 0.5)} 0%,
                       ${alpha(product.color, 0.3)} 50%,
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
                      ? `radial-gradient(circle at 30% 30%, ${alpha(product.color, 0.3)}, ${alpha(product.color, 0.1)})`
                      : `radial-gradient(circle at 30% 30%, ${alpha(product.color, 0.2)}, ${alpha(product.color, 0.05)})`,
                  backdropFilter: 'blur(10px)',
                  border: '2px solid',
                  borderColor: alpha(product.color, theme.palette.mode === 'dark' ? 0.4 : 0.3),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color:
                    theme.palette.mode === 'dark'
                      ? alpha(product.color, 0.9)
                      : alpha(product.color, 0.8),
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    borderColor: product.color,
                  },
                }}
              >
                <SiNextdotjs size={60} />
              </Box>
            </motion.div>
          </Box>

          {/* Planetas Tecnológicos */}
          {TECHNOLOGIES.slice(1).map((tech, index) => {
            const angleOffset = (Math.PI * 2) / (TECHNOLOGIES.length - 1);
            const angle = angleOffset * index;

            return (
              <TechPlanet
                key={tech.name}
                tech={tech}
                angle={angle}
                radius={ORBIT_RADII[tech.orbit]}
                theme={theme}
                color={product.color}
                onHover={setHoveredTech}
              />
            );
          })}

          {/* Tooltip de información */}
          <AnimatePresence>
            {hoveredTech && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: alpha(
                      theme.palette.background.paper,
                      theme.palette.mode === 'dark' ? 0.95 : 0.9
                    ),
                    backdropFilter: 'blur(10px)',
                    boxShadow: theme.shadows[10],
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.1),
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1, color: product.color }}>
                    {hoveredTech}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {TECHNOLOGIES.find((t) => t.name === hoveredTech)?.description}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </Container>

      <style jsx global>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulseCore {
          0% {
            opacity: 0.5;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </Box>
  );
}
