'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

interface LottieAnimationProps {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({
  animationPath,
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const [LottieComponent, setLottieComponent] = useState<any>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const Lottie = await import('lottie-react');
        const response = await fetch(animationPath);
        const animationData = await response.json();

        const LottieWithData = () => (
          <Lottie.default
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{
              background: 'transparent',
              width: '100%',
              height: '100%',
            }}
          />
        );
        setLottieComponent(() => LottieWithData);
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    loadAnimation();
  }, [animationPath, loop, autoplay]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: 'transparent',
        '& > div': {
          background: 'transparent !important',
        },
      }}
    >
      {LottieComponent && <LottieComponent />}
    </Box>
  );
}
