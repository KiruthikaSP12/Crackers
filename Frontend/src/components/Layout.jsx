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
      <div className="top-strip">
        <div className="top-strip-inner">
          <span>Wholesale Sivakasi crackers with home delivery</span>
          <div className="top-strip-contacts">
            <span>(+91) 754 002 7151</span>
            <span>(+91) 956 691 3888</span>
          </div>
        </div>
      </div>

      <header className="site-header panel">
        <div className="site-brand">
          <p className="eyebrow">Festival Ready Cracker Store</p>
          <Link to="/" className="brand">
            Cracker Kingdom
          </Link>
          <p className="tagline">
            Authentic fireworks, family packs, aerial shots, sparklers, flower pots, rockets, and kids specials.
          </p>
        </div>

        <div className="site-actions">
          <div className="mini-stat">
            <span>Cart</span>
            <strong>Rs. {cart.total}</strong>
          </div>
          <div className="mini-stat">
            <span>Wishlist</span>
            <strong>{wishlist.length} items</strong>
          </div>
          {currentUser ? (
            <div className="mini-stat">
              <span>Signed in as</span>
              <strong>{currentUser.role}</strong>
            </div>
          ) : null}
        </div>
      </header>

      <nav className="nav panel">
        <NavLink to="/">Home</NavLink>
        <a href="/#about">About Us</a>
        <a href="/#departments">Products</a>
        <a href="/#contact">Contact Us</a>
        {currentUser?.role === "customer" ? <NavLink to="/account">Account</NavLink> : null}
        {currentUser?.role === "admin" ? <NavLink to="/admin">Admin</NavLink> : null}
        {!currentUser ? <NavLink to="/login">Login</NavLink> : null}
        {currentUser ? (
          <button type="button" className="ghost nav-button" onClick={handleLogout}>
            Logout {currentUser.name}
          </button>
        ) : null}
      </nav>

      {toast ? <div className="toast-popup">{toast}</div> : null}

      <main>{children}</main>
    </div>
  );
}
