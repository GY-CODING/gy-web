import { Lexend } from 'next/font/google';
import localFont from 'next/font/local';

export const lexendFont = Lexend({
  subsets: ['latin'],
  display: 'swap',
});

export const valorantFont = localFont({
  src: '../../public/fonts/Valorant Font.ttf',
  display: 'swap',
});
