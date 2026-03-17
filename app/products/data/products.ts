import { SiTypescript, SiNextdotjs, SiMongodb, SiSpringboot } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { IconType } from 'react-icons';

export type ProductId = 'wingwords' | 'gy-accounts' | 'heralds-of-chaos';

export interface TechBadge {
  name: string;
  icon: IconType;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
}

export interface ProfileHighlight {
  icon: string;
  text: string;
  textEs: string;
}

export interface ProfileSection {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  image: string | null;
  highlights: ProfileHighlight[];
}

export interface ProductData {
  id: ProductId;
  name: string;
  tagline: string;
  taglineEs: string;
  description: string;
  descriptionEs: string;
  logo: string;
  image: string | null;
  imageDark?: string;
  appUrl: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    heroBg: string;
    textGradient: string;
    lightBg: string;
    lightGradient: string;
    lightSectionBg: string;
  };
  features: Feature[];
  techStack: TechBadge[];
  profileSection?: ProfileSection;
  ctaLabel?: { en: string; es: string };
}

export const PRODUCTS: Record<ProductId, ProductData> = {
  wingwords: {
    id: 'wingwords',
    name: 'Wingwords',
    tagline: 'Your reading journey, elevated.',
    taglineEs: 'Tu viaje de lectura, elevado.',
    description:
      'Track your reading journey, discover new books, curate your personal Hall of Fame, and connect with fellow readers worldwide. WingWords is your all-in-one reading companion.',
    descriptionEs:
      'Registra tu progreso de lectura, descubre nuevos libros, crea tu Hall of Fame personal y conecta con lectores de todo el mundo.',
    logo: '/icons/wingwords.png',
    image: '/images/products/wingwords.png',
    appUrl: 'https://wingwords.gycoding.com/',
    theme: {
      primary: '#9c5fe5',
      secondary: '#6d28d9',
      accent: '#c084fc',
      gradient: 'linear-gradient(160deg, #0d0019 0%, #1a0533 40%, #0a001a 100%)',
      heroBg:
        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.22) 0%, transparent 70%)',
      textGradient: 'linear-gradient(135deg, #e879f9 0%, #818cf8 100%)',
      lightBg: '#ffffff',
      lightGradient: 'linear-gradient(160deg, #ffffff 0%, #fdf4ff 50%, #f0e8ff 100%)',
      lightSectionBg: '#f6f0ff',
    },
    features: [
      {
        icon: '📚',
        title: 'Smart Library',
        titleEs: 'Biblioteca Inteligente',
        description:
          'Organize books with custom filters: Want to Read, Reading, Read. Track progress effortlessly.',
        descriptionEs:
          'Organiza libros con filtros personalizados: Quiero leer, Leyendo, Leído. Sigue tu progreso.',
      },
      {
        icon: '🔍',
        title: 'Discover & Explore',
        titleEs: 'Descubre y Explora',
        description:
          'Search through thousands of books, find detailed information, and browse multiple editions to pick your perfect cover.',
        descriptionEs:
          'Busca entre miles de libros, encuentra información detallada y navega por múltiples ediciones.',
      },
      {
        icon: '🏆',
        title: 'Hall of Fame',
        titleEs: 'Hall of Fame',
        description:
          'Curate your all-time favorite books and preserve your most cherished quotes from every masterpiece.',
        descriptionEs:
          'Crea tu colección de favoritos de todos los tiempos y preserva tus citas más memorables.',
      },
      {
        icon: '👥',
        title: 'Social Reading',
        titleEs: 'Lectura Social',
        description:
          'Search for readers, add friends, and follow their reading activities. See what your friends are reading in real-time.',
        descriptionEs:
          'Añade amigos y sigue su actividad lectora. Ve qué están leyendo en tiempo real.',
      },
      {
        icon: '📖',
        title: 'Multiple Editions',
        titleEs: 'Múltiples Ediciones',
        description:
          'Choose from different book editions to customize your library with the cover art you love most.',
        descriptionEs:
          'Elige entre diferentes ediciones para personalizar tu biblioteca con la portada que más te guste.',
      },
      {
        icon: '📊',
        title: 'Activity Feed',
        titleEs: 'Feed de Actividad',
        description:
          'Stay connected with your reading community. View your activity and your friends\' reading progress and updates.',
        descriptionEs:
          'Mantente conectado con tu comunidad lectora y consulta el progreso de tus amigos en tiempo real.',
      },
    ],
    profileSection: {
      title: 'Your Profile',
      titleEs: 'Tu Perfil',
      description:
        'Your Wingwords profile is your reading identity. Personalize it, explore your stats, and let our AI guide your next read.',
      descriptionEs:
        'Tu perfil de Wingwords es tu identidad lectora. Personalízalo, explora tus estadísticas y deja que la IA te guíe hacia tu próxima lectura.',
      image: '/images/products/wingwords-2.png',
      highlights: [
        {
          icon: '✏️',
          text: 'Edit your biography and set your favorite quote',
          textEs: 'Edita tu biografía y establece tu cita favorita',
        },
        {
          icon: '🔍',
          text: 'Filter your library by authors and ratings',
          textEs: 'Filtra tu biblioteca por autores y valoraciones',
        },
        {
          icon: '📊',
          text: 'View your reading statistics and milestones',
          textEs: 'Consulta tus estadísticas de lectura y logros',
        },
        {
          icon: '📰',
          text: 'Browse your personal activity feed',
          textEs: 'Explora tu feed de actividad personal',
        },
        {
          icon: '🤖',
          text: 'AI recommendations tailored to your reading taste',
          textEs: 'Recomendaciones de IA adaptadas a tus gustos lectores',
        },
        {
          icon: '📅',
          text: 'Browse your reading history in timeline or calendar view',
          textEs: 'Explora tu historial de lecturas en vista de línea de tiempo o calendario',
        },
      ],
    },
    techStack: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  'gy-accounts': {
    id: 'gy-accounts',
    name: 'GY Accounts',
    tagline: 'One identity across the entire ecosystem.',
    taglineEs: 'Una identidad en todo el ecosistema.',
    description:
      'The central authentication and identity platform for all GYCODING products. Manage your profile, roles, and API keys from a single dashboard with enterprise-grade security.',
    descriptionEs:
      'La plataforma central de autenticación e identidad para todos los productos de GYCODING. Gestiona tu perfil, roles y claves API desde un único panel.',
    logo: '/icons/gy_accounts.svg',
    image: null,
    appUrl: 'https://accounts.gycoding.com/',
    ctaLabel: { en: 'Open Dashboard', es: 'Abrir Dashboard' },
    theme: {
      primary: '#8C54FF',
      secondary: '#6d28d9',
      accent: '#a855f7',
      gradient: 'linear-gradient(160deg, #0a0020 0%, #1a0045 40%, #050010 100%)',
      heroBg:
        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(140,84,255,0.25) 0%, transparent 70%)',
      textGradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      lightBg: '#ffffff',
      lightGradient: 'linear-gradient(160deg, #ffffff 0%, #f8f4ff 50%, #ede7ff 100%)',
      lightSectionBg: '#f3eeff',
    },
    features: [
      {
        icon: '🔐',
        title: 'Single Sign-On',
        titleEs: 'Inicio de Sesión Único',
        description:
          'One account for all GYCODING products. Sign in once and access everything seamlessly.',
        descriptionEs:
          'Una cuenta para todos los productos de GYCODING. Accede a todo con un solo inicio de sesión.',
      },
      {
        icon: '🛡️',
        title: 'Role Management',
        titleEs: 'Gestión de Roles',
        description:
          'Fine-grained role-based access control. Admins, developers, and users each have clearly defined permissions.',
        descriptionEs:
          'Control de acceso granular por roles. Administradores, desarrolladores y usuarios con permisos claramente definidos.',
      },
      {
        icon: '🔑',
        title: 'API Key System',
        titleEs: 'Sistema de API Keys',
        description:
          'Generate and manage API keys to integrate GYCODING services into your own projects and workflows.',
        descriptionEs:
          'Genera y gestiona claves API para integrar los servicios de GYCODING en tus propios proyectos.',
      },
      {
        icon: '👤',
        title: 'Profile Management',
        titleEs: 'Gestión de Perfil',
        description:
          'Customize your avatar, personal info, and preferences from a sleek and intuitive profile editor.',
        descriptionEs:
          'Personaliza tu avatar, información personal y preferencias desde un editor de perfil intuitivo.',
      },
      {
        icon: '⚡',
        title: 'Instant Auth',
        titleEs: 'Autenticación Instantánea',
        description:
          'JWT-based authentication ensures fast and secure access across all platforms and services.',
        descriptionEs:
          'La autenticación basada en JWT garantiza un acceso rápido y seguro en todas las plataformas.',
      },
      {
        icon: '🌐',
        title: 'Unified Ecosystem',
        titleEs: 'Ecosistema Unificado',
        description:
          'The backbone connecting all GYCODING products with a consistent and reliable identity layer.',
        descriptionEs:
          'La columna vertebral que conecta todos los productos de GYCODING con una capa de identidad coherente.',
      },
    ],
    techStack: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  'heralds-of-chaos': {
    id: 'heralds-of-chaos',
    name: 'Heralds of Chaos',
    tagline: 'Embark on a journey through Norse mythology.',
    taglineEs: 'Embárcate en un viaje a través de la mitología nórdica.',
    description:
      'Explore the rich tapestry of Norse mythology through our curated collections. Discover characters, creatures, artifacts, worlds, and places that shaped ancient legends.',
    descriptionEs:
      'Explora el rico tapiz de la mitología nórdica a través de nuestras colecciones curadas. Descubre personajes, criaturas, artefactos, mundos y lugares de las leyendas antiguas.',
    logo: '/icons/heralds_of_chaos.png',
    image: '/images/products/heralds-light.png',
    imageDark: '/images/products/heralds-dark.png',
    appUrl: 'https://heraldsofchaos.gycoding.com/',
    ctaLabel: { en: 'Open Website', es: 'Abrir Web' },
    theme: {
      primary: '#D4AF37',
      secondary: '#8B6914',
      accent: '#FFD700',
      gradient: 'linear-gradient(160deg, #050400 0%, #12100a 40%, #000000 100%)',
      heroBg:
        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.18) 0%, transparent 70%)',
      textGradient: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #c49a10 100%)',
      lightBg: '#ffffff',
      lightGradient: 'linear-gradient(160deg, #fffef8 0%, #fffcec 50%, #fef6cc 100%)',
      lightSectionBg: '#fdf8e7',
    },
    features: [
      {
        icon: '⚔️',
        title: 'Characters',
        titleEs: 'Personajes',
        description:
          'Explore gods, warriors, and legends from the Norse pantheon. Discover Thor, Odin, Loki and hundreds of mythical figures.',
        descriptionEs:
          'Explora dioses, guerreros y leyendas del panteón nórdico. Descubre a Thor, Odín, Loki y cientos de figuras míticas.',
      },
      {
        icon: '🐉',
        title: 'Creatures',
        titleEs: 'Criaturas',
        description:
          'Encounter the mythical beasts of Norse lore, from the mighty Jörmungandr to the fearsome Fenrir.',
        descriptionEs:
          'Encuentra las bestias míticas de la mitología nórdica, desde el poderoso Jörmungandr hasta el temible Fenrir.',
      },
      {
        icon: '🗡️',
        title: 'Items & Artifacts',
        titleEs: 'Items y Artefactos',
        description:
          'Browse legendary weapons and magical artifacts: Mjölnir, Gungnir, the Brisingamen necklace and more.',
        descriptionEs:
          'Navega por armas legendarias y artefactos mágicos: Mjölnir, Gungnir, el collar Brisingamen y mucho más.',
      },
      {
        icon: '🌍',
        title: 'The Nine Worlds',
        titleEs: 'Los Nueve Mundos',
        description:
          'Journey through the Nine Realms connected by Yggdrasil, the eternal World Tree that holds all of existence.',
        descriptionEs:
          'Viaja por los Nueve Reinos conectados por Yggdrasil, el eterno Árbol del Mundo que sostiene toda la existencia.',
      },
      {
        icon: '🏛️',
        title: 'Places',
        titleEs: 'Lugares',
        description:
          'Discover mythical locations from the golden halls of Asgard to the icy depths of Niflheim.',
        descriptionEs:
          'Descubre ubicaciones míticas desde los salones dorados de Asgard hasta las heladas profundidades de Niflheim.',
      },
      {
        icon: '📜',
        title: 'Ancient Lore',
        titleEs: 'Sabiduría Antigua',
        description:
          'Immerse yourself in the stories, myths, and legends that shaped an entire civilization for centuries.',
        descriptionEs:
          'Sumérgete en las historias, mitos y leyendas que dieron forma a toda una civilización durante siglos.',
      },
    ],
    techStack: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Java', icon: FaJava, color: '#f89820' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
    ],
  },
};

export const PRODUCT_ORDER: ProductId[] = ['wingwords', 'gy-accounts', 'heralds-of-chaos'];
