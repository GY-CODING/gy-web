'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material';

const StyledLinkWrapper = styled(motion.div)(({ theme }) => ({
  '& a': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    position: 'relative',
    transition: 'color 0.3s ease',
    display: 'inline-block',
    padding: '4px 0',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '0%',
      height: '2px',
      bottom: 0,
      left: 0,
      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      '&::after': {
        width: '100%',
      },
    },
  },
}));

interface SmartLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function SmartLink({ href, children, className }: SmartLinkProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isHomePage = pathname === '/';
  const isHashLink = href.startsWith('/#');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink && isHomePage) {
      e.preventDefault();
      const targetId = href.slice(2);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const content = (
    <StyledLinkWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    </StyledLinkWrapper>
  );

  // Si no estamos en la página principal o no es un enlace con hash
  if (!isHashLink || !isHomePage) {
    return (
      <Link href={href} passHref legacyBehavior>
        {content}
      </Link>
    );
  }

  return content;
}
