'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createAppTheme } from './utils/theme';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import { lexendFont, valorantFont } from './utils/fonts';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './utils/languageContext';

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const minLoadTime = new Promise((resolve) => setTimeout(resolve, 1000));

      const savedTheme =
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      setMode(savedTheme as 'light' | 'dark');

      await minLoadTime;

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
    <LanguageProvider>
      <html lang="es" className={`${lexendFont.className} ${valorantFont.className}`}>
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
                    width: '100%',
                  }}
                >
                  <Header onThemeToggle={toggleTheme} />
                  {children}
                  <Footer />
                </Box>
              )}
            </AnimatePresence>
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
