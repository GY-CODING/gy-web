'use client';

import Link from 'next/link';
import { IconButton, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';

interface SocialIconProps {
  name: string;
  href: string;
}

const iconMap = {
  GitHub: GitHubIcon,
  X: XIcon,
  Contact: EmailIcon,
};

export default function SocialIcon({ name, href }: SocialIconProps) {
  const theme = useTheme();
  const Icon = iconMap[name as keyof typeof iconMap];

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <IconButton
        aria-label={`Follow us on ${name}`}
        sx={{
          color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            background:
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Icon />
      </IconButton>
    </Link>
  );
}
