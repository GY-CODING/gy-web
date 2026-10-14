'use client';

import React from 'react';
import { IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { useLanguage } from '../utils/languageContext';
import Image from 'next/image';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { glassIconButtonSx } from './headerStyles';

export default function LanguageSelector() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLang: 'en' | 'es') => {
    setLanguage(newLang);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-label={language === 'en' ? 'Change language' : 'Cambiar idioma'}
        sx={glassIconButtonSx(isDark)}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src={`/icons/flags/${language}.svg`}
            alt={language === 'en' ? 'English' : 'Español'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              minWidth: '160px',
              borderRadius: '16px',
              backgroundImage: 'none',
              backgroundColor: isDark ? 'rgba(14,14,20,0.9)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px) saturate(160%)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
              boxShadow: isDark
                ? '0 30px 60px -20px rgba(0,0,0,0.7)'
                : '0 30px 60px -20px rgba(0,0,0,0.2)',
              '& .MuiList-root': {
                padding: '6px',
              },
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange('en')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.75,
            px: 1.5,
            borderRadius: '10px',
            minHeight: '36px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.04)'
                  : 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image src="/icons/flags/en.svg" alt="English" fill style={{ objectFit: 'cover' }} />
          </div>
          English
          {language === 'en' && (
            <CheckRoundedIcon sx={{ ml: 'auto', fontSize: '1rem', color: '#8C54FF' }} />
          )}
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('es')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.75,
            px: 1.5,
            borderRadius: '10px',
            minHeight: '36px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? 'rgba(0, 0, 0, 0.04)'
                  : 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image src="/icons/flags/es.svg" alt="Español" fill style={{ objectFit: 'cover' }} />
          </div>
          Español
          {language === 'es' && (
            <CheckRoundedIcon sx={{ ml: 'auto', fontSize: '1rem', color: '#8C54FF' }} />
          )}
        </MenuItem>
      </Menu>
    </>
  );
}
