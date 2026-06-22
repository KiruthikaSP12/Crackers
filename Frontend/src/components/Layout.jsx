import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { cart, wishlist, currentUser, logout, toast } = useStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="shell">
      <nav className="website-navbar">
        <div className="nav-left">
          <Link to="/" className="brand-nav">
            Cracker Kingdom
          </Link>
        </div>

        <div className="nav-right">
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#services">Services</a>
          <NavLink to="/products">Products</NavLink>
          <a href="/#contact">Contact</a>

          {!currentUser ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <button
              type="button"
              className="ghost nav-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {toast ? <div className="toast-popup">{toast}</div> : null}

      <main>{children}</main>
    </div>
  );
}
