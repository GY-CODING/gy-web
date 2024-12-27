import { getAssetPath } from './useImagePath';
import {
  Code as CodeIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Storage as StorageIcon,
  Group as GroupIcon,
  Games as GamesIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material';

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
  services: {
    title: string;
    description: string;
    modules: {
      webDev: {
        title: string;
        description: string;
      };
      backend: {
        title: string;
        description: string;
      };
      gameDev: {
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
        characteristics: {
          title: string;
          items: Array<{
            title: string;
            description: string;
            icon: React.ElementType;
            color: string;
          }>;
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
          };
        };
      };
      'gy-messages': {
        name: string;
        description: string;
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
        characteristics: {
          title: string;
          items: Array<{
            title: string;
            description: string;
            icon: React.ElementType;
            color: string;
          }>;
        };
        faq: {
          title: string;
          items: {
            q1: string;
            a1: string;
            q2: string;
            a2: string;
          };
        };
      };
      'gy-documents': {
        name: string;
        description: string;
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
        characteristics: {
          title: string;
          items: Array<{
            title: string;
            description: string;
            icon: React.ElementType;
            color: string;
          }>;
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
        characteristics: {
          title: string;
          items: Array<{
            title: string;
            description: string;
            icon: React.ElementType;
            color: string;
          }>;
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
      title: 'Our Team',
      description:
        'A passionate team dedicated to development and learning, committed to listening to new trends, comments and contributions, focusing on continuous growth.',
      members: [
        {
          name: 'Guillermo Figueras',
          role: 'CEO & Frontend Developer',
          description:
            'Proficient in developing responsive and intuitive user interfaces with modern and attractive styles, coupled with a constant technological cutting edge.',
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
            'Expert in building scalable applications and efficient solutions through modern and secure architectures and infrastructures.',
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
          services: 'Our Scopes',
          techstack: 'Tech Stack',
        },
      },
      projects: {
        title: 'Products',
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
      title: 'BUILDING DIGITAL DREAMS',
      description1:
        'In [company]GyCODING[/company], we merge passion and technology. We are a team of developers specialized in creating innovative, versatile, and scalable digital solutions. ',
      description2:
        'Passionate about continuous learning and constant innovation, we always stay at the forefront of new technologies and digital trends.',
      companyName: 'GyCODING',
      buttons: {
        button1: 'Getting started',
        button2: 'Learn More',
      },
    },
    company: {
      title: 'Our History',
      description: 'How we started and where we are going.',
      story: {
        part1:
          'Founded by Guillermo Figueras and Iván Vicente in 2021, our initial purpose was to develop an appropriate environment for both of us to develop what we wanted. As we were eager to learn more and more, this environment was the perfect way for us to experiment, learn and investigate about programming. After a year, [company]GyCODING[/company] evolved, with the goal of building a community interested in development, systems, video games or even design, while both founders continue working on their projects.',
        part2:
          'Now, the main objective is to develop useful products for our own environment, with the goal of making our future projects work properly within our ecosystem.',
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Innovation',
            description:
              'Growth is our passion, surpassing our limits and adapting to new trends, offering innovative solutions.',
            icon: '💡',
          },
          {
            title: 'Quality',
            description:
              'Always maintaining a high level of professionalism and commitment in our work, with integrity and dedication.',
            icon: '✨',
          },
          {
            title: 'Collaboration',
            description:
              'Collaboration with our community and feedback from our users are the pillars on which we build our solutions.',
            icon: '🤝',
          },
          {
            title: 'Growth',
            description:
              'All of our work is always aimed at the future. Scalability and future adaptations are an essential part of our approach.',
            icon: '🚀',
          },
        ],
      },
    },
    services: {
      title: 'Our Scopes',
      description: 'Discover our comprehensive range of development scopes.',
      modules: {
        webDev: {
          title: 'Web Development',
          description: 'Modern web applications built with the latest technologies.',
        },
        backend: {
          title: 'Backend Development',
          description:
            'Robust and scalable microservices powered by modern tools and architectures.',
        },
        gameDev: {
          title: 'Game Development',
          description: 'Creative and scalable video game experiences. For and by players.',
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
          description: 'A universe based in Norse mythology',
          techStack: {
            title: 'Technologies Involved',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'Game development engine with powerful 3D capabilities',
              },
              tech2: {
                name: 'TypeScript',
                description: 'Primary programming language for game logic',
              },
              tech3: {
                name: 'GitHub',
                description: 'Multiplayer networking framework',
              },
              tech4: {
                name: 'Cloudflare',
                description: '3D modeling and animation software',
              },
              //add five technologie, modify all, and add icon of heralds of chaos
            },
          },
          characteristics: {
            title: 'Characteristics',
            items: [
              {
                title: 'Varying Universe',
                description:
                  'Heralds of Chaos presents a varied universe of characters, worlds and interconnected elements in a common story.',
                icon: GamesIcon,
                color: '#FF4081',
              },
              {
                title: 'Varying Playability',
                description:
                  'Whether you seek casual matches to pass time, or if you want to compete. This is your home.',
                icon: SpeedIcon,
                color: '#7C4DFF',
              },
              {
                title: 'Online Multiplayer',
                description: 'Dedicated servers for players from around the world.',
                icon: CloudIcon,
                color: '#00BCD4',
              },
              {
                title: 'High Performance',
                description: 'Lightweight and optimized for performance.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
            ],
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'What are the system requirements?',
              a1: 'Heralds of Chaos could be played with at least 4GB of RAM and 8GB of disk space.',
              q2: 'Are there microtransactions?',
              a2: 'No, the game is a one-time purchase with all content included.',
              q3: 'Do you have downloadable content?',
              a3: 'For the moment no, but we are working on future DLCs that expand the experience.',
              q4: 'Are there frequent updates?',
              a4: 'Of course, we strive for frequent updates, both to include new content and to adjust balance or bugs.',
            },
          },
        },
        'gy-messages': {
          name: 'GY Messages',
          description: 'Real-time messaging and communication platform.',
          techStack: {
            title: 'Technologies Involved',
            technologies: {
              tech1: {
                name: 'Spring Boot',
                description: 'React framework for production with SSR',
              },
              tech2: {
                name: 'Java',
                description: 'Real-time bidirectional communication',
              },
              tech3: {
                name: 'Github',
                description: 'Relational database for message storage',
              },
              tech4: {
                name: 'Cloudflare',
                description: 'In-memory data store for real-time features',
              },
              //add five technologie: react Native
            },
          },
          characteristics: {
            title: 'Characteristics',
            items: [
              {
                title: 'End-to-End Encryption',
                description: 'Messages protected with end-to-end encryption.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
              {
                title: 'Real-Time',
                description: 'Instant messaging with ultra-low latency through WebSockets.',
                icon: SpeedIcon,
                color: '#00BCD4',
              },
              {
                title: 'Multiplatform',
                description: 'Available on Android, iOS, Windows, MacOS, Linux and Web.',
                icon: DevicesIcon,
                color: '#FF4081',
              },
              {
                title: 'Backup Secure',
                description: 'Messages history with automatic backup.',
                icon: StorageIcon,
                color: '#7C4DFF',
              },
            ],
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'What is the multiplatform availability?',
              a1: 'Currently, we only offer downloads for mobile devices with Android or iOS, but we are working on incorporating other platforms.',
              q2: 'Does real-time apply between different platforms?',
              a2: 'Yes, real-time applies to communication between different platforms as well.',
            },
          },
        },
        'gy-documents': {
          name: 'GY Documents',
          description: 'Highly customizable Markdown editor.',
          techStack: {
            title: 'Technologies Involved',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'React framework for the web interface',
              },
              tech2: {
                name: 'TypeScript',
                description: 'Cloud storage for documents',
              },
              tech3: {
                name: 'Electron',
                description: 'Document metadata and user data storage',
              },
              tech4: {
                name: 'GitHUb',
                description: 'Full-text search engine',
              },
            },
          },
          characteristics: {
            title: 'Characteristics',
            items: [
              {
                title: 'High Customization',
                description:
                  'With an advanced customization system you can customize each Markdown file to your liking.',
                icon: CloudIcon,
                color: '#2196F3',
              },
              {
                title: 'Cloud Sync',
                description: 'Synchronize your styles in the cloud through GY Accounts.',
                icon: GroupIcon,
                color: '#4CAF50',
              },
              {
                title: 'Version Control',
                description: 'Simple version control through GIT.',
                icon: SecurityIcon,
                color: '#FF4081',
              },
              {
                title: '???',
                description: '???',
                icon: StorageIcon,
                color: '#9C27B0',
              },
            ],
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'Can I work offline?',
              a1: 'Yes, all GY Documents functionality is based on local work, with cloud synchronization as a complement.',
              q2: 'What file formats are compatible?',
              a2: 'Currently only Markdown (.md) and plain text (.txt), but our plans include incorporating other formats for the editor such as HTML and DOCX.',
              q3: 'What is a "vault"?',
              a3: 'A vault is the workspace, a parent container of files and folders on which the editor takes the root.',
              q4: 'Can I customize an individual file without affecting the rest of my "vault"?',
              a4: 'Of course, each file has the possibility of using a specific style preset.',
              q5: 'Can I customize all files in a folder at the same time?',
              a5: 'At the moment no, but it`s part of our plans for future updates to implement that functionality.',
            },
          },
        },
        'gy-accounts': {
          name: 'GY Accounts',
          description: 'Authentication and user management system.',
          techStack: {
            title: 'Technologies Involved',
            technologies: {
              tech1: {
                name: 'Spring Boot',
                description: 'React framework for the authentication UI',
              },
              tech2: {
                name: 'Java',
                description: 'Secure token-based authentication',
              },
              tech3: {
                name: 'GitHub',
                description: 'User data and session management',
              },
              tech4: {
                name: 'CloudFlare',
                description: 'Third-party authentication protocol',
              },
              //add five tech item // auth0
            },
          },
          characteristics: {
            title: 'Characteristics',
            items: [
              {
                title: 'Single Sign-On',
                description: 'Single Sign-On for all our products.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
              {
                title: 'Robust Integration',
                description:
                  'Secure and reliable integration, with extensive and up-to-date documentation.',
                icon: SpeedIcon,
                color: '#2196F3',
              },
              {
                title: 'Variety of Authentications',
                description:
                  'Support for common authentications (Username / Email + Password), Google or through a mobile device.',
                icon: CloudIcon,
                color: '#FF4081',
              },
              {
                title: 'Wide Personalization',
                description: 'Account information management is totally customizable and private.',
                icon: CodeIcon,
                color: '#9C27B0',
              },
            ],
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'How can I reset my password?',
              a1: 'In accounts.gycoding.com, you can access the user account portal and reset your password.',
              q2: 'I forgot my password, what can I do?',
              a2: 'In the login form on accounts.gycoding.com, you can reset your password using the email associated with the user account.',
              q3: 'Is biometric authentication supported?',
              a3: 'For now, no, but we are working hard to incorporate it.',
              q4: '¿Mis datos se almacenan de manera segura?',
              a4: 'Of course, our authentication service uses modern and robust encryption technologies and privacy policies.',
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
        'Un equipo apasionado por el desarrollo y el aprendizaje, decidido a transformar ideas en experiencias.',
      members: [
        {
          name: 'Guillermo Figueras',
          role: 'CEO y Desarrollador Frontend',
          description:
            'Proficiente en el desarrollo de interfaces de usuario responsivas, intuitivas y con estilos modernos y atractivos, sumado a una constante vanguardia tecnológica.',
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
            'Experto en construir aplicaciones escalables y soluciones eficientes a través de arquitecturas e infraestructuras modernas y seguras.',
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
        title: 'Productosz',
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
      title: 'CREANDO SUEÑOS DIGITALES',
      description1:
        'En [company]GyCODING[/company], fusionamos pasión y tecnología. Somos un equipo de desarrolladores especializados en crean soluciones digitales innovadoras, versátiles y escalables. ',
      description2:
        'Apasionados con un aprendizaje continuo y una innovación constante, nos mantenemos siempre a la vanguardia de nuevas tecnologías y tendencias digitales.',
      companyName: 'GyCODING',
      buttons: {
        button1: 'Comenzar',
        button2: 'Aprender más',
      },
    },
    company: {
      title: 'Nuestra Historia',
      description: 'Cómo empezamos y hacia dónde vamos.',
      story: {
        part1:
          'Fundado por Guillermo Figueras e Iván Vicente en 2021, su propósito inicial era elaborar un entorno de desarrollo adecuado para que ambos amigos pudieran desarrollar lo que quisieran. Como estaban ansiosos por aprender cada vez más, este entorno era la forma perfecta para que experimentaran, aprendieran e investigaran sobre programación. Después de un año, [company]GyCODING[/company] evolucionó, con el objetivo de construir una comunidad  interesada en el desarrollo, sistemas, videojuegos o incluso diseño, al mismo tiempo que ambos fundadores seguían trabajando en sus proyectos..',
        part2:
          'Ahora, el mayor objetivo reside en desarrollar productos útiles para su propio entorno, con el fin de que los futuros proyectos puedan funcionar adecuadamente dentro de su ecosistema.',
      },
      values: {
        title: 'Nuestros Valores',
        items: [
          {
            title: 'Innovación',
            description:
              'El crecimiento es el motor de nuestra pasión, superando nuestros límites y adaptándonos a nuevas tendencias, ofreciendo soluciones de vanguardia.',
            icon: '💡',
          },
          {
            title: 'Calidad',
            description:
              'Siempre manteniendo un alto nivel de pulcritud y calidad en nuestros productos y en nuestro modo de trabajo, con profesionalidad y compromiso.',
            icon: '✨',
          },
          {
            title: 'Colaboración',
            description:
              'La colaboración con nuestra comunidad y la retroalimentación con nuestros usuarios son los pilares sobre los que construimos nuestras soluciones.',
            icon: '🤝',
          },
          {
            title: 'Crecimiento',
            description:
              'Todo nuestro trabajo tiene siempre los ojos puestos en el futuro. La escalabilidad y las posibilidades de futuras adaptaciones son una parte esencial de nuestro enfoque.',
            icon: '🚀',
          },
        ],
      },
    },
    services: {
      title: 'Nuestros Campos',
      description: 'Descubre nuestra amplia gama de campos de desarrollo',
      modules: {
        webDev: {
          title: 'Desarrollo Web',
          description:
            'Aplicaciones web modernas y responsivas construidas con tecnologías de última generación.',
        },
        backend: {
          title: 'Desarrollo Backend',
          description:
            'Microservicios robustos, flexibles y escalables impulsados por herramientas y arquitecturas modernas.',
        },
        gameDev: {
          title: 'Desarrollo de Videojuegos',
          description:
            'Experiencias de videojuegos creativas y con desarrollos escalables. Por y para jugadores.',
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
          name: 'Heraldos del Caos',
          description: 'Universo basado en la mitología nórdica.',
          techStack: {
            title: 'Tecnologías Involucradas',
            technologies: {
              tech1: {
                name: 'Next.JS',
                description: 'Motor de desarrollo de juegos con potentes capacidades 3D',
              },
              tech2: {
                name: 'TypeScript',
                description: 'Lenguaje de programación principal para la lógica del juego',
              },
              tech3: {
                name: 'GitHub',
                description: 'Framework de red para multijugador',
              },
              tech4: {
                name: 'Cloudflare',
                description: 'Software de modelado y animación 3D',
              },
            },
          },
          characteristics: {
            title: 'Características',
            items: [
              {
                title: 'Universo Variado',
                description:
                  'Heraldos del Caos presenta un universo variado de personajes, mundos y elementos entrelazados en una historia común.',
                icon: GamesIcon,
                color: '#FF4081',
              },
              {
                title: 'Jugabilidad Variada',
                description:
                  'Tanto si buscas partidas casuales para divertirte, como si pretendes competir. Este es tu sitio.',
                icon: SpeedIcon,
                color: '#7C4DFF',
              },
              {
                title: 'Multijugador Online',
                description: 'Servidores dedicados para jugadores de todo el mundo.',
                icon: CloudIcon,
                color: '#00BCD4',
              },
              {
                title: 'Alto Rendimiento',
                description:
                  'El bajo peso y la optimización son una de las marcas distintivas de Heraldos del Caos.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
            ],
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Cuál son los requisitos mínimos del sistema?',
              a1: 'Heraldos del Caos podrá jugarse con al menos 4GB de RAM y 8GB de espacio en disco.',
              q2: '¿Hay microtransacciones?',
              a2: 'No, el videojuego es de compra única.',
              q3: '¿Hay contenido descargable?',
              a3: 'Por el momento no, pero estamos en desarrollo de futuros DLCs que expandan la experiencia.',
              q4: '¿Las actualizaciones son frecuentes?',
              a4: 'Por supuesto, abogamos por actualizaciones frecuentes tanto para incluir nuevo contenido como para ajustes de equilibrio o bugs.',
            },
          },
        },
        'gy-messages': {
          name: 'GY Messages',
          description: 'Plataforma de mensajería y comunicación en tiempo real.',
          techStack: {
            title: 'Tecnologías Involucradas',
            technologies: {
              tech1: {
                name: 'Spring Boot',
                description: 'Framework de React para producción con SSR',
              },
              tech2: {
                name: 'Java',
                description: 'Comunicación bidireccional en tiempo real',
              },
              tech3: {
                name: 'GitHub',
                description: 'Base de datos relacional para almacenamiento de mensajes',
              },
              tech4: {
                name: 'React Native',
                description: 'Almacén de datos en memoria para funciones en tiempo real',
              },
            },
          },
          characteristics: {
            title: 'Características',
            items: [
              {
                title: 'Cifrado E2E',
                description: 'Mensajes protegidos con cifrado de extremo a extremo.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
              {
                title: 'Tiempo Real',
                description:
                  'Mensajería instantánea con latencia ultrabaja a través de WebSockets.',
                icon: SpeedIcon,
                color: '#00BCD4',
              },
              {
                title: 'Multiplataforma',
                description:
                  'Disponible en Android e iOS y, en un futuro, en Windows, MacOS, Linux y Web.',
                icon: DevicesIcon,
                color: '#FF4081',
              },
              {
                title: 'Respaldo Seguro',
                description: 'Historial de mensajes con backup automático.',
                icon: StorageIcon,
                color: '#7C4DFF',
              },
            ],
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Cuál es la disponibilidad de la multiplataforma?',
              a1: 'Actualmente solo ofrecemos descarga para dispositivos móviles con Android o iOS, pero estamos trabajando en la incorporación de otras plataformas.',
              q2: '¿El tiempo real también aplica entre distintas plataformas?',
              a2: 'Sí, el tiempo real aplica en la comunicación entre distintas plataformas por igual.',
            },
          },
        },
        'gy-documents': {
          name: 'GY Documents',
          description: 'Editor de Markdown altamente personalizable.',
          techStack: {
            title: 'Tecnologías Involucradas',
            technologies: {
              tech1: {
                name: 'Next.js',
                description: 'Framework de React para la interfaz web',
              },
              tech2: {
                name: 'TypeScript',
                description: 'Almacenamiento en la nube para documentos',
              },
              tech3: {
                name: 'Electron',
                description: 'Almacenamiento de metadatos y datos de usuario',
              },
              tech4: {
                name: 'GitHub',
                description: 'Motor de búsqueda de texto completo',
              },
            },
          },
          characteristics: {
            title: 'Características',
            items: [
              {
                title: 'Alta Personalización',
                description:
                  'Con un sistema de personalización avanzado podrás estilizar cada fichero Markdown a tu gusto.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
              {
                title: 'Sincronización en la Nube',
                description: 'Sincroniza tus estilos en la nube a través de GY Accounts.',
                icon: SpeedIcon,
                color: '#00BCD4',
              },
              {
                title: 'Control de Versiones',
                description: 'Sistema sencillo de control de versiones a través de GIT.',
                icon: DevicesIcon,
                color: '#FF4081',
              },
              {
                title: '???',
                description: '???',
                icon: StorageIcon,
                color: '#7C4DFF',
              },
            ],
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Puedo trabajar sin conexión?',
              a1: 'Sí, todo el funcionamiento de GY Documents se basa en el trabajo local, con la sincronización en la nube como un complemento.',
              q2: '¿Qué formatos de archivos son compatibles?',
              a2: 'Actualmente solo Markdown (.md) y texto plano (.txt), pero entra dentro de nuestros planes la incorporación de otros formatos para el editor como HTML y DOCX.',
              q3: '¿Qué es un \u0027vault\u0027?',
              a3: 'Un vault es el espacio de trabajo, un contenedor padre de ficheros y carpetas sobre el que el editor toma la raíz.',
              q4: '¿Puedo personalizar individualmente un fichero sin afectar al resto de mi \u0027vault\u0027?',
              a4: 'Por supuesto, cada fichero tiene la posibilidad de utilizar un preset de estilos concreto.',
              q5: '¿Puedo personalizar todos los ficheros de una carpeta al mismo tiempo?',
              a5: 'Por el momento no, pero entra en nuestros planes de futuras actualizaciones implementar esa funcionalidad.',
            },
          },
        },
        'gy-accounts': {
          name: 'GY Accounts',
          description: 'Sistema de autenticación y gestión de usuarios.',
          techStack: {
            title: 'Tecnologías Involucradas',
            technologies: {
              tech1: {
                name: 'Spring Boot',
                description: 'Framework de React para la UI de autenticación',
              },
              tech2: {
                name: 'Java',
                description: 'Autenticación segura basada en tokens',
              },
              tech3: {
                name: 'GitHub',
                description: 'Gestión de datos de usuario y sesiones',
              },
              tech4: {
                name: 'Auth0',
                description: 'Protocolo de autenticación de terceros',
              },
            },
          },
          characteristics: {
            title: 'Características',
            items: [
              {
                title: 'Single Sign-On',
                description: 'Un único inicio de sesión para todos nuestros productos.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
              {
                title: 'Integración Robusta',
                description: 'Integración segura y fiable, con amplia y actualizada documentación.',
                icon: CodeIcon,
                color: '#9C27B0',
              },
              {
                title: 'Variedad de Autenticaciones',
                description:
                  'Soporte para autenticación común (Usuario / Email + Contraseña), Google o a través de un dispositivo móvil.',
                icon: CloudIcon,
                color: '#FF4081',
              },
              {
                title: 'Amplia Personalización',
                description:
                  'La gestión de la información de la cuenta es totalmente personalizable y privada.',
                icon: StorageIcon,
                color: '#2196F3',
              },
            ],
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Cómo restablezco mi contraseña?',
              a1: 'En accounts.gycoding.com, puedes acceder al portal de tu cuenta de usuario y reestablecerla.',
              q2: 'Se me ha olvidado mi contraseña, ¿que puedo hacer?',
              a2: 'En el formulario de inicio de sesión al acceder a accounts.gycoding.com, puedes restablecer tu contraseña utilizando el correo electrónico asociado a la cuenta de usuario.',
              q3: '¿Se admite autenticación biométrica?',
              a3: 'Por el momento no, pero estamos en arduo trabajo de incorporarla.',
              q4: '¿Mis datos se almacenan de manera segura?',
              a4: 'Por supuesto, nuestro servicio de autenticación utiliza tecnologías de cifrado y políticas de privacidad modernas y robustas.',
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
