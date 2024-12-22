import { Button } from '@mui/material';
import { lexendFont } from '@/app/utils/fonts';
import Link from 'next/link';
import React from 'react';

interface CustomButtonProps {
  text: string;
  sx?: object;
  link: string;
  onClick?: () => void;
}

export default function CustomButton({
  text,
  sx,
  onClick,
  link,
  ...props
}: CustomButtonProps): JSX.Element {
  return (
    <Button
      sx={{
        backgroundColor: '#8C54FF1A',
        color: 'color.primary.contrastText',
        fontFamily: lexendFont.style.fontFamily,
        border: '2px solid #8C54FF',
        borderRadius: '37px',
        transition: 'all 0.2s ease-in-out',
        paddingX: 4,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#8C54FF80',
          boxShadow: 'none',
        },
        ...sx,
      }}
      onClick={onClick ?? (() => {})}
      {...props}
    >
      {link ? (
        <Link href={link} passHref style={{ color: 'inherit', textDecoration: 'none' }}>
          {text}
        </Link>
      ) : (
        text
      )}
    </Button>
  );
}
