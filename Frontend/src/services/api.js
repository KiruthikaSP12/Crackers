const API_BASE = import.meta.env.VITE_API_BASE || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "x-role": options.role || "customer",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    try {
      const error = JSON.parse(errorText);
      throw new Error(error.message || "Request failed.");
    } catch {
      throw new Error(errorText || `Request failed with status ${response.status}.`);
    }
  }

  return response.json();
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  getProducts: (query = "") => request(`/products${query}`),
  getProduct: (id) => request(`/products/${id}`),
  getCategories: () => request("/categories"),
  getCart: () => request("/cart"),
  addToCart: (payload) => request("/cart", { method: "POST", body: JSON.stringify(payload) }),
  updateCart: (productId, quantity) =>
    request(`/cart/${productId}`, { method: "PUT", body: JSON.stringify({ quantity }) }),
  removeFromCart: (productId) => request(`/cart/${productId}`, { method: "DELETE" }),
  moveCartToWishlist: (productId) => request(`/cart/${productId}/move-to-wishlist`, { method: "POST" }),
  getWishlist: () => request("/wishlist"),
  addToWishlist: (productId) => request(`/wishlist/${productId}`, { method: "POST" }),
  moveWishlistToCart: (productId) => request(`/wishlist/${productId}/move-to-cart`, { method: "POST" }),
  getOrders: () => request("/orders"),
  placeOrder: (payload) => request("/orders", { method: "POST", body: JSON.stringify(payload) }),
  cancelOrder: (orderId) => request(`/orders/${orderId}/cancel`, { method: "POST" }),
  getNotifications: () => request("/notifications"),
  addReview: (payload) => request("/reviews", { method: "POST", body: JSON.stringify(payload) }),
  getPayments: () => request("/payments"),
  getProfile: (id) => request(`/users/profile/${id}`),
  updateProfile: (id, payload) => request(`/users/profile/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  getDashboard: () => request("/dashboard", { role: "admin" }),
  updateOrderStatus: (orderId, status) =>
    request(`/orders/${orderId}/status`, {
      method: "PUT",
      role: "admin",
      body: JSON.stringify({ status })
    })
};
