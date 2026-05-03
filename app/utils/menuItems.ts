import { getAssetPath } from './useImagePath';

// Definir las rutas de los iconos como constantes
const ICON_PATHS = {
  HERALDS_OF_CHAOS: getAssetPath('/icons/heralds_of_chaos.png'),
  HERALDS_OF_CHAOS_LIGHT: getAssetPath('/icons/heralds_of_chaos.png'),
  GY_ACCOUNTS: getAssetPath('/icons/gy_accounts.svg'),
  GY_ACCOUNTS_LIGHT: getAssetPath('/icons/gy_accounts_light.svg'),
  WINGWORDS: getAssetPath('/icons/wingwords.png'),
  WINGWORDS_LIGHT: getAssetPath('/icons/wingwords.png'),
  ACCOUNT: getAssetPath('/icons/cards/account.svg'),
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
        title: 'Wingwords',
        path: '/products/wingwords',
        icon: ICON_PATHS.WINGWORDS,
        icon_light: ICON_PATHS.WINGWORDS_LIGHT,
        description: 'Connect with readers and share literary experiences.',
      },
      {
        title: 'Heralds of Chaos',
        path: '/products/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        icon_light: ICON_PATHS.HERALDS_OF_CHAOS_LIGHT,
        description: 'A universe based on Norse mythology.',
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
        title: 'Documentation',
        path: 'https://docs.gycoding.com',
        icon: ICON_PATHS.DOCS,
        icon_light: ICON_PATHS.DOCS_LIGHT,
        external: true,
        description: 'Unified documentation and API Reference.',
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
        description: 'Meet our team.',
      },
      {
        title: 'Company',
        path: '/about/company',
        icon: ICON_PATHS.COMPANY,
        icon_light: ICON_PATHS.COMPANY_LIGHT,
        description: 'Learn more about our company.',
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
        title: 'Wingwords',
        path: '/products/wingwords',
        icon: ICON_PATHS.WINGWORDS,
        icon_light: ICON_PATHS.WINGWORDS_LIGHT,
        description: 'Conecta con lectores y comparte tus experiencias.',
      },
      {
        title: 'Heraldos del Caos',
        path: '/products/heralds-of-chaos',
        icon: ICON_PATHS.HERALDS_OF_CHAOS,
        icon_light: ICON_PATHS.HERALDS_OF_CHAOS_LIGHT,
        description: 'Universo basado en la mitología nórdica.',
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
        title: 'Documentación',
        path: 'https://docs.gycoding.com',
        icon: ICON_PATHS.DOCS,
        icon_light: ICON_PATHS.DOCS_LIGHT,
        external: true,
        description: 'Documentación y referencia de la API unificados.',
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
        description: 'Manage your account settings.',
      },
    ],
  };
}
