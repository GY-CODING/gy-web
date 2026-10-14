'use client';

import { Box, Tooltip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Image from 'next/image';
import { getAssetPath } from '../../utils/useImagePath';
import { glassIconButtonSx } from '../headerStyles';

interface SocialIconProps {
  name: string;
  href: string;
}

const iconMap = {
  GitHub: GitHubIcon,
  X: XIcon,
  Contact: MailOutlineRoundedIcon,
  Support: HelpOutlineRoundedIcon,
};

export default function SocialIcon({ name, href }: SocialIconProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const Icon = iconMap[name as keyof typeof iconMap];
  const isMail = href.startsWith('mailto:');

  return (
    <Tooltip title={name} arrow>
      <Box
        component={motion.a}
        href={href}
        target={isMail ? undefined : '_blank'}
        rel={isMail ? undefined : 'noopener noreferrer'}
        aria-label={name}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          ...glassIconButtonSx(isDark),
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            ...glassIconButtonSx(isDark)['&:hover'],
            color: isDark ? '#fff' : '#000',
            boxShadow: '0 10px 25px -10px rgba(140,84,255,0.6)',
          },
        }}
      >
        {name === 'Discord' ? (
          <Image
            src={getAssetPath('/icons/discord.svg')}
            alt=""
            width={20}
            height={20}
            style={{ filter: isDark ? 'none' : 'invert(1)', opacity: 0.8 }}
          />
        ) : (
          Icon && <Icon sx={{ fontSize: '1.2rem' }} />
        )}
      </Box>
    </Tooltip>
  );
}
