/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from '@mui/material';
import { products } from '@/app/products/data/products';
//* THIS COMPONENT IS USED IN ALL PRODUCT PAGES
interface RunicBackgroundProps {
  color?: string;
  productId: string;
}

const CHARACTER_SETS: Record<string, string[]> = {
  'heralds-of-chaos': [
    'ᚠ',
    'ᚢ',
    'ᚦ',
    'ᚨ',
    'ᚱ',
    'ᚲ',
    'ᚷ',
    'ᚹ',
    'ᚺ',
    'ᚾ',
    'ᛁ',
    'ᛃ',
    'ᛇ',
    'ᛈ',
    'ᛉ',
    'ᛊ',
    'ᛋ',
    'ᛏ',
    'ᛒ',
    'ᛖ',
    'ᛗ',
    'ᛚ',
    'ᛜ',
    'ᛟ',
  ], // Runas nórdicas
  'gy-messages': ['O', '1'], // Dígitos binarios
  'gy-documents': ['✎', '✍', '✐', '✏', '📄', '📃'], // Símbolos de documentos
  'gy-accounts': ['🔒', '🔑', '👤', '🛡', '🔓'], // Iconos de seguridad/cuentas
};

const RunicBackground: React.FC<RunicBackgroundProps> = memo(({ color = '#6366f1', productId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<
    Array<{
      x: number;
      y: number;
      speed: number;
      char: string;
      opacity: number;
      useProductColor: boolean;
    }>
  >([]);
  const theme = useTheme();
  const animationFrameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const FPS = 15;
  const frameInterval = 1000 / FPS;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: false,
      willReadFrequently: false,
    });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const fontSize = 24;
    let columns = 0;

    const resize = () => {
      width = Math.min(window.innerWidth, 3440);
      height = Math.min(window.innerHeight, 1440);
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);

      const maxDrops = Math.min(columns, 90);
      const characters = CHARACTER_SETS[productId] || ['*']; // Default if product not found

      dropsRef.current = Array.from({ length: maxDrops }, (_, i) => ({
        x: (i * width) / maxDrops + Math.random() * (width / maxDrops - fontSize),
        y: Math.random() * height,
        speed: 0.8 + Math.random() * 1.2,
        char: characters[Math.floor(Math.random() * characters.length)],
        opacity: Math.random() * 0.4 + 0.3,
        useProductColor: Math.random() < 0.3,
      }));
    };

    const isDark = theme.palette.mode === 'dark';

    const draw = (timestamp: number) => {
      if (!ctx) return;

      const deltaTime = timestamp - lastFrameTimeRef.current;
      if (deltaTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = timestamp - (deltaTime % frameInterval);

      ctx.fillStyle = isDark ? '#000000' : '#ffffff';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Segoe UI Historic"`;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = -fontSize;
          drop.speed = 0.8 + Math.random() * 1.2;
          drop.opacity = Math.random() * 0.4 + 0.3;
          drop.useProductColor = Math.random() < 0.3;

          const characters = CHARACTER_SETS[productId] || ['*'];
          drop.char = characters[Math.floor(Math.random() * characters.length)];
        }

        // Get the product color from products array based on productId
        const productColor = getProductColor(productId);

        // Use product-specific colors for each product
        if (drop.useProductColor) {
          ctx.fillStyle = `rgba(${parseInt(productColor.slice(1, 3), 16)}, ${parseInt(
            productColor.slice(3, 5),
            16
          )}, ${parseInt(productColor.slice(5, 7), 16)}, ${isDark ? drop.opacity : drop.opacity * 0.5
            })`;
        } else {
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${drop.opacity})`
            : `rgba(0, 0, 0, ${drop.opacity * 0.3})`;
        }

        ctx.fillText(drop.char, drop.x, drop.y);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (document.hidden) return;
      resize();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !document.hidden) {
            lastFrameTimeRef.current = 0;
            animationFrameRef.current = requestAnimationFrame(draw);
          } else if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );

    resize();
    observer.observe(canvas);
    resizeObserver.observe(canvas);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [theme.palette.mode, color, frameInterval, productId]);

  // Helper function to get the color for a given productId
  const getProductColor = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.color : '#6366f1'; // Default color if not found
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    />
  );
});

RunicBackground.displayName = 'RunicBackground';

export default RunicBackground;
