'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface Technology {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface TechTerminalProps {
  technologies: Technology[];
}

const TechTerminal: React.FC<TechTerminalProps> = ({ technologies }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isGlitching, setIsGlitching] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // Colores personalizados basados en el tema
  const terminalColors = {
    bg: isDark ? 'rgba(13, 17, 23, 0.98)' : 'rgba(240, 240, 245, 0.98)',
    border: isDark ? theme.palette.primary.dark : theme.palette.primary.light,
    text: isDark ? '#e0e0e0' : '#1a1a1a',
    accent: theme.palette.primary.main,
    success: isDark ? '#4caf50' : '#2e7d32',
    iconBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  };

  useEffect(() => {
    // Simular comandos de terminal
    const commands = [
      'initializing system...',
      'scanning tech stack...',
      'loading components...',
      'system ready',
    ];

    commands.forEach((cmd, index) => {
      setTimeout(() => {
        setCommandHistory((prev) => [...prev, cmd]);
      }, index * 500);
    });
  }, []);

  const handleTechClick = (index: number) => {
    setIsGlitching(true);
    setCommandHistory((prev) => [...prev, `> accessing ${technologies[index].name.toLowerCase()}`]);
    setTimeout(() => {
      setActiveIndex(index);
      setIsGlitching(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        width: '800px',
        maxWidth: '90%',
        mx: 'auto',
        height: '500px',
        background: terminalColors.bg,
        borderRadius: '10px',
        overflow: 'hidden',
        border: `1px solid ${alpha(terminalColors.border, 0.3)}`,
        boxShadow: `0 0 30px ${alpha(terminalColors.accent, 0.2)}`,
        backdropFilter: 'blur(10px)',
        position: 'relative',
      }}
    >
      {/* Terminal Header */}
      <Box
        sx={{
          p: 1.5,
          background: alpha(terminalColors.accent, 0.1),
          borderBottom: `1px solid ${alpha(terminalColors.border, 0.2)}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {/* Botones de terminal */}
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((color) => (
          <Box
            key={color}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: color,
              opacity: 0.8,
            }}
          />
        ))}
        <Typography
          variant="caption"
          sx={{
            ml: 2,
            color: alpha(terminalColors.text, 0.7),
            fontFamily: 'monospace',
          }}
        >
          tech-stack — -bash — 80×24
        </Typography>
      </Box>

      {/* Terminal Content */}
      <Box
        sx={{
          p: 3,
          height: 'calc(100% - 60px)',
          position: 'relative',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(terminalColors.accent, 0.3),
            borderRadius: '4px',
            '&:hover': {
              background: alpha(terminalColors.accent, 0.5),
            },
          },
        }}
      >
        {/* Command History */}
        <Box sx={{ mb: 4 }}>
          {commandHistory.map((cmd, index) => (
            <Typography
              key={index}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                color: terminalColors.success,
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                mb: 0.5,
                '&::before': {
                  content: '"$ "',
                  color: alpha(terminalColors.text, 0.5),
                },
              }}
            >
              {cmd}
            </Typography>
          ))}
        </Box>

        {/* Tech Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTechClick(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '8px',
                      background:
                        activeIndex === index
                          ? alpha(terminalColors.accent, 0.2)
                          : terminalColors.iconBg,
                      border: `1px solid ${alpha(terminalColors.accent, activeIndex === index ? 0.5 : 0.2)}`,
                      color: terminalColors.accent,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: alpha(terminalColors.accent, 0.15),
                        boxShadow: `0 0 15px ${alpha(terminalColors.accent, 0.2)}`,
                      },
                      '& svg': {
                        color:
                          activeIndex === index
                            ? terminalColors.accent
                            : alpha(terminalColors.text, 0.8),
                        transition: 'color 0.3s ease',
                      },
                    }}
                  >
                    {tech.icon}
                  </Box>
                </motion.div>
              ))}
            </Box>

            <Box
              sx={{
                p: 3,
                borderRadius: '8px',
                background: terminalColors.iconBg,
                border: `1px solid ${alpha(terminalColors.accent, 0.2)}`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: terminalColors.accent,
                  fontFamily: 'monospace',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <span style={{ opacity: 0.5 }}>{'>'}</span>
                {technologies[activeIndex].name}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: terminalColors.text,
                  fontFamily: 'monospace',
                  lineHeight: 1.8,
                }}
              >
                {technologies[activeIndex].description}
              </Typography>
            </Box>
          </motion.div>
        </AnimatePresence>

        {/* Scanning Effect */}
        <Box
          component={motion.div}
          animate={{
            top: ['0%', '100%'],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            left: 0,
            width: '100%',
            height: '2px',
            background: `linear-gradient(90deg, 
              transparent,
              ${alpha(terminalColors.accent, 0.7)},
              transparent
            )`,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </Box>
    </Box>
  );
};

export default TechTerminal;
