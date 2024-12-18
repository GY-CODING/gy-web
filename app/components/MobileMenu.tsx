import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { MenuItem } from '../utils/menuItems';
import { lexendFont } from '../utils/fonts';
import CustomButton from './CustomButton';
import Link from 'next/link';
import Image from 'next/image';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface MobileMenuProps {
  isOpen: boolean;
  menuItems: MenuItem[];
}

export default function MobileMenu({ isOpen, menuItems }: MobileMenuProps) {
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  if (!isOpen) return null;

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
    >
      {menuItems.map((item, index) => (
        <Box key={index}>
          {item.children ? (
            <Box>
              <Box
                onClick={() => toggleExpand(index)}
                sx={{
                  padding: '0.75rem 1rem',
                  color: theme.palette.text.primary,
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(140, 84, 255, 0.04)'
                      : 'rgba(140, 84, 255, 0.08)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {item.title}
                </Box>
                <KeyboardArrowDownIcon 
                  sx={{
                    transform: expandedItems.includes(index) ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: expandedItems.includes(index) ? 'auto' : 0,
                  overflow: 'hidden',
                  transition: 'height 0.2s ease',
                }}
              >
                {item.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.path}
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      sx={{
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        color: theme.palette.text.secondary,
                        fontSize: '0.9rem',
                        '&:hover': {
                          backgroundColor: theme.palette.mode === 'light'
                            ? 'rgba(140, 84, 255, 0.04)'
                            : 'rgba(140, 84, 255, 0.08)',
                        },
                      }}
                    >
                      {child.icon && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '6px',
                            backgroundColor: theme.palette.mode === 'light'
                              ? 'rgba(140, 84, 255, 0.04)'
                              : 'rgba(140, 84, 255, 0.08)',
                          }}
                        >
                          <Image
                            src={child.icon}
                            alt={child.title}
                            width={16}
                            height={16}
                          />
                        </Box>
                      )}
                      <Box>
                        <Box sx={{ fontWeight: 500 }}>{child.title}</Box>
                        {child.description && (
                          <Box
                            sx={{
                              fontSize: '0.8rem',
                              color: theme.palette.text.secondary,
                              mt: 0.5,
                            }}
                          >
                            {child.description}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Box>
            </Box>
          ) : (
            <Link
              href={item.path}
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  padding: '0.75rem 1rem',
                  color: theme.palette.text.primary,
                  fontFamily: lexendFont.style.fontFamily,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light'
                      ? 'rgba(140, 84, 255, 0.04)'
                      : 'rgba(140, 84, 255, 0.08)',
                  },
                }}
              >
                {item.title}
              </Box>
            </Link>
          )}
        </Box>
      ))}
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <CustomButton
          text="Log In"
          link=""
          sx={{
            width: '100%',
            backgroundColor: 'transparent',
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(140, 84, 255, 0.04)'
                : 'rgba(140, 84, 255, 0.08)',
            }
          }}
        />
        <CustomButton
          text="Contact"
          link=""
          sx={{
            width: '100%',
            backgroundColor: theme.palette.secondary.main,
            border: '2px solid',
            borderColor: theme.palette.secondary.main,
            color: '#ffffff',
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              borderColor: theme.palette.secondary.light,
            }
          }}
        />
      </Box>
    </Box>
  );
}
