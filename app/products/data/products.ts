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
  link?: string;
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
    status: EStatus.BETA,
    link: 'https://heraldsofchaos.gycoding.com',
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
    id: 'wingwords',
    name: 'WingWords',
    description: 'Discover readers with similar tastes and share your literary experiences',
    shortDescription: 'Connect with readers and share literary experiences',
    color: '#8E44AD',
    longDescription:
      'WingWords is a social platform designed for book lovers to discover new reads, connect with readers who share similar tastes, and create meaningful literary discussions. Share your reading journey, get personalized recommendations, and build a community around your favorite books.',
    image: '/images/products/wingwords.png',
    version: '1.0.0-beta',
    status: EStatus.BETA,
    link: 'https://wingwords.gycoding.com',
    primary: '#8E44AD',
    secondary: '#9B59B6',
    gradient: 'linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)',
    features: [
      {
        title: 'Reader Matching',
        description: 'Connect with readers who share your literary tastes and preferences',
        icon: 'users',
      },
      {
        title: 'Book Recommendations',
        description: 'Get personalized book suggestions based on your reading history',
        icon: 'star',
      },
      {
        title: 'Literary Discussions',
        description: 'Join meaningful conversations about your favorite books and authors',
        icon: 'chat',
      },
      {
        title: 'Reading Progress',
        description: 'Track your reading journey and set personal reading goals',
        icon: 'progress',
      },
    ],
    faqs: [
      {
        question: '¿Cómo funciona el sistema de recomendaciones?',
        answer:
          'Nuestro algoritmo analiza tus libros favoritos, géneros preferidos y calificaciones para sugerir nuevas lecturas que se adapten a tu gusto.',
      },
      {
        question: '¿Puedo conectar con lectores de todo el mundo?',
        answer:
          'Sí, WingWords es una plataforma global que te permite conectar con lectores de cualquier país y en múltiples idiomas.',
      },
      {
        question: '¿Es gratuito usar WingWords?',
        answer:
          'Sí, WingWords ofrece todas las funciones básicas de forma gratuita. También tenemos planes premium con características adicionales.',
      },
      {
        question: '¿Cómo protegen mi privacidad?',
        answer:
          'Respetamos tu privacidad y solo compartimos la información que tú elijas hacer pública en tu perfil de lector.',
      },
      {
        question: '¿Puedo crear clubs de lectura?',
        answer:
          'Sí, puedes crear y unirte a clubs de lectura temáticos, organizar discusiones grupales y participar en desafíos de lectura.',
      },
    ],
  },
];

export const TECHNOLOGIES: any = {
  'heralds-of-chaos': [
    {
      name: 'HERALDS OF CHAOS',
      icon: getAssetPath('icons/solar_system/heralds/heralds_of_chaos.png'),
      description: 'Desarrollo tipado y seguro',
      orbit: 2,
      speed: 0.8,
    },
    {
      name: 'Java',
      icon: getAssetPath('icons/solar_system/heralds/java.svg'),
      description: 'Contenedorización',
      orbit: 0,
      speed: 0.5,
    },
    {
      name: 'Spring Boot',
      icon: getAssetPath('icons/solar_system/heralds/springboot.svg'),
      description: 'Framework React de última generación',
      orbit: 0,
      speed: 1,
    },
    {
      name: 'Typescript',
      icon: getAssetPath('icons/solar_system/heralds/typescript.svg'),
      description: 'Contenedorización',
      orbit: 1,
      speed: 0.5,
    },
    {
      name: 'NextJS',
      icon: getAssetPath('icons/solar_system/heralds/nextjs.svg'),
      description: 'Framework React de última generación',
      orbit: 1,
      speed: 1,
    },
    {
      name: 'Cloudflare',
      icon: getAssetPath('icons/solar_system/heralds/cloudflare.svg'),
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
  wingwords: [
    {
      name: 'WINGWORDS',
      icon: getAssetPath('icons/solar_system/wingwords/wingwords.png'),
      description: 'Social Reading Platform',
      orbit: 2,
      speed: 0.9,
    },
    {
      name: 'Java',
      icon: getAssetPath('icons/solar_system/wingwords/java.svg'),
      description: 'Backend Development',
      orbit: 0,
      speed: 0.5,
    },
    {
      name: 'Spring Boot',
      icon: getAssetPath('icons/solar_system/wingwords/springboot.svg'),
      description: 'Framework de desarrollo backend',
      orbit: 0,
      speed: 1,
    },
    {
      name: 'Typescript',
      icon: getAssetPath('icons/solar_system/wingwords/typescript.svg'),
      description: 'Desarrollo tipado y seguro',
      orbit: 1,
      speed: 0.5,
    },
    {
      name: 'NextJS',
      icon: getAssetPath('icons/solar_system/wingwords/nextjs.svg'),
      description: 'Framework React de última generación',
      orbit: 1,
      speed: 1,
    },
    {
      name: 'Cloudflare',
      icon: getAssetPath('icons/solar_system/wingwords/cloudflare.svg'),
      description: 'Cloud Computing y CDN',
      orbit: 2,
      speed: 1,
    },
  ],
};
