'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createAppTheme } from './utils/theme';
import Header from './components/Header';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setMode(savedTheme as 'light' | 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode);
    }
  };

  const theme = createAppTheme(mode);

  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            <Header onThemeToggle={toggleTheme} />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default App;
