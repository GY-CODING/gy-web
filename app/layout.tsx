import type { Metadata } from 'next';
import RootLayoutClient from './RootLayoutClient';

export const metadata: Metadata = {
  title: 'GYCODING',
  description: 'Desarrollo web profesional',
  icons: {
    icon: '/gy-icon-small.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
