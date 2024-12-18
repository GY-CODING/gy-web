/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { MenuItem } from '../utils/menuItems';
import { lexendFont } from '../utils/fonts';

interface MenuItemProps {
  item: MenuItem;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export default function CustomMenuItem({ item, index, isHovered, onHover }: MenuItemProps) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <Box
      component={!hasChildren ? Link : 'div'}
      href={!hasChildren ? item.path : ''}
      onMouseEnter={() => onHover(index)}
      sx={{
        padding: '8px 16px',
        cursor: 'pointer',
        color: isHovered ? '#8C54FF' : 'inherit',
        fontFamily: lexendFont.style.fontFamily,
        fontSize: '0.95rem',
        fontWeight: 500,
        transition: 'all 0.15s ease',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '6px',
        userSelect: 'none',

        '&:hover': {
          color: '#8C54FF',
        }
      }}
    >
      {item.title}
      {hasChildren && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            width: '6px',
            height: '6px',
            borderRight: '1.5px solid currentColor',
            borderBottom: '1.5px solid currentColor',
            transform: isHovered ? 'rotate(225deg)' : 'rotate(45deg)',
            marginLeft: '2px',
            marginTop: isHovered ? '2px' : '-2px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transformOrigin: 'center'
          }}
        />
      )}
    </Box>
  );
}
