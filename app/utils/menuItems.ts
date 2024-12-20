import HeraldsOfChaosIcon from '../../public/icons/heralds_of_chaos.svg';
import GYAccountsIcon from '../../public/icons/gy_accounts.svg';
import GYMessagesIcon from '../../public/icons/gy_messages.svg';
import GYDocumentsIcon from '../../public/icons/gy_documents.svg';
import ACCOUNT_ICON from '../../public/icons/cards/account.svg';
import GY_DOCUMENTS_LIGHT_ICON from '../../public/icons/gy_documents_light.svg';
import { SvgIconProps } from '@mui/material';

export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  description?: string;
  external?: boolean;
}

export interface SubMenuItem {
  title: string;
  description?: string;
  path: string;
  icon: string;
  external?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Projects',
    path: '/projects',
    children: [
      {
        title: 'Heralds of Chaos',
        path: '/projects/heralds-of-chaos',
        icon: HeraldsOfChaosIcon,
        description: 'A unique card game with strategic depth'
      },
      {
        title: 'GY Accounts',
        path: '/projects/gy-accounts',
        icon: GYAccountsIcon,
        description: 'Secure account management system'
      },
      {
        title: 'GY Messages',
        path: '/projects/gy-messages',
        icon: GYMessagesIcon,
        description: 'Real-time messaging platform'
      },
      {
        title: 'GY Documents',
        path: '/projects/gy-documents',
        icon: GY_DOCUMENTS_LIGHT_ICON,
        description: 'Document management and sharing'
      }
    ]
  },
  {
    title: 'Docs',
    path: '/docs',
    children: [
      {
        title: 'Getting Started',
        path: 'https://docs.gycoding.com',
        icon: GYDocumentsIcon,
        external: true,
        description: 'Learn how to get started with our platform'
      },
      {
        title: 'API Reference',
        path: 'https://gycoding.stoplight.io/docs/api-docs/5b949c346e2dc-fall-of-the-gods-api',
        icon: GYDocumentsIcon,
        description: 'Detailed API documentation',
        external: true
      },
    ]
  },
  {
    title: 'About',
    path: '/about',
    children: [
      {
        title: 'Team',
        path: '/about/team',
        icon: GYAccountsIcon,
        description: 'Meet our talented team'
      },
      {
        title: 'Company',
        path: '/about/company',
        icon: GYAccountsIcon,
        description: 'Learn more about our company'
      },
    ]
  }
];

export const userItem = (image: string): any => ({
  name: '',
  external: false,
  link: undefined,
  childs: [
    {
      name: 'Edit Profile',
      icon: GYAccountsIcon,
      link: '/profile',
    },
    { name: 'Logout', icon: GYAccountsIcon, link: '/api/auth/logout' },
  ],
  isImage: true,
  image,
});
