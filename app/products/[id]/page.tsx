import { notFound } from 'next/navigation';
import ProductContent from './components/ProductContent';
import { products } from '../data/products';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductContent product={product} />;
}
