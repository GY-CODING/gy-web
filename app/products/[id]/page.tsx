import { PRODUCT_ORDER } from '../data/products';
import ProductPageClient from './components/ProductPageClient';

export function generateStaticParams() {
  return PRODUCT_ORDER.map((id) => ({ id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient id={params.id} />;
}
