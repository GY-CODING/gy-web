'use client';

import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { detectLiteMotion } from '../../hooks/useLiteMotion';
import { PRODUCTS } from '../../products/data/products';
import { valorantFont } from '../../utils/fonts';
import { BRAND_GRADIENT, Copy, ink, WORLD_BANDS, WORLD_PALETTES, WorldKey } from './copy';
import { PauseButton, TextLink } from './kit';

// "The name as a monument": the GyCODING wordmark spans the viewport and its letters are windows
// into a living nebula (a domain-warped noise field) that bends toward the cursor. The visitor
// chooses what the name looks through: the studio itself or one of its three worlds, and the
// nebula eases into that product's colours (the one live thing on the page).
//
// The <h1> is the real, accessible wordmark and the first paint; it stays painted underneath.
// Once the page is idle the shader draws the same glyphs at the same place (measured from each
// line of the <h1>) on an opaque canvas above it.
//
// Performance: one fragment shader, value noise (no textures besides the text mask), started after
// load + idle, paused off-screen. Lite mode (touch / modest machines): 30 fps and a ~0.9 Mpx budget.
// Reduced motion: one static frame, redrawn only when the world changes.

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMask;
uniform vec2 uRes;
uniform vec2 uMouse;     // 0..1, smoothed
uniform float uTime;
uniform float uReveal;   // 0..1 intro: letters fill from the bottom
uniform float uDark;
uniform vec3 uPal[4];    // the world being looked at, eased in JS

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= 0.5; }
  return v;
}
vec3 palette(float t) {
  float x = fract(t) * 4.0;
  if (x < 1.0) return mix(uPal[0], uPal[1], smoothstep(0.0, 1.0, x));
  if (x < 2.0) return mix(uPal[1], uPal[2], smoothstep(1.0, 2.0, x));
  if (x < 3.0) return mix(uPal[2], uPal[3], smoothstep(2.0, 3.0, x));
  return mix(uPal[3], uPal[0], smoothstep(3.0, 4.0, x));
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 2.2;
  vec2 m = vec2(uMouse.x * aspect, uMouse.y) * 2.2;
  float t = uTime * 0.12;

  // Pull the field toward the cursor: a soft lens that bends the nebula around it.
  vec2 toM = m - p;
  float lens = exp(-dot(toM, toM) * 1.6);
  p += toM * lens * 0.35;

  // Domain warping: noise of noise gives slow, liquid, cloud-like structure.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p + 3.5 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p + 3.0 * r);

  vec3 neb = palette(f * 1.4 + r.x * 0.5 + t * 0.4);
  neb = mix(neb * 0.45, neb * 1.35, smoothstep(0.2, 0.8, f));   // depth: soft voids, vivid clouds
  neb += pow(smoothstep(0.5, 1.0, f), 2.5) * vec3(1.0, 0.92, 1.0) * 0.9;   // star-hot cores
  neb += lens * palette(t + 0.3) * 0.35;                           // glow where the cursor is

  // Text mask + fake bevel: compare the mask with a copy shifted toward the light.
  vec2 px = 1.0 / uRes;
  float mask = texture2D(uMask, uv).a;
  vec2 ldir = normalize(vec2(uMouse.x - 0.5, uMouse.y - 0.5) + vec2(-0.4, 0.6));
  float shifted = texture2D(uMask, uv + ldir * px * 3.0).a;
  float bevel = clamp(mask - shifted, 0.0, 1.0);

  // Intro: the letters fill from the bottom with a noisy edge.
  float edge = uReveal * 1.25 - 0.1 + (noise(uv * 18.0 + uTime) - 0.5) * 0.12;
  float revealed = smoothstep(edge, edge - 0.05, uv.y);
  mask *= revealed;

  vec3 ground = mix(vec3(0.965, 0.961, 0.976), vec3(0.027, 0.027, 0.043), uDark);
  // Outside the letters the nebula is only a faint breath, so the name stays the event.
  vec3 outside = mix(ground, neb, mix(0.10, 0.16, uDark) * smoothstep(0.3, 0.9, f));
  vec3 inside = neb + bevel * revealed * vec3(1.0) * 0.9;
  vec3 col = mix(outside, inside, mask);

  // Soft vignette toward the corners.
  col *= mix(1.0, 0.82, uDark * smoothstep(0.55, 1.1, length(uv - 0.5) * 1.4));
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
const paletteArray = (k: WorldKey) => WORLD_PALETTES[k].flatMap(hexToRgb);

const WORLD_KEYS: WorldKey[] = ['gycoding', 'wingwords', 'gy-accounts', 'heralds-of-chaos'];

export default function WordmarkHero({
  copy,
  lang,
  onExplore,
  paused = false,
}: {
  copy: Copy;
  lang: string;
  onExplore: (world: WorldKey) => void;
  // Stops the shader: the visitor paused the animations, or the next screen covers the hero.
  paused?: boolean;
}) {
  // /v2 es oscuro siempre: no hay interruptor de tema.
  const isDark = true;
  const c = ink(isDark);
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const darkRef = useRef(isDark ? 1 : 0);
  const worldRef = useRef<number[]>(paletteArray('gycoding'));
  const redrawRef = useRef<(() => void) | null>(null);
  const pausedRef = useRef(paused);
  const kickRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [world, setWorld] = useState<WorldKey>('gycoding');

  useEffect(() => {
    darkRef.current = isDark ? 1 : 0;
    redrawRef.current?.();
  }, [isDark]);

  useEffect(() => {
    worldRef.current = paletteArray(world);
    redrawRef.current?.();
  }, [world]);

  useEffect(() => {
    pausedRef.current = paused;
    if (!paused) kickRef.current?.();
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const title = titleRef.current;
    if (!canvas || !root || !title) return;

    let raf = 0;
    let idleId: number | undefined;
    let disposed = false;
    let visible = true;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      if (disposed) return;
      const gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        powerPreference: 'low-power',
      });
      if (!gl) return; // the <h1> stays as the wordmark

      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (!vs || !fs) return;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const u = {
        res: gl.getUniformLocation(prog, 'uRes'),
        mouse: gl.getUniformLocation(prog, 'uMouse'),
        time: gl.getUniformLocation(prog, 'uTime'),
        reveal: gl.getUniformLocation(prog, 'uReveal'),
        dark: gl.getUniformLocation(prog, 'uDark'),
        mask: gl.getUniformLocation(prog, 'uMask'),
        pal: gl.getUniformLocation(prog, 'uPal'),
      };

      const lite = detectLiteMotion();
      const frameInterval = lite ? 1000 / 30 : 0;
      // Resolution: the letter edges come out of this canvas, so on a phone (DPR 2-3, small hero) a
      // fixed 0.75x left them visibly pixelated. Lite mode gets a pixel budget instead (~0.9 Mpx: a
      // phone renders at ~1.6x, a tablet nearer 1x); desktop keeps up to 1.25x.
      const pixelScale = () => {
        const dpr = window.devicePixelRatio || 1;
        if (!lite) return Math.min(dpr, 1.25);
        const r = root.getBoundingClientRect();
        const budget = Math.sqrt(900_000 / Math.max(1, r.width * r.height));
        return Math.max(0.75, Math.min(dpr, 2, budget));
      };
      let scale = pixelScale();

      // Text mask: draw the wordmark exactly where the <h1> renders it, in the same font.
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      const maskCanvas = document.createElement('canvas');

      const family = valorantFont.style.fontFamily;
      try {
        await document.fonts.load(`100px ${family}`);
      } catch {
        /* the fallback font is fine */
      }
      if (disposed) return;

      const layout = () => {
        const rect = root.getBoundingClientRect();
        scale = pixelScale();
        const w = Math.max(1, Math.round(rect.width * scale));
        const h = Math.max(1, Math.round(rect.height * scale));
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);

        const cs = getComputedStyle(title);
        const fontSize = parseFloat(cs.fontSize) * scale;
        maskCanvas.width = w;
        maskCanvas.height = h;
        const ctx = maskCanvas.getContext('2d')!;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        ctx.font = `${cs.fontWeight} ${fontSize}px ${family}`;
        ctx.textBaseline = 'alphabetic';
        ctx.textAlign = 'center';
        const spacing = parseFloat(cs.letterSpacing) || 0;
        if ('letterSpacing' in ctx) {
          (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
            `${spacing * scale}px`;
        }
        // One fillText per span ("Gy", "CODING"), each centred where the browser placed it.
        // The baseline sits where the browser placed it: line box centred on the glyphs.
        const parts = Array.from(title.querySelectorAll<HTMLElement>('[data-line]'));
        for (const part of parts) {
          const text = part.textContent || '';
          const pr = part.getBoundingClientRect();
          const m = ctx.measureText(text);
          const ascent = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
          const descent = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent;
          const baseline =
            (pr.top - rect.top) * scale + (pr.height * scale) / 2 + (ascent - descent) / 2;
          const cx = (pr.left - rect.left + pr.width / 2) * scale;
          ctx.fillText(text, cx, baseline);
        }
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);
      };
      layout();
      const ro = new ResizeObserver(() => {
        layout();
        if (reduceMotion) draw(performance.now(), true);
      });
      ro.observe(root);

      // Pointer, smoothed in fixed steps so it feels the same at 30 or 60 fps.
      const mouse = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45 };
      const fine = window.matchMedia('(pointer: fine)').matches;
      const onMove = (e: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        mouse.tx = (e.clientX - rect.left) / rect.width;
        mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
      };
      window.addEventListener('pointermove', onMove, { passive: true });

      // The palette eases toward the chosen world (same fixed-step smoothing as the pointer).
      const pal = Float32Array.from(worldRef.current);

      const t0 = performance.now();
      let prev = t0;
      let last = 0;
      function draw(now: number, still = false) {
        const t = (now - t0) / 1000;
        const steps = Math.min(4, Math.max(1, Math.round((now - prev) / 16.67)));
        prev = now;
        if (!fine) {
          // No hover on touch: the lens drifts slowly on its own.
          mouse.tx = 0.5 + Math.cos(t * 0.25) * 0.3;
          mouse.ty = 0.5 + Math.sin(t * 0.33) * 0.2;
        }
        const target = worldRef.current;
        for (let i = 0; i < steps; i++) {
          mouse.x += (mouse.tx - mouse.x) * 0.04;
          mouse.y += (mouse.ty - mouse.y) * 0.04;
          for (let k = 0; k < 12; k++) pal[k] += (target[k] - pal[k]) * 0.05;
        }
        if (still) pal.set(target);
        const reveal = still ? 1 : Math.min(1, t / 1.6);
        gl!.uniform2f(u.res, canvas!.width, canvas!.height);
        gl!.uniform2f(u.mouse, mouse.x, mouse.y);
        gl!.uniform1f(u.time, still ? 8 : t + 8);
        gl!.uniform1f(u.reveal, 1 - Math.pow(1 - reveal, 3));
        gl!.uniform1f(u.dark, darkRef.current);
        gl!.uniform3fv(u.pal, pal);
        gl!.uniform1i(u.mask, 0);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      }

      const loop = (now: number) => {
        raf = 0;
        if (!visible || disposed || pausedRef.current) return;
        if (now - last >= frameInterval) {
          last = now;
          draw(now);
        }
        raf = requestAnimationFrame(loop);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduceMotion && !raf) raf = requestAnimationFrame(loop);
      });
      io.observe(root);

      kickRef.current = () => {
        if (!raf && visible && !reduceMotion && !disposed) raf = requestAnimationFrame(loop);
      };
      // Paused (or reduced motion): one still frame, redrawn when the world or theme changes.
      redrawRef.current = () => {
        if (reduceMotion || pausedRef.current) draw(performance.now(), false);
      };
      if (reduceMotion) draw(t0, true);
      else raf = requestAnimationFrame(loop);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        redrawRef.current = null;
        kickRef.current = null;
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    };

    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => void start(), { timeout: 1500 });
      } else {
        idleId = setTimeout(() => void start(), 200) as unknown as number;
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
        clearTimeout(idleId);
      }
      cleanup?.();
    };
  }, [reduceMotion]);

  const pal = WORLD_PALETTES[world];
  const product = world === 'gycoding' ? null : PRODUCTS[world];
  const band = world === 'gycoding' ? null : WORLD_BANDS[world];
  const sentence = product
    ? `${product.name}. ${lang === 'es' ? product.taglineEs : product.tagline}`
    : copy.heroSentence;

  return (
    <Box
      ref={rootRef}
      component="section"
      data-tone="ground"
      aria-label="GYCODING"
      sx={{
        position: 'relative',
        minHeight: { xs: '100svh' },
        overflow: 'hidden',
        background: c.ground,
        color: c.ink,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: '20px', md: '32px' },
        pt: { xs: '56px', md: '64px' },
        pb: { xs: '32px', md: '48px' },
      }}
    >
      {/* Esquina superior derecha (la barra está oculta sobre el hero): pausar el movimiento
          decorativo (la nebulosa y todos los bucles de la página). */}
      <Box
        sx={{
          position: 'absolute',
          zIndex: 3,
          top: { xs: 20, md: 28 },
          right: { xs: 20, md: 32 },
          color: c.ink,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <PauseButton />
      </Box>

      {/* The monument: real text, painted first, and left painted under the shader canvas. */}
      <Box
        component="h1"
        ref={titleRef}
        sx={{
          position: 'relative',
          zIndex: 0,
          m: 0,
          textAlign: 'center',
          fontFamily: valorantFont.style.fontFamily,
          fontWeight: 400,
          fontSynthesis: 'none',
          // One line everywhere (smaller on phones). Valorant 'GyCODING' plus the gap between
          // "Gy" and "CODING" is ~5.68× its size: fill the width minus the margins.
          fontSize: 'clamp(30px, calc((100vw - 40px) / 5.68), 430px)',
          lineHeight: 1,
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          background: `linear-gradient(135deg, ${pal[0]} 0%, ${pal[1]} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          // The brand look: the C tucks under the y's arm until the two read as one piece. In Valorant
          // they first touch at -0.20em (at -0.14em a gap stayed); -0.21em merges them into one shape.
          // The canvas mask draws each span where the browser placed it, so it follows this offset.
          '& [data-line]': { display: 'inline' },
          '& [data-line] + [data-line]': {},
        }}
      >
        <span data-line>Gy</span>
        <span data-line>CODING</span>
      </Box>

      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          width: '100%',
          height: '100%',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.9s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Under the name, centred like every v2 page hero: what this is, and two ways in. */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          mt: { xs: 4, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          component="p"
          aria-live="polite"
          sx={{
            m: 0,
            maxWidth: 640,
            minHeight: { md: '1.4em' },
            fontSize: { xs: 20, md: 26 },
            lineHeight: 1.35,
            color: c.ink,
            textWrap: 'balance',
          }}
        >
          {sentence}
        </Box>
        <Box
          sx={{
            mt: { xs: 3.5, md: 4 },
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 3.5,
            rowGap: 2,
          }}
        >
          {/* With a world chosen, the action opens that world's page. */}
          <Box
            component={product ? Link : 'button'}
            {...(product ? { href: `/products/${world}/` } : { onClick: () => onExplore(world) })}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              border: 0,
              cursor: 'pointer',
              px: 3.5,
              height: 52,
              borderRadius: '14px',
              fontFamily: 'inherit',
              fontSize: 17,
              fontWeight: 600,
              textDecoration: 'none',
              color: band ? band.actionInk : '#fff',
              background: band ? band.action : BRAND_GRADIENT,
              transition: 'transform 0.2s ease, background-color 0.3s ease, color 0.3s ease',
              '&:hover': { transform: 'translateY(-2px)' },
              '&:active': { transform: 'scale(0.95)' },
              '&:focus-visible': { outline: `2px solid ${c.ink}`, outlineOffset: 3 },
            }}
          >
            {product ? copy.heroSee(product.name) : copy.heroAction}
          </Box>
          <TextLink href="/team/">{copy.meetTeam}</TextLink>
        </Box>
      </Box>

      {/* The live thing: a segmented control along the foot of the screen. */}
      <Box
        component="fieldset"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          zIndex: 2,
          left: { md: 0 },
          right: { md: 0 },
          bottom: { md: 32 },
          mt: { xs: 6, md: 0 },
          border: 0,
          mx: 0,
          p: 0,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="legend" sx={{ p: 0, mb: 1.5, mx: 'auto', fontSize: 15, color: c.soft }}>
          {copy.heroLook}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, auto)' },
            gap: 0.5,
            p: 0.5,
            borderRadius: '18px',
            background: isDark ? 'rgba(242,240,247,0.07)' : 'rgba(13,11,20,0.06)',
          }}
        >
          {WORLD_KEYS.map((k) => {
            const on = world === k;
            const logo = k === 'gycoding' ? '/gy-logo.png' : PRODUCTS[k].logo;
            const name = k === 'gycoding' ? 'GYCODING' : PRODUCTS[k].name;
            return (
              <Box
                key={k}
                component="button"
                aria-pressed={on}
                onClick={() => setWorld(k)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  height: 40,
                  px: 1.75,
                  border: 0,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 15,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  background: on ? c.ink : 'transparent',
                  color: on ? c.ground : c.ink,
                  transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
                  '&:hover': {
                    background: on
                      ? c.ink
                      : isDark
                        ? 'rgba(242,240,247,0.08)'
                        : 'rgba(13,11,20,0.06)',
                  },
                  '&:active': { transform: 'scale(0.95)' },
                  '&:focus-visible': { outline: `2px solid ${c.ink}`, outlineOffset: 2 },
                }}
              >
                <Image src={logo} alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
                {name}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
