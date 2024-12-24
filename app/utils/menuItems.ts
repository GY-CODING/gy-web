import { getAssetPath } from './useImagePath';

// Definir las rutas de los iconos como constantes
const ICON_PATHS = {
  HERALDS_OF_CHAOS: getAssetPath('/icons/heralds_of_chaos.svg'),
  GY_ACCOUNTS: getAssetPath('/icons/gy_accounts.svg'),
  GY_MESSAGES: getAssetPath('/icons/gy_messages.svg'),
  GY_DOCUMENTS: getAssetPath('/icons/gy_documents.svg'),
  ACCOUNT: getAssetPath('/icons/cards/account.svg'),
  GY_DOCUMENTS_LIGHT: getAssetPath('/icons/gy_documents_light.svg'),
} as const;

export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  description?: string;
  external?: boolean;
}

const menuItemsEN: MenuItem[] = [
  {
    title: 'Products',
    path: '/products',
    children: [
      {
        title: 'Heralds of Chaos',
        path: '/products/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        description: 'Epic Norse mythology video game',
      },
      {
        title: 'GY Messages',
        path: '/products/gy-messages',
        icon: ICON_PATHS.GY_MESSAGES,
        description: 'Integrated messaging service',
      },
      {
        title: 'GY Documents',
        path: '/products/gy-documents',
        icon: ICON_PATHS.GY_DOCUMENTS_LIGHT,
        description: 'Professional markdown editor',
      },
      {
        title: 'GY Accounts',
        path: '/products/gy-accounts',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Account management and customization',
      },
    ],
  },
  {
    title: 'Docs',
    path: '/docs',
    children: [
      {
        title: 'Getting Started',
        path: 'https://docs.gycoding.com',
        icon: ICON_PATHS.GY_DOCUMENTS,
        external: true,
        description: 'Learn how to get started with our platform',
      },
      {
        title: 'API Reference',
        path: 'https://gycoding.stoplight.io/docs/api-docs/5b949c346e2dc-fall-of-the-gods-api',
        icon: ICON_PATHS.GY_DOCUMENTS,
        description: 'Detailed API documentation',
        external: true,
      },
    ],
  },
  {
    title: 'About',
    path: '/about',
    children: [
      {
        title: 'Team',
        path: '/about/team',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Meet our talented team',
      },
      {
        title: 'Company',
        path: '/about/company',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Learn more about our company',
      },
    ],
  },
];

const menuItemsES: MenuItem[] = [
  {
    title: 'Productos',
    path: '/products',
    children: [
      {
        title: 'Heralds of Chaos',
        path: '/products/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        description: 'Videojuego épico de mitología nórdica',
      },
      {
        title: 'GY Messages',
        path: '/products/gy-messages',
        icon: ICON_PATHS.GY_MESSAGES,
        description: 'Servicio de mensajería integrado',
      },
      {
        title: 'GY Documents',
        path: '/products/gy-documents',
        icon: ICON_PATHS.GY_DOCUMENTS_LIGHT,
        description: 'Editor profesional de markdown',
      },
      {
        title: 'GY Accounts',
        path: '/products/gy-accounts',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Gestión de cuentas y personalización',
      },
    ],
  },
  {
    title: 'Docs',
    path: '/docs',
    children: [
      {
        title: 'Guía de Inicio',
        path: 'https://docs.gycoding.com',
        icon: ICON_PATHS.GY_DOCUMENTS,
        external: true,
        description: 'Aprende cómo empezar con nuestra plataforma',
      },
      {
        title: 'Referencia de API',
        path: 'https://gycoding.stoplight.io/docs/api-docs/5b949c346e2dc-fall-of-the-gods-api',
        icon: ICON_PATHS.GY_DOCUMENTS,
        description: 'Documentación detallada de la API',
        external: true,
      },
    ],
  },
  {
    title: 'Acerca de',
    path: '/about',
    children: [
      {
        title: 'Equipo',
        path: '/about/team',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Conoce a nuestro equipo talentoso',
      },
      {
        title: 'Compañía',
        path: '/about/company',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Aprende más sobre nuestra compañía',
      },
    ],
  },
];

export function getMenuItems(language: string): MenuItem[] {
  return language === 'es' ? menuItemsES : menuItemsEN;
}

export function getButtonText(language: string, key: 'login' | 'contact'): string {
  const texts = {
    login: {
      en: 'Login',
      es: 'Iniciar Sesión',
    },
    contact: {
      en: 'Contact',
      es: 'Contacto',
    },
  };

  return texts[key][language as 'en' | 'es'] || texts[key]['en'];
}

export function userItem(image: string) {
  return {
    title: 'Account',
    path: '/account',
    icon: image || ICON_PATHS.ACCOUNT,
    children: [
      {
        title: 'Profile',
        path: '/account/profile',
        description: 'Manage your account settings',
      },
    ],
  };
}
