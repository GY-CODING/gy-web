'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider, CssBaseline, Box, GlobalStyles } from '@mui/material';
import { createAppTheme } from './utils/theme';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
import { lexendFont, valorantFont } from './utils/fonts';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './utils/languageContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useLiteMotion } from './hooks/useLiteMotion';

// Lite mode (touch devices, modest machines, reduced motion): no backdrop-filter anywhere.
// The glass blur is recomputed on every scroll frame and was the main source of jank on
// phones and low-end PCs; surfaces are opaque enough to stay readable without it.
const liteModeStyles = {
  'html[data-lite="true"] *, html[data-lite="true"] *::before, html[data-lite="true"] *::after': {
    backdropFilter: 'none !important',
    WebkitBackdropFilter: 'none !important',
  },
};

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  useSmoothScroll();

  // Every real page now brings its own corner navigation and monument footer (the old /v2
  // prototype's language). Only the three legal pages — never redesigned — still use the
  // original Header/Footer, so they keep the chrome they were built against.
  const pathname = usePathname();
  const legalPath = pathname?.replace(/\/?$/, '/') ?? '/';
  const bareLayout = !['/privacy/', '/terms/', '/cookies/'].includes(legalPath);

  // Flag lite mode on <html> so the global rule above can switch the glass off.
  const lite = useLiteMotion();
  useEffect(() => {
    document.documentElement.dataset.lite = lite ? 'true' : 'false';
  }, [lite]);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setMode(savedTheme as 'light' | 'dark');
    // No artificial minimum wait (it used to be 1s): the overlay only needs to hide the
    // light → saved-theme switch, which is done as soon as this effect runs.
    setIsLoading(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  }, []);

  const theme = createAppTheme(mode);

  return (
    <LanguageProvider>
      <html lang="es" className={`${lexendFont.className} ${valorantFont.className}`}>
        <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={liteModeStyles} />
            {/* The page mounts as soon as theme and language are known (first client render).
                It can't be in the static HTML: language and theme come from localStorage /
                navigator, so painting it earlier made the whole hero swap text and theme after
                load (big layout shift). What made LCP slow was the forced 1s wait plus
                `mode="wait"`, which only mounted the page after the loader's exit animation;
                now the loader simply fades out on top of the already-mounted page. */}
            {!isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                  width: '100%',
                }}
              >
                {!bareLayout && <Header onThemeToggle={toggleTheme} />}
                {children}
                {!bareLayout && <Footer />}
              </Box>
            )}
            {/* initial={false}: the overlay is fully opaque in the server HTML. */}
            <AnimatePresence initial={false}>
              {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
