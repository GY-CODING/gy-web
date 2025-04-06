import { EStatus } from '@/app/utils/constants/status.enum';
import { getAssetPath } from '@/app/utils/useImagePath';

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  color: string;
  longDescription: string;
  image: string;
  icon?: string;
  version: string;
  status: EStatus;
  downloads?: {
    windows?: string;
    mac?: string;
    linux?: string;
  };
  changelog?: {
    type: 'feature' | 'fix' | 'improvement';
    description: string;
  }[];
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  primary?: string;
  secondary?: string;
  gradient?: string;
}

export const products: Product[] = [
  {
    id: 'heralds-of-chaos',
    name: 'Heralds of Chaos',
    description:
      'Un épico videojuego basado en la mitología nórdica con un nuevo enfoque en la narrativa',
    shortDescription: 'Épico juego de acción de mitología nórdica',
    color: '#FFB300',
    longDescription:
      'Embárcate en un viaje épico a través de los nueve reinos de la mitología nórdica. Lucha junto a los dioses, enfrenta criaturas míticas y da forma al destino de Midgard en este revolucionario RPG de acción.',
    image: '/images/products/heralds-of-chaos.jpg',
    version: '0.5.2-alpha',
    status: EStatus.COMING_SOON,
    downloads: {
      windows: 'https://download.example.com/heralds-of-chaos/windows',
      mac: 'https://download.example.com/heralds-of-chaos/mac',
      linux: 'https://download.example.com/heralds-of-chaos/linux',
    },
    changelog: [
      {
        type: 'feature',
        description: 'Añadido nuevo sistema de combate con mecánicas de mitología nórdica',
      },
      {
        type: 'fix',
        description: 'Corregidos errores de renderizado en entornos de alta resolución',
      },
    ],
    features: [
      {
        title: 'Combate Nórdico Épico',
        description:
          'Experimenta intensas batallas con un sistema de combate único inspirado en la mitología nórdica',
        icon: 'sword',
      },
      {
        title: 'Rica Narrativa',
        description: 'Sumérgete en una narrativa profunda que entrelaza mitos y leyendas nórdicas',
        icon: 'book',
      },
      {
        title: 'Gráficos Impresionantes',
        description: 'Explora entornos bellamente diseñados a través de los nueve reinos',
        icon: 'eye',
      },
    ],
    faqs: [
      {
        question: '¿Cuáles son los requisitos del sistema?',
        answer:
          'El juego requiere un PC gaming moderno con al menos 8GB de RAM y una tarjeta gráfica dedicada.',
      },
      {
        question: '¿Está disponible el multijugador?',
        answer:
          'Las características multijugador están actualmente en desarrollo y estarán disponibles en la versión completa.',
      },
    ],
  },
  {
    id: 'gy-messages',
    name: 'GY Messages',
    description: 'Sistema de mensajería moderno y seguro con cifrado de extremo a extremo',
    shortDescription: 'Mensajería segura y privada',
    color: '#00C853',
    longDescription:
      'Una plataforma de mensajería versátil y segura diseñada para integrarse perfectamente con otros servicios de GY Coding.',
    image: '/images/products/gy-messages.jpg',
    version: '1.2.0',
    status: EStatus.COMING_SOON,
    downloads: {
      windows: 'https://download.example.com/gy-messages/windows',
      mac: 'https://download.example.com/gy-messages/mac',
      linux: 'https://download.example.com/gy-messages/linux',
    },
    changelog: [
      {
        type: 'feature',
        description: 'Añadido soporte para mensajes cifrados de extremo a extremo',
      },
      {
        type: 'fix',
        description: 'Corregidos problemas de sincronización con mensajes',
      },
    ],
    features: [
      {
        title: 'Mensajería en Tiempo Real',
        description: 'Comunicación instantánea con cifrado de extremo a extremo',
        icon: 'message',
      },
      {
        title: 'Integración Perfecta',
        description: 'Se integra sin problemas con otros servicios de GY Coding',
        icon: 'link',
      },
      {
        title: 'Personalización Completa',
        description: 'Personaliza la interfaz y las funcionalidades según tus necesidades',
        icon: 'settings',
      },
    ],
    faqs: [
      {
        question: '¿Es seguro GY Messages?',
        answer:
          'Sí, utilizamos cifrado de extremo a extremo y seguimos las mejores prácticas de seguridad.',
      },
      {
        question: '¿Puedo usar GY Messages en mi aplicación?',
        answer: 'Sí, ofrecemos una API completa para integrar GY Messages en cualquier aplicación.',
      },
    ],
  },
  {
    id: 'gy-accounts',
    name: 'GY Accounts',
    description: 'Sistema de gestión de cuentas y autenticación centralizado',
    shortDescription: 'Gestión de cuentas segura y centralizada',
    color: '#7B1FA2',
    longDescription:
      'Sistema centralizado de gestión de cuentas y autenticación para todas las aplicaciones de GY Coding. Proporciona una experiencia de inicio de sesión única y segura.',
    image: '/images/products/gy-accounts.jpg',
    version: '1.0.0',
    status: EStatus.BETA,
    features: [
      {
        title: 'Inicio de Sesión Único',
        description: 'Accede a todas las aplicaciones de GY Coding con una sola cuenta',
        icon: 'key',
      },
      {
        title: 'Autenticación Multifactor',
        description: 'Seguridad adicional con autenticación de dos factores',
        icon: 'shield',
      },
      {
        title: 'Gestión Centralizada',
        description: 'Administra todas las cuentas desde un único panel',
        icon: 'users',
      },
    ],
    faqs: [
      {
        question: '¿Cómo funciona el inicio de sesión único?',
        answer:
          'Una vez autenticado, podrás acceder a todas las aplicaciones de GY Coding sin necesidad de volver a iniciar sesión.',
      },
      {
        question: '¿Es compatible con otros sistemas de autenticación?',
        answer:
          'Sí, GY Accounts se integra con los principales proveedores de identidad y soporta protocolos estándar como OAuth2 y SAML.',
      },
    ],
  },
  {
    id: 'gy-documents',
    name: 'GY Documents',
    description: 'Sistema de gestión documental colaborativo y seguro',
    shortDescription: 'Gestión documental empresarial',
    color: '#2196F3',
    longDescription:
      'Plataforma avanzada de gestión documental que permite a las organizaciones almacenar, organizar y colaborar en documentos de manera segura y eficiente.',
    image: '/images/products/gy-documents.jpg',
    version: '1.5.0',
    status: EStatus.COMING_SOON,
    primary: '#1976D2',
    secondary: '#2196F3',
    gradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
    features: [
      {
        title: 'Colaboración en Tiempo Real',
        description: 'Trabaja en documentos simultáneamente con tu equipo',
        icon: 'users',
      },
      {
        title: 'Versionado Automático',
        description: 'Mantén un historial completo de cambios en los documentos',
        icon: 'history',
      },
      {
        title: 'Búsqueda Avanzada',
        description: 'Encuentra cualquier documento con búsqueda de texto completo',
        icon: 'search',
      },
    ],
    faqs: [
      {
        question: '¿Qué tipos de documentos puedo gestionar?',
        answer:
          'GY Documents soporta todos los formatos comunes de documentos, incluyendo PDF, Office, imágenes y más.',
      },
      {
        question: '¿Cómo se manejan los permisos de acceso?',
        answer:
          'Ofrecemos un sistema granular de permisos que permite controlar el acceso a nivel de carpeta y documento.',
      },
    ],
  },
];

export const TECHNOLOGIES: any = {
  'heralds-of-chaos': [
    {
      name: 'HERALDS OF CHAOS',
      icon: getAssetPath('icons/solar_system/heralds/heralds_of_chaos.svg'),
      description: 'Desarrollo tipado y seguro',
      orbit: 2,
      speed: 0.8,
    },
    {
      name: 'C#',
      icon: getAssetPath('icons/solar_system/heralds/csharp.svg'),
      description: 'ORM moderno y tipado',
      orbit: 0,
      speed: 0.6,
    },
    {
      name: 'Unity',
      icon: getAssetPath('icons/solar_system/heralds/unity.svg'),
      description: 'Base de datos relacional',
      orbit: 0,
      speed: 0.7,
    },
    {
      name: 'C++',
      icon: getAssetPath('icons/solar_system/heralds/cplusplus.svg'),
      description: 'ORM moderno y tipado',
      orbit: 1,
      speed: 0.6,
    },
    {
      name: 'Unreal Engine',
      icon: getAssetPath('icons/solar_system/heralds/unreal.svg'),
      description: 'Base de datos relacional',
      orbit: 1,
      speed: 0.7,
    },
    {
      name: 'Blender',
      icon: getAssetPath('icons/solar_system/heralds/blender.svg'),
      description: 'Base de datos relacional',
      orbit: 2,
      speed: 0.7,
    },
  ],
  'gy-documents': [
    {
      name: 'GY DOCUMENTS',
      icon: getAssetPath('icons/solar_system/documents/gy_documents.svg'),
      description: 'Cloud Computing',
      orbit: 2,
      speed: 0.9,
    },
    {
      name: 'TypeScript',
      icon: getAssetPath('icons/solar_system/documents/typescript.svg'),
      description: 'Contenedorización',
      orbit: 0,
      speed: 0.5,
    },
    {
      name: 'Next.js',
      icon: getAssetPath('icons/solar_system/documents/nextjs.svg'),
      description: 'Framework React de última generación',
      orbit: 0,
      speed: 1,
    },
    {
      name: 'Electron',
      icon: getAssetPath('icons/solar_system/documents/electron.svg'),
      description: 'Contenedorización',
      orbit: 1,
      speed: 0.5,
    },
    {
      name: 'Node',
      icon: getAssetPath('icons/solar_system/documents/node.svg'),
      description: 'Framework React de última generación',
      orbit: 1,
      speed: 1,
    },
    {
      name: 'GitHub',
      icon: getAssetPath('icons/solar_system/documents/github.svg'),
      description: 'Framework React de última generación',
      orbit: 2,
      speed: 1,
    },
  ],
  'gy-accounts': [
    {
      name: 'GY ACCOUNTS',
      icon: getAssetPath('icons/solar_system/accounts/gy_accounts.svg'),
      description: 'Cloud Computing',
      orbit: 2,
      speed: 0.9,
    },
    {
      name: 'Java',
      icon: getAssetPath('icons/solar_system/accounts/java.svg'),
      description: 'Contenedorización',
      orbit: 0,
      speed: 0.5,
    },
    {
      name: 'Spring Boot',
      icon: getAssetPath('icons/solar_system/accounts/springboot.svg'),
      description: 'Framework React de última generación',
      orbit: 0,
      speed: 1,
    },
    {
      name: 'Typescript',
      icon: getAssetPath('icons/solar_system/accounts/typescript.svg'),
      description: 'Contenedorización',
      orbit: 1,
      speed: 0.5,
    },
    {
      name: 'NextJS',
      icon: getAssetPath('icons/solar_system/accounts/nextjs.svg'),
      description: 'Framework React de última generación',
      orbit: 1,
      speed: 1,
    },
    {
      name: 'Cloudflare',
      icon: getAssetPath('icons/solar_system/accounts/cloudflare.svg'),
      description: 'Framework React de última generación',
      orbit: 2,
      speed: 1,
    },
  ],
  'gy-messages': [
    {
      name: 'GY MESSAGES',
      icon: getAssetPath('icons/solar_system/messages/gy_messages.svg'),
      description: 'Cloud Computing',
      orbit: 2,
      speed: 0.9,
    },
    {
      name: 'Typescript',
      icon: getAssetPath('icons/solar_system/messages/typescript.svg'),
      description: 'Contenedorización',
      orbit: 0,
      speed: 0.5,
    },
    {
      name: 'React Native',
      icon: getAssetPath('icons/solar_system/messages/react.svg'),
      description: 'Framework React de última generación',
      orbit: 0,
      speed: 1,
    },
    {
      name: 'Java',
      icon: getAssetPath('icons/solar_system/messages/java.svg'),
      description: 'Contenedorización',
      orbit: 1,
      speed: 0.5,
    },
    {
      name: 'Spring Boot',
      icon: getAssetPath('icons/solar_system/messages/springboot.svg'),
      description: 'Framework React de última generación',
      orbit: 1,
      speed: 1,
    },
    {
      name: 'Cloudflare',
      icon: getAssetPath('icons/solar_system/messages/cloudflare.svg'),
      description: 'Framework React de última generación',
      orbit: 2,
      speed: 1,
    },
  ],
};
