'use client';

import { notFound } from 'next/navigation';
import { Box } from '@mui/material';
import { useProductPage } from '../hooks/useProductPage';
import ProductHero from './sections/ProductHero';
import ProductPreview from './sections/ProductPreview';
import ProductProfileSection from './sections/ProductProfileSection';
import ProductFeatures from './sections/ProductFeatures/ProductFeatures';
import ProductTechStack from './sections/ProductTechStack/ProductTechStack';
import ProductCTA from './sections/ProductCTA';

export default function ProductPageClient({ id }: { id: string }) {
  const { product, lang, mode } = useProductPage(id);

  if (!product) notFound();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'dark' ? product.theme.gradient : '#ffffff',
        color: mode === 'dark' ? '#fff' : 'grey.900',
        overflowX: 'hidden',
      }}
    >
      <ProductHero product={product} lang={lang} mode={mode} />
      <ProductPreview product={product} lang={lang} mode={mode} />
      <ProductProfileSection product={product} lang={lang} mode={mode} />
      <ProductFeatures product={product} lang={lang} mode={mode} />
      <ProductTechStack product={product} lang={lang} mode={mode} />
      <ProductCTA product={product} lang={lang} mode={mode} />
    </Box>
  );
}

