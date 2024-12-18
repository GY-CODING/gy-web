import HeraldsOfChaosIcon from '../../public/icons/heralds_of_chaos.svg';
import GYAccountsIcon from '../../public/icons/gy_accounts.svg';
import GYMessagesIcon from '../../public/icons/gy_messages.svg';
import GYDocumentsIcon from '../../public/icons/gy_documents.svg';
import ACCOUNT_ICON from '../../public/icons/cards/account.svg';
import { SvgIconProps } from '@mui/material';

export interface MenuItem {
  title: string;
  path?: string;
  children?: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  description?: string;
  path: string;
  icon: string;
}

export const menuItems: MenuItem[] = [
  {
    title: 'Projects',
    children: [
      {
        title: 'Heralds of Chaos',
        description: 'A unique card game with strategic depth',
        path: '/projects/heralds-of-chaos',
        icon: HeraldsOfChaosIcon
      },
      {
        title: 'GY Accounts',
        description: 'Secure account management system',
        path: '/projects/gy-accounts',
        icon: GYAccountsIcon
      },
      {
        title: 'GY Messages',
        description: 'Real-time messaging platform',
        path: '/projects/gy-messages',
        icon: GYMessagesIcon
      },
      {
        title: 'GY Documents',
        description: 'Document management and sharing',
        path: '/projects/gy-documents',
        icon: GYDocumentsIcon
      }
    ]
  },
  {
    title: 'Docs',
    children: [
      {
        title: 'Getting Started',
        path: '/docs/getting-started',
        icon: GYDocumentsIcon
      },
      {
        title: 'API Reference',
        path: '/docs/api',
        icon: GYDocumentsIcon
      },
      {
        title: 'Examples',
        path: '/docs/examples',
        icon: GYDocumentsIcon
      }
    ]
  },
  {
    title: 'About',
    children: [
      {
        title: 'Team',
        path: '/about/team',
        icon: GYAccountsIcon
      },
      {
        title: 'Company',
        path: '/about/company',
        icon: GYAccountsIcon
      },
      {
        title: 'Careers',
        path: '/about/careers',
        icon: GYAccountsIcon
      }
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
