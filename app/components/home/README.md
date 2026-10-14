# Sistema visual (refactor "home")

Componentes del refactor visual de la web. Nacieron para la home (`app/page.tsx`), pero ya se reutilizan en `/about/company` y `/about/team`. **Este es el kit a usar al rediseñar cualquier otra página.**

Todos son componentes cliente (`'use client'`), se apoyan en MUI (`sx`, `useTheme`) + Framer Motion, y respetan `prefers-reduced-motion` (`useReducedMotion`) en todo lo que se anima en bucle o sigue al cursor.

---

## Tokens de diseño (de facto)

No hay un fichero de tokens: los valores están repetidos en los componentes. Para mantener coherencia, usa estos:

| Token | Valor |
| --- | --- |
| Índigo | `#6366f1` |
| Rosa | `#ec4899` |
| Violeta marca | `#8C54FF` |
| Gradiente principal (texto, CTAs, indicadores) | `linear-gradient(135deg, #6366f1 0%, #ec4899 100%)` |
| Gradiente titular animado | `linear-gradient(90deg, #6366f1 0%, #ec4899 35%, #8C54FF 70%, #6366f1 100%)` |
| Fuente títulos / UI | `lexendFont` (`app/utils/fonts`) |
| Fuente marca `[company]` | `valorantFont` |
| Texto secundario | `isDark ? 'grey.300' : 'grey.700'` (terciario: `grey.400` / `grey.600`) |
| Superficie tarjeta | `isDark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)'` + `backdropFilter: 'blur(10px)'` |
| Borde tarjeta | `isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'` |
| Sombra tarjeta | `isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.08)'` |
| Radios | tarjetas `24px`–`28px`, sub-bloques/imágenes `20px`, botones `14px`, chips `8px`–`10px`, badges `999px` |
| Superficie "glass" | `isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)'` + `blur(10px)` |

Helper de texto en gradiente: `gradientTextStyles(gradient)` en `app/utils/styles.ts` (es lo único que queda en ese fichero).

---

## Componentes

### `AuroraBackground`
Fondo decorativo de página/sección.

| Prop | Tipo | Default |
| --- | --- | --- |
| `colors` | `[string, string, string]` (hex de 6 dígitos) | `['#6366f1', '#ec4899', '#8C54FF']` |

Los tres colores tiñen los blobs; el primero también la rejilla en modo claro y el tercero el spotlight. En producto se pasa `[primary, accent, secondary]` del tema del producto.

- 3 blobs difuminados (índigo, rosa, violeta) que se mueven en bucle.
- Suelo de rejilla en perspectiva en el 42% inferior.
- Spotlight radial que sigue al ratón (solo con `pointer: fine` y sin reduced motion).
- Capa de ruido SVG.
- Todo el componente lleva un `mask-image` que lo desvanece a transparente en el 35% inferior, así que se funde con cualquier fondo (también con los gradientes de producto).

Es `position: absolute; inset: 0; zIndex: 0; pointerEvents: none`, así que **el padre debe ser `position: relative`** y el contenido debe ir encima con `position: relative; zIndex: 1`:

```tsx
<Box component="main" sx={{ position: 'relative', overflowX: 'hidden', ... }}>
  <AuroraBackground />
  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>…</Container>
</Box>
```

### `EyebrowBadge`
Píldora pequeña con punto pulsante en gradiente, encima de cada título de sección. Hace fade-in al entrar en viewport.

```tsx
<EyebrowBadge>{t('company.eyebrow')}</EyebrowBadge>
<EyebrowBadge accent={product.theme.textGradient}>Features</EyebrowBadge>
```

- `children: string` (solo texto).
- `accent?: string`: color o gradiente del punto pulsante (default `linear-gradient(135deg, #6366f1, #ec4899)`).
- Es `inline-flex`: para centrarla, envuélvela en `<Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>`.
- Convención: cada sección tiene su clave `*.eyebrow` en `locales.ts` (en **en** y **es**).

### `AnimatedGradientHeadline`
Titular que entra palabra a palabra (stagger 0.08s) y con el gradiente desplazándose en bucle (7s).

| Prop | Tipo | Default |
| --- | --- | --- |
| `text` | `string` | — |
| `component` | `'h1' \| 'h2'` | `'h1'` |
| `sx` | `SxProps<Theme>` | — |
| `delayStart` | `number` (s) | `0.15` |
| `gradient` | `string` CSS | `linear-gradient(90deg, #6366f1 0%, #ec4899 35%, #8C54FF 70%, #6366f1 100%)` |

La fuente se puede sobrescribir en `sx` (en producto el nombre usa `valorantFont`). Ya aplica `lexendFont`, `fontWeight: 700` y `letterSpacing: -0.02em`; en `sx` normalmente solo se pasan `fontSize`, `lineHeight`, `mb`, `textAlign`. Tamaños usados:
- h1 de página: `{ xs: '2.5rem', sm: '3.5rem', md: '4.2rem' }`, `lineHeight: 1.08`
- h2 de sección: `{ xs: '2rem', sm: '2.5rem', md: '3rem' }`

> Anima con `animate` (no `whileInView`), así que se dispara al montar. Para h2 muy abajo en la página la animación de entrada ya habrá pasado al llegar; si importa, envuélvelo en un `motion.div` con `whileInView`.

### `TiltCard`
Wrapper que inclina en 3D su contenido según la posición del ratón (spring), y vuelve a plano al salir.

| Prop | Tipo | Default |
| --- | --- | --- |
| `children` | `ReactNode` | — |
| `maxTilt` | `number` (grados) | `10` |
| `fullHeight` | `boolean` (aplica `height: 100%`, para tarjetas de igual altura en un grid) | `false` |
| `className` | `string` | — |

Valores usados: `3` bloques muy grandes (CTA, capturas anchas), `4`–`5` tarjetas grandes / mockups, `6` tarjetas medianas (valores, features), `14` tiles pequeños (tech stack, logo de producto). No aplica estilos propios: la tarjeta visual va dentro.

### `GlassTile`
Cuadrado de vidrio esmerilado con un "chip" interior en gradiente que contiene un icono.

| Prop | Tipo | Default |
| --- | --- | --- |
| `icon` | `ReactNode` (icono MUI con `fontSize="inherit"`, emoji en `<span>`…) | — |
| `gradient` | `string` CSS | — |
| `size` | `number` px | `72` |
| `radius` | `number` px | `size * 0.28` |

El tamaño del icono escala con `size` (`fontSize: size * 0.3`).

### `Hero3DVisual`
Composición del hero: tarjeta glass central con una animación Lottie (+ brillo que la barre cada ~7s), dos `GlassTile` flotantes y un glow, todo con parallax por capas según el ratón.

- Prop: `lottieUrl: string`.
- Ocupa el 100% de su contenedor: el padre debe dar altura (`{ xs: 320, sm: 380, md: 480 }` en el hero).
- Los tiles sobresalen un poco a propósito → el padre necesita `overflowX: 'hidden'`.

### `Hero`
Sección hero de la home (`/`). Dos columnas (texto | `Hero3DVisual`), apila en móvil.
- Eyebrow + `AnimatedGradientHeadline` (`about.title`) + dos párrafos con soporte `[company]…[/company]` + 2 CTAs (Docs externo con gradiente, "Sobre la compañía" glass).
- Al hacer scroll el contenido se desvanece, sube y escala (`useScroll` sobre la sección) y aparece/desaparece un indicador de "scroll".
- Easter egg conservado: `?coffee=true` cambia la Lottie a `/lottie/coffee.json`.
- Sirve de **referencia para los botones** del nuevo estilo (primario gradiente y secundario glass, `borderRadius: 14px`, `px: 4, py: 1.8`, `whileHover={{ y: -2 }}`, `whileTap={{ scale: 0.97 }}`).

### `TechStackGrid`
Sección `#tech-stack`. Cabecera (eyebrow + h2 en gradiente + descripción, claves `techStack.*`) y grid responsive (2/3/4/5 columnas) de tecnologías.
- Entrada en stagger con spring; cada tile flota en bucle y va dentro de un `TiltCard`.
- En hover el borde y la sombra toman el color de marca de la tecnología (`color` en el array `technologies`).
- Iconos vía `getAssetPath`, invertidos en blanco en modo oscuro.

### `ServicesShowcase` (`app/components/ModularSection/ServicesShowcase.tsx`)
Sección `#modular-section` con los 3 servicios (Web, Backend, Game Dev; claves `services.*`).
- **Desktop (≥600px):** la sección se *pinea* con GSAP ScrollTrigger durante `(n-1) × 100vh` y las slides rotan en 3D (`rotateY`/`z`) ligadas al scroll. Fondo radial tintado con el color de la slide activa e indicadores de progreso.
- **Móvil:** lista de tarjetas con fade-in.
- Ambas variantes **están siempre montadas** y se alternan solo por CSS. No cambiarlo por un render condicional con breakpoint de React: el pin de GSAP modifica el DOM (pin-spacer) y desmontarlo desde React rompe. Por la misma razón el pin vive dentro de `gsap.matchMedia()`.

---

## Hooks

### `useSmoothScroll` (`app/hooks/useSmoothScroll.ts`)
Activa **Lenis** (scroll suave) a nivel global; se llama una vez en `RootLayoutClient`. Lenis se sincroniza con el ticker de GSAP y llama a `ScrollTrigger.update` en cada scroll, así que los ScrollTrigger y el `useScroll` de Framer funcionan con normalidad. Se desactiva con `prefers-reduced-motion`.

`getLenis()` devuelve la instancia (o `null`). Úsalo para scroll programático en vez de `scrollIntoView`, como hace `SmartLink`:

```ts
const lenis = getLenis();
lenis ? lenis.scrollTo(el, { offset: -90, duration: 1.2 }) : el.scrollIntoView({ behavior: 'smooth' });
```

(`offset: -90` compensa el header fijo.)

---

## Receta para rediseñar una página

Patrón seguido en `app/about/company/page.tsx` y `app/about/team/page.tsx`:

1. **Contenedor raíz**
   ```tsx
   <Box component="main" sx={{
     minHeight: '100vh', position: 'relative', overflowX: 'hidden',
     pt: { xs: '112px', sm: '120px', md: '128px' },   // hueco para el header fijo
     pb: { xs: 10, md: 14 },
   }}>
     <AuroraBackground />
     <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>…</Container>
   </Box>
   ```
2. **Cabecera de página** centrada (`maxWidth: 760`, `mb: { xs: 8, md: 12 }`): `EyebrowBadge` → `AnimatedGradientHeadline` h1 → párrafo en texto secundario (`lineHeight: 1.6`).
3. **Secciones internas**: misma cabecera pero con h2 (`AnimatedGradientHeadline component="h2"` o `Typography` h2 con `gradientTextStyles`).
4. **Tarjetas**: superficie/borde/sombra de la tabla de tokens, envueltas en `TiltCard` y con entrada `motion.div` `initial={{ opacity: 0, y: 30 }}` `whileInView={{ opacity: 1, y: 0 }}` `viewport={{ once: true }}` y `delay: index * 0.1`.
5. **Iconos destacados**: `GlassTile` rotando entre gradientes de la paleta (ver `VALUE_GRADIENTS` en company).
6. **Textos nuevos**: añadir `eyebrow` (y lo que haga falta) en la interfaz `Locale` **y** en ambos idiomas de `app/utils/locales.ts`.
7. **Texto de marca**: `[company]GyCODING[/company]` se renderiza con un `renderStyledText` local (está duplicado en `Hero` y en company; si se necesita una tercera vez, merece extraerlo a `utils`).

---

## Qué se eliminó en el refactor

- Home antigua: `AboutSection`, `TechStack`, `ModularSection` (`ModularSection`, `ModuleCard`, `AnimatedGrid`, `MobileServices`) y `app/utils/services.ts`.
- Animaciones antiguas: `app/components/animations/*` (`FadeIn`, `ParallaxScroll`, `AnimatedBackground`, `FlowingGrid`) — la carpeta queda vacía.
- En `app/utils/styles.ts`: `cardStyles`, `iconStyles`, `smallIconStyles`. En `app/utils/animations.ts`: `springTransition`, `fadeInScaleVariants`, `iconSpringVariants`.

Restos sin uso tras el refactor: `fadeInUpVariants` (`app/utils/animations.ts`) y `app/hooks/useScrollAnimation.ts` no se importan desde ningún sitio.

## Páginas de producto (`/products/[id]`)

Rediseñadas con el mismo kit, pero **manteniendo la paleta propia de cada producto** (`product.theme` en `app/products/data/products.ts`). Regla: donde el kit usa índigo/rosa, en producto se usa `product.theme.textGradient` / `primary` / `accent` / `secondary`.

- `ProductHero`: `AuroraBackground` tintado, logo glass con `TiltCard` y flotación, `EyebrowBadge` "A GYCODING product", nombre con `AnimatedGradientHeadline` (Valorant + gradiente del producto), botones del nuevo estilo, efecto de scroll con escala (`useHeroScroll` devuelve ahora también `scale` y `cueOpacity`) y "Ver más" con Lenis.
- `ProductPreview` / `ProductProfileSection`: `EyebrowBadge`, mockups en `TiltCard` (+ glow del color del producto detrás en Preview), highlights con `GlassTile`.
- `ProductFeatures` / `FeatureCard`: tarjetas con superficie del kit, `TiltCard fullHeight` y el emoji dentro de un `GlassTile`.
- `ProductTechStack`: `EyebrowBadge` traducido ("Built with" / "Construido con") y badges con flotación en bucle.
- `ProductCTA`: `AuroraBackground` tintado, tarjeta en `TiltCard`, titular animado y botón del nuevo estilo.
- Eliminados `shared/FloatingOrb.tsx` y `shared/SectionBadge.tsx` (sustituidos por `AuroraBackground` y `EyebrowBadge`).

## Páginas legales (`/privacy`, `/terms`, `/cookies`)

Las tres usan `app/components/legal/LegalPageLayout.tsx`; cada página solo traduce su bloque de `locales.ts` a un array de `LegalSection` (`{ id, title, intro?, content?, items?, outro? }`; `items` acepta strings o `{ primary, secondary }`).

- Aurora suave (`intensity={0.6}`) solo detrás de la cabecera, para que el texto se lea sobre fondo tranquilo.
- Cabecera: `EyebrowBadge` ("Legal"), `AnimatedGradientHeadline`, fecha de actualización y un selector para saltar entre los tres documentos.
- Desktop: índice lateral *sticky* que resalta la sección visible (IntersectionObserver) y hace scroll con Lenis. El `main` usa `overflowX: 'clip'` (no `hidden`, que rompería el sticky).
- Cada sección es una tarjeta con su número (extraído del título del locale, p. ej. `"3. …"`) en un badge con gradiente.
- Tarjeta final de contacto (`mailto:it@gycoding.com`). Textos en `legalPage.*` de `locales.ts`.

## Header (`app/components/Header.tsx`)

- Altura fija de **64px** (todas las páginas dependen de ella para su `pt` y el offset de scroll). Transparente arriba; al hacer scroll o con un menú abierto pasa a cristal.
- El cristal va en un `::before`, **no** en el propio header: `backdrop-filter` (igual que `transform`/`will-change: transform`) convertiría al header en el containing block de los paneles `fixed` (`FloatingMenu`, `MobileMenu`) y los descolocaría.
- Barra de progreso de scroll con gradiente en el borde inferior.
- `menuItem.tsx`: pastilla de hover compartida (`layoutId="nav-hover-pill"`), flecha en grupos y punto de gradiente si alguna ruta hija está activa.
- `FloatingMenu`: panel de cristal animado; el centrado usa `style={{ x: '-50%' }}` para no pisar la animación de `y`. El cierre por hover lo gestiona el `onMouseLeave` del header.
- `MobileMenu`: panel con backdrop, acordeón animado y `data-lenis-prevent` para que Lenis no capture su scroll.
- `ThemeToggle` / `LanguageSelector` / burger comparten `glassIconButtonSx` y las constantes de `headerStyles.ts` (`LOGIN_URL`, `BRAND_GRADIENT`).

## Footer (`app/components/Footer/Footer.tsx`)

- Línea fina con gradiente arriba + brillo radial suave; fondo semitransparente con blur.
- Columna de marca (logo + nombre en su caja con gradiente suave, como el footer original; descripción con `[company]`, `SocialIcon` como botones glass con tooltip) + 4 columnas de enlaces (`SmartLink`, que mantiene el subrayado en gradiente y el scroll con Lenis para `/#…`).
- Barra inferior con copyright y botón "Volver arriba" (`footer.backToTop`, usa `getLenis().scrollTo(0)`).
- Las entradas usan `whileInView` (con `animate` se reproducían al cargar la página, fuera de pantalla).

## Páginas aún con el estilo anterior

- `not-found` (404)
