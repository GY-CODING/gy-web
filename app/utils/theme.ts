import { createTheme } from '@mui/material';
import { lexendFont } from './fonts';

const PURPLE = {
  main: '#8C54FF',
  light: '#8C54FF80',
  dark: '#6B40CC',
  contrastText: '#FFFFFF'
};

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#ffffff' : '#1a1a1a',
        contrastText: mode === 'light' ? '#000000' : '#ffffff',
      },
      secondary: PURPLE,
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#424242' : '#bdbdbd',
      },
    },
    typography: {
      fontFamily: lexendFont.style.fontFamily,
      allVariants: {
        color: mode === 'light' ? '#000000' : '#ffffff',
      },
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
          },
        },
      },
    },
  });
};
