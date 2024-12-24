import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPrisma,
  SiPostgresql,
  SiAuth0,
  SiJsonwebtokens,
} from 'react-icons/si';
import { IconType } from 'react-icons';

export type ProductId = 'heralds-of-chaos' | 'gy-messages' | 'gy-documents' | 'gy-accounts';

export interface Technology {
  name: string;
  icon: IconType;
  color: string;
}

export interface ProductTheme {
  primary: string;
  secondary: string;
  gradient: string;
  accentColor: string;
}

export const TECHNOLOGIES: Record<ProductId, Technology[]> = {
  'heralds-of-chaos': [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  ],
  'gy-messages': [
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  ],
  'gy-documents': [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  ],
  'gy-accounts': [
    { name: 'Auth0', icon: SiAuth0, color: '#EB5424' },
    { name: 'JWT', icon: SiJsonwebtokens, color: '#000000' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  ],
} as const;

export const PRODUCT_THEMES: Record<ProductId, ProductTheme> = {
  'heralds-of-chaos': {
    primary: '#FFA07A',
    secondary: '#FFB299',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
    accentColor: '#FFA07A',
  },
  'gy-messages': {
    primary: '#00C853',
    secondary: '#69F0AE',
    gradient: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
    accentColor: '#00C853',
  },
  'gy-documents': {
    primary: '#2196F3',
    secondary: '#90CAF9',
    gradient: 'linear-gradient(135deg, #2196F3 0%, #90CAF9 100%)',
    accentColor: '#2196F3',
  },
  'gy-accounts': {
    primary: '#7B1FA2',
    secondary: '#BA68C8',
    gradient: 'linear-gradient(135deg, #7B1FA2 0%, #BA68C8 100%)',
    accentColor: '#7B1FA2',
  },
} as const;
