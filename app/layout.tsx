import type { Metadata } from 'next';
import RootLayoutClient from './RootLayoutClient';

export const metadata: Metadata = {
  title: 'GYCODING',
  description: 'Equipo de desarrollo de Software.',
  icons: {
    icon: '/gy-icon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
