import ProductDetailPage from '../components/sections/ProductDetailPage';
import { productDetailCatalog } from '../data/site';

export default function SovereignZeroCore() {
  return <ProductDetailPage product={productDetailCatalog[1]} />;
}
