import { Navigate, Route, Routes } from 'react-router-dom';
import SiteShell from './components/layout/SiteShell';
import Home from './pages/Home';
import SovereignZero from './pages/SovereignZero';
import ZeroStateMatrix from './pages/ZeroStateMatrix';
import SovereignZeroLite from './pages/SovereignZeroLite';
import SovereignZeroCore from './pages/SovereignZeroCore';
import SovereignZeroBlacksite from './pages/SovereignZeroBlacksite';
import ZeroStateMatrixDevKit from './pages/ZeroStateMatrixDevKit';
import Manifest from './pages/Manifest';
import Docs from './pages/Docs';
import Funding from './pages/Funding';
import Preorder from './pages/Preorder';
import Review from './pages/Review';
import Admin from './pages/Admin';
import Products from './pages/Products';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/sovereign-zero" element={<SovereignZero />} />
        <Route path="/zero-state-matrix" element={<ZeroStateMatrix />} />
        <Route path="/sovereign-zero-lite" element={<SovereignZeroLite />} />
        <Route path="/sovereign-zero-core" element={<SovereignZeroCore />} />
        <Route path="/sovereign-zero-blacksite" element={<SovereignZeroBlacksite />} />
        <Route path="/zero-state-matrix-devkit" element={<ZeroStateMatrixDevKit />} />
        <Route path="/manifest" element={<Manifest />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/preorder" element={<Preorder />} />
        <Route path="/review" element={<Review />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
