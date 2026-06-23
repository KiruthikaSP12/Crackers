import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";

import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { getUserProfile, updateUserProfile, getCustomers } from "../controllers/userController.js";
import { getProducts, getProductDetails, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { getCart, addToCart, updateCartItem, removeFromCart, moveToWishlist, getWishlist, addToWishlist, removeFromWishlist, moveWishlistToCart } from "../controllers/cartController.js";
import { getOrders, placeOrder, updateOrderStatus, cancelOrder } from "../controllers/orderController.js";
import { getPayments, getPaymentConfig, createRazorpayOrderEndpoint, verifyRazorpayPayment, recordPayment } from "../controllers/paymentController.js";
import { getReviews, addReview } from "../controllers/reviewController.js";
import { getNotifications, addNotification, markNotificationRead } from "../controllers/notificationController.js";
import { getDashboardData } from "../controllers/adminController.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Crackers shop backend is running." });
});

// Auth Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);

// User Profile Routes
router.get("/users/profile/:id", getUserProfile);
router.put("/users/profile/:id", updateUserProfile);

// Categories
router.get("/categories", getCategories);
router.post("/categories", requireAdmin, createCategory);
router.put("/categories/:id", requireAdmin, updateCategory);
router.delete("/categories/:id", requireAdmin, deleteCategory);

// Products
router.get("/products", getProducts);
router.get("/products/:id", getProductDetails);
router.post("/products", requireAdmin, createProduct);
router.put("/products/:id", requireAdmin, updateProduct);
router.delete("/products/:id", requireAdmin, deleteProduct);

// Cart
router.get("/cart", getCart);
router.post("/cart", addToCart);
router.put("/cart/:productId", updateCartItem);
router.delete("/cart/:productId", removeFromCart);
router.post("/cart/:productId/move-to-wishlist", moveToWishlist);

// Wishlist
router.get("/wishlist", getWishlist);
router.post("/wishlist/:productId", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.post("/wishlist/:productId/move-to-cart", moveWishlistToCart);

// Orders
router.get("/orders", getOrders);
router.post("/orders", placeOrder);
router.put("/orders/:id/status", requireAdmin, updateOrderStatus);
router.post("/orders/:id/cancel", cancelOrder);

// Payments
router.get("/payments", getPayments);
router.get("/payments/config", getPaymentConfig);
router.post("/payments/razorpay/order", createRazorpayOrderEndpoint);
router.post("/payments/razorpay/verify", verifyRazorpayPayment);
router.post("/payments", recordPayment);

// Reviews
router.get("/reviews", getReviews);
router.post("/reviews", addReview);

// Notifications
router.get("/notifications", getNotifications);
router.post("/notifications", requireAdmin, addNotification);
router.put("/notifications/:id/read", markNotificationRead);

// Admin Dashboard
router.get("/dashboard", requireAdmin, getDashboardData);
router.get("/admin/customers", requireAdmin, getCustomers);

export default router;
