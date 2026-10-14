# GYCODING — Guía de estilos de la suite

Esta guía recoge el lenguaje visual de **www.gycoding.com** para que cualquier producto de la suite (Wingwords, GY Accounts, Heralds of Chaos, docs, paneles internos…) se vea como parte de la misma familia.

- Es **agnóstica de framework**: los valores sirven para CSS puro, Tailwind, MUI o cualquier otra librería. Al final hay snippets listos para copiar ([§9](#9-implementación-copiar-y-pegar)).
- La implementación de referencia está en este repo (Next.js + MUI + Framer Motion). Ver [`app/components/home/README.md`](app/components/home/README.md) para la API de cada componente.

---

## 1. Principios

1. **Oscuro primero, claro igual de cuidado.** Todo componente define sus dos variantes; nunca un color fijo que solo funcione en uno de los dos modos.
2. **Cristal sobre aurora.** Fondos con luz difusa de color (aurora) y, encima, superficies translúcidas con blur (glass). Nada de bloques planos opacos.
3. **El gradiente es la firma.** Índigo → rosa (`#6366f1 → #ec4899`) aparece en titulares, CTAs primarios, indicadores activos y acentos. Úsalo con intención: un foco por bloque.
4. **Movimiento suave y con propósito.** Entradas al hacer scroll, hover con elevación o tilt, nada que se mueva en bucle sin motivo. Siempre respetar `prefers-reduced-motion`.
5. **Mucho aire.** Secciones con padding vertical generoso, textos con `line-height` amplio y anchos de lectura acotados.

---

## 2. Color

### 2.1 Marca

| Token               | Hex       | Uso                                                                  |
| ------------------- | --------- | -------------------------------------------------------------------- |
| `brand-indigo`      | `#6366f1` | Inicio del gradiente, sombras de CTA, foco                           |
| `brand-pink`        | `#ec4899` | Final del gradiente, acentos                                         |
| `brand-violet`      | `#8C54FF` | Violeta GYCODING: hover de bordes, iconos activos, texto `[company]` |
| `brand-violet-dark` | `#6B40CC` | Estado pressed / variante oscura                                     |

### 2.2 Gradientes

| Token                 | Valor                                                                                                        | Uso                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `gradient-brand`      | `linear-gradient(135deg, #6366f1 0%, #ec4899 100%)`                                                          | CTAs primarios, texto en gradiente, indicadores activos, badges numéricos |
| `gradient-headline`   | `linear-gradient(90deg, #6366f1 0%, #ec4899 35%, #8C54FF 70%, #6366f1 100%)`                                 | Titulares animados (`background-size: 200%`, desplazamiento en bucle 7s)  |
| `gradient-hairline`   | `linear-gradient(90deg, transparent 0%, rgba(99,102,241,.6) 30%, rgba(236,72,153,.6) 70%, transparent 100%)` | Línea de 1px separadora (borde superior del footer)                       |
| `gradient-tint-dark`  | `linear-gradient(135deg, rgba(99,102,241,.15) 0%, rgba(236,72,153,.10) 100%)`                                | Tarjetas destacadas (contacto) en oscuro                                  |
| `gradient-tint-light` | `linear-gradient(135deg, rgba(99,102,241,.08) 0%, rgba(236,72,153,.06) 100%)`                                | Ídem en claro                                                             |

Valores alternativos para rotar en iconos/tiles: `#6366f1→#8C54FF`, `#ec4899→#8C54FF`, `#8C54FF→#ec4899`.

### 2.3 Fondos de página

|              | Claro     | Oscuro    |
| ------------ | --------- | --------- |
| `bg-default` | `#ffffff` | `#121212` |
| `bg-paper`   | `#ffffff` | `#1e1e1e` |

### 2.4 Texto

| Token                                       | Claro                 | Oscuro    |
| ------------------------------------------- | --------------------- | --------- |
| `text-primary`                              | `#000000` / `#212121` | `#ffffff` |
| `text-secondary` (párrafos)                 | `#616161`             | `#e0e0e0` |
| `text-tertiary` (descripciones, metadatos)  | `#757575`             | `#bdbdbd` |
| `text-muted` (labels de sección, copyright) | `#757575`             | `#9e9e9e` |

### 2.5 Superficies (glass)

| Token                                        | Claro                        | Oscuro                     | Blur                        |
| -------------------------------------------- | ---------------------------- | -------------------------- | --------------------------- |
| `surface-card`                               | `rgba(255,255,255,0.9)`      | `rgba(17,17,17,0.8)`       | `blur(10px)`                |
| `surface-glass` (botones, badges, controles) | `rgba(255,255,255,0.7)`      | `rgba(255,255,255,0.04)`   | `blur(10px)`                |
| `surface-glass-strong` (tiles de icono)      | `rgba(255,255,255,0.75)`     | `rgba(255,255,255,0.06)`   | `blur(14px)`                |
| `surface-overlay` (header al hacer scroll)   | `rgba(255,255,255,0.75)`     | `rgba(10,10,14,0.7)`       | `blur(16px) saturate(160%)` |
| `surface-popover` (desplegables, menús)      | `rgba(255,255,255,0.9–0.95)` | `rgba(14,14,20,0.85–0.92)` | `blur(20px) saturate(160%)` |
| `surface-subtle` (ítems de lista, chips)     | `rgba(99,102,241,0.04)`      | `rgba(255,255,255,0.03)`   | —                           |
| `surface-hover`                              | `rgba(0,0,0,0.05)`           | `rgba(255,255,255,0.08)`   | —                           |
| `surface-hover-brand`                        | `rgba(140,84,255,0.06)`      | `rgba(140,84,255,0.10)`    | —                           |

### 2.6 Bordes

| Token                                | Claro                   | Oscuro                        |
| ------------------------------------ | ----------------------- | ----------------------------- |
| `border-default`                     | `rgba(0,0,0,0.08–0.10)` | `rgba(255,255,255,0.10)`      |
| `border-subtle`                      | `rgba(0,0,0,0.06)`      | `rgba(255,255,255,0.06–0.08)` |
| `border-strong` (badges, controles)  | `rgba(0,0,0,0.10)`      | `rgba(255,255,255,0.15)`      |
| `border-hover`                       | `rgba(140,84,255,0.5)`  | `rgba(140,84,255,0.5)`        |
| `border-brand` (tarjetas destacadas) | `rgba(140,84,255,0.2)`  | `rgba(140,84,255,0.3)`        |

Siempre **1px** (1.5px en botones secundarios).

### 2.7 Sombras

| Token                            | Claro                                    | Oscuro                              |
| -------------------------------- | ---------------------------------------- | ----------------------------------- |
| `shadow-card`                    | `0 20px 60px rgba(0,0,0,0.06–0.08)`      | `0 20px 60px rgba(0,0,0,0.35–0.45)` |
| `shadow-popover`                 | `0 30px 80px -20px rgba(0,0,0,0.2)`      | `0 30px 80px -20px rgba(0,0,0,0.7)` |
| `shadow-header`                  | `0 10px 30px -15px rgba(0,0,0,0.12)`     | `0 10px 30px -15px rgba(0,0,0,0.6)` |
| `shadow-cta` (CTA con gradiente) | `0 10px 30px -8px rgba(99,102,241,0.6)`  | ídem                                |
| `shadow-cta-sm`                  | `0 8px 24px -8px rgba(99,102,241,0.6)`   | ídem                                |
| `shadow-glow-tile`               | `0 20px 45px -12px rgba(99,102,241,0.4)` | ídem                                |
| `shadow-hover-brand`             | `0 10px 25px -10px rgba(140,84,255,0.6)` | ídem                                |

Las sombras de color se tiñen con el color del elemento: `0 20px 50px -15px <color>@30–45%`.

### 2.8 Paletas de producto (sub-marcas)

Cada producto **conserva el sistema** pero sustituye índigo/rosa por su paleta. Regla: donde la web usa `gradient-brand` → `textGradient` del producto; donde usa `#8C54FF`/`#6366f1` → `primary`; los fondos de aurora usan `[primary, accent, secondary]`.

| Producto             | primary   | secondary | accent    | textGradient                          | Fondo oscuro                          | Fondo claro                                               |
| -------------------- | --------- | --------- | --------- | ------------------------------------- | ------------------------------------- | --------------------------------------------------------- |
| **Wingwords**        | `#9c5fe5` | `#6d28d9` | `#c084fc` | `135deg, #e879f9 → #818cf8`           | `160deg, #0d0019 → #1a0533 → #0a001a` | `160deg, #ffffff → #fdf4ff → #f0e8ff` · sección `#f6f0ff` |
| **GY Accounts**      | `#8C54FF` | `#6d28d9` | `#a855f7` | `135deg, #a855f7 → #6366f1`           | `160deg, #0a0020 → #1a0045 → #050010` | `160deg, #ffffff → #f8f4ff → #ede7ff` · sección `#f3eeff` |
| **Heralds of Chaos** | `#D4AF37` | `#8B6914` | `#FFD700` | `135deg, #FFD700 → #D4AF37 → #c49a10` | `160deg, #050400 → #12100a → #000000` | `160deg, #fffef8 → #fffcec → #fef6cc` · sección `#fdf8e7` |

Fuente de verdad: `app/products/data/products.ts`. Un producto nuevo debe definir los mismos campos (`primary`, `secondary`, `accent`, `gradient`, `heroBg`, `textGradient`, `lightGradient`, `lightSectionBg`).

Transparencias en hex sobre `primary` usadas habitualmente: `18` (≈9%) rejillas, `22` (≈13%) bordes suaves, `33`–`44` bordes/glow, `55`–`66` sombras de glow, `99` sombra de CTA.

---

## 3. Tipografía

| Familia      | Uso                                                                                             | Origen                                  |
| ------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Lexend**   | Toda la interfaz: titulares, cuerpo, botones, navegación                                        | Google Fonts (`next/font/google`)       |
| **Valorant** | Solo marca: wordmark "GYCODING", nombres de producto en hero, fragmentos `[company]…[/company]` | Local: `public/fonts/Valorant Font.ttf` |

Nunca usar Valorant para párrafos ni UI.

### Escala

| Rol                           | Tamaño (xs → md/lg)                      | Peso    | Interlineado | Extra                                               |
| ----------------------------- | ---------------------------------------- | ------- | ------------ | --------------------------------------------------- |
| Display / h1 hero             | `2.6rem → 4.1rem → 4.6rem`               | 700     | 1.08         | `letter-spacing: -0.02em`, gradiente animado        |
| h1 de página                  | `2.5rem → 3.5rem → 4.2rem`               | 700     | 1.08         | gradiente animado                                   |
| Nombre de producto (Valorant) | `3rem → 4.5rem → 6rem`                   | 700     | 1.05         | `letter-spacing: 0.04em`                            |
| h2 de sección                 | `2rem → 2.5rem → 3rem`                   | 600–700 | 1.2          | gradiente                                           |
| h3 / título de tarjeta        | `1.2rem → 1.5rem` (grandes hasta `2rem`) | 600     | 1.3          |                                                     |
| Lead (intro bajo h1)          | `1.05rem → 1.25rem`                      | 400     | 1.6–1.7      | `text-secondary`, máx. 520–760px                    |
| Cuerpo                        | `0.95rem → 1.1rem`                       | 400     | 1.7–1.8      | `text-secondary`                                    |
| Cuerpo pequeño                | `0.85rem → 0.9rem`                       | 400     | 1.5–1.7      | `text-tertiary`                                     |
| Botón                         | `0.9rem → 1.05rem`                       | 600     | —            | sin `text-transform`                                |
| Eyebrow / badge               | `0.8rem`                                 | 600     | —            | `letter-spacing: 0.02em`                            |
| Label de sección (overline)   | `0.75rem`                                | 600     | —            | `UPPERCASE`, `letter-spacing: 0.08em`, `text-muted` |

**Texto en gradiente:**

```css
background: <gradiente>;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 4. Espaciado, layout y forma

- **Unidad base 8px** (equivale al `spacing` de MUI: `1 = 8px`).
- **Contenedor:** máx. `1200px` (`lg`), padding lateral 16px (xs) / 24–32px (sm+). Textos centrados de cabecera: máx. `720–760px`.
- **Secciones:** padding vertical `80px` (xs) / `112px` (md). CTA finales hasta `144px`.
- **Header fijo de 64px.** El primer bloque de cada página reserva `112px` (xs) / `120px` (sm) / `128px` (md) de padding superior. Anclas y scroll programático: offset `-90px`.
- **Breakpoints** (MUI): `xs 0`, `sm 600`, `md 900`, `lg 1200`, `xl 1536`. Navegación desktop desde `md`.

### Radios

| Token         | Valor         | Uso                                                  |
| ------------- | ------------- | ---------------------------------------------------- |
| `radius-xs`   | `8px`         | Chips de skill, pequeños                             |
| `radius-sm`   | `10–12px`     | Ítems de menú, botones de icono (40×40), tabs        |
| `radius-md`   | `14px`        | **Botones**, ítems de lista, tiles medianos          |
| `radius-lg`   | `16–20px`     | Popovers, imágenes dentro de tarjetas, tiles de tech |
| `radius-xl`   | `24px`        | **Tarjetas**                                         |
| `radius-2xl`  | `28–32px`     | Tarjetas grandes, bloques narrativos, CTA            |
| `radius-pill` | `999px`       | Eyebrow badges                                       |
| GlassTile     | `size × 0.28` | Interior: `radius × 0.6`                             |

### Capas (z-index)

| Capa                                  | z-index |
| ------------------------------------- | ------- |
| Fondos decorativos (aurora, rejillas) | `0`     |
| Contenido                             | `1`     |
| Desplegable desktop                   | `999`   |
| Header / menú móvil                   | `1000`  |

---

## 5. Movimiento

### Curvas y duraciones

| Token            | Valor                               | Uso                               |
| ---------------- | ----------------------------------- | --------------------------------- |
| `ease-out-expo`  | `cubic-bezier(0.16, 1, 0.3, 1)`     | Entradas de titulares, reveals    |
| `ease-back`      | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Pop de logos                      |
| `ease-standard`  | `ease` / `easeOut`                  | Hover, transiciones de color      |
| `dur-fast`       | `0.18–0.2s`                         | Hover, apertura de menús          |
| `dur-base`       | `0.5–0.6s`                          | Reveal de bloques al hacer scroll |
| `dur-slow`       | `0.7–0.8s`                          | Titulares, imágenes grandes       |
| `spring-ui`      | `stiffness 400, damping 32`         | Pastilla de navegación            |
| `spring-tilt`    | `stiffness 200, damping 20`         | Tilt 3D de tarjetas               |
| `spring-pointer` | `stiffness 60–120, damping 20–22`   | Elementos que siguen al cursor    |

### Patrones

- **Reveal al entrar en viewport:** `opacity 0 → 1`, `translateY 24–30px → 0`, `0.5–0.6s`, una sola vez. Listas: `stagger` de `0.05–0.1s` por ítem.
- **Titular palabra a palabra:** cada palabra `opacity 0, y 60% → 1, 0`, `0.7s`, `ease-out-expo`, `stagger 0.08s`.
- **Hover de botón:** `translateY(-2px)`; tap `scale(0.97)`.
- **Hover de tarjeta:** tilt 3D (`perspective 800px`, máx. 3–6° en tarjetas, 14° en tiles pequeños) o `translateY(-3px)`; borde pasa a `border-hover` o al color del elemento.
- **Scroll del hero:** el contenido se desvanece, sube 80px y escala a `0.94` al salir.
- **Bucles** (blobs de aurora 20–28s, gradiente del titular 7s): solo decoración de fondo, nunca en elementos que el usuario tenga que leer o pulsar. Evitar decenas de elementos flotando a la vez (coste de rendimiento).
- **Delays de stagger solo en la entrada**, nunca en el `transition` compartido con el hover (provoca que unos elementos reaccionen más lentos que otros).
- **Scroll suave:** Lenis, `duration 1.1`, easing `t => min(1, 1.001 - 2^(-10t))`, sincronizado con GSAP ScrollTrigger.
- **Accesibilidad:** con `prefers-reduced-motion: reduce` se desactivan bucles, tilt, seguimiento del cursor y Lenis.

---

## 6. Componentes

Recetas en términos de los tokens anteriores. Implementación de referencia entre paréntesis.

### 6.1 Fondo aurora (`AuroraBackground`)

Capa absoluta detrás del hero o la cabecera de página:

1. 3 blobs circulares (`[indigo, pink, violet]` o la paleta del producto), `55/45/42vw`, `filter: blur(90px)`, opacidad **0.22 oscuro / 0.14 claro** (multiplicable por `intensity`; 0.45–0.6 para fondos que deben ser más calmados). Movimiento en bucle lento.
2. Suelo de rejilla en perspectiva en el 42% inferior: líneas de 1px cada 44px, `rotateX(62deg)`, color `rgba(255,255,255,.07)` / `primary@12%`.
3. Spotlight radial de 520px que sigue al cursor (solo puntero fino).
4. Ruido SVG al 3.5–5% en `mix-blend-mode: overlay`.
5. Máscara inferior `linear-gradient(to bottom, black 65%, transparent)` para fundirse con cualquier fondo.

Opcional en productos: rejilla plana de 60px con `primary@9%`, enmascarada radialmente.

### 6.2 Eyebrow badge (`EyebrowBadge`)

Píldora encima de cada titular: `radius-pill`, padding `6px 16px`, `surface-glass` + `border-strong`, punto de 6px con `gradient-brand` que late (`scale 1 → 1.4`, 2s). Texto `0.8rem/600`.

### 6.3 Cabecera de sección

Centrada, máx. 760px: **eyebrow → titular en gradiente → lead en `text-secondary`**. Espacio inferior `64–96px`.

### 6.4 Tarjeta (glass card)

`surface-card` + `border-default` + `shadow-card` + `radius-xl`, padding `24px` (xs) / `32px` (sm+). Hover: tilt 3D o elevación. Variante destacada: `gradient-tint-*` + `border-brand`.

### 6.5 Glass tile (icono destacado, `GlassTile`)

Cuadrado `surface-glass-strong` + `shadow-glow-tile` (72px por defecto) con un chip interior al 52% relleno de gradiente, icono blanco al 30% del tamaño.

### 6.6 Botones

| Variante                | Estilo                                                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Primario**            | Fondo `gradient-brand` (o `textGradient` del producto), texto blanco 600, `radius-md`, padding `14px 32px`, `shadow-cta`. Hover `-2px`. |
| **Secundario**          | `surface-glass` + borde 1.5px `border-strong`, texto `text-primary`, mismo tamaño.                                                      |
| **Outline de producto** | `surface-glass` + borde 1.5px `primary@40%`; hover fondo `primary@13%` y borde `primary`.                                               |
| **Icono**               | 40×40, `radius-sm`, `surface-glass` + `border-default`; hover `border-hover`.                                                           |

Sin mayúsculas forzadas. Iconos dentro del botón a la derecha (externo ↗) o izquierda (mail).

### 6.7 Header

Fijo, 64px. Transparente arriba; al hacer scroll `surface-overlay` + `border-subtle` + `shadow-header`. Barra de progreso de scroll de 2px con `gradient-brand` en el borde inferior. Navegación con pastilla de hover deslizante (`surface-hover`); el ítem activo solo cambia a peso 600 y `text-primary`. Login = botón de icono glass de 40×40 con el logo de GY Accounts (versión clara/oscura), sombra violeta suave, separado del resto de controles por un divisor vertical de 1px. Icono de GY Accounts: escudo con gradiente `#9820FF → #DB0EFE` y check blanco.

> Si el header lleva `backdrop-filter`, aplícalo en un pseudo-elemento: en el propio header lo convierte en containing block de sus hijos `fixed` (desplegables) y los descoloca.

### 6.8 Desplegables / menús

`surface-popover` + `border-default` + `shadow-popover`, `radius-lg`, padding 12px. Ítems `radius-md` con icono en tile de 44px, título 600 + descripción `text-tertiary`; hover `surface-hover-brand` + flecha que aparece. Entrada `opacity + y -8px`, `0.18s`.

### 6.9 Listas

Sin viñetas nativas: cada ítem es un bloque `surface-subtle` + `border-subtle`, `radius-md`, con un punto de 7px en `gradient-brand`.

### 6.10 Badges numéricos / índices

Cuadrado 40×40, `radius-sm`, fondo `gradient-brand`, número blanco 700 (secciones legales). Índice lateral _sticky_ con barra activa de 3px en gradiente.

### 6.11 Enlaces de texto

`text-secondary` → `text-primary` en hover, con subrayado de 2px en `gradient-brand` que crece de 0 a 100% de ancho (`0.3s`).

### 6.12 Footer

Fondo semitransparente con blur, `gradient-hairline` arriba y un brillo radial violeta suave. Columna de marca (logo + wordmark Valorant en caja `gradient-tint`), iconos sociales como botones de icono glass, columnas de enlaces con label overline, barra inferior con copyright y "volver arriba".

### 6.13 Imágenes y mockups

Capturas con fondo transparente, sin marco; se elevan con un tilt suave (3–5°) y un glow radial del color del producto detrás (`blur(50px)`). Iconos monocromos de terceros: `filter: brightness(0) invert(1)` en oscuro.

---

## 7. Contenido

- Bilingüe **en / es**; ningún texto hardcodeado en componentes.
- Nombres: **GYCODING** (wordmark), **Wingwords**, **GY Accounts**, **Heralds of Chaos**.
- El fragmento `[company]GyCODING[/company]` en textos se renderiza en Valorant con `gradient-brand` o `#8C54FF`.
- Tono: cercano y directo; titulares cortos, eyebrows de 2–4 palabras.

---

## 8. Checklist "¿parece de la suite?"

- [ ] Lexend en toda la UI; Valorant solo en marca.
- [ ] Funciona y se ve bien en claro **y** oscuro.
- [ ] Hero o cabecera con aurora (paleta de marca o del producto).
- [ ] Cada sección empieza con eyebrow + titular en gradiente.
- [ ] Tarjetas glass con radio 24px, borde de 1px y sombra suave.
- [ ] CTA primario con gradiente, radio 14px y sombra de color.
- [ ] Header de 64px con cristal al hacer scroll.
- [ ] Animaciones de entrada al hacer scroll, nada en bucle salvo el fondo.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Textos en en/es.

**Evitar:** fondos planos opacos en secciones, sombras negras duras, botones en mayúsculas, bordes de más de 1–1.5px, varios gradientes compitiendo en el mismo bloque, mezclar la paleta de un producto con la de otro.

---

## 9. Implementación (copiar y pegar)

### 9.1 CSS custom properties

```css
:root {
  /* Marca */
  --gy-indigo: #6366f1;
  --gy-pink: #ec4899;
  --gy-violet: #8c54ff;
  --gy-violet-dark: #6b40cc;
  --gy-gradient: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  --gy-gradient-headline: linear-gradient(
    90deg,
    #6366f1 0%,
    #ec4899 35%,
    #8c54ff 70%,
    #6366f1 100%
  );

  /* Tipografía */
  --gy-font-sans: 'Lexend', system-ui, sans-serif;
  --gy-font-brand: 'Valorant', 'Lexend', sans-serif;

  /* Forma */
  --gy-radius-sm: 12px;
  --gy-radius-md: 14px;
  --gy-radius-lg: 20px;
  --gy-radius-xl: 24px;
  --gy-radius-2xl: 28px;
  --gy-header-height: 64px;

  /* Movimiento */
  --gy-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --gy-dur-fast: 0.2s;
  --gy-dur-base: 0.6s;

  /* Sombras de marca */
  --gy-shadow-cta: 0 10px 30px -8px rgba(99, 102, 241, 0.6);
  --gy-shadow-glow: 0 20px 45px -12px rgba(99, 102, 241, 0.4);

  /* Modo claro */
  --gy-bg: #ffffff;
  --gy-text: #000000;
  --gy-text-secondary: #616161;
  --gy-text-tertiary: #757575;
  --gy-surface-card: rgba(255, 255, 255, 0.9);
  --gy-surface-glass: rgba(255, 255, 255, 0.7);
  --gy-surface-overlay: rgba(255, 255, 255, 0.75);
  --gy-surface-hover: rgba(0, 0, 0, 0.05);
  --gy-border: rgba(0, 0, 0, 0.08);
  --gy-border-strong: rgba(0, 0, 0, 0.1);
  --gy-shadow-card: 0 20px 60px rgba(0, 0, 0, 0.08);
  --gy-aurora-opacity: 0.14;
}

[data-theme='dark'] {
  --gy-bg: #121212;
  --gy-text: #ffffff;
  --gy-text-secondary: #e0e0e0;
  --gy-text-tertiary: #bdbdbd;
  --gy-surface-card: rgba(17, 17, 17, 0.8);
  --gy-surface-glass: rgba(255, 255, 255, 0.04);
  --gy-surface-overlay: rgba(10, 10, 14, 0.7);
  --gy-surface-hover: rgba(255, 255, 255, 0.08);
  --gy-border: rgba(255, 255, 255, 0.1);
  --gy-border-strong: rgba(255, 255, 255, 0.15);
  --gy-shadow-card: 0 20px 60px rgba(0, 0, 0, 0.4);
  --gy-aurora-opacity: 0.22;
}

/* Utilidades base */
.gy-gradient-text {
  background: var(--gy-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gy-card {
  background: var(--gy-surface-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--gy-border);
  border-radius: var(--gy-radius-xl);
  box-shadow: var(--gy-shadow-card);
  padding: 32px;
}

.gy-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border: none;
  border-radius: var(--gy-radius-md);
  background: var(--gy-gradient);
  color: #fff;
  font: 600 1rem var(--gy-font-sans);
  box-shadow: var(--gy-shadow-cta);
  cursor: pointer;
  transition: transform var(--gy-dur-fast) ease;
}
.gy-btn-primary:hover {
  transform: translateY(-2px);
}
.gy-btn-primary:active {
  transform: scale(0.97);
}

.gy-btn-secondary {
  padding: 14px 32px;
  border: 1.5px solid var(--gy-border-strong);
  border-radius: var(--gy-radius-md);
  background: var(--gy-surface-glass);
  backdrop-filter: blur(10px);
  color: var(--gy-text);
  font: 600 1rem var(--gy-font-sans);
}

.gy-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid var(--gy-border-strong);
  background: var(--gy-surface-glass);
  backdrop-filter: blur(10px);
  font: 600 0.8rem var(--gy-font-sans);
  letter-spacing: 0.02em;
}
.gy-eyebrow::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gy-gradient);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

Para un producto, sobrescribe en su raíz: `--gy-gradient: <textGradient>; --gy-violet: <primary>;`.

### 9.2 Tokens en TypeScript

```ts
export const gy = {
  color: {
    indigo: '#6366f1',
    pink: '#ec4899',
    violet: '#8C54FF',
    violetDark: '#6B40CC',
  },
  gradient: {
    brand: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
    headline: 'linear-gradient(90deg, #6366f1 0%, #ec4899 35%, #8C54FF 70%, #6366f1 100%)',
  },
  surface: (dark: boolean) => ({
    card: dark ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.9)',
    glass: dark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
    overlay: dark ? 'rgba(10,10,14,0.7)' : 'rgba(255,255,255,0.75)',
    popover: dark ? 'rgba(14,14,20,0.85)' : 'rgba(255,255,255,0.9)',
    hover: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
  }),
  border: (dark: boolean) => ({
    default: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    strong: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
    hover: 'rgba(140,84,255,0.5)',
  }),
  text: (dark: boolean) => ({
    primary: dark ? '#ffffff' : '#000000',
    secondary: dark ? '#e0e0e0' : '#616161',
    tertiary: dark ? '#bdbdbd' : '#757575',
  }),
  shadow: {
    card: (dark: boolean) =>
      dark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.08)',
    cta: '0 10px 30px -8px rgba(99,102,241,0.6)',
  },
  radius: { sm: 12, md: 14, lg: 20, xl: 24, xxl: 28, pill: 999 },
  layout: { headerHeight: 64, container: 1200, pageTop: { xs: 112, sm: 120, md: 128 } },
  motion: {
    easeOut: [0.16, 1, 0.3, 1] as const,
    reveal: {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    },
  },
} as const;
```

### 9.3 Tema MUI base

```ts
import { createTheme } from '@mui/material';

export const createGyTheme = (mode: 'light' | 'dark', fontFamily: string) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#ffffff' : '#1a1a1a',
        contrastText: mode === 'light' ? '#000000' : '#ffffff',
      },
      secondary: { main: '#8C54FF', light: '#8C54FF80', dark: '#6B40CC', contrastText: '#FFFFFF' },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#424242' : '#bdbdbd',
      },
    },
    typography: { fontFamily },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 14 } } },
    },
  });
```

---

## 10. Referencias en este repo

| Qué                                                             | Dónde                                      |
| --------------------------------------------------------------- | ------------------------------------------ |
| Tema MUI                                                        | `app/utils/theme.ts`                       |
| Fuentes                                                         | `app/utils/fonts.ts`                       |
| Kit de componentes (aurora, eyebrow, titular, tilt, glass tile) | `app/components/home/` + su `README.md`    |
| Estilos compartidos del header (botón glass, gradiente, login)  | `app/components/headerStyles.ts`           |
| Paletas de producto                                             | `app/products/data/products.ts`            |
| Layout de páginas de texto largo                                | `app/components/legal/LegalPageLayout.tsx` |
| Scroll suave                                                    | `app/hooks/useSmoothScroll.ts`             |
