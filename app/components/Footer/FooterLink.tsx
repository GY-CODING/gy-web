'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';

const StyledLink = styled(motion.div)(({ theme }) => ({
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

interface FooterLinkProps {
  href: string;
  name: string;
}

export default function FooterLink({ href, name }: FooterLinkProps) {
  const theme = useTheme();

  return (
    <StyledLink
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <Link href={href}>
        {name}
      </Link>
    </StyledLink>
  );
}
