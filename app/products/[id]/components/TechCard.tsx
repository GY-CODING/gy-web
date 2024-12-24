'use client';

import React from 'react';
import { Box, Paper, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

interface TechCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

const TechCard: React.FC<TechCardProps> = ({ name, description, icon, delay = 0 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Paper
        component={motion.div}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          background: isDark
            ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.4)})`
            : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.7)})`,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.6)}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
          },
          '&:hover': {
            '&:before': {
              opacity: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            component={motion.div}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            component={motion.h6}
            sx={{
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.text.primary, 0.7)})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {name}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flex: 1,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default TechCard;
