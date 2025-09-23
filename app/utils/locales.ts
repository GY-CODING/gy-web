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
        portfolio: string;
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
      link: string;
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
      wingwords: {
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
            tech5: {
              name: string;
              description: string;
            };
            tech6: {
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
  privacy: {
    title: string;
    lastUpdate: string;
    intro: string;
    sections: {
      responsible: {
        title: string;
        items: Array<string>;
      };
      dataCollected: {
        title: string;
        intro: string;
        items: Array<string>;
      };
      howWeCollect: {
        title: string;
        intro: string;
        items: Array<string>;
      };
      dataUsage: {
        title: string;
        intro: string;
        items: Array<string>;
      };
      thirdParty: {
        title: string;
        content: string;
      };
      dataRetention: {
        title: string;
        content: string;
      };
      minors: {
        title: string;
        content: string;
      };
      rights: {
        title: string;
        intro: string;
        items: Array<string>;
        contact: string;
      };
    };
  };
  terms: {
    title: string;
    lastUpdate: string;
    intro: string;
    sections: {
      object: {
        title: string;
        content: string;
      };
      permittedUse: {
        title: string;
        content: string;
      };
      registration: {
        title: string;
        content: string;
      };
      responsibility: {
        title: string;
        content: string;
      };
      modifications: {
        title: string;
        content: string;
      };
      jurisdiction: {
        title: string;
        content: string;
      };
    };
  };
  cookies: {
    title: string;
    lastUpdate: string;
    intro: string;
    sections: {
      whatAre: {
        title: string;
        content: string;
      };
      types: {
        title: string;
        items: Array<{
          primary: string;
          secondary: string;
        }>;
      };
      noThirdParty: {
        title: string;
        content: string;
      };
      consent: {
        title: string;
        content: string;
      };
    };
  };
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
        { title: 'WingWords', description: 'Connect with readers and share literary experiences' },
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
            portfolio: 'https://gfigueras.com',
          },
        },
        {
          name: 'Iván Vicente',
          role: 'CEO & Backend Developer',
          description:
            'Expert in building scalable applications and efficient solutions through modern and secure architectures and infrastructures.',
          image: getAssetPath('/images/toxyc.png'),
          skills: ['Java', 'Spring Boot', 'C#', 'NodeJS', 'MongoDB'],
          social: {
            github: 'https://github.com/gy-toxyc',
            linkedin: 'https://www.linkedin.com/in/srtoxyc/',
            email: 'toxyc@gycoding.com',
            portfolio: 'https://srtoxyc.com',
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
        link: 'Website',
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
            title: 'Features',
            items: [
              {
                title: 'Varying Universe',
                description:
                  'Heralds of Chaos presents a diverse universe of characters, worlds, and elements intertwined in a common storyline.',
                icon: GamesIcon,
                color: '#FF4081',
              },
              {
                title: 'Accurate Data',
                description:
                  'All data about the characters, worlds, and elements is accurate and reliable.',
                icon: SpeedIcon,
                color: '#7C4DFF',
              },
              {
                title: 'Synchronization with the Heralds of Chaos API',
                description:
                  'Character, world, and element data is synchronized with the Heralds of Chaos API quickly and efficiently.',
                icon: CloudIcon,
                color: '#00BCD4',
              },
              {
                title: 'Integration with GY Accounts',
                description:
                  'The API includes a role and permissions system that ensures the website and API requests are secure.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
            ],
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'What can I do in this dashboard?',
              a1: 'You can explore detailed information about characters, worlds, places, creatures, and items from the Heralds of Chaos universe, all synced with its official API.',

              q2: 'Can I modify the information shown?',
              a2: 'No. The dashboard content is read-only for regular users. Only authorized administrators can make changes through internal tools.',

              q3: 'How often is the content updated?',
              a3: 'The content is automatically updated in real time from the official API as soon as administrators make any changes.',

              q4: 'Do I need an account to access the dashboard?',
              a4: 'Yes, you must log in with a GY Accounts account to access the dashboard content, even in read-only mode.',

              q5: 'Is the dashboard mobile-friendly?',
              a5: 'Yes, the interface is fully responsive and works well on all types of devices, including smartphones and tablets.',
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
        wingwords: {
          name: 'WingWords',
          description: 'Discover readers with similar tastes and share your literary experiences',
          techStack: {
            title: 'Technologies Involved',
            technologies: {
              tech1: {
                name: 'WingWords',
                description: 'Social Reading Platform',
              },
              tech2: {
                name: 'Java',
                description: 'Backend Development',
              },
              tech3: {
                name: 'Spring Boot',
                description: 'Backend development framework',
              },
              tech4: {
                name: 'TypeScript',
                description: 'Type-safe development',
              },
              tech5: {
                name: 'NextJS',
                description: 'Next-generation React framework',
              },
              tech6: {
                name: 'Cloudflare',
                description: 'Cloud Computing and CDN',
              },
            },
          },
          characteristics: {
            title: 'Features',
            items: [
              {
                title: 'Reader Connection',
                description: 'Connect with readers who share your literary tastes and preferences',
                icon: GroupIcon,
                color: '#8E44AD',
              },
              {
                title: 'View Statistics',
                description: 'View your reading statistics and compare them with your friends.',
                icon: SpeedIcon,
                color: '#9B59B6',
              },
              {
                title: 'Cross-Device Sync',
                description: 'Access your reading data from any device.',
                icon: CloudIcon,
                color: '#E91E63',
              },
              {
                title: 'GY Accounts Integration',
                description:
                  'GY Accounts system provides secure authentication and user management for WingWords.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
            ],
          },
          faq: {
            title: 'Frequently Asked Questions',
            items: {
              q1: 'Can I connect with readers worldwide?',
              a1: 'Yes, WingWords is a global platform that allows you to connect with readers from any country and in multiple languages.',
              q2: 'Is WingWords free to use?',
              a2: 'Yes, WingWords offers all basic features for free. We also have planned premium plans for the future with additional features.',
              q3: 'How do you protect my privacy?',
              a3: 'We respect your privacy and only share the necessary information for the application using our GY Accounts system.',
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
    privacy: {
      title: 'Privacy Policy',
      lastUpdate: 'Last updated: May 20, 2025',
      intro:
        'At GYCODING (www.gycoding.com) we take the privacy of our users very seriously, including minors. This policy describes how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable regulations in Spain.',
      sections: {
        responsible: {
          title: '1. Data Controller',
          items: ['Website name: GYCODING', 'Contact email: it@gycoding.com', 'Country: Spain'],
        },
        dataCollected: {
          title: '2. Data We Collect',
          intro: 'We collect the following personal data:',
          items: ['Name', 'Email', 'IP Address'],
        },
        howWeCollect: {
          title: '3. How We Collect Your Data',
          intro: 'Through:',
          items: [
            'Cookies (functional)',
            'External authentication services (Auth0)',
            'Contact and registration forms',
          ],
        },
        dataUsage: {
          title: '4. Data Usage',
          intro: 'We use your data to:',
          items: [
            'Manage user accounts',
            'Administer access to personalized services',
            'Ensure security and proper site functioning',
          ],
        },
        thirdParty: {
          title: '5. Third Parties We Share Data With',
          content:
            'We share data with Auth0 for authentication and identity management. The processing of your data by Auth0 is governed by their own privacy policies.',
        },
        dataRetention: {
          title: '6. Data Retention',
          content:
            'Your data will be kept indefinitely until deletion is requested, as long as it is necessary for the purposes mentioned.',
        },
        minors: {
          title: '7. Minors',
          content:
            'Since our website may be directed at minors, we recommend that minors have parental or guardian authorization before providing personal data.',
        },
        rights: {
          title: '8. Your Rights',
          intro: 'You have the right to:',
          items: [
            'Access your data',
            'Rectify incorrect data',
            'Request deletion',
            'Object to processing',
            'Data portability',
          ],
          contact: 'You can exercise these rights by writing to: it@gycoding.com@privacy',
        },
      },
    },
    terms: {
      title: 'Terms of Service',
      lastUpdate: 'Last updated: May 20, 2025',
      intro: 'By accessing and using this website, you accept the following terms:',
      sections: {
        object: {
          title: '1. Object',
          content: 'GYCODING offers services related to user account management and websites.',
        },
        permittedUse: {
          title: '2. Permitted Use',
          content:
            'The user agrees to use the site legally, without infringing third-party rights, or engaging in illegal, offensive, or abusive activities.',
        },
        registration: {
          title: '3. Registration',
          content:
            'By registering, you agree to provide truthful information. We reserve the right to suspend accounts that violate this rule.',
        },
        responsibility: {
          title: '4. Responsibility',
          content:
            'GYCODING is not responsible for interruptions, errors, or data loss resulting from misuse of the service or force majeure.',
        },
        modifications: {
          title: '5. Modifications',
          content:
            'We reserve the right to modify these terms at any time. Users will be notified through the website.',
        },
        jurisdiction: {
          title: '6. Jurisdiction',
          content:
            'This site operates under Spanish legislation. In case of conflict, the parties submit to the courts of Spain.',
        },
      },
    },
    cookies: {
      title: 'Cookie Policy',
      lastUpdate: 'Last updated: May 20, 2025',
      intro: 'This website uses essential cookies for its operation.',
      sections: {
        whatAre: {
          title: '1. What are cookies?',
          content:
            'A cookie is a small file that is stored in your browser when you visit a website.',
        },
        types: {
          title: '2. Types of cookies used',
          items: [
            {
              primary: 'Session cookies',
              secondary: 'Necessary for authentication and session maintenance.',
            },
            {
              primary: 'Preference cookies',
              secondary: 'To remember user settings, such as page color or theme.',
            },
          ],
        },
        noThirdParty: {
          title: '3. No third-party cookies',
          content:
            'We do not use analytics, advertising, or external service cookies such as Google Analytics or Facebook.',
        },
        consent: {
          title: '4. Consent',
          content:
            'Currently, we do not display a cookie consent banner, as we only use strictly necessary cookies. However, you can configure your browser to restrict or delete cookies.',
        },
      },
    },
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
            'Proficiente en el desarrollo de interfaces responsivas, intuitivas y con estilos modernos y atractivos, sumado a una constante vanguardia tecnológica.',
          image: getAssetPath('/images/gfigueras.png'),
          skills: ['React', 'NextJS', 'TypeScript', 'Unity', 'Material UI'],
          social: {
            github: 'https://github.com/gy-gfigueras',
            linkedin: 'https://www.linkedin.com/in/gfigueras/',
            email: 'gfigueras@gycoding.com',
            portfolio: 'https://gfigueras.com',
          },
        },
        {
          name: 'Iván Vicente',
          role: 'CEO y Desarrollador Backend',
          description:
            'Experto en construir aplicaciones escalables y soluciones eficientes a través de arquitecturas e infraestructuras modernas y seguras.',
          image: getAssetPath('/images/toxyc.png'),
          skills: ['Java', 'Spring Boot', 'C#', 'Node', 'MongoDB'],
          social: {
            github: 'https://github.com/gy-toxyc',
            linkedin: 'https://www.linkedin.com/in/srtoxyc/',
            email: 'toxyc@gycoding.com',
            portfolio: 'https://srtoxyc.com',
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
        title: 'Productos',
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
        link: 'Página Web',
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
                title: 'Datos precisos',
                description:
                  'Todos los datos de los personajes, mundos y elementos son precisos y verídicos.',
                icon: SpeedIcon,
                color: '#7C4DFF',
              },
              {
                title: 'Sincronía con la API de Heraldos del Caos',
                description:
                  'Los datos de los personajes, mundos y elementos se sincronizan con la API de Heraldos del Caos de manera rapida y eficaz.',
                icon: CloudIcon,
                color: '#00BCD4',
              },
              {
                title: 'Integración con GY Accounts',
                description:
                  'El API tiene un sistema de roles y permisos que aseguran que la pagina web y las peticiones api sean seguras.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
            ],
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Qué puedo hacer en este dashboard?',
              a1: 'Puedes explorar información detallada sobre personajes, mundos, lugares, criaturas e ítems del universo de Heraldos del Caos, todo sincronizado con su API oficial.',

              q2: '¿Puedo modificar la información que aparece?',
              a2: 'No. El contenido del dashboard es solo de lectura para los usuarios. Solo los administradores autorizados pueden realizar modificaciones a través de herramientas internas.',

              q3: '¿Con qué frecuencia se actualiza el contenido?',
              a3: 'El contenido se actualiza automáticamente en tiempo real desde la API oficial, tan pronto como los administradores hacen cambios.',

              q4: '¿Necesito una cuenta para acceder al dashboard?',
              a4: 'Sí, necesitas iniciar sesión con una cuenta de GY Accounts para acceder al contenido del dashboard, incluso en modo de solo lectura.',

              q5: '¿El dashboard funciona en dispositivos móviles?',
              a5: 'Sí, la interfaz está diseñada para adaptarse correctamente a todo tipo de dispositivos, incluidos móviles y tablets.',
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
        wingwords: {
          name: 'WingWords',
          description:
            'Descubre lectores con gustos similares y comparte tus experiencias literarias',
          techStack: {
            title: 'Tecnologías Involucradas',
            technologies: {
              tech1: {
                name: 'WingWords',
                description: 'Plataforma Social de Lectura',
              },
              tech2: {
                name: 'Java',
                description: 'Desarrollo Backend',
              },
              tech3: {
                name: 'Spring Boot',
                description: 'Framework de desarrollo backend',
              },
              tech4: {
                name: 'TypeScript',
                description: 'Desarrollo tipado y seguro',
              },
              tech5: {
                name: 'NextJS',
                description: 'Framework React de última generación',
              },
              tech6: {
                name: 'Cloudflare',
                description: 'Cloud Computing y CDN',
              },
            },
          },
          characteristics: {
            title: 'Características',
            items: [
              {
                title: 'Conexión de Lectores',
                description:
                  'Conecta con lectores que comparten tus gustos y preferencias literarias',
                icon: GroupIcon,
                color: '#8E44AD',
              },
              {
                title: 'Visualiza estádisticas',
                description:
                  'Visualiza las estádisticas de tus lecturas, y compáralas con tus amigos.',
                icon: SpeedIcon,
                color: '#9B59B6',
              },
              {
                title: 'Sincronizacion entre dispositivos',
                description: 'Accede a todos tus datos de lectura desde cualquier dispositivo.',
                icon: CloudIcon,
                color: '#E91E63',
              },
              {
                title: 'Integracion con GY Accounts',
                description:
                  'El sistema de cuentas de GY Accounts proporciona autenticación segura y gestión de usuarios para WingWords.',
                icon: SecurityIcon,
                color: '#4CAF50',
              },
            ],
          },
          faq: {
            title: 'Preguntas Frecuentes',
            items: {
              q1: '¿Puedo conectar con lectores de todo el mundo?',
              a1: 'Sí, WingWords es una plataforma global que te permite conectar con lectores de cualquier país y en múltiples idiomas.',
              q2: '¿Es gratuito usar WingWords?',
              a2: 'Sí, WingWords ofrece todas las funciones básicas de forma gratuita. También tenemos planeados planes premium a futuro con características adicionales.',
              q3: '¿Cómo protegen mi privacidad?',
              a3: 'Respetamos tu privacidad y solo compartimos la información necesaria para la aplicación utilizando nuestro sistema de GY Accounts.',
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
    privacy: {
      title: 'Política de Privacidad',
      lastUpdate: 'Última actualización: 20 de mayo de 2025',
      intro:
        'En GYCODING (www.gycoding.com) nos tomamos muy en serio la privacidad de nuestros usuarios, incluidos menores de edad. Esta política describe cómo recopilamos, usamos y protegemos tus datos personales conforme al Reglamento General de Protección de Datos (RGPD) y demás normativa aplicable en España.',
      sections: {
        responsible: {
          title: '1. Responsable del tratamiento',
          items: [
            'Nombre del sitio web: GYCODING',
            'Correo de contacto: it@gycoding.com',
            'País: España',
          ],
        },
        dataCollected: {
          title: '2. Datos que recopilamos',
          intro: 'Recopilamos los siguientes datos personales:',
          items: ['Nombre', 'Correo electrónico', 'Dirección IP'],
        },
        howWeCollect: {
          title: '3. Cómo recopilamos tus datos',
          intro: 'A través de:',
          items: [
            'Cookies (funcionales)',
            'Servicios de autenticación externa (Auth0)',
            'Formularios de contacto y registro',
          ],
        },
        dataUsage: {
          title: '4. Uso de los datos',
          intro: 'Utilizamos tus datos para:',
          items: [
            'Gestionar cuentas de usuario',
            'Administrar el acceso a servicios personalizados',
            'Garantizar la seguridad y el correcto funcionamiento del sitio',
          ],
        },
        thirdParty: {
          title: '5. Terceros con los que compartimos datos',
          content:
            'Compartimos datos con Auth0 para la autenticación y gestión de identidades. El tratamiento de tus datos por parte de Auth0 se rige por sus propias políticas de privacidad.',
        },
        dataRetention: {
          title: '6. Conservación de datos',
          content:
            'Tus datos se conservarán de forma indefinida mientras no se solicite su supresión, siempre y cuando sea necesario para los fines mencionados.',
        },
        minors: {
          title: '7. Menores de edad',
          content:
            'Dado que nuestra web puede estar dirigida a menores, recomendamos que los menores cuenten con la autorización de sus padres o tutores antes de facilitar datos personales.',
        },
        rights: {
          title: '8. Tus derechos',
          intro: 'Tienes derecho a:',
          items: [
            'Acceder a tus datos',
            'Rectificar datos incorrectos',
            'Solicitar la supresión',
            'Oponerte al tratamiento',
            'Portar tus datos',
          ],
          contact: 'Puedes ejercer estos derechos escribiendo a: it@gycoding.com@privacy',
        },
      },
    },
    terms: {
      title: 'Términos de Servicio',
      lastUpdate: 'Última actualización: 20 de mayo de 2025',
      intro: 'Al acceder y utilizar este sitio web, aceptas los siguientes términos:',
      sections: {
        object: {
          title: '1. Objeto',
          content:
            'GYCODING ofrece servicios relacionados con la gestión de cuentas de usuario y páginas web.',
        },
        permittedUse: {
          title: '2. Uso permitido',
          content:
            'El usuario se compromete a utilizar el sitio de forma legal, sin infringir derechos de terceros, ni realizar actividades ilegales, ofensivas o abusivas.',
        },
        registration: {
          title: '3. Registro',
          content:
            'Al registrarte, aceptas proporcionar información veraz. Nos reservamos el derecho de suspender cuentas que incumplan esta norma.',
        },
        responsibility: {
          title: '4. Responsabilidad',
          content:
            'GYCODING no se hace responsable de interrupciones, errores o pérdidas de datos derivadas del mal uso del servicio o causas de fuerza mayor.',
        },
        modifications: {
          title: '5. Modificaciones',
          content:
            'Nos reservamos el derecho de modificar estos términos en cualquier momento. Se notificará a los usuarios mediante la web.',
        },
        jurisdiction: {
          title: '6. Jurisdicción',
          content:
            'Este sitio opera conforme a la legislación española. En caso de conflicto, las partes se someten a los tribunales de España.',
        },
      },
    },
    cookies: {
      title: 'Política de Cookies',
      lastUpdate: 'Última actualización: 20 de mayo de 2025',
      intro: 'Este sitio web utiliza cookies esenciales para su funcionamiento.',
      sections: {
        whatAre: {
          title: '1. ¿Qué son las cookies?',
          content:
            'Una cookie es un pequeño archivo que se almacena en tu navegador cuando visitas una web.',
        },
        types: {
          title: '2. Tipos de cookies utilizadas',
          items: [
            {
              primary: 'Cookies de sesión',
              secondary: 'Necesarias para la autenticación y mantenimiento de sesiones.',
            },
            {
              primary: 'Cookies de preferencias',
              secondary:
                'Para recordar configuraciones del usuario, como el color de la página o el tema.',
            },
          ],
        },
        noThirdParty: {
          title: '3. No uso de cookies de terceros',
          content:
            'No utilizamos cookies de analítica, publicidad ni servicios externos como Google Analytics o Facebook.',
        },
        consent: {
          title: '4. Consentimiento',
          content:
            'Actualmente, no mostramos un banner de consentimiento de cookies, dado que solo se utilizan cookies estrictamente necesarias. Aun así, puedes configurar tu navegador para restringir o eliminar cookies.',
        },
      },
    },
  },
};
