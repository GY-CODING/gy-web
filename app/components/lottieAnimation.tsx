// components/LottieAnimation.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

export default function LottieAnimation() {
  const [LottieComponent, setLottieComponent] = useState<any>(null);

  useEffect(() => {
    import('lottie-react').then((Lottie) => {
      import('../../public/lottie/lottie.json').then((animationData) => {
        const LottieWithData = () => (
          <Lottie.default
            animationData={animationData.default}
            loop={true}
            style={{
              background: 'transparent',
              width: '100%',
              height: '100%'
            }}
          />
        );
        setLottieComponent(() => LottieWithData);
      });
    });
  }, []);

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      background: 'transparent',
      '& > div': {
        background: 'transparent !important'
      }
    }}>
      {LottieComponent && <LottieComponent />}
    </Box>
  );
}
