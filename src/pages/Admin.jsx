import AdminReviewDashboard from '../components/sections/AdminReviewDashboard';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';

export default function Admin() {
  return (
    <>
      <Seo
        title="Admin Review"
        description="Lightweight admin and review surface for preorder counts, submissions, exports, deployment status, and system health."
      />
      <AdminReviewDashboard />
      <Footer />
    </>
  );
}
