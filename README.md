# GY Website

![version](https://img.shields.io/badge/version-1.0.21-gold?style=for-the-badge)
[![developer](https://img.shields.io/badge/developed-GYCODING-B833FF?style=for-the-badge)](https://gycoding.com)
[![website](https://img.shields.io/badge/website-link-lightgrey?style=for-the-badge)](https://gycoding.com)

<br>

## Introducción

Este es el sitio web oficial de **GYCODING**: una landing corporativa con presentación de la empresa, el equipo, los productos (Wingwords, GY Accounts, Heralds of Chaos) y las páginas legales (privacidad, cookies, términos). Todo el contenido está disponible en **inglés y español** mediante un sistema de traducción propio.

<br>

## Stack tecnológico

![NextJS](https://img.shields.io/badge/Next%20JS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

- **Next.js 14 (App Router)** exportado como sitio **100% estático** (`output: 'export'` en `next.config.js`, build en `/out`).
- **TypeScript** en todo el código.
- **Material UI (MUI)** para componentes y `ThemeProvider` (modo claro/oscuro).
- **Framer Motion** y **GSAP** para animaciones (fades, parallax, scroll, grid animada de fondo).
- **lottie-react** para las animaciones Lottie (pantalla de carga, ilustraciones de la home y de la 404).
- **js-cookie** para persistir el idioma y el tema elegidos por el usuario.
- Despliegue automático a **GitHub Pages** sobre el dominio `www.gycoding.com` (ver `.github/workflows/deploy.yml`, que reutiliza el workflow `GY-CODING/devops/.github/workflows/next-deploy.yml`).

> Nota: la dependencia `@auth0/nextjs-auth0` está en `package.json` pero **no se usa** en el código actual. El login no se gestiona en este repo: el botón "Login" del header redirige al producto externo **GY Accounts** (`https://accounts.gycoding.com`), que es la plataforma de identidad del ecosistema.

<br>

## Cómo funciona (arquitectura general)

- **`app/layout.tsx`** define los metadatos (`title`, `description`, favicon) y delega todo el render en **`app/RootLayoutClient.tsx`** (componente cliente), que:
  - Muestra una `LoadingScreen` (logo + spinner) durante ~1s mientras se resuelve el tema guardado en `localStorage` o la preferencia del sistema (`prefers-color-scheme`).
  - Envuelve toda la app en `LanguageProvider` (contexto de idioma) y `ThemeProvider` (tema MUI claro/oscuro generado por `createAppTheme`).
  - Renderiza siempre `Header` arriba y `Footer` abajo, con el contenido de cada página (`children`) en medio.
- **Idioma**: `app/utils/languageContext.tsx` expone `useLanguage()` con `language`, `setLanguage` y `t(key)`. El idioma inicial se detecta por cookie (`preferred-language`) o por el idioma del navegador, y se persiste en cookie durante 1 año. `t()` busca claves anidadas (`"about.title"`, `"footer.legal.items.privacy"`, etc.) dentro de `app/utils/locales.ts` (diccionario `en`/`es` con todos los textos del sitio, incluidas las páginas legales y los miembros del equipo).
- **Tema claro/oscuro**: se alterna desde `ThemeToggle` en el header; el modo se guarda en `localStorage` y se aplica a través de MUI (`theme.palette.mode`), que la mayoría de componentes consultan directamente para cambiar colores/fondos.
- **Rutas estáticas**: como el sitio usa `output: 'export'`, todas las rutas (incluida la dinámica `/products/[id]`) se generan en build time con `generateStaticParams`. No hay servidor Node en producción: es HTML/CSS/JS estático servido desde GitHub Pages.
- **Assets**: `app/utils/useImagePath.ts` (`getAssetPath`/`useAssetPath`) antepone `https://www.gycoding.com` a las rutas de imágenes en producción (para que funcionen bien con el export estático y el dominio custom), y las deja relativas en desarrollo.

<br>

## Páginas (rutas)

### `/` — Home (`app/page.tsx`)

Página principal, compuesta por tres secciones:

1. **`AboutSection`** (`app/components/AboutSection.tsx`): hero principal con título/descripción de la empresa (con fragmentos de texto resaltados vía la etiqueta `[company]...[/company]` en las traducciones), una animación Lottie, y dos CTAs: "Documentación" (enlace externo a `docs.gycoding.com`) y "Sobre la compañía" (`/about/company`). Soporta un easter egg: si la URL lleva `?coffee=true`, cambia la animación Lottie a `coffee.json`.
2. **`TechStack`** (`app/components/TechStack.tsx`): grid animado con los logos de las tecnologías que usa GYCODING internamente (Next.js, Vercel, MongoDB, Cloudflare, Dokploy, Spring Boot, Apidog, GitHub, Git, Figma).
3. **`ModularSection`** (`app/components/ModularSection/ModularSection.tsx`): tarjetas de los **servicios** que ofrece GYCODING (Desarrollo Web, Backend, Desarrollo de videojuegos), cada una con su stack asociado. En móvil cambia a un carrusel (`MobileServices`); en desktop usa `ModuleCard` con animación ligada al scroll (`useScroll` de Framer Motion).

### `/about/company` (`app/about/company/page.tsx`)

Página "Sobre la empresa": hero con título/descripción, un bloque narrativo ("historia" de la compañía en dos párrafos) y una grid de **valores** (`company.values.items` en las traducciones), cada uno con icono, título y descripción, animados al entrar en viewport.

### `/about/team` (`app/about/team/page.tsx`)

Página de equipo: lista los miembros (`team.members` en las traducciones) en tarjetas con foto, rol, descripción, skills (chips) y enlaces sociales (GitHub, LinkedIn, email, portfolio) vía `SocialIcon`.

### `/products/[id]` (`app/products/[id]/page.tsx` + `ProductPageClient`)

Ruta **dinámica** compartida por los tres productos (`wingwords`, `gy-accounts`, `heralds-of-chaos`). `generateStaticParams` pre-genera las tres páginas en build time a partir de `PRODUCT_ORDER` (`app/products/data/products.ts`). Toda la info de cada producto (nombre, tagline, descripción, logo, colores/gradientes del tema, features, tech stack, sección de perfil, URL de la app externa) vive en ese fichero de datos; el resto de la página es solo renderizado:

- **`ProductHero`**: logo, nombre, tagline y CTA que lleva a la app real del producto (`appUrl`, p. ej. `wingwords.gycoding.com`).
- **`ProductPreview`**: captura/imagen de la app.
- **`ProductProfileSection`**: sección opcional (`profileSection`) con highlights (solo Wingwords la usa).
- **`ProductFeatures`**: grid de características del producto.
- **`ProductTechStack`**: badges con el stack usado para construirlo.
- **`ProductCTA`**: llamada a la acción final hacia la app.

Cada producto tiene su propia paleta/gradiente (`theme.gradient`, etc.) aplicada al fondo cuando el tema global está en modo oscuro; en modo claro se usa fondo blanco. No existe un `/products` índice: el único acceso es vía el menú desplegable del header o enlaces directos.

### `/privacy`, `/terms`, `/cookies`

Tres páginas legales con estructura idéntica (`Container` + `Paper` de MUI, con secciones y listas), cuyo contenido completo (título, fecha de última actualización, secciones) proviene íntegramente de `locales.ts` bajo las claves `privacy`, `terms` y `cookies`. No hay lógica más allá de renderizar el texto traducido.

### `not-found` (404) (`app/not-found.tsx`)

Página de error 404 con una animación Lottie (`not_found.json`), mensaje y botón para volver al inicio.

<br>

## Componentes globales (layout compartido)

- **`Header`** (`app/components/Header.tsx`): barra fija superior con logo, menú de navegación (`Products`, `Docs`, `About`, generado dinámicamente según el idioma por `app/utils/menuItems.ts`), selector de idioma, toggle de tema y botón de login (redirige a `accounts.gycoding.com`). En desktop el menú despliega un **`FloatingMenu`** con submenús al hacer hover; en móvil se sustituye todo por un botón de hamburguesa que abre **`MobileMenu`**.
- **`Footer`** (`app/components/Footer/Footer.tsx`): logo + descripción de la empresa, enlaces a secciones de la home, a los productos, a "About" y a las páginas legales, iconos de redes sociales (GitHub, X, Discord, email de contacto, foro de soporte) y copyright con el año actual.
- **`LanguageSelector`**: cambia entre `en`/`es` (persistido en cookie).
- **`ThemeToggle`**: alterna claro/oscuro (persistido en `localStorage`).
- **`LoadingScreen`**: splash inicial con logo + spinner mientras se resuelve el tema guardado.
- **Animaciones reutilizables** (`app/components/animations/`): `FadeIn`, `ParallaxScroll`, `AnimatedBackground`, `FlowingGrid` — usadas por varias páginas para dar entrada a los bloques de contenido al hacer scroll.

<br>

## Scripts disponibles

| Script                                                                  | Descripción                                                                                 |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev`                                                           | Levanta el servidor de desarrollo de Next.js                                                |
| `npm run build`                                                         | Genera el export estático en `/out`                                                         |
| `npm run start`                                                         | Sirve el build (modo Next server, uso puntual)                                              |
| `npm run lint`                                                          | ESLint con `--fix`                                                                          |
| `npm run format`                                                        | Prettier sobre todo el repo                                                                 |
| `npm run release` / `release:minor` / `release:major` / `release:patch` | Versionado con `standard-version` (actualiza `CHANGELOG.md` y la versión en `package.json`) |

<br>

## Despliegue

Cada push a `master` dispara `.github/workflows/deploy.yml`, que delega en el workflow reutilizable `next-deploy.yml` del repo `GY-CODING/devops` para construir el export estático y publicarlo en GitHub Pages bajo el dominio `www.gycoding.com`.

<br>

## Creators

|                                                                                       Product Owner                                                                                        |                                                                               Collaborators                                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/gy-gfigueras.png?size=115" width=115> <br> [![gfigueras](https://img.shields.io/badge/gfigueras-B833FF?style=for-the-badge)](https://github.com/gy-gfigueras) | <img src="https://github.com/gy-toxyc.png?size=115" width=115> <br> [![toxyc](https://img.shields.io/badge/toxyc-yellow?style=for-the-badge)](https://github.com/gy-toxyc) |

<pre align="center"><b>GYCODING 2025</b></pre>
