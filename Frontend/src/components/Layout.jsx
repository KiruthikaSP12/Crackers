import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { cart, wishlist, currentUser, logout, toast } = useStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="app-container">
      <div className="shell">
        {/* Main Navbar */}
        <nav className="website-navbar">
          <Link to="/" className="brand-nav">
            <span className="brand-icon">CK</span>
            <div className="brand-text">
              <strong>Cracker Kingdom</strong>
              <span>PREMIUM FIREWORKS</span>
            </div>
          </Link>

          <div className="nav-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "active-link" : ""}>Products</NavLink>
            <NavLink to="/offers" className={({ isActive }) => isActive ? "active-link" : ""}>Offers</NavLink>
            <NavLink to="/feedback" className={({ isActive }) => isActive ? "active-link" : ""}>Feedback</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
          </div>

          <div className="nav-right">
            <Link to="/wishlist" className="icon-btn">
              ❤️
            </Link>
            <Link to="/cart" className="icon-btn">
              🛒
            </Link>
            {currentUser ? (
              <button onClick={handleLogout} className="login-btn">
                Logout
              </button>
            ) : (
              <Link to="/login" className="login-btn">
                👤 Login
              </Link>
            )}
          </div>
        </nav>

        {toast ? <div className="toast-popup">{toast}</div> : null}

        <main>{children}</main>
      </div>

      <Footer />

      {/* Bottom Contact Strip (moved from top) */}
      <div className="top-strip" style={{ marginTop: "0" }}>
        <div className="top-strip-inner">
          <div className="top-strip-contacts">
            <span>📞 +91 98765 43210</span>
            <span>📍 42 Sivakasi Lane, TN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
