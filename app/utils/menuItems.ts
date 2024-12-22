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
    title: 'Projects',
    path: '/projects',
    children: [
      {
        title: 'Heralds of Chaos',
        path: '/projects/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        description: 'A unique card game with strategic depth',
      },
      {
        title: 'GY Accounts',
        path: '/projects/gy-accounts',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Secure account management system',
      },
      {
        title: 'GY Messages',
        path: '/projects/gy-messages',
        icon: ICON_PATHS.GY_MESSAGES,
        description: 'Real-time messaging platform',
      },
      {
        title: 'GY Documents',
        path: '/projects/gy-documents',
        icon: ICON_PATHS.GY_DOCUMENTS_LIGHT,
        description: 'Document management and sharing',
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
    title: 'Proyectos',
    path: '/projects',
    children: [
      {
        title: 'Heralds of Chaos',
        path: '/projects/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        description: 'Un juego de cartas único con profundidad estratégica',
      },
      {
        title: 'GY Accounts',
        path: '/projects/gy-accounts',
        icon: ICON_PATHS.GY_ACCOUNTS,
        description: 'Sistema seguro de gestión de cuentas',
      },
      {
        title: 'GY Messages',
        path: '/projects/gy-messages',
        icon: ICON_PATHS.GY_MESSAGES,
        description: 'Plataforma de mensajería en tiempo real',
      },
      {
        title: 'GY Documents',
        path: '/projects/gy-documents',
        icon: ICON_PATHS.GY_DOCUMENTS_LIGHT,
        description: 'Gestión y colaboración de documentos',
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

export const getMenuItems = (language: string): MenuItem[] => {
  return language === 'es' ? menuItemsES : menuItemsEN;
};

export const getButtonText = (language: string, key: 'login' | 'contact'): string => {
  const buttons = {
    en: {
      login: 'Log In',
      contact: 'Contact',
    },
    es: {
      login: 'Iniciar Sesión',
      contact: 'Contacto',
    },
  };
  return buttons[language as keyof typeof buttons][key];
};

export const userItem = (image: string): any => ({
  name: '',
  external: false,
  link: undefined,
  childs: [
    {
      name: 'Edit Profile',
      icon: ICON_PATHS.GY_ACCOUNTS,
      link: '/profile',
    },
    { name: 'Logout', icon: ICON_PATHS.GY_ACCOUNTS, link: '/api/auth/logout' },
  ],
  isImage: true,
  image,
});
