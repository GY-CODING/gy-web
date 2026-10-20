'use client';

import { Box, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { detectLiteMotion } from '../../hooks/useLiteMotion';

// "Dream orb": a liquid-glass sphere with soap-bubble iridescence in the brand palette,
// drawn by a single fragment shader (no Three.js, no extra dependencies).
//
// Performance budget (this replaced the hero Lottie, which was the heaviest thing on the home):
// - Analytic sphere + a handful of sin() calls per pixel: no raymarching, no textures.
// - Starts after `load` + idle, so it never competes with the content paint (LCP).
// - Renders only while visible (IntersectionObserver) and while the tab is visible (rAF).
// - Lite mode (touch / modest machines): 30 fps and 1x pixel ratio. Reduced motion: one static frame.
// - Until WebGL is ready (or if it's unavailable) a CSS orb with the same palette is shown.

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uLight;
uniform float uDark;
uniform vec2 uMouse;  // cursor position in the same space as p
uniform float uPull;  // 0..1, how strongly the surface reaches toward the cursor

// Brand palette: indigo -> pink -> violet -> soft cyan, looping.
vec3 palette(float t) {
  vec3 c0 = vec3(0.388, 0.400, 0.945); // #6366f1
  vec3 c1 = vec3(0.925, 0.282, 0.600); // #ec4899
  vec3 c2 = vec3(0.549, 0.329, 1.000); // #8C54FF
  vec3 c3 = vec3(0.420, 0.800, 1.000); // highlight cyan
  float x = fract(t) * 4.0;
  if (x < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, x));
  if (x < 2.0) return mix(c1, c2, smoothstep(1.0, 2.0, x));
  if (x < 3.0) return mix(c2, c3, smoothstep(2.0, 3.0, x));
  return mix(c3, c0, smoothstep(3.0, 4.0, x));
}

void main() {
  float s = min(uRes.x, uRes.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * s);
  float px = 2.0 / s;              // one pixel in p-space, for antialiasing
  float r = 0.68;                  // rest radius (room left for the deformation and halo)
  float d = length(p);
  float t = uTime;

  // Deformable silhouette: the radius depends on the angle around the center.
  // - a slow liquid wobble that is always there;
  // - a lobe that reaches toward the cursor (uPull eases in/out from JS, like jelly).
  float ang = atan(p.y, p.x);
  float wob = 0.016 * sin(3.0 * ang + t * 0.5) + 0.008 * sin(5.0 * ang - t * 0.7); // subtle, slow
  float mang = atan(uMouse.y, uMouse.x);
  float lobe = pow(max(cos(ang - mang), 0.0), 2.0); // broad, rounded bulge
  float R = r * (1.0 + wob + 0.10 * uPull * lobe);

  // Map the deformed shape back onto a sphere so the shading stays volumetric.
  float dn = min(d * r / R, r - 1e-4);
  float z = sqrt(r * r - dn * dn);
  vec3 n = normalize(vec3(p * r / R, z));

  // Liquid flow: a few nested sines warp the normal so the surface seems to move.
  vec3 q = n * 2.2;
  float f = sin(q.x * 2.1 + t * 0.9 + sin(q.y * 1.7 - t * 0.6))
          + sin(q.y * 2.6 - t * 0.7 + sin(q.z * 2.3 + t * 0.5))
          + sin(q.z * 3.1 + t * 0.4 + sin(q.x * 1.9 - t * 0.8));
  n = normalize(n + 0.16 * vec3(sin(f * 1.7 + t), cos(f * 1.3 - t * 0.7), sin(f * 0.9)));

  vec3 v = vec3(0.0, 0.0, 1.0);
  float fres = pow(1.0 - max(dot(n, v), 0.0), 2.2);
  vec3 L = normalize(vec3(uLight, 0.9));
  float diff = max(dot(n, L), 0.0) * 0.5 + 0.5;
  float spec = pow(max(dot(n, normalize(L + v)), 0.0), 60.0);

  // Thin-film iridescence: hue shifts with view angle and flow, like a soap bubble.
  float hue = fres * 0.9 + f * 0.08 + t * 0.03 + n.y * 0.15;
  vec3 film = palette(hue) * mix(1.0, 0.72, uDark);   // calmer colors on a dark page
  vec3 core = mix(vec3(0.94, 0.92, 1.0), vec3(0.05, 0.035, 0.13), uDark);
  vec3 col = mix(core, film, 0.35 + 0.65 * fres);
  col *= mix(0.78 + 0.32 * diff, 0.70 + 0.22 * diff, uDark);
  // Highlights: full in light mode; in dark mode only a small, soft specular remains.
  col += spec * mix(0.85, 0.32, uDark) + pow(fres, 4.0) * mix(0.22, 0.03, uDark);

  float a = 1.0 - smoothstep(R - px, R + px, d);

  // Soft halo (light mode only). It reaches exactly zero before the canvas edge: any
  // leftover alpha there shows up as a hard square over the aurora.
  float glow = exp(-max(d - R, 0.0) * 7.0) * 0.30 * (1.0 - uDark) * step(R - px, d);
  glow *= 1.0 - smoothstep(0.86, 0.98, d);
  vec3 gcol = palette(t * 0.03 + ang / 6.2831);

  // Premultiplied alpha output. The halo is additive light: it adds color with very little
  // alpha, so it brightens whatever is behind instead of covering it.
  vec3 outCol = col * a + gcol * glow * (1.0 - a);
  float outA = a + glow * 0.15 * (1.0 - a);
  gl_FragColor = vec4(outCol, outA);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function DreamOrb() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef(isDark ? 1 : 0);
  const [ready, setReady] = useState(false);

  // Theme changes only update a uniform; no re-init.
  useEffect(() => {
    darkRef.current = isDark ? 1 : 0;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf = 0;
    let idleId: number | undefined;
    let disposed = false;
    let visible = true;
    let cleanup: (() => void) | undefined;

    const start = () => {
      if (disposed) return;
      const gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      if (!gl) return; // CSS fallback stays visible

      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (!vs || !fs) return;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      // One triangle that covers the whole canvas.
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const uRes = gl.getUniformLocation(prog, 'uRes');
      const uTime = gl.getUniformLocation(prog, 'uTime');
      const uLight = gl.getUniformLocation(prog, 'uLight');
      const uDark = gl.getUniformLocation(prog, 'uDark');
      const uMouse = gl.getUniformLocation(prog, 'uMouse');
      const uPull = gl.getUniformLocation(prog, 'uPull');

      const lite = detectLiteMotion();
      const fine = window.matchMedia('(pointer: fine)').matches && !lite;
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5);
      const frameInterval = lite ? 1000 / 30 : 0;

      const resize = () => {
        const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
        const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Light direction: follows the cursor on desktop, slowly orbits elsewhere.
      const light = { x: -0.4, y: 0.5, tx: -0.4, ty: 0.5 };
      // Jelly: the surface reaches toward the pointer when it's close. `pull` is driven by an
      // underdamped spring so it overshoots a little and wobbles back, like soft matter.
      const jelly = { mx: 1, my: 0, tmx: 1, tmy: 0, pull: 0, vel: 0, target: 0 };
      const onMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        if (fine) {
          light.tx = Math.max(-1.2, Math.min(1.2, nx));
          light.ty = Math.max(-1.2, Math.min(1.2, ny));
        }
        jelly.tmx = nx;
        jelly.tmy = ny;
        // Full pull with the pointer near the surface, fading out as it moves away.
        // Gentle, gradual response: eases in from far away and never pulls at full strength.
        const dist = Math.hypot(nx, ny);
        const k = 1 - Math.min(1, Math.max(0, (dist - 0.5) / 1.4));
        jelly.target = 0.8 * k * k * (3 - 2 * k);
      };
      const onRelease = () => {
        jelly.target = 0;
      };
      const onUp = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') onRelease();
      };
      // Mouse: anywhere on the page. Touch: while the finger is down (pointermove fires during drags).
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      window.addEventListener('pointercancel', onRelease, { passive: true });
      document.documentElement.addEventListener('mouseleave', onRelease);

      const t0 = performance.now();
      let last = 0;
      let prev = t0;
      const draw = (now: number) => {
        const t = (now - t0) / 1000;
        // Advance the jelly spring in fixed ~60 Hz steps so it feels the same at 30 fps.
        const steps = Math.min(4, Math.max(1, Math.round((now - prev) / 16.67)));
        prev = now;
        for (let i = 0; i < steps; i++) {
          // Soft, well-damped spring: slow in and out, only a hint of overshoot.
          jelly.vel += (jelly.target - jelly.pull) * 0.03;
          jelly.vel *= 0.86;
          jelly.pull += jelly.vel;
          jelly.mx += (jelly.tmx - jelly.mx) * 0.05;
          jelly.my += (jelly.tmy - jelly.my) * 0.05;
          light.x += (light.tx - light.x) * 0.035;
          light.y += (light.ty - light.y) * 0.035;
        }
        if (!fine) {
          light.tx = Math.cos(t * 0.35) * 0.7;
          light.ty = 0.35 + Math.sin(t * 0.5) * 0.4;
        }
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.uniform2f(uLight, light.x, light.y);
        gl.uniform1f(uDark, darkRef.current);
        gl.uniform2f(uMouse, jelly.mx, jelly.my);
        gl.uniform1f(uPull, Math.max(-0.3, Math.min(1.3, jelly.pull)));
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const loop = (now: number) => {
        raf = 0;
        if (!visible || disposed) return;
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
      io.observe(canvas);

      if (reduceMotion) {
        draw(t0 + 4000); // one static frame
      } else {
        raf = requestAnimationFrame(loop);
      }
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onRelease);
        document.documentElement.removeEventListener('mouseleave', onRelease);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      };
    };

    // Wait for the page to finish loading and the browser to be idle.
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(start, { timeout: 1500 });
      } else {
        idleId = setTimeout(start, 200) as unknown as number;
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

  return (
    <Box
      sx={{
        position: 'relative',
        // Sized by width (in the stacked mobile layout the hero column has no definite
        // height), capped so it always fits the hero's 320 / 380 / 480px visual area.
        width: { xs: 'min(100%, 300px)', sm: 'min(100%, 360px)', md: 'min(100%, 460px)' },
        aspectRatio: '1 / 1',
        flexShrink: 0,
      }}
    >
      {/* CSS orb: same palette, shown until the shader is running (or if WebGL is missing). */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: '13%',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.85) 0%, #c4b5fd 10%, #8C54FF 38%, #312e81 72%, #0f0a2e 100%)'
            : 'radial-gradient(circle at 36% 30%, #ffffff 0%, #ede9fe 18%, #c4b5fd 45%, #8C54FF 78%, #6366f1 100%)',
          boxShadow:
            'inset -18px -24px 60px rgba(236,72,153,0.45), inset 14px 18px 40px rgba(99,102,241,0.35), 0 0 80px rgba(140,84,255,0.35)',
          opacity: ready ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
      {/* Floor shadow: anchors the orb in space (static, no blur filter). */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: '22%',
          right: '22%',
          bottom: '-2%',
          height: '9%',
          borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(140,84,255,0.35) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, transparent 70%)',
        }}
      />
    </Box>
  );
}
