import { getAssetPath } from './useImagePath';

export interface Locale {
  navigation: {
    main: Array<{
      name: string;
      href: string;
    }>;
    legal: Array<{
      name: string;
      href: string;
    }>;
  };
  projects: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    description: string;
    members: Array<{
      name: string;
      role: string;
      description: string;
      image: string;
      skills: Array<string>;
      social: {
        github: string;
        linkedin: string;
        email: string;
      };
    }>;
  };
  footer: {
    rights: string;
    company: string;
    home: {
      title: string;
      items: {
        home: string;
        services: string;
        techstack: string;
      };
    };
    projects: {
      title: string;
    };
    about: {
      title: string;
      items: {
        team: string;
        company: string;
      };
    };
    legal: {
      title: string;
      items: {
        privacy: string;
        terms: string;
        cookies: string;
      };
    };
  };
  about: {
    title: string;
    description1: string;
    description2: string;
    companyName: string;
    buttons: {
      button1: string;
      button2: string;
    };
  };
  company: {
    title: string;
    description: string;
    story: {
      part1: string;
      part2: string;
    };
    values: {
      title: string;
      items: Array<{
        title: string;
        description: string;
        icon: string;
      }>;
    };
  };
  techStack: {
    title: string;
    nextjs: {
      description: string;
    };
    typescript: {
      description: string;
    };
    prisma: {
      description: string;
    };
    postgresql: {
      description: string;
    };
    docker: {
      description: string;
    };
    aws: {
      description: string;
    };
  };
  services: {
    title: string;
    description: string;
    modules: {
      webDev: {
        title: string;
        description: string;
      };
      mobileDev: {
        title: string;
        description: string;
      };
      cloudDev: {
        title: string;
        description: string;
      };
    };
  };
  products: {
    notFound: {
      title: string;
      description: string;
    };
    download: {
      button: string;
      demo: string;
      now: string;
      login: string;
      platformSelect: string;
      platforms: {
        windows: string;
        macos: string;
        linux: string;
      };
    };
    items: {
      'heralds-of-chaos': {
        name: string;
        description: string;
        features: {
          title: string;
          items: Array<{
            title: string;
            description: string;
          }>;
        };
        techStack: {
          title: string;
          technologies: {
            tech1: {
              name: string;
              description: string;
            };
            tech2: {
              name: string;
              description: string;
            };
            tech3: {
              name: string;
              description: string;
            };
            tech4: {
              name: string;
              description: string;
            };
          };
        };
        faq: {
          title: string;
          items: {
            q1: string;
            a1: string;
            q2: string;
            a2: string;
            q3: string;
            a3: string;
            q4: string;
            a4: string;
            q5: string;
            a5: string;
          };
        };
      };
      'gy-messages': {
        name: string;
        description: string;
        features: {
          title: string;
          items: Array<{
            title: string;
            description: string;
          }>;
        };
        techStack: {
          title: string;
          technologies: {
            tech1: {
              name: string;
              description: string;
            };
            tech2: {
              name: string;
              description: string;
            };
            tech3: {
              name: string;
              description: string;
            };
            tech4: {
              name: string;
              description: string;
            };
          };
        };
        faq: {
          title: string;
          items: {
            q1: string;
            a1: string;
            q2: string;
            a2: string;
            q3: string;
            a3: string;
            q4: string;
            a4: string;
            q5: string;
            a5: string;
          };
        };
      };
      'gy-documents': {
        name: string;
        description: string;
        features: {
          title: string;
          items: Array<{
            title: string;
            description: string;
          }>;
        };
        techStack: {
          title: string;
          technologies: {
            tech1: {
              name: string;
              description: string;
            };
            tech2: {
              name: string;
              description: string;
            };
            tech3: {
              name: string;
              description: string;
            };
            tech4: {
              name: string;
              description: string;
            };
          };
        };
        faq: {
          title: string;
          items: {
            q1: string;
            a1: string;
            q2: string;
            a2: string;
            q3: string;
            a3: string;
            q4: string;
            a4: string;
            q5: string;
            a5: string;
          };
        };
      };
      'gy-accounts': {
        name: string;
        description: string;
        features: {
          [key: string]: {
            title: string;
            description: string;
          };
        };
        techStack: {
          title: string;
          technologies: {
            tech1: {
              name: string;
              description: string;
            };
            tech2: {
              name: string;
              description: string;
            };
            tech3: {
              name: string;
              description: string;
            };
            tech4: {
              name: string;
              description: string;
            };
          };
        };
        faq: {
          title: string;
          items: {
            q1: string;
            a1: string;
            q2: string;
            a2: string;
            q3: string;
            a3: string;
            q4: string;
            a4: string;
            q5: string;
            a5: string;
          };
        };
      };
    };
    techStack: {
      title: string;
      description: string;
    };
  };
  flag: string;
}

export const locales: Record<'en' | 'es', Locale> = {
  en: {
    navigation: {
      main: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
      ],
      legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          title: 'Heralds of Chaos',
          description: 'A unique card game with strategic depth',
        },
        {
          title: 'GY Accounts',
          description: 'Secure account management system',
        },
        {
          title: 'GY Messages',
          description: 'Real-time messaging platform',
        },
        {
          title: 'GY Documents',
          description: 'Document management and collaboration',
        },
      ],
    },
    team: {
      title: 'Meet Our Team',
      description:
        'A passionate duo of developers dedicated to transforming ideas into exceptional digital experiences',
      members: [
        {
          name: 'Guillermo Figueras',
          role: 'CEO & Frontend Developer',
          description:
            'Passionate about creating elegant and efficient solutions. Specialized in modern web technologies and cloud architecture.',
          image: getAssetPath('/images/gfigueras.png'),
          skills: ['React', 'NextJS', 'TypeScript', 'Unity', 'Material UI'],
          social: {
            github: 'https://github.com/gy-gfigueras',
            linkedin: 'https://www.linkedin.com/in/gfigueras/',
            email: 'gfigueras@gycoding.com',
          },
        },
        {
          name: 'Ivan Vicente',
          role: 'CEO & Backend Developer',
          description:
            'Expert in building scalable applications and optimizing performance. Focused on delivering exceptional user experiences.',
          image: getAssetPath('/images/toxyc.png'),
          skills: ['Java', 'Spring Boot', 'C#', 'NodeJS', 'MongoDB'],
          social: {
            github: 'https://github.com/gy-toxyc',
            linkedin: 'https://www.linkedin.com/in/srtoxyc/',
            email: 'toxyc@gycoding.com',
          },
        },
      ],
    },
    footer: {
      rights: 'All rights reserved.',
      company: 'GyCODING',
      home: {
        title: 'Home',
        items: {
          home: 'Home',
          services: 'Services',
          techstack: 'Tech Stack',
        },
      },
      projects: {
        title: 'Projects',
      },
      about: {
        title: 'About',
        items: {
          team: 'Team',
          company: 'Company',
        },
      },
      legal: {
        title: 'Legal',
        items: {
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
          cookies: 'Cookie Policy',
        },
      },
    },
    about: {
      title: 'Building Digital Dreams',
      description1:
        'At [company]GyCODING[/company], we merge passion with technology. We are a team of developers specialized in creating innovative digital solutions, covering both frontend and backend development.',
      description2:
        'Our commitment to continuous learning and innovation keeps us at the forefront of the latest web development technologies and trends.',
      companyName: 'GyCODING',
      buttons: {
        button1: 'Get Started',
        button2: 'Learn More',
      },
    },
    company: {
      title: 'Our Story',
      description: 'Discover how we started and where we are heading',
      story: {
        part1:
          'Founded with a vision to revolutionize web development, [company]GyCODING[/company] emerged from the collaboration of two passionate developers who shared a common dream: to create exceptional digital experiences that make a difference.',
        part2:
          'What started as a shared vision has grown into a dynamic company that pushes the boundaries of what\'s possible in web development. Our journey is marked by continuous learning, innovation, and a relentless pursuit of excellence.',
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Innovation',
            description:
              'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
            icon: '💡',
          },
          {
            title: 'Quality',
            description:
              'We maintain the highest standards in our code and design, ensuring robust and scalable applications.',
            icon: '✨',
          },
          {
            title: 'Collaboration',
            description:
              'We work closely with our clients, fostering transparent communication and shared success.',
            icon: '🤝',
          },
          {
            title: 'Growth',
            description:
              'We are committed to continuous learning and improvement, both for ourselves and our clients.',
            icon: '🚀',
          },
        ],
      },
    },
    techStack: {
      title: 'Tech Stack',
      nextjs: {
        description: 'React framework for production with SSR and static generation',
      },
      typescript: {
        description: 'JavaScript superset with static typing',
      },
      prisma: {
        description: 'Next-generation ORM for Node.js and TypeScript',
      },
      postgresql: {
        description: 'Relational database management system',
      },
      docker: {
        description: 'Container platform for development and deployment',
      },
      aws: {
        description: 'Cloud infrastructure for hosting and services',
      },
    },
    services: {
      title: 'Our Services',
      description: 'Discover our comprehensive range of development services',
      modules: {
        webDev: {
          title: 'Web Development',
          description:
            'Modern and responsive web applications using cutting-edge technologies like React, Next.js, and TypeScript. Focus on performance, accessibility, and user experience.',
        },
        mobileDev: {
          title: 'Mobile Development',
          description:
            'Native and cross-platform mobile applications using React Native, Flutter, and Kotlin. Expertise in mobile-specific features and optimization.',
        },
        cloudDev: {
          title: 'Cloud Development',
          description:
            'Scalable and secure cloud infrastructure using AWS, Google Cloud, and Azure. Specialized in cloud architecture, migration, and management.',
        },
      },
    },
    products: {
      notFound: {
        title: 'Product not found',
        description: 'The product you are looking for does not exist',
      },
      download: {
        button: 'Download',
        demo: 'Demo',
        now: 'Now',
        login: 'Login',
        platformSelect: 'Select your platform',
        platforms: {
          windows: 'Windows',
          macos: 'macOS',
          linux: 'Linux',
        },
      },
      items: {
        'heralds-of-chaos': {
          name: 'Heralds of Chaos',
          description: 'Multiplayer card game with unique mechanics',
          features: {
            title: 'Features',
            items: [
              {
                title: 'Strategic Combat',
                description: 'Deep turn-based combat system with unique character abilities',
              },
              {
                title: 'Rich Story',
                description: 'Immersive narrative with branching storylines and multiple endings',
              },
              {
                title: 'Character Customization',
                description: 'Extensive character creation and progression system',
              },
            ],
          },
          techStack: {
            title: 'Technologies Used',
            technologies: {
              tech1: {
                name: 'Unity',
                description: 'Game development engine with powerful 3D capabilities',
              },
              tech2: {
                name: 'C#',
                description: 'Primary programming language for game logic',
              },
              tech3: {
                name: 'Photon',
                description: 'Multiplayer networking framework',
              },
              tech4: {
                name: 'Blender',
                description: '3D modeling and animation software',
              },
            },
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'What are the system requirements?',
              a1: 'The game runs on most modern PCs with at least 4GB RAM and a dedicated graphics card',
              q2: 'Is there multiplayer?',
              a2: 'Yes, both local and online multiplayer modes are available',
              q3: 'Are there microtransactions?',
              a3: 'No, the game is a one-time purchase with all content included',
              q4: 'How often are updates released?',
              a4: 'Monthly updates with new content',
              q5: 'Is there a tutorial?',
              a5: 'Yes, comprehensive tutorial included',
            },
          },
        },
        'gy-messages': {
          name: 'GY Messages',
          description: 'Real-time messaging and communication platform',
          features: {
            title: 'Features',
            items: [
              {
                title: 'End-to-End Encryption',
                description: 'All messages are encrypted using state-of-the-art cryptography',
              },
              {
                title: 'Team Collaboration',
                description:
                  'Create channels, groups, and direct messages for effective communication',
              },
              {
                title: 'File Sharing',
                description: 'Securely share files of any type with your team',
              },
            ],
          },
          techStack: {
            title: 'Technologies Used',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'React framework for production with SSR',
              },
              tech2: {
                name: 'WebSocket',
                description: 'Real-time bidirectional communication',
              },
              tech3: {
                name: 'PostgreSQL',
                description: 'Relational database for message storage',
              },
              tech4: {
                name: 'Redis',
                description: 'In-memory data store for real-time features',
              },
            },
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'How secure is the platform?',
              a1: 'We use military-grade encryption and regular security audits',
              q2: 'Can I integrate with other tools?',
              a2: 'Yes, we offer APIs and integrations with popular workplace tools',
              q3: 'What is the pricing model?',
              a3: 'We offer flexible per-user pricing with enterprise options available',
              q4: 'Is there a free trial?',
              a4: 'Yes, 30-day free trial available',
              q5: 'Is there customer support?',
              a5: 'Yes, 24/7 support via email and chat',
            },
          },
        },
        'gy-documents': {
          name: 'GY Documents',
          description: 'Document management and collaboration system',
          features: {
            title: 'Features',
            items: [
              {
                title: 'Real-time Collaboration',
                description: 'Edit documents simultaneously with your team members',
              },
              {
                title: 'Version Control',
                description: 'Track changes and revert to previous versions easily',
              },
              {
                title: 'Smart Organization',
                description: 'AI-powered document organization and search',
              },
            ],
          },
          techStack: {
            title: 'Technologies Used',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'React framework for the web interface',
              },
              tech2: {
                name: 'AWS S3',
                description: 'Cloud storage for documents',
              },
              tech3: {
                name: 'PostgreSQL',
                description: 'Document metadata and user data storage',
              },
              tech4: {
                name: 'ElasticSearch',
                description: 'Full-text search engine',
              },
            },
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'Can I work offline?',
              a1: 'Yes, documents sync automatically when you reconnect',
              q2: 'What file formats are supported?',
              a2: 'We support all major document formats including DOC, PDF, and more',
              q3: 'Is there a storage limit?',
              a3: 'Storage limits vary by plan, starting at 100GB for basic users',
              q4: 'Is there a free trial?',
              a4: 'Yes, 30-day free trial available',
              q5: 'Is there customer support?',
              a5: 'Yes, 24/7 support via email and chat',
            },
          },
        },
        'gy-accounts': {
          name: 'GY Accounts',
          description: 'Centralized authentication and user management system',
          features: {
            // ... features
          },
          techStack: {
            title: 'Technologies Used',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'React framework for the authentication UI',
              },
              tech2: {
                name: 'JWT',
                description: 'Secure token-based authentication',
              },
              tech3: {
                name: 'PostgreSQL',
                description: 'User data and session management',
              },
              tech4: {
                name: 'OAuth2',
                description: 'Third-party authentication protocol',
              },
            },
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'How do I reset my password?',
              a1: 'Use our self-service password reset or contact support',
              q2: 'Is biometric authentication supported?',
              a2: 'Yes, on devices with compatible hardware',
              q3: 'Can I use third-party authenticators?',
              a3: 'We support popular authenticator apps like Google and Microsoft',
              q4: 'Is there a free trial?',
              a4: 'Yes, 30-day free trial available',
              q5: 'Is there customer support?',
              a5: 'Yes, 24/7 support via email and chat',
            },
          },
        },
      },
      techStack: {
        title: 'Technology Stack',
        description: 'Built with cutting-edge technologies',
      },
    },
    flag: getAssetPath('/icons/flags/en.svg'),
  },
  es: {
    navigation: {
      main: [
        { name: 'Inicio', href: '/' },
        { name: 'Servicios', href: '/services' },
        { name: 'Proyectos', href: '/projects' },
        { name: 'Nosotros', href: '/about' },
        { name: 'Contacto', href: '/contact' },
      ],
      legal: [
        { name: 'Política de Privacidad', href: '/privacy' },
        { name: 'Términos de Servicio', href: '/terms' },
        { name: 'Política de Cookies', href: '/cookies' },
      ],
    },
    projects: {
      title: 'Proyectos',
      items: [
        {
          title: 'Heralds of Chaos',
          description: 'Juego de cartas multijugador con mecánicas únicas',
        },
        {
          title: 'GY Accounts',
          description: 'Sistema seguro de gestión de cuentas',
        },
        {
          title: 'GY Messages',
          description: 'Plataforma de mensajería en tiempo real',
        },
        {
          title: 'GY Documents',
          description: 'Gestión y colaboración de documentos',
        },
      ],
    },
    team: {
      title: 'Nuestro Equipo',
      description:
        'Un dúo apasionado de desarrolladores dedicados a transformar ideas en experiencias digitales excepcionales',
      members: [
        {
          name: 'Guillermo Figueras',
          role: 'CEO y Desarrollador Frontend',
          description:
            'Apasionado por crear soluciones elegantes y eficientes. Especializado en tecnologías web modernas y arquitectura en la nube.',
          image: getAssetPath('/images/gfigueras.png'),
          skills: ['React', 'NextJS', 'TypeScript', 'Unity', 'Material UI'],
          social: {
            github: 'https://github.com/gy-gfigueras',
            linkedin: 'https://www.linkedin.com/in/gfigueras/',
            email: 'gfigueras@gycoding.com',
          },
        },
        {
          name: 'Ivan Vicente',
          role: 'CEO y Desarrollador Backend',
          description:
            'Experto en construir aplicaciones escalables y optimizar el rendimiento. Enfocado en ofrecer experiencias de usuario excepcionales.',
          image: getAssetPath('/images/toxyc.png'),
          skills: ['Java', 'Spring Boot', 'C#', 'NodeJS', 'MongoDB'],
          social: {
            github: 'https://github.com/gy-toxyc',
            linkedin: 'https://www.linkedin.com/in/srtoxyc/',
            email: 'toxyc@gycoding.com',
          },
        },
      ],
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      company: 'GyCODING',
      home: {
        title: 'Inicio',
        items: {
          home: 'Inicio',
          services: 'Servicios',
          techstack: 'Tecnologías',
        },
      },
      projects: {
        title: 'Proyectos',
      },
      about: {
        title: 'Acerca de',
        items: {
          team: 'Equipo',
          company: 'Empresa',
        },
      },
      legal: {
        title: 'Legal',
        items: {
          privacy: 'Política de Privacidad',
          terms: 'Términos de Servicio',
          cookies: 'Política de Cookies',
        },
      },
    },
    about: {
      title: 'Creando sueños digitales',
      description1:
        'En [company]GyCODING[/company], fusionamos pasión con tecnología. Somos un equipo de desarrolladores especializados en crear soluciones digitales innovadoras, abarcando tanto desarrollo frontend como backend.',
      description2:
        'Nuestro compromiso con el aprendizaje continuo y la innovación nos mantiene a la vanguardia de las últimas tecnologías y tendencias en desarrollo web.',
      companyName: 'GyCODING',
      buttons: {
        button1: 'Empezar',
        button2: 'Aprender Más',
      },
    },
    company: {
      title: 'Nuestra Historia',
      description: 'Descubre cómo empezamos y hacia dónde vamos',
      story: {
        part1:
          'Fundada con una visión de revolucionar el desarrollo web, [company]GyCODING[/company] surgió de la colaboración de dos desarrolladores apasionados que compartían un sueño común: crear experiencias digitales excepcionales que marquen la diferencia.',
        part2:
          'Lo que comenzó como una visión compartida ha crecido hasta convertirse en una empresa dinámica que empuja los límites de lo que es posible en el desarrollo web. Nuestro viaje está marcado por el aprendizaje continuo, la innovación y la búsqueda incansable de la excelencia.',
      },
      values: {
        title: 'Nuestros Valores',
        items: [
          {
            title: 'Innovación',
            description:
              'Constantemente superamos límites y adoptamos nuevas tecnologías para ofrecer soluciones de vanguardia.',
            icon: '💡',
          },
          {
            title: 'Calidad',
            description:
              'Mantenemos los más altos estándares en nuestro código y diseño, asegurando aplicaciones robustas y escalables.',
            icon: '✨',
          },
          {
            title: 'Colaboración',
            description:
              'Trabajamos estrechamente con nuestros clientes, fomentando la comunicación transparente y el éxito compartido.',
            icon: '🤝',
          },
          {
            title: 'Crecimiento',
            description:
              'Estamos comprometidos con el aprendizaje y la mejora continua, tanto para nosotros como para nuestros clientes.',
            icon: '🚀',
          },
        ],
      },
    },
    techStack: {
      title: 'Stack Tecnológico',
      nextjs: {
        description: 'Framework de React para producción con SSR y generación estática',
      },
      typescript: {
        description: 'Superset de JavaScript con tipado estático',
      },
      prisma: {
        description: 'ORM de próxima generación para Node.js y TypeScript',
      },
      postgresql: {
        description: 'Sistema de gestión de bases de datos relacional',
      },
      docker: {
        description: 'Plataforma de contenedores para desarrollo y despliegue',
      },
      aws: {
        description: 'Infraestructura cloud para hosting y servicios',
      },
    },
    services: {
      title: 'Nuestros Servicios',
      description: 'Descubre nuestra amplia gama de servicios de desarrollo',
      modules: {
        webDev: {
          title: 'Desarrollo Web',
          description:
            'Aplicaciones web modernas y responsivas utilizando tecnologías de vanguardia como React, Next.js y TypeScript. Enfoque en rendimiento, accesibilidad y experiencia de usuario.',
        },
        mobileDev: {
          title: 'Desarrollo Móvil',
          description:
            'Aplicaciones móviles nativas y multiplataforma utilizando React Native, Flutter y Kotlin. Especialización en características y optimización móviles.',
        },
        cloudDev: {
          title: 'Desarrollo en la Nube',
          description:
            'Infraestructura escalable y segura en la nube utilizando AWS, Google Cloud y Azure. Especialización en arquitectura, migración y gestión en la nube.',
        },
      },
    },
    products: {
      notFound: {
        title: 'Producto no encontrado',
        description: 'El producto que buscas no existe',
      },
      download: {
        button: 'Descargar',
        demo: 'Demo',
        now: 'Ahora',
        login: 'Iniciar Sesión',
        platformSelect: 'Selecciona tu plataforma',
        platforms: {
          windows: 'Windows',
          macos: 'macOS',
          linux: 'Linux',
        },
      },
      items: {
        'heralds-of-chaos': {
          name: 'Heralds of Chaos',
          description: 'Juego de cartas multijugador con mecánicas únicas',
          features: {
            title: 'Características',
            items: [
              {
                title: 'Combate Estratégico',
                description:
                  'Sistema de combate por turnos profundo con habilidades únicas de personajes',
              },
              {
                title: 'Historia Rica',
                description: 'Narrativa inmersiva con historias ramificadas y múltiples finales',
              },
              {
                title: 'Personalización de Personajes',
                description: 'Sistema extenso de creación y progresión de personajes',
              },
            ],
          },
          techStack: {
            title: 'Tecnologías Utilizadas',
            technologies: {
              tech1: {
                name: 'Unity',
                description: 'Motor de desarrollo de juegos con potentes capacidades 3D',
              },
              tech2: {
                name: 'C#',
                description: 'Lenguaje de programación principal para la lógica del juego',
              },
              tech3: {
                name: 'Photon',
                description: 'Framework de red para multijugador',
              },
              tech4: {
                name: 'Blender',
                description: 'Software de modelado y animación 3D',
              },
            },
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Cuáles son los requisitos del sistema?',
              a1: 'El juego funciona en la mayoría de PCs modernos con al menos 4GB RAM y una tarjeta gráfica dedicada',
              q2: '¿Hay multijugador?',
              a2: 'Sí, están disponibles modos multijugador local y en línea',
              q3: '¿Hay microtransacciones?',
              a3: 'No, el juego es una compra única con todo el contenido incluido',
              q4: '¿Con qué frecuencia hay actualizaciones?',
              a4: 'Actualizaciones mensuales con nuevo contenido',
              q5: '¿Hay tutorial?',
              a5: 'Sí, incluye un tutorial completo',
            },
          },
        },
        'gy-messages': {
          name: 'GY Messages',
          description: 'Plataforma de mensajería y comunicación en tiempo real',
          features: {
            title: 'Características',
            items: [
              {
                title: 'Cifrado de Extremo a Extremo',
                description:
                  'Todos los mensajes están cifrados usando criptografía de última generación',
              },
              {
                title: 'Colaboración en Equipo',
                description:
                  'Crea canales, grupos y mensajes directos para una comunicación efectiva',
              },
              {
                title: 'Compartir Archivos',
                description: 'Comparte archivos de cualquier tipo con tu equipo de forma segura',
              },
            ],
          },
          techStack: {
            title: 'Tecnologías Utilizadas',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'Framework de React para producción con SSR',
              },
              tech2: {
                name: 'WebSocket',
                description: 'Comunicación bidireccional en tiempo real',
              },
              tech3: {
                name: 'PostgreSQL',
                description: 'Base de datos relacional para almacenamiento de mensajes',
              },
              tech4: {
                name: 'Redis',
                description: 'Almacén de datos en memoria para funciones en tiempo real',
              },
            },
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Qué tan segura es la plataforma?',
              a1: 'Usamos cifrado de grado militar y auditorías de seguridad regulares',
              q2: '¿Puedo integrar con otras herramientas?',
              a2: 'Sí, ofrecemos APIs e integraciones con herramientas populares de trabajo',
              q3: '¿Cuál es el modelo de precios?',
              a3: 'Ofrecemos precios flexibles por usuario con opciones empresariales disponibles',
              q4: '¿Hay una versión de prueba gratuita?',
              a4: 'Sí, disponible una versión de prueba gratuita de 30 días',
              q5: '¿Hay soporte al cliente?',
              a5: 'Sí, soporte 24/7 vía correo electrónico y chat',
            },
          },
        },
        'gy-documents': {
          name: 'GY Documents',
          description: 'Sistema de gestión y colaboración de documentos',
          features: {
            title: 'Características',
            items: [
              {
                title: 'Colaboración en Tiempo Real',
                description: 'Edita documentos simultáneamente con los miembros de tu equipo',
              },
              {
                title: 'Control de Versiones',
                description: 'Rastrea cambios y vuelve a versiones anteriores fácilmente',
              },
              {
                title: 'Organización Inteligente',
                description: 'Organización y búsqueda de documentos potenciada por IA',
              },
            ],
          },
          techStack: {
            title: 'Tecnologías Utilizadas',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'Framework de React para la interfaz web',
              },
              tech2: {
                name: 'AWS S3',
                description: 'Almacenamiento en la nube para documentos',
              },
              tech3: {
                name: 'PostgreSQL',
                description: 'Almacenamiento de metadatos y datos de usuario',
              },
              tech4: {
                name: 'ElasticSearch',
                description: 'Motor de búsqueda de texto completo',
              },
            },
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Puedo trabajar sin conexión?',
              a1: 'Sí, los documentos se sincronizan automáticamente cuando te reconectas',
              q2: '¿Qué formatos de archivo son compatibles?',
              a2: 'Soportamos todos los formatos principales de documentos incluyendo DOC, PDF y más',
              q3: '¿Hay un límite de almacenamiento?',
              a3: 'Los límites de almacenamiento varían según el plan, comenzando en 100GB para usuarios básicos',
              q4: '¿Hay una versión de prueba gratuita?',
              a4: 'Sí, disponible una versión de prueba gratuita de 30 días',
              q5: '¿Hay soporte al cliente?',
              a5: 'Sí, soporte 24/7 vía correo electrónico y chat',
            },
          },
        },
        'gy-accounts': {
          name: 'GY Accounts',
          description: 'Sistema centralizado de autenticación y gestión de usuarios',
          features: {
            // ... features
          },
          techStack: {
            title: 'Tecnologías Utilizadas',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'Framework de React para la UI de autenticación',
              },
              tech2: {
                name: 'JWT',
                description: 'Autenticación segura basada en tokens',
              },
              tech3: {
                name: 'PostgreSQL',
                description: 'Gestión de datos de usuario y sesiones',
              },
              tech4: {
                name: 'OAuth2',
                description: 'Protocolo de autenticación de terceros',
              },
            },
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Cómo restablezco mi contraseña?',
              a1: 'Usa nuestro autoservicio de restablecimiento de contraseña o contacta con soporte',
              q2: '¿Se admite la autenticación biométrica?',
              a2: 'Sí, en dispositivos con hardware compatible',
              q3: '¿Puedo usar autenticadores de terceros?',
              a3: 'Sí, admitimos aplicaciones populares de autenticación como Google y Microsoft',
              q4: '¿Hay una versión de prueba gratuita?',
              a4: 'Sí, disponible una versión de prueba gratuita de 30 días',
              q5: '¿Hay soporte al cliente?',
              a5: 'Sí, soporte 24/7 vía correo electrónico y chat',
            },
          },
        },
      },
      techStack: {
        title: 'Stack Tecnológico',
        description: 'Construido con tecnologías de vanguardia',
      },
    },
    flag: getAssetPath('/icons/flags/es.svg'),
  },
};
