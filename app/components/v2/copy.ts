// Copy for the /v2 homepage prototype (en/es). Kept local to the prototype until the design
// is approved; then it should move into utils/locales.ts.

export type Lang = 'en' | 'es';

export const DISCORD_URL = 'https://discord.gg/AGYhzD53qg';
// La app de cuentas: es el botón de la derecha de la barra (antes estaba el de Discord).
export const ACCOUNTS_URL = 'https://accounts.gycoding.com';
export const GITHUB_URL = 'https://github.com/GY-CODING';
export const X_URL = 'https://x.com/GYCODING';
export const DOCS_URL = 'https://docs.gycoding.com';
export const STATUS_URL = 'https://status.gycoding.com';
export const CONTACT_EMAIL = 'it@gycoding.com';

const copy = {
  en: {
    nav: {
      worlds: 'Worlds',
      build: 'What we build',
      story: 'Story',
      community: 'Community',
      teamLine: 'The people who build it.',
      companyLine: 'Where GYCODING comes from, and where it is going.',
      docs: 'Docs',
      docsLabel: 'Documentation',
      docsLine: 'Guides and API reference, all in one place.',
      statusLabel: 'Health status',
      statusLine: 'Live status of every GYCODING service.',
    },
    heroSentence: 'A software studio building web, backends and games since 2021.',
    heroAction: 'Explore our worlds',
    heroLook: 'Look through the name',
    heroSee: (name: string) => `See ${name}`,
    accountsAction: 'Go to GY Accounts',
    marquee: 'Creating digital dreams',
    statement: 'We build digital products people want to use every day.',
    statementSub: 'Web, backends and games. Since 2021.',
    toolsTitle: 'Our tools',
    toolsLine: 'What we work with every day.',
    ctaWrite: 'Write to us',
    skip: 'Skip to content',
    motionPause: 'Pause animations',
    motionPlay: 'Play animations',
    meetTeam: 'Meet the team',
    menu: 'Menu',
    menuClose: 'Close',
    worldsDiscover: (name: string) => `Discover ${name}`,
    product: {
      featuresTitle: 'What you can do',
      stackTitle: 'Built with',
      codeTitle: 'The code is public',
      codeLine: 'Read how it is built, line by line, on GitHub.',
      codeLink: 'View the repository',
      next: 'Next world',
    },
    company: {
      title: 'Our story',
      chapters: ['2021', '2022', 'Today'],
      fieldsTitle: 'What we do',
      ecosystemTitle: 'Our ecosystem',
      peopleTitle: 'The people behind it',
    },
    team: {
      title: 'The team',
      based: 'Madrid, Spain',
      founded: 'Co-founded GYCODING in 2021',
      skills: 'What they work with',
      links: 'Links',
      portfolio: 'Website',
      email: 'Email',
      other: 'Also on the team',
      view: 'View profile',
      valuesTitle: 'What drives us',
      cardTools: 'See the tools',
      cardContact: 'See the contact',
    },
    worldsHeading: 'Three worlds',
    worldsCaption:
      'Each product lives in its own universe, with its own colours, and one GY account opens them all.',
    worldsOpen: (name: string) => `Open ${name}`,
    worldsMore: 'Learn more',
    buildHeading: 'What we build',
    buildLead: 'Three crafts under one roof.',
    build: [
      {
        group: 'Web',
        summary: 'Fast, accessible interfaces with motion that earns its place.',
      },
      {
        group: 'Backend',
        summary: 'APIs and identity that every product can lean on.',
      },
      {
        group: 'Games',
        summary: 'Worlds with lore, built to be explored.',
      },
    ],
    storyHeading: 'Two friends, since 2021',
    storyLine:
      'It started as a place to build whatever we wanted to learn. Today it is a studio with three worlds in motion.',
    founders: [
      {
        name: 'Guillermo Figueras',
        slug: 'guillermo-figueras',
        role: 'CEO & Frontend Developer',
        image: '/images/gfigueras.png',
      },
      {
        name: 'Iván Vicente',
        slug: 'ivan-vicente',
        role: 'CEO & Backend Developer',
        image: '/images/toxyc.png',
      },
    ],
    ctaHeadline: ['Let’s build', 'your next dream'],
    ctaSentence: `Tell us about it at ${CONTACT_EMAIL}, or come say hi in the community.`,
    ctaButton: 'Join the Discord',
    footer: {
      products: 'Products',
      studio: 'Studio',
      legal: 'Legal',
      community: 'Community',
      team: 'Team',
      company: 'Company',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      rights: 'All rights reserved.',
      back: 'Back to top',
    },
  },
  es: {
    nav: {
      worlds: 'Mundos',
      build: 'Qué hacemos',
      story: 'Historia',
      community: 'Comunidad',
      teamLine: 'Las personas que lo construyen.',
      companyLine: 'De dónde viene GYCODING y a dónde va.',
      docs: 'Docs',
      docsLabel: 'Documentación',
      docsLine: 'Guías y referencia de la API, en un solo sitio.',
      statusLabel: 'Estado de salud',
      statusLine: 'Estado en vivo de cada servicio de GYCODING.',
    },
    heroSentence: 'Estudio de software que crea webs, backends y videojuegos desde 2021.',
    heroAction: 'Explora nuestros mundos',
    heroLook: 'Mira a través del nombre',
    heroSee: (name: string) => `Ver ${name}`,
    accountsAction: 'Ir a GY Accounts',
    marquee: 'Creando sueños digitales',
    statement: 'Creamos productos digitales que la gente quiere usar cada día.',
    statementSub: 'Webs, backends y videojuegos. Desde 2021.',
    toolsTitle: 'Nuestras herramientas',
    toolsLine: 'Con lo que trabajamos cada día.',
    ctaWrite: 'Escríbenos',
    skip: 'Saltar al contenido',
    motionPause: 'Pausar animaciones',
    motionPlay: 'Reanudar animaciones',
    meetTeam: 'Conoce al equipo',
    menu: 'Menú',
    menuClose: 'Cerrar',
    worldsDiscover: (name: string) => `Descubre ${name}`,
    product: {
      featuresTitle: 'Qué puedes hacer',
      stackTitle: 'Hecho con',
      codeTitle: 'El código es público',
      codeLine: 'Lee cómo está hecho, línea a línea, en GitHub.',
      codeLink: 'Ver el repositorio',
      next: 'Siguiente mundo',
    },
    company: {
      title: 'Nuestra historia',
      chapters: ['2021', '2022', 'Hoy'],
      fieldsTitle: 'Qué hacemos',
      ecosystemTitle: 'Nuestro ecosistema',
      peopleTitle: 'Las personas detrás',
    },
    team: {
      title: 'El equipo',
      based: 'Madrid, España',
      founded: 'Cofundó GYCODING en 2021',
      skills: 'Con qué trabaja',
      links: 'Enlaces',
      portfolio: 'Web personal',
      email: 'Correo',
      other: 'También en el equipo',
      view: 'Ver perfil',
      cardTools: 'Ver las herramientas',
      cardContact: 'Ver el contacto',
      valuesTitle: 'Lo que nos mueve',
    },
    worldsHeading: 'Tres mundos',
    worldsCaption:
      'Cada producto vive en su propio universo, con sus colores, y una cuenta GY los abre todos.',
    worldsOpen: (name: string) => `Abrir ${name}`,
    worldsMore: 'Más información',
    buildHeading: 'Qué hacemos',
    buildLead: 'Tres oficios bajo un mismo techo.',
    build: [
      {
        group: 'Web',
        summary: 'Interfaces rápidas y accesibles, con movimiento que aporta.',
      },
      {
        group: 'Backend',
        summary: 'APIs e identidad en las que se apoya cada producto.',
      },
      {
        group: 'Videojuegos',
        summary: 'Mundos con historia, hechos para explorarse.',
      },
    ],
    storyHeading: 'Dos amigos, desde 2021',
    storyLine:
      'Empezó como un sitio donde construir lo que quisiéramos aprender. Hoy es un estudio con tres mundos en marcha.',
    founders: [
      {
        name: 'Guillermo Figueras',
        slug: 'guillermo-figueras',
        role: 'CEO y Desarrollador Frontend',
        image: '/images/gfigueras.png',
      },
      {
        name: 'Iván Vicente',
        slug: 'ivan-vicente',
        role: 'CEO y Desarrollador Backend',
        image: '/images/toxyc.png',
      },
    ],
    ctaHeadline: ['Construyamos', 'tu próximo sueño'],
    ctaSentence: `Cuéntanoslo en ${CONTACT_EMAIL} o pásate a saludar por la comunidad.`,
    ctaButton: 'Únete al Discord',
    footer: {
      products: 'Productos',
      studio: 'Estudio',
      legal: 'Legal',
      community: 'Comunidad',
      team: 'Equipo',
      company: 'Empresa',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies',
      rights: 'Todos los derechos reservados.',
      back: 'Volver arriba',
    },
  },
} as const;

export type Copy = (typeof copy)['en'] | (typeof copy)['es'];

export function getCopy(lang: string): Copy {
  return lang === 'es' ? copy.es : copy.en;
}

// Shared palette for the prototype: two values carry the page (ground and ink); the brand
// gradient appears on the single action and inside the name.
export const ink = (dark: boolean) => ({
  ground: dark ? '#07070b' : '#f6f5f9',
  // One tone step up from the ground: separates sections without lines.
  raised: dark ? '#100f17' : '#ffffff',
  ink: dark ? '#f2f0f7' : '#0d0b14',
  soft: dark ? '#a29eb0' : '#55516a',
  // Secondary text on the inverted blocks (CTA, footer), which use ink as their ground.
  softInverted: dark ? '#55516a' : '#a29eb0',
});

// What the name can be looked through: the studio itself and each of its worlds.
// Colours are each product's own (products.ts theme + its text gradient).
export type WorldKey = 'gycoding' | 'wingwords' | 'gy-accounts' | 'heralds-of-chaos';
export const WORLD_PALETTES: Record<WorldKey, [string, string, string, string]> = {
  gycoding: ['#6366f1', '#ec4899', '#8c54ff', '#66d9ff'],
  wingwords: ['#9c5fe5', '#e879f9', '#6d28d9', '#818cf8'],
  'gy-accounts': ['#8c54ff', '#6366f1', '#a855f7', '#6d28d9'],
  'heralds-of-chaos': ['#d4af37', '#ffd700', '#8b6914', '#f3e2a9'],
};

// The page body is a sequence of tones (Apple-style light and dark tiles). The whole page — ground
// and ink together — eases to the tone of the screen crossing the middle of the viewport.
export type ToneKey =
  | 'ground'
  | 'mist'
  | 'paper'
  | 'night'
  | 'wingwords'
  | 'gy-accounts'
  | 'heralds-of-chaos'
  | 'wingwords-dark'
  | 'gy-accounts-light'
  | 'heralds-of-chaos-dark'
  | 'heralds-void'
  | 'heralds-bone';
export const TONES: Record<
  Exclude<ToneKey, 'ground'>,
  { bg: string; ink: string; soft: string }
> = {
  mist: { bg: '#f5f5f7', ink: '#1d1d1f', soft: '#6e6e73' },
  paper: { bg: '#ffffff', ink: '#1d1d1f', soft: '#6e6e73' },
  night: { bg: '#07070b', ink: '#f5f5f7', soft: '#a1a1a6' },
  wingwords: { bg: '#f4ecff', ink: '#1a0b2e', soft: '#5b4b75' },
  'gy-accounts': { bg: '#0c0820', ink: '#f2f0f7', soft: '#b3abd0' },
  'heralds-of-chaos': { bg: '#f8f1dc', ink: '#1c1608', soft: '#6b5d3a' },
  // The other side of each product, for its own page (dark ↔ light chapters).
  'wingwords-dark': { bg: '#12061f', ink: '#f4ecff', soft: '#bfaee0' },
  'gy-accounts-light': { bg: '#f0ebff', ink: '#140b33', soft: '#5a5375' },
  'heralds-of-chaos-dark': { bg: '#0d0b06', ink: '#f8f1dc', soft: '#c9bf9f' },
  // Heralds of Chaos' own page: black and bone white, with gold as the only colour.
  'heralds-void': { bg: '#060607', ink: '#f2f0ea', soft: '#9b958a' },
  'heralds-bone': { bg: '#f2f0ea', ink: '#121212', soft: '#5d5a53' },
};

// Per product: [dark tone, light tone] for its page's chapters.
export const PRODUCT_TONES: Record<
  'wingwords' | 'gy-accounts' | 'heralds-of-chaos',
  [ToneKey, ToneKey]
> = {
  wingwords: ['wingwords-dark', 'wingwords'],
  'gy-accounts': ['gy-accounts', 'gy-accounts-light'],
  'heralds-of-chaos': ['heralds-of-chaos-dark', 'heralds-of-chaos'],
};

// Flat chapter bands for each world (dark, light) and the colour of its own action.
export const WORLD_BANDS: Record<
  Exclude<WorldKey, 'gycoding'>,
  { dark: string; light: string; action: string; actionInk: string }
> = {
  wingwords: { dark: '#12061f', light: '#f6f0ff', action: '#7e3fd4', actionInk: '#ffffff' },
  'gy-accounts': { dark: '#0c0820', light: '#f0ebff', action: '#7c3aed', actionInk: '#ffffff' },
  'heralds-of-chaos': {
    dark: '#0d0b06',
    light: '#fbf5e2',
    action: '#d4af37',
    actionInk: '#14100a',
  },
};

export const BRAND_GRADIENT = 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)';

// Public source code of each product (github.com/GY-CODING).
export const PRODUCT_REPOS: Record<'wingwords' | 'gy-accounts' | 'heralds-of-chaos', string> = {
  wingwords: 'https://github.com/GY-CODING/wingwords',
  'gy-accounts': 'https://github.com/GY-CODING/gy-accounts',
  'heralds-of-chaos': 'https://github.com/GY-CODING/heralds-of-chaos-web',
};

// Team member pages: slug → the member's name in utils/locales.ts (team.members), which holds
// their role, description, skills and links in both languages.
export const TEAM_SLUGS: Record<string, string> = {
  'guillermo-figueras': 'Guillermo Figueras',
  'ivan-vicente': 'Iván Vicente',
};
