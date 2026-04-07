import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
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
      {loading ? (
        <section className="panel">Loading crackers shop...</section>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute allow={currentUser?.role === "customer"}>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allow={currentUser?.role === "admin"}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </Layout>
  );
}
