import { Router } from "express";
import { buildDashboard, enrichCart, getProductById, store } from "../data/store.js";
import { requireAdmin } from "../middleware/auth.js";
import { hashPassword } from "../utils/security.js";
import { createRazorpayOrder, isRazorpayConfigured, verifyRazorpaySignature } from "../utils/razorpay.js";

const router = Router();

const buildAppOrder = ({ userId, items, total, paymentMethod, paymentStatus }) => ({
  id: Date.now(),
  userId,
  status: "Processing",
  items,
  total,
  paymentMethod,
  paymentStatus,
  placedOn: new Date().toISOString().slice(0, 10)
});

router.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Crackers shop backend is running." });
});

router.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const exists = store.users.some((user) => user.email === email);
  if (exists) {
    return res.status(409).json({ message: "Email already registered." });
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashPassword(password),
    role: "customer",
    phone: "",
    addresses: [],
    orderHistory: []
  };

  store.users.push(user);
  res.status(201).json({
    message: "Registration successful.",
    token: `mock-token-${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses
    }
  });
});

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find((entry) => entry.email === email && entry.password === hashPassword(password));
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  res.json({
    message: "Login successful.",
    token: `mock-token-${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      addresses: user.addresses
    }
  });
});

router.post("/auth/logout", (_req, res) => {
  res.json({ message: "Logged out successfully." });
});

router.get("/users/profile/:id", (req, res) => {
  const user = store.users.find((entry) => entry.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({
    ...user,
    password: undefined,
    orders: store.orders.filter((order) => order.userId === user.id)
  });
});

router.put("/users/profile/:id", (req, res) => {
  const user = store.users.find((entry) => entry.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  Object.assign(user, req.body);
  res.json({ message: "Profile updated.", user: { ...user, password: undefined } });
});

router.get("/categories", (_req, res) => {
  res.json(store.categories);
});

router.post("/categories", requireAdmin, (req, res) => {
  const category = { id: Date.now(), ...req.body };
  store.categories.push(category);
  res.status(201).json(category);
});

router.put("/categories/:id", requireAdmin, (req, res) => {
  const category = store.categories.find((entry) => entry.id === Number(req.params.id));
  if (!category) {
    return res.status(404).json({ message: "Category not found." });
  }

  Object.assign(category, req.body);
  res.json(category);
});

router.delete("/categories/:id", requireAdmin, (req, res) => {
  store.categories = store.categories.filter((entry) => entry.id !== Number(req.params.id));
  res.json({ message: "Category deleted." });
});

router.get("/products", (req, res) => {
  const { q, category, minPrice, maxPrice, type, sortBy } = req.query;
  let results = [...store.products];

  if (q) results = results.filter((product) => product.name.toLowerCase().includes(String(q).toLowerCase()));
  if (category) results = results.filter((product) => product.categoryId === Number(category));
  if (type) results = results.filter((product) => product.type.toLowerCase() === String(type).toLowerCase());
  if (minPrice) results = results.filter((product) => product.price >= Number(minPrice));
  if (maxPrice) results = results.filter((product) => product.price <= Number(maxPrice));
  if (sortBy === "popularity") results.sort((a, b) => b.popularity - a.popularity);
  if (sortBy === "price-low") results.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") results.sort((a, b) => b.price - a.price);

  res.json(results);
});

router.get("/products/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const reviews = store.reviews.filter((review) => review.productId === product.id);
  res.json({ ...product, reviewsList: reviews });
});

router.post("/products", requireAdmin, (req, res) => {
  const product = { id: Date.now(), ...req.body };
  store.products.push(product);
  res.status(201).json(product);
});

router.put("/products/:id", requireAdmin, (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  Object.assign(product, req.body);
  res.json(product);
});

router.delete("/products/:id", requireAdmin, (req, res) => {
  store.products = store.products.filter((product) => product.id !== Number(req.params.id));
  res.json({ message: "Product deleted." });
});

router.get("/cart", (_req, res) => {
  const items = enrichCart();
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  res.json({ items, total });
});

router.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;
  const existing = store.cart.find((item) => item.productId === productId);

  if (existing) existing.quantity += quantity;
  else store.cart.push({ productId, quantity });

  res.status(201).json({ message: "Item added to cart.", cart: enrichCart() });
});

router.put("/cart/:productId", (req, res) => {
  const item = store.cart.find((entry) => entry.productId === Number(req.params.productId));
  if (!item) {
    return res.status(404).json({ message: "Cart item not found." });
  }

  item.quantity = req.body.quantity;
  res.json({ message: "Cart updated.", cart: enrichCart() });
});

router.delete("/cart/:productId", (req, res) => {
  store.cart = store.cart.filter((entry) => entry.productId !== Number(req.params.productId));
  res.json({ message: "Item removed.", cart: enrichCart() });
});

router.post("/cart/:productId/move-to-wishlist", (req, res) => {
  const productId = Number(req.params.productId);
  const item = store.cart.find((entry) => entry.productId === productId);

  if (!item) {
    return res.status(404).json({ message: "Cart item not found." });
  }

  store.cart = store.cart.filter((entry) => entry.productId !== productId);
  if (!store.wishlist.includes(productId)) {
    store.wishlist.push(productId);
  }

  res.json({ message: "Moved to wishlist.", cart: enrichCart() });
});

router.get("/wishlist", (_req, res) => {
  res.json(store.wishlist.map((productId) => getProductById(productId)));
});

router.post("/wishlist/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  if (!store.wishlist.includes(productId)) {
    store.wishlist.push(productId);
  }
  res.status(201).json({ message: "Added to wishlist." });
});

router.delete("/wishlist/:productId", (req, res) => {
  store.wishlist = store.wishlist.filter((productId) => productId !== Number(req.params.productId));
  res.json({ message: "Removed from wishlist." });
});

router.post("/wishlist/:productId/move-to-cart", (req, res) => {
  const productId = Number(req.params.productId);
  const existing = store.cart.find((item) => item.productId === productId);

  if (existing) existing.quantity += 1;
  else store.cart.push({ productId, quantity: 1 });

  store.wishlist = store.wishlist.filter((entry) => entry !== productId);
  res.json({ message: "Moved to cart.", cart: enrichCart() });
});

router.get("/orders", (_req, res) => {
  res.json(store.orders);
});

router.post("/orders", (req, res) => {
  const order = buildAppOrder(req.body);

  store.orders.push(order);
  store.cart = [];
  res.status(201).json({ message: "Order placed successfully.", order });
});

router.put("/orders/:id/status", requireAdmin, (req, res) => {
  const order = store.orders.find((entry) => entry.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  order.status = req.body.status;
  res.json({ message: "Order status updated.", order });
});

router.post("/orders/:id/cancel", (req, res) => {
  const order = store.orders.find((entry) => entry.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  order.status = "Cancelled";
  res.json({ message: "Order cancelled.", order });
});

router.get("/payments", (_req, res) => {
  res.json(store.payments);
});

router.get("/payments/config", (_req, res) => {
  res.json({
    enabled: isRazorpayConfigured(),
    keyId: process.env.RAZORPAY_KEY_ID || ""
  });
});

router.post("/payments/razorpay/order", async (req, res) => {
  if (!isRazorpayConfigured()) {
    return res.status(503).json({ message: "Online payment is not configured yet." });
  }

  try {
    const amount = Number(req.body.amount);
    const receipt = req.body.receipt || `receipt_${Date.now()}`;
    const order = await createRazorpayOrder({
      amount,
      receipt,
      notes: req.body.notes || {}
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create Razorpay order." });
  }
});

router.post("/payments/razorpay/verify", (req, res) => {
  const {
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature,
    orderPayload
  } = req.body;

  if (!isRazorpayConfigured()) {
    return res.status(503).json({ message: "Online payment is not configured yet." });
  }

  const isValid = verifyRazorpaySignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature
  });

  if (!isValid) {
    return res.status(400).json({ message: "Invalid payment signature." });
  }

  const payment = {
    id: Date.now(),
    gateway: "Razorpay",
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    method: orderPayload.paymentMethod || "UPI",
    status: "Paid",
    amount: orderPayload.total
  };

  const appOrder = buildAppOrder({
    ...orderPayload,
    paymentStatus: "Paid"
  });

  store.payments.push(payment);
  store.orders.push(appOrder);
  store.cart = [];

  res.json({
    message: "Payment verified and order placed successfully.",
    payment,
    order: appOrder
  });
});

router.post("/payments", (req, res) => {
  const payment = { id: Date.now(), ...req.body };
  store.payments.push(payment);
  res.status(201).json({ message: "Payment recorded.", payment });
});

router.get("/reviews", (_req, res) => {
  res.json(store.reviews);
});

router.post("/reviews", (req, res) => {
  const review = { id: Date.now(), ...req.body };
  store.reviews.push(review);
  res.status(201).json({ message: "Review added.", review });
});

router.get("/notifications", (_req, res) => {
  res.json(store.notifications);
});

router.post("/notifications", requireAdmin, (req, res) => {
  const notification = { id: Date.now(), read: false, ...req.body };
  store.notifications.unshift(notification);
  res.status(201).json(notification);
});

router.put("/notifications/:id/read", (req, res) => {
  const notification = store.notifications.find((entry) => entry.id === Number(req.params.id));
  if (!notification) {
    return res.status(404).json({ message: "Notification not found." });
  }

  notification.read = true;
  res.json(notification);
});

router.get("/dashboard", requireAdmin, (_req, res) => {
  res.json(buildDashboard());
});

export default router;
