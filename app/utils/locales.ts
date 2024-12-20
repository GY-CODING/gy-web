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
    }>;
  };
  footer: {
    rights: string;
    company: string;
    links: {
      main: {
        title: string;
        items: Array<{
          name: string;
          href: string;
        }>;
      };
      legal: {
        title: string;
        items: Array<{
          name: string;
          href: string;
        }>;
      };
      social: {
        title: string;
        items: Array<{
          name: string;
          href: string;
        }>;
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
    }
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
      description: 'A passionate duo of developers dedicated to transforming ideas into exceptional digital experiences',
      members: [
        {
          name: 'Guillermo Figueras',
          role: 'CEO & Frontend Developer',
          description: 'Passionate about creating elegant and efficient solutions. Specialized in modern web technologies and cloud architecture.'
        },
        {
          name: 'Ivan Vicente',
          role: 'CEO & Backend Developer',
          description: 'Expert in building scalable applications and optimizing performance. Focused on delivering exceptional user experiences.'
        }
      ]
    },
    footer: {
      rights: 'All rights reserved.',
      company: 'GYCODING',
      links: {
        main: {
          title: 'Navigation',
          items: [
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
            { name: 'Projects', href: '/projects' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
          ],
        },
        legal: {
          title: 'Legal',
          items: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
          ],
        },
        social: {
          title: 'Social',
          items: [
            { name: 'GitHub', href: 'https://github.com/gyfigueroa' },
            { name: 'LinkedIn', href: 'https://linkedin.com/in/guillermo-figueras' },
          ],
        },
      },
    },
    about: {
      title: "Building Digital Dreams",
      description1: "At [company]GyCODING[/company], we merge passion with technology. We are a team of developers specialized in creating innovative digital solutions, covering both frontend and backend development.",
      description2: "Our commitment to continuous learning and innovation keeps us at the forefront of the latest web development technologies and trends.",
      companyName: "GyCODING",
      buttons: {
        button1: "Get Started",
        button2: "Learn More",
      }
    },
    company: {
      title: 'Our Story',
      description: 'We are a dynamic software development company specializing in creating innovative digital solutions that drive business growth',
      story: {
        part1: 'Founded with a vision to bridge the gap between innovative ideas and technological solutions, GyCoding has established itself as a trusted partner in digital transformation. Our expertise spans across modern web development, cloud solutions, and custom software development.',
        part2: 'What sets us apart is our commitment to not just meeting but exceeding client expectations. We believe in creating solutions that are not only technologically advanced but also user-friendly and scalable for future growth.'
      },
      values: {
        title: 'Our Values',
        items: [
          {
            title: 'Innovation',
            description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
            icon: '💡'
          },
          {
            title: 'Quality',
            description: 'We maintain the highest standards in our code and design, ensuring robust and scalable applications.',
            icon: '✨'
          },
          {
            title: 'Collaboration',
            description: 'We work closely with our clients, fostering transparent communication and shared success.',
            icon: '🤝'
          },
          {
            title: 'Growth',
            description: 'We are committed to continuous learning and improvement, both for ourselves and our clients.',
            icon: '🚀'
          }
        ]
      }
    },
    techStack: {
      title: 'Tech Stack'
    },
    services: {
      title: 'Our Services',
      description: 'Discover our comprehensive range of development services',
      modules: {
        webDev: {
          title: 'Web Development',
          description: 'Modern and responsive web applications using cutting-edge technologies like React, Next.js, and TypeScript. Focus on performance, accessibility, and user experience.'
        },
        backend: {
          title: 'Backend & APIs',
          description: 'Robust and scalable API development with Spring Boot and Java. Clean architecture, microservices, and NoSQL databases for enterprise applications.'
        },
        gameDev: {
          title: 'Game Development',
          description: 'Creation of interactive experiences and games using Unity and C#. Game mechanics design, performance optimization, and 3D modeling with Blender.'
        }
      }
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
          description: 'Un juego de cartas único con profundidad estratégica',
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
      description: 'Un dúo apasionado de desarrolladores dedicados a transformar ideas en experiencias digitales excepcionales',
      members: [
        {
          name: 'Guillermo Figueras',
          role: 'CEO y Desarrollador Frontend',
          description: 'Apasionado por crear soluciones elegantes y eficientes. Especializado en tecnologías web modernas y arquitectura en la nube.'
        },
        {
          name: 'Ivan Vicente',
          role: 'CEO y Desarrollador Backend',
          description: 'Experto en construir aplicaciones escalables y optimizar el rendimiento. Enfocado en ofrecer experiencias de usuario excepcionales.'
        }
      ]
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      company: 'GYCODING',
      links: {
        main: {
          title: 'Navegación',
          items: [
            { name: 'Inicio', href: '/' },
            { name: 'Servicios', href: '/services' },
            { name: 'Proyectos', href: '/projects' },
            { name: 'Nosotros', href: '/about' },
            { name: 'Contacto', href: '/contact' },
          ],
        },
        legal: {
          title: 'Legal',
          items: [
            { name: 'Política de Privacidad', href: '/privacy' },
            { name: 'Términos de Servicio', href: '/terms' },
            { name: 'Política de Cookies', href: '/cookies' },
          ],
        },
        social: {
          title: 'Social',
          items: [
            { name: 'GitHub', href: 'https://github.com/gyfigueroa' },
            { name: 'LinkedIn', href: 'https://linkedin.com/in/guillermo-figueras' },
          ],
        },
      },
    },
    about: {
      title: "Creando sueños digitales",
      description1: "En [company]GyCODING[/company], fusionamos pasión con tecnología. Somos un equipo de desarrolladores especializados en crear soluciones digitales innovadoras, abarcando tanto desarrollo frontend como backend.",
      description2: "Nuestro compromiso con el aprendizaje continuo y la innovación nos mantiene a la vanguardia de las últimas tecnologías y tendencias en desarrollo web.",
      companyName: "GyCODING",
      buttons: {
        button1: "Empezar",
        button2: "Aprender Mas",
      }
    },
    company: {
      title: 'Nuestra Historia',
      description: 'Somos una empresa de desarrollo de software dinámica especializada en crear soluciones digitales innovadoras que impulsan el crecimiento empresarial',
      story: {
        part1: 'Fundada con la visión de cerrar la brecha entre las ideas innovadoras y las soluciones tecnológicas, GyCoding se ha establecido como un socio de confianza en la transformación digital. Nuestra experiencia abarca el desarrollo web moderno, soluciones en la nube y desarrollo de software personalizado.',
        part2: 'Lo que nos distingue es nuestro compromiso no solo de cumplir sino de superar las expectativas de los clientes. Creemos en crear soluciones que no solo sean tecnológicamente avanzadas sino también fáciles de usar y escalables para el crecimiento futuro.'
      },
      values: {
        title: 'Nuestros Valores',
        items: [
          {
            title: 'Innovación',
            description: 'Constantemente superamos límites y adoptamos nuevas tecnologías para ofrecer soluciones de vanguardia.',
            icon: '💡'
          },
          {
            title: 'Calidad',
            description: 'Mantenemos los más altos estándares en nuestro código y diseño, asegurando aplicaciones robustas y escalables.',
            icon: '✨'
          },
          {
            title: 'Colaboración',
            description: 'Trabajamos estrechamente con nuestros clientes, fomentando la comunicación transparente y el éxito compartido.',
            icon: '🤝'
          },
          {
            title: 'Crecimiento',
            description: 'Estamos comprometidos con el aprendizaje y la mejora continua, tanto para nosotros como para nuestros clientes.',
            icon: '🚀'
          }
        ]
      }
    },
    techStack: {
      title: 'Tecnologías'
    },
    services: {
      title: 'Nuestros Servicios',
      description: 'Descubre nuestra amplia gama de servicios de desarrollo',
      modules: {
        webDev: {
          title: 'Desarrollo Web',
          description: 'Aplicaciones web modernas y responsivas utilizando tecnologías de vanguardia como React, Next.js y TypeScript. Enfoque en rendimiento, accesibilidad y experiencia de usuario.'
        },
        backend: {
          title: 'Backend y APIs',
          description: 'Desarrollo robusto y escalable de APIs con Spring Boot y Java. Arquitectura limpia, microservicios y bases de datos NoSQL para aplicaciones empresariales.'
        },
        gameDev: {
          title: 'Desarrollo de Juegos',
          description: 'Creación de experiencias interactivas y juegos usando Unity y C#. Diseño de mecánicas de juego, optimización de rendimiento y modelado 3D con Blender.'
        }
      }
    },
  },
};
