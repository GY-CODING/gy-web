'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { lexendFont } from '../utils/fonts';
import { MenuItem } from '../utils/menuItems';

interface MenuItemProps {
  item: MenuItem;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

const normalize = (path?: string | null) => (path ?? '').replace(/\/$/, '') || '/';

export default function CustomMenuItem({ item, index, isHovered, onHover }: MenuItemProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const pathname = normalize(usePathname());
  const hasChildren = !!item.children && item.children.length > 0;
  // A group is active when the current route is one of its internal children.
  const isActive = hasChildren
    ? item.children!.some((child) => !child.external && normalize(child.path) === pathname)
    : normalize(item.path) === pathname;

  const menuContent = (
    <Box
      onMouseEnter={() => onHover(index)}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        padding: '8px 14px',
        cursor: 'pointer',
        borderRadius: '12px',
      }}
    >
      {/* Shared hover pill: `layoutId` makes it glide between items instead of blinking. */}
      {isHovered && (
        <motion.div
          layoutId="nav-hover-pill"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 12,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
          }}
        />
      )}

      <Typography
        sx={{
          position: 'relative',
          fontFamily: lexendFont.style.fontFamily,
          fontSize: '0.95rem',
          fontWeight: isActive ? 600 : 500,
          color: isDark
            ? isActive || isHovered
              ? '#fff'
              : 'grey.300'
            : isActive || isHovered
              ? '#000'
              : 'grey.700',
          transition: 'color 0.2s ease',
        }}
      >
        {item.title}
      </Typography>

      {hasChildren && (
        <KeyboardArrowDownRoundedIcon
          sx={{
            position: 'relative',
            fontSize: '1.1rem',
            color: isDark ? 'grey.400' : 'grey.600',
            transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        />
      )}

      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 2,
            width: 5,
            height: 5,
            borderRadius: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          }}
        />
      )}
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
