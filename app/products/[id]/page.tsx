import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Box, Container, Skeleton, CircularProgress } from '@mui/material';
import { products } from '../data/products';

// Componentes cargados dinámicamente
const ProductContent = dynamic(() => import('./components/ProductContent'), {
  loading: () => (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  ),
});

const ProductDetails = dynamic(() => import('./components/ProductDetails'), {
  loading: () => (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Skeleton variant="text" width="200px" height="40px" sx={{ mb: 4, mx: 'auto' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[...Array(6)].map((_, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Skeleton variant="circular" width={60} height={60} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="150px" />
                <Skeleton variant="text" width="100%" />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  ),
});

const FAQ = dynamic(() => import('./components/FAQ'), {
  loading: () => (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Skeleton variant="text" width="200px" height="40px" sx={{ mb: 4, mx: 'auto' }} />
        {[...Array(4)].map((_, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Skeleton variant="rectangular" height={60} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" height={100} />
          </Box>
        ))}
      </Container>
    </Box>
  ),
});

// Metadata para SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe',
    };
  }

  return {
    title: `${product.name} | Gy Coding`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

// URLs estáticas válidas
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main>
      {/* Hero section con carga prioritaria */}
      <Suspense
        fallback={
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <ProductContent productId={params.id} />
      </Suspense>

      {/* Stack tecnológico */}
      <Suspense>
        <ProductDetails productId={params.id} />
      </Suspense>

      {/* Preguntas frecuentes */}
      <Suspense>
        <FAQ productId={params.id} />
      </Suspense>
    </main>
  );
}
