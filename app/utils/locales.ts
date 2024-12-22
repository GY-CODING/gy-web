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
        backend: {
          title: 'Backend & APIs',
          description:
            'Robust and scalable API development with Spring Boot and Java. Clean architecture, microservices, and NoSQL databases for enterprise applications.',
        },
        gameDev: {
          title: 'Game Development',
          description:
            'Creation of interactive experiences and games using Unity and C#. Game mechanics design, performance optimization, and 3D modeling with Blender.',
        },
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
        button2: 'Aprender Mas',
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
      title: 'Tecnologías',
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
        backend: {
          title: 'Backend y APIs',
          description:
            'Desarrollo robusto y escalable de APIs con Spring Boot y Java. Arquitectura limpia, microservicios y bases de datos NoSQL para aplicaciones empresariales.',
        },
        gameDev: {
          title: 'Desarrollo de Juegos',
          description:
            'Creación de experiencias interactivas y juegos usando Unity y C#. Diseño de mecánicas de juego, optimización de rendimiento y modelado 3D con Blender.',
        },
      },
    },
    flag: getAssetPath('/icons/flags/es.svg'),
  },
};
