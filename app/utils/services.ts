export interface ServiceModule {
  title: string;
  description: string;
  gradient: string;
  icon: string;
  techIcons?: string[];
}

export const services: ServiceModule[] = [
  {
    title: 'Web Development',
    description:
      'Modern and responsive web applications using cutting-edge technologies like React, Next.js, and TypeScript. Focus on performance, accessibility, and user experience.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    icon: 'nextjs',
    techIcons: ['React', 'Next.js', 'TypeScript'],
  },
  {
    title: 'Backend & APIs',
    description:
      'Robust and scalable API development with Spring Boot and Java. Clean architecture, microservices, and NoSQL databases for enterprise applications.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
    icon: 'springboot',
    techIcons: ['SpringBoot', 'Java', 'MongoDB'],
  },
  {
    title: 'Game Development',
    description:
      'Creation of interactive experiences and games using Unity and C#. Game mechanics design, performance optimization, and 3D modeling with Blender.',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    icon: 'unity',
    techIcons: ['Unity', 'C#', 'Blender'],
  },
];
