/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
        transition: 'background-color .3s',
        paddingX: 4,

        ':hover': {
          backgroundColor: '#8C54FF80',
        },

        ...sx,
      }}
      onClick={onClick ?? (() => { })}
      {...props}
    >
      {link ? (
        <Link href={link} passHref>
          {text}
        </Link>
      ) : (
        text
      )}
    </Button>
  );
}
