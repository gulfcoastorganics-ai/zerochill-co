import ProductDetailPage from '../components/sections/ProductDetailPage';
import { productDetailCatalog } from '../data/site';

export default function SovereignZeroBlacksite() {
  return <ProductDetailPage product={productDetailCatalog[2]} />;
}
