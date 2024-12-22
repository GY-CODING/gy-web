'use client';

import React from 'react';
import { IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { useLanguage } from '../utils/languageContext';
import Image from 'next/image';

export default function LanguageSelector() {
  const theme = useTheme();
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
        sx={{
          padding: 1,
          backgroundColor: 'transparent',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
          },
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
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
              mt: 1,
              minWidth: '120px',
              backgroundColor: theme.palette.background.paper,
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)',
              '& .MuiList-root': {
                padding: '4px',
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
            borderRadius: '4px',
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
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange('es')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.75,
            px: 1.5,
            borderRadius: '4px',
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
        </MenuItem>
      </Menu>
    </>
  );
}
