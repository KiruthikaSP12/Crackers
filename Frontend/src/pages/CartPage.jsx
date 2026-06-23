import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function CartPage() {
  const { cart, products, updateCartQuantity, removeCartItem, moveCartItemToWishlist } = useStore();
  const navigate = useNavigate();

  const getProduct = (id) => products.find((p) => p.id === id);

  if (!cart?.items?.length) {
    return (
      <div className="page-grid" style={{ minHeight: "50vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <section className="panel" style={{ width: "100%", maxWidth: "500px" }}>
          <h1 style={{ fontSize: "4rem", margin: "0 0 1rem" }}>🛒</h1>
          <h2>Your Cart is Empty</h2>
          <p className="muted">Looks like you haven't added any premium fireworks yet!</p>
          <button className="primary-btn" onClick={() => navigate("/products")} style={{ marginTop: "1rem" }}>
            Browse Products
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="page-grid">
      <div className="section-heading">
        <h2>Your Shopping Cart</h2>
        <p className="muted">{cart.items.length} items</p>
      </div>

      <div className="cart-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
        <div className="cart-items" style={{ display: "grid", gap: "1rem" }}>
          {cart.items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;

            return (
              <div key={item.productId} className="panel cart-item" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", alignItems: "center" }}>
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "12px" }} 
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0 }}>{product.name}</h3>
                    <strong style={{ color: "var(--accent-deep)", fontSize: "1.2rem" }}>₹{(product.price * item.quantity).toFixed(2)}</strong>
                  </div>
                  <p className="muted" style={{ margin: 0 }}>Price: ₹{product.price.toFixed(2)} each</p>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                    <div className="quantity-controls" style={{ display: "flex", alignItems: "center", gap: "10px", background: "var(--panel-soft)", padding: "5px", borderRadius: "8px", border: "1px solid var(--line)" }}>
                      <button 
                        className="ghost" 
                        style={{ padding: "4px 12px", border: "none" }}
                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <strong style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</strong>
                      <button 
                        className="ghost" 
                        style={{ padding: "4px 12px", border: "none" }}
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button className="ghost" style={{ padding: "6px 12px", fontSize: "0.85rem" }} onClick={() => moveCartItemToWishlist(item.productId)}>
                        ❤️ Move to Wishlist
                      </button>
                      <button className="ghost" style={{ padding: "6px 12px", fontSize: "0.85rem", color: "var(--accent)" }} onClick={() => removeCartItem(item.productId)}>
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="panel cart-summary" style={{ position: "sticky", top: "20px" }}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>
          <div className="summary-row line-item">
            <span className="muted">Subtotal</span>
            <strong>₹{cart.total.toFixed(2)}</strong>
          </div>
          <div className="summary-row line-item">
            <span className="muted">Shipping</span>
            <span style={{ color: "var(--green, #16a34a)", fontWeight: "bold" }}>FREE</span>
          </div>
          <div className="summary-row line-item" style={{ borderBottom: "none", paddingTop: "1.5rem" }}>
            <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Total</span>
            <strong style={{ fontSize: "1.5rem", color: "var(--accent-deep)" }}>₹{cart.total.toFixed(2)}</strong>
          </div>
          
          <button 
            className="primary-btn" 
            style={{ width: "100%", marginTop: "1.5rem", padding: "14px", fontSize: "1.1rem", fontWeight: "bold" }}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
          
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/products" className="muted" style={{ fontSize: "0.9rem", textDecoration: "underline" }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
