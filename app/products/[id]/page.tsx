import { PRODUCT_ORDER } from '../../products/data/products';
import ProductPageV2 from '../../components/v2/ProductPage';
import HeraldsPage from '../../components/v2/HeraldsPage';

// Product pages. Heralds of Chaos has its own page (black, bone and gold); the other two share
// ProductPage.
export function generateStaticParams() {
  return PRODUCT_ORDER.map((id) => ({ id }));
}

export default function Page({ params }: { params: { id: string } }) {
  if (params.id === 'heralds-of-chaos') return <HeraldsPage />;
  return <ProductPageV2 id={params.id} />;
}
