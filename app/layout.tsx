'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createAppTheme } from './utils/theme';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Simular un tiempo mínimo de carga para evitar parpadeos
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000));
      
      // Obtener el tema guardado o el preferido del sistema
      const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      
      setMode(savedTheme as 'light' | 'dark');
      
      // Esperar el tiempo mínimo de carga
      await minLoadTime;
      
      // Ocultar la pantalla de carga
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  const theme = createAppTheme(mode);

  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <Box
                key="content"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  width: '100%'
                }}
              >
                <Header onThemeToggle={toggleTheme} />
                {children}
              </Box>
            )}
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
