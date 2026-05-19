import { Navigate, Route, Routes } from 'react-router-dom';
import SiteShell from './components/layout/SiteShell';
import Home from './pages/Home';
import SovereignZero from './pages/SovereignZero';
import ZeroStateMatrix from './pages/ZeroStateMatrix';
import Manifest from './pages/Manifest';
import Docs from './pages/Docs';
import Preorder from './pages/Preorder';
import Review from './pages/Review';
import Products from './pages/Products';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/sovereign-zero" element={<SovereignZero />} />
        <Route path="/zero-state-matrix" element={<ZeroStateMatrix />} />
        <Route path="/manifest" element={<Manifest />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/preorder" element={<Preorder />} />
        <Route path="/review" element={<Review />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
