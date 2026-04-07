import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext.jsx";

export default function AccountPage() {
  const {
    cart,
    wishlist,
    orders,
    profile,
    updateProfile,
    placeOrder,
    cancelOrder,
    updateCartQuantity,
    removeCartItem,
    moveCartItemToWishlist,
    moveWishlistItemToCart,
    currentUser
  } = useStore();

  const customerOrders = orders.filter((order) => order.userId === (currentUser?.id || 2));

  const [form, setForm] = useState({ name: "", phone: "", addresses: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        addresses: (profile.addresses || []).join(", ")
      });
    }
  }, [profile]);

  const handleProfileSave = async (event) => {
    event.preventDefault();
    await updateProfile({
      name: form.name,
      phone: form.phone,
      addresses: form.addresses.split(",").map((item) => item.trim()).filter(Boolean)
    });
  };

  return (
    <div className="account-grid">
      <section className="panel">
        <h2>User Management</h2>
        <form className="stack-form" onSubmit={handleProfileSave}>
          <label className="field-label" htmlFor="profile-name">
            Full Name
          </label>
          <input
            id="profile-name"
            value={form.name}
            placeholder="Enter your full name"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <label className="field-label" htmlFor="profile-phone">
            Phone Number
          </label>
          <input
            id="profile-phone"
            value={form.phone}
            placeholder="Enter your phone number"
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          />
          <label className="field-label" htmlFor="profile-address">
            Delivery Address
          </label>
          <textarea
            id="profile-address"
            rows="3"
            placeholder="Enter your delivery address"
            value={form.addresses}
            onChange={(event) => setForm((current) => ({ ...current, addresses: event.target.value }))}
          />
          <button type="submit">Save profile</button>
        </form>
      </section>

      <section className="panel">
        <h2>Cart Module</h2>
        {cart.items.map((item) => (
          <div key={item.productId} className="line-item account-line-item">
            <div className="account-line-copy">
              <strong>{item.product.name}</strong>
              <span>Rs. {item.lineTotal}</span>
            </div>
            <div className="line-actions account-line-actions">
              <button className="ghost" onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}>
                -
              </button>
              <span>{item.quantity}</span>
              <button className="ghost" onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}>
                +
              </button>
              <button className="ghost" onClick={() => removeCartItem(item.productId)}>
                Remove
              </button>
              <button className="ghost" onClick={() => moveCartItemToWishlist(item.productId)}>
                Move to wishlist
              </button>
            </div>
          </div>
        ))}
        <div className="summary-row">
          <strong>Total</strong>
          <strong>Rs. {cart.total}</strong>
        </div>
        <button onClick={placeOrder}>Place order with UPI</button>
      </section>

      <section className="panel">
        <h2>Wishlist Module</h2>
        {wishlist.map((item) => (
          <div key={item.id} className="line-item account-line-item">
            <div className="account-line-copy">
              <strong>{item.name}</strong>
              <span>Rs. {item.price}</span>
            </div>
            <div className="account-line-actions">
              <button onClick={() => moveWishlistItemToCart(item.id)}>Move to cart</button>
            </div>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Order Management</h2>
        {customerOrders.map((order) => (
          <div key={order.id} className="line-item account-line-item">
            <div className="account-line-copy">
              <strong>Order #{order.id}</strong>
              <span>
                {order.status} | {order.paymentMethod} | {order.paymentStatus}
              </span>
            </div>
            <div className="account-line-actions">
              <button className="ghost" onClick={() => cancelOrder(order.id)}>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
