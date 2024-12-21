import { Box, CircularProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useImagePath } from '../utils/useImagePath';

export default function LoadingScreen() {
  const theme = useTheme();
  const imagePath = useImagePath('/icons/gycoding.svg');

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '120px',
          height: '120px',
        }}
      >
        <Image
          src={imagePath}
          alt="GYCODING"
          fill
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <CircularProgress
        size={40}
        sx={{
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        }}
      />
    </Box>
  );
}
