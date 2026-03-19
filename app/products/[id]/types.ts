import type { ProductData } from '../data/products';

export interface ProductSectionProps {
  product: ProductData;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}
