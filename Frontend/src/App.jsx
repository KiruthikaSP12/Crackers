import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage.jsx";
import OffersPage from "./pages/OffersPage.jsx";
import FaqPage from "./pages/FaqPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import RefundPage from "./pages/RefundPage.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import AnimatedPage from "./components/AnimatedPage.jsx";
import SparkleEffect from "./components/SparkleEffect.jsx";
import { useStore } from "./context/StoreContext.jsx";

function ProtectedRoute({ allow, children }) {
  const location = useLocation();

  if (!allow) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default function App() {
  const { loading, currentUser } = useStore();

  return (
    <Layout>
      <SparkleEffect />
      {loading ? (
        <section className="panel page-transition page-enter-active">Loading crackers shop...</section>
      ) : (
        <Routes>
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/products" element={<AnimatedPage><ProductsPage /></AnimatedPage>} />
          <Route path="/offers" element={<AnimatedPage><OffersPage /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
          <Route path="/services" element={<AnimatedPage><ServicesPage /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
          <Route path="/faq" element={<AnimatedPage><FaqPage /></AnimatedPage>} />
          <Route path="/privacy" element={<AnimatedPage><PrivacyPage /></AnimatedPage>} />
          <Route path="/terms" element={<AnimatedPage><TermsPage /></AnimatedPage>} />
          <Route path="/refund" element={<AnimatedPage><RefundPage /></AnimatedPage>} />
          <Route path="/feedback" element={<AnimatedPage><FeedbackPage /></AnimatedPage>} />
          <Route path="/cart" element={<AnimatedPage><CartPage /></AnimatedPage>} />
          <Route path="/wishlist" element={<AnimatedPage><WishlistPage /></AnimatedPage>} />
          <Route path="/checkout" element={<ProtectedRoute allow={currentUser}><AnimatedPage><CheckoutPage /></AnimatedPage></ProtectedRoute>} />
        </Routes>
      )}
    </Layout>
  );
}
