import { useTheme } from '@mui/material';
import { useLanguage } from '../../../utils/languageContext';
import { PRODUCTS, type ProductId, type ProductData } from '../../data/products';

export interface ProductPageData {
  product: ProductData | null;
  lang: 'en' | 'es';
  mode: 'light' | 'dark';
}

export function useProductPage(id: string): ProductPageData {
  const { language } = useLanguage();
  const theme = useTheme();
  const mode = theme.palette.mode as 'light' | 'dark';
  const product = PRODUCTS[id as ProductId] ?? null;
  const lang = language as 'en' | 'es';
  return { product, lang, mode };
}
