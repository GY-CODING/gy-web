'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material';

interface MatrixBackgroundProps {
  color?: string;
}

const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ color = '#6366f1' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme.palette.mode === 'dark';
    const baseColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)';
    const productColor = color;

    let width = 0;
    let height = 0;
    let columns = 0;
    const fontSize = 20;
    let drops: Array<{
      x: number;
      y: number;
      color: string;
      speed: number;
      scale: number;
      rotation: number;
      rotationSpeed: number;
      currentRune: string;
      nextChangeFrame: number;
      pulsePhase: number;
      pulseSpeed: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
    }> = [];

    let energyPulses: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speed: number;
      opacity: number;
    }> = [];

    // Runas nórdicas (Elder Futhark)
    const runes =
      'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭ᛮᛯᛰ';

    const getRandomRune = () => runes[Math.floor(Math.random() * runes.length)];

    const getRGBA = (color: string, opacity: number) => {
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color.replace(/[\d.]+\)$/, `${opacity})`);
    };

    const createEnergyPulse = (x: number, y: number, color: string) => {
      energyPulses.push({
        x,
        y,
        radius: 0,
        color,
        speed: 2 + Math.random() * 2,
        opacity: 0.4,
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = Math.floor(width / fontSize);

      drops = Array(columns)
        .fill(null)
        .map((_, i) => ({
          x: i * fontSize,
          y: Math.random() * height,
          color: Math.random() < 0.15 ? productColor : baseColor,
          speed: 1 + Math.random() * 2,
          scale: 0.8 + Math.random() * 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          currentRune: getRandomRune(),
          nextChangeFrame: Math.floor(Math.random() * 30),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.05 + Math.random() * 0.05,
          trail: [],
        }));
    };

    let frameCount = 0;

    const draw = () => {
      frameCount++;

      // Fondo con efecto de desvanecimiento
      ctx.fillStyle = isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)';
      ctx.fillRect(0, 0, width, height);

      // Dibujar pulsos de energía
      energyPulses = energyPulses.filter((pulse) => {
        pulse.radius += pulse.speed;
        pulse.opacity *= 0.95;

        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = getRGBA(pulse.color, pulse.opacity * 0.3);
        ctx.lineWidth = 2;
        ctx.stroke();

        return pulse.opacity > 0.1;
      });

      ctx.font = `${fontSize}px 'Noto Sans Runic', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        // Actualizar y dibujar el rastro
        drop.trail = drop.trail
          .map((point) => ({ ...point, opacity: point.opacity * 0.85 }))
          .filter((point) => point.opacity > 0.1);

        if (frameCount % 3 === 0) {
          drop.trail.push({
            x: drop.x,
            y: drop.y,
            opacity: 0.3,
          });
        }

        // Dibujar rastro
        drop.trail.forEach((point) => {
          ctx.fillStyle = getRGBA(drop.color, point.opacity * 0.2);
          ctx.fillText(drop.currentRune, point.x, point.y);
        });

        // Cambiar la runa periódicamente
        if (frameCount >= drop.nextChangeFrame) {
          drop.currentRune = getRandomRune();
          drop.nextChangeFrame = frameCount + 10 + Math.floor(Math.random() * 30);
        }

        // Efecto de pulso
        const pulse = Math.sin(drop.pulsePhase) * 0.2 + 0.8;
        drop.pulsePhase += drop.pulseSpeed;

        // Rotación y escala
        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.rotate(drop.rotation);
        ctx.scale(drop.scale * pulse, drop.scale * pulse);

        // Calcular opacidad basada en la posición
        const opacity = Math.max(0.2, 1 - drop.y / height);

        // Dibujar runa principal
        if (drop.color === productColor) {
          ctx.shadowColor = drop.color;
          ctx.shadowBlur = 5;
          ctx.fillStyle = getRGBA(drop.color, opacity);
          ctx.fillText(drop.currentRune, -fontSize / 2, 0);

          if (Math.random() < 0.005) {
            createEnergyPulse(drop.x, drop.y, drop.color);
          }
        } else {
          ctx.fillStyle = getRGBA(drop.color, opacity);
          ctx.fillText(drop.currentRune, -fontSize / 2, 0);
        }

        ctx.restore();

        // Actualizar posición y rotación
        drop.y += drop.speed;
        drop.rotation += drop.rotationSpeed;

        // Reiniciar la gota cuando llegue al final
        if (drop.y > height) {
          drops[i] = {
            ...drop,
            y: 0,
            color: Math.random() < 0.15 ? productColor : baseColor,
            speed: 1 + Math.random() * 2,
            scale: 0.8 + Math.random() * 0.4,
            rotation: Math.random() * Math.PI * 2,
            currentRune: getRandomRune(),
            nextChangeFrame: frameCount + 10 + Math.floor(Math.random() * 30),
            trail: [],
          };
        }
      }

      // Ocasionalmente cambiar el color de algunas runas
      if (Math.random() < 0.003) {
        const randomIndex = Math.floor(Math.random() * drops.length);
        const drop = drops[randomIndex];
        drop.color = drop.color === productColor ? baseColor : productColor;
        createEnergyPulse(drop.x, drop.y, productColor);
      }
    };

    // Configuración inicial
    resize();
    window.addEventListener('resize', resize);

    // Animación
    let animationFrame: number;
    const animate = () => {
      draw();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    // Limpieza
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme.palette.mode, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.5,
      }}
    />
  );
};

export default MatrixBackground;
