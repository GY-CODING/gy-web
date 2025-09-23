import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiAuth0,
  SiJsonwebtokens,
} from 'react-icons/si';
import { IconType } from 'react-icons';

export type ProductId = 'heralds-of-chaos' | 'gy-accounts' | 'wingwords';

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
  'gy-accounts': [
    { name: 'Auth0', icon: SiAuth0, color: '#EB5424' },
    { name: 'JWT', icon: SiJsonwebtokens, color: '#000000' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  ],
  wingwords: [
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
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
  'gy-accounts': {
    primary: '#7B1FA2',
    secondary: '#BA68C8',
    gradient: 'linear-gradient(135deg, #7B1FA2 0%, #BA68C8 100%)',
    accentColor: '#7B1FA2',
  },
  wingwords: {
    primary: '#8E44AD',
    secondary: '#9B59B6',
    gradient: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
    accentColor: '#8E44AD',
  },
} as const;
