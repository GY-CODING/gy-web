'use client';
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import type { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react';

interface LottieAnimationProps {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
}

type LottieComponent = React.ComponentType<LottieComponentProps>;

export default function LottieAnimation({
  animationPath,
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [Lottie, setLottie] = useState<LottieComponent | null>(null);
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;

    // Library and JSON are downloaded in parallel; before, the JSON fetch only started
    // once the lottie-web chunk had finished loading.
    const load = () =>
      Promise.all([
        import('lottie-react'),
        fetch(animationPath).then((response) => response.json()),
      ])
        .then(([mod, data]) => {
          if (cancelled) return;
          setLottie(() => mod.default);
          setAnimationData(data);
        })
        .catch((error) => console.error('Error loading Lottie animation:', error));

    // Wait until the page has loaded and the browser is idle, so the ~370 KB of Lottie
    // (library + JSON) don't compete with the JS/fonts needed to paint the page (LCP).
    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(load, { timeout: 1500 });
      } else {
        idleId = setTimeout(load, 200) as unknown as number;
      }
    };
    if (document.readyState === 'complete') scheduleLoad();
    else window.addEventListener('load', scheduleLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleLoad);
      if (idleId !== undefined) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
        clearTimeout(idleId);
      }
    };
  }, [animationPath]);

  // Pause while off-screen: the SVG is redrawn every frame even when nobody can see it.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !Lottie || !autoplay) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) lottieRef.current?.play();
      else lottieRef.current?.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [Lottie, autoplay]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        '& > div': {
          background: 'transparent !important',
        },
      }}
    >
      {Lottie && animationData ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid meet', progressiveLoad: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        />
      ) : null}
    </Box>
  );
}
