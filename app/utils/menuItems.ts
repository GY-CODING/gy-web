import { getAssetPath } from './useImagePath';

// Definir las rutas de los iconos como constantes
const ICON_PATHS = {
  HERALDS_OF_CHAOS: getAssetPath('/icons/heralds_of_chaos.svg'),
  HERALDS_OF_CHAOS_LIGHT: getAssetPath('/icons/heralds_of_chaos_light.svg'),
  GY_ACCOUNTS: getAssetPath('/icons/gy_accounts.svg'),
  GY_ACCOUNTS_LIGHT: getAssetPath('/icons/gy_accounts_light.svg'),
  GY_MESSAGES: getAssetPath('/icons/gy_messages.svg'),
  GY_MESSAGES_LIGHT: getAssetPath('/icons/gy_messages_light.svg'),
  GY_DOCUMENTS: getAssetPath('/icons/gy_documents.svg'),
  GY_DOCUMENTS_LIGHT: getAssetPath('/icons/gy_documents_light.svg'),
  ACCOUNT: getAssetPath('/icons/cards/account.svg'),
  API_REFERENCE: getAssetPath('/icons/api_reference.svg'),
  API_REFERENCE_LIGHT: getAssetPath('/icons/api_reference_light.svg'),
  STATUS_LIGHT: getAssetPath('/icons/status_light.svg'),
  STATUS: getAssetPath('/icons/status_dark.svg'),
  DOCS: getAssetPath('/icons/docs.svg'),
  DOCS_LIGHT: getAssetPath('/icons/docs_light.svg'),
  TEAM: getAssetPath('/icons/team.svg'),
  TEAM_LIGHT: getAssetPath('/icons/team_light.svg'),
  COMPANY: getAssetPath('/icons/company.svg'),
  COMPANY_LIGHT: getAssetPath('/icons/company_light.svg'),
} as const;

export interface MenuItem {
  title: string;
  path: string;
  icon_light?: string;
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
        icon_light: ICON_PATHS.HERALDS_OF_CHAOS_LIGHT,
        description: 'A universe based on Norse mythology.',
      },
      {
        title: 'GY Messages',
        path: '/products/gy-messages',
        icon: ICON_PATHS.GY_MESSAGES,
        icon_light: ICON_PATHS.GY_MESSAGES_LIGHT,
        description: 'Messaging platform.',
      },
      {
        title: 'GY Documents',
        path: '/products/gy-documents',
        icon: ICON_PATHS.GY_DOCUMENTS_LIGHT,
        icon_light: ICON_PATHS.GY_DOCUMENTS,
        description: 'Markdown editor.',
      },
      {
        title: 'GY Accounts',
        path: '/products/gy-accounts',
        icon: ICON_PATHS.GY_ACCOUNTS,
        icon_light: ICON_PATHS.GY_ACCOUNTS_LIGHT,
        description: 'Authentication service.',
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
        icon: ICON_PATHS.DOCS,
        icon_light: ICON_PATHS.DOCS_LIGHT,
        external: true,
        description: 'General documentation of GYCODING.',
      },
      {
        title: 'API Reference',
        path: 'https://gycoding.stoplight.io/docs/api-docs/5b949c346e2dc-fall-of-the-gods-api',
        icon: ICON_PATHS.API_REFERENCE,
        icon_light: ICON_PATHS.API_REFERENCE_LIGHT,
        description: 'Detailed documentation of our API.',
        external: true,
      },
      {
        title: 'Services Status',
        path: 'https://status.gycoding.com',
        icon: ICON_PATHS.STATUS,
        icon_light: ICON_PATHS.STATUS_LIGHT,
        description: 'Status trace for our services.',
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
        icon: ICON_PATHS.TEAM,
        icon_light: ICON_PATHS.TEAM_LIGHT,
        description: 'Meet our team',
      },
      {
        title: 'Company',
        path: '/about/company',
        icon: ICON_PATHS.COMPANY,
        icon_light: ICON_PATHS.COMPANY_LIGHT,
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
        title: 'Heraldos del Caos',
        path: '/products/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        icon_light: ICON_PATHS.HERALDS_OF_CHAOS_LIGHT,
        description: 'Universo basado en la mitología nórdica.',
      },
      {
        title: 'GY Messages',
        path: '/products/gy-messages',
        icon: ICON_PATHS.GY_MESSAGES,
        icon_light: ICON_PATHS.GY_MESSAGES_LIGHT,
        description: 'Plataforma de mensajería.',
      },
      {
        title: 'GY Documents',
        path: '/products/gy-documents',
        icon: ICON_PATHS.GY_DOCUMENTS_LIGHT,
        icon_light: ICON_PATHS.GY_DOCUMENTS,
        description: 'Editor de Markdown.',
      },
      {
        title: 'GY Accounts',
        path: '/products/gy-accounts',
        icon: ICON_PATHS.GY_ACCOUNTS,
        icon_light: ICON_PATHS.GY_ACCOUNTS_LIGHT,
        description: 'Servicio de autenticación.',
      },
    ],
  },
  {
    title: 'Documentación',
    path: '/docs',
    children: [
      {
        title: 'Guía de Inicio',
        path: 'https://docs.gycoding.com/es',
        icon: ICON_PATHS.DOCS,
        icon_light: ICON_PATHS.DOCS_LIGHT,
        external: true,
        description: 'Documentación general de GYCODING.',
      },
      {
        title: 'Referencia de la API',
        path: 'https://gycoding.stoplight.io/docs/api-docs/5b949c346e2dc-fall-of-the-gods-api',
        icon: ICON_PATHS.API_REFERENCE,
        icon_light: ICON_PATHS.API_REFERENCE_LIGHT,
        description: 'Documentación detallada de nuestra API.',
        external: true,
      },
      {
        title: 'Estado de los Servicios',
        path: 'https://status.gycoding.com',
        icon: ICON_PATHS.STATUS,
        icon_light: ICON_PATHS.STATUS_LIGHT,
        description: 'Traza de estado de nuestros servicios.',
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
        icon: ICON_PATHS.TEAM,
        icon_light: ICON_PATHS.TEAM_LIGHT,
        description: 'Conoce a nuestro equipo.',
      },
      {
        title: 'Compañía',
        path: '/about/company',
        icon: ICON_PATHS.COMPANY,
        icon_light: ICON_PATHS.COMPANY_LIGHT,
        description: 'Aprende más sobre nuestra compañía.',
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
