export interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  longDescription: string;
  image: string;
  icon?: string;
  version: string;
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
}

export const products: Product[] = [
  {
    id: 'heralds-of-chaos',
    name: 'Heralds of Chaos',
    description:
      'Un épico videojuego basado en la mitología nórdica con un nuevo enfoque en la narrativa',
    color: '#FFC400',
    version: '0.5.2-alpha',
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
      {
        type: 'improvement',
        description: 'Optimización del rendimiento en mapas grandes',
      },
    ],
    image: '/products/data/products.ts',
    longDescription:
      'Sumérgete en un mundo de mitología nórdica donde cada decisión afecta el destino de los nueve reinos. Heralds of Chaos combina una narrativa profunda con mecánicas de juego innovadoras.',
    features: [
      {
        title: 'Mundo Expansivo',
        description:
          'Explora los nueve reinos de la mitología nórdica, cada uno con su propia historia y desafíos únicos.',
      },
      {
        title: 'Combate Dinámico',
        description:
          'Sistema de combate fluido que combina habilidades físicas y mágicas basadas en la mitología nórdica.',
      },
      {
        title: 'Historia Inmersiva',
        description: 'Una narrativa rica que se entrelaza con los mitos nórdicos tradicionales.',
      },
    ],
    faqs: [
      {
        question: '¿Cuándo será lanzado Heralds of Chaos?',
        answer:
          'El juego está actualmente en desarrollo. Mantente atento a nuestras redes sociales para actualizaciones sobre la fecha de lanzamiento.',
      },
      {
        question: '¿En qué plataformas estará disponible?',
        answer: 'Inicialmente será lanzado para PC, con planes futuros para consolas.',
      },
    ],
  },
  {
    id: 'gy-messages',
    name: 'GY Messages',
    description: 'Sistema de mensajería moderno y seguro con cifrado de extremo a extremo',
    color: '#34C759',
    version: '1.2.0',
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
        description: 'Corregidos problemas de sincronización en mensajes',
      },
    ],
    image: '/products/messages.png',
    longDescription:
      'Una plataforma de mensajería versátil y segura, diseñada para integrarse perfectamente con otros servicios de GY Coding.',
    features: [
      {
        title: 'Mensajería en Tiempo Real',
        description: 'Comunicación instantánea con cifrado de extremo a extremo.',
      },
      {
        title: 'Integración Perfecta',
        description: 'Se integra sin problemas con otros servicios de GY Coding.',
      },
      {
        title: 'Personalización Completa',
        description: 'Adapta la interfaz y las funcionalidades a tus necesidades.',
      },
    ],
    faqs: [
      {
        question: '¿Es seguro GY-Messages?',
        answer: 'Sí, utilizamos cifrado de extremo a extremo y las mejores prácticas de seguridad.',
      },
      {
        question: '¿Puedo usar GY-Messages en mi aplicación?',
        answer: 'Sí, ofrecemos una API completa para integrar GY-Messages en cualquier aplicación.',
      },
    ],
  },
  {
    id: 'gy-documents',
    name: 'GY Documents',
    description: 'Editor de markdown profesional y moderno con características avanzadas',
    color: '#FFA07A',
    version: '1.1.0',
    downloads: {
      windows: 'https://download.example.com/gy-documents/windows',
      mac: 'https://download.example.com/gy-documents/mac',
      linux: 'https://download.example.com/gy-documents/linux',
    },
    changelog: [
      {
        type: 'feature',
        description: 'Añadido soporte para exportación a PDF y HTML',
      },
      {
        type: 'fix',
        description: 'Corregidos problemas de renderizado en la vista previa',
      },
    ],
    image: '/products/documents.png',
    longDescription:
      'Un editor de markdown potente y elegante que combina la simplicidad con características avanzadas de edición y previsualización en tiempo real.',
    features: [
      {
        title: 'Edición en Tiempo Real',
        description: 'Vista previa instantánea mientras escribes.',
      },
      {
        title: 'Temas Personalizables',
        description: 'Múltiples temas y opciones de personalización.',
      },
      {
        title: 'Exportación Versátil',
        description: 'Exporta a múltiples formatos incluyendo PDF y HTML.',
      },
    ],
    faqs: [
      {
        question: '¿Puedo usar GY-Documents sin conexión?',
        answer: 'Sí, GY-Documents funciona completamente sin conexión.',
      },
      {
        question: '¿Soporta extensiones?',
        answer: 'Estamos trabajando en un sistema de plugins para expandir la funcionalidad.',
      },
    ],
  },
  {
    id: 'gy-accounts',
    name: 'GY Accounts',
    description:
      'Tu centro de control personal para servicios GY con autenticación de dos factores',
    color: '#7A288A',
    version: '1.0.0',
    downloads: {
      windows: 'https://download.example.com/gy-accounts/windows',
      mac: 'https://download.example.com/gy-accounts/mac',
      linux: 'https://download.example.com/gy-accounts/linux',
    },
    changelog: [
      {
        type: 'feature',
        description: 'Añadido soporte para autenticación de dos factores',
      },
      {
        type: 'fix',
        description: 'Corregidos problemas de sincronización en la cuenta',
      },
    ],
    image: '/products/accounts.png',
    longDescription:
      'Gestiona todas tus cuentas y preferencias de GY Coding desde un único lugar. Personaliza tu experiencia y administra tus servicios de forma centralizada.',
    features: [
      {
        title: 'Control Centralizado',
        description: 'Gestiona todos tus servicios GY desde un solo lugar.',
      },
      {
        title: 'Personalización Total',
        description: 'Personaliza tu experiencia en todos los servicios GY.',
      },
      {
        title: 'Seguridad Avanzada',
        description: 'Autenticación de dos factores y otras características de seguridad.',
      },
    ],
    faqs: [
      {
        question: '¿Cómo funciona la integración con otros servicios?',
        answer:
          'GY-Accounts se integra automáticamente con todos los servicios de GY Coding, proporcionando una experiencia unificada.',
      },
      {
        question: '¿Puedo tener múltiples perfiles?',
        answer: 'Sí, puedes crear y gestionar múltiples perfiles para diferentes usos.',
      },
    ],
  },
];
