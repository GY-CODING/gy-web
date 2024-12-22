'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { lexendFont } from '../utils/fonts';
import { MenuItem } from '../utils/menuItems';

interface MenuItemProps {
  item: MenuItem;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export default function CustomMenuItem({ item, index, isHovered, onHover }: MenuItemProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.path;

  const menuContent = (
    <Box
      onMouseEnter={() => onHover(index)}
      sx={{
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        backgroundColor:
          isActive || isHovered
            ? theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)'
            : 'transparent',
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
      }}
    >
      <Typography
        sx={{
          ...lexendFont.style,
          fontSize: '0.95rem',
          fontWeight: isActive ? 600 : 500,
          color:
            theme.palette.mode === 'dark'
              ? isActive
                ? 'white'
                : 'grey.300'
              : isActive
                ? 'black'
                : 'grey.700',
        }}
      >
        {item.title}
      </Typography>
    </Box>
  );

  if (hasChildren) {
    return menuContent;
  }

  if (item.external) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {menuContent}
      </a>
    );
  }

  return (
    <Link href={item.path || '/'} style={{ textDecoration: 'none' }}>
      {menuContent}
    </Link>
  );
}
