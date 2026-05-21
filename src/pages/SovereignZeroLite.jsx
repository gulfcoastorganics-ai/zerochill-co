import ProductDetailPage from '../components/sections/ProductDetailPage';
import { productDetailCatalog } from '../data/site';

export default function SovereignZeroLite() {
  return <ProductDetailPage product={productDetailCatalog[0]} />;
}
