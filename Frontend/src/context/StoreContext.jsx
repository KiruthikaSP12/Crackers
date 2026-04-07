import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api.js";

const StoreContext = createContext(null);
const storedUser = typeof window !== "undefined" ? window.localStorage.getItem("cracker-user") : null;

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [currentUser, setCurrentUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [toast, setToast] = useState("");
  const [paymentConfig, setPaymentConfig] = useState({ enabled: false, keyId: "" });
  const [loading, setLoading] = useState(true);

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const sharedValues = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getCart(),
        api.getWishlist(),
        api.getOrders(),
        api.getNotifications(),
        api.getPaymentConfig()
      ]);

      setProducts(sharedValues[0]);
      setCategories(sharedValues[1]);
      setCart(sharedValues[2]);
      setWishlist(sharedValues[3]);
      setOrders(sharedValues[4]);
      setNotifications(sharedValues[5]);
      setPaymentConfig(sharedValues[6]);

      if (currentUser?.id) {
        const profileData = await api.getProfile(currentUser.id);
        setProfile(profileData);
      } else {
        setProfile(null);
      }

      if (currentUser?.role === "admin") {
        setDashboard(await api.getDashboard());
      } else {
        setDashboard(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [currentUser]);

  const login = async ({ email, password, role }) => {
    const response = await api.login({ email, password });
    if (response.user.role !== role) {
      throw new Error(`This account is registered as ${response.user.role}, not ${role}.`);
    }

    setCurrentUser(response.user);
    window.localStorage.setItem("cracker-user", JSON.stringify(response.user));
    return response.user;
  };

  const registerCustomer = async ({ name, email, password }) => {
    const response = await api.register({ name, email, password });
    setCurrentUser(response.user);
    window.localStorage.setItem("cracker-user", JSON.stringify(response.user));
    return response.user;
  };

  const logout = async () => {
    await api.logout();
    setCurrentUser(null);
    setProfile(null);
    setDashboard(null);
    window.localStorage.removeItem("cracker-user");
  };

  const addProductToCart = async (productId, quantity = 1) => {
    await api.addToCart({ productId, quantity });
    setCart(await api.getCart());
  };

  const addProductToWishlist = async (productId) => {
    await api.addToWishlist(productId);
    setWishlist(await api.getWishlist());
  };

  const moveWishlistItemToCart = async (productId) => {
    await api.moveWishlistToCart(productId);
    setWishlist(await api.getWishlist());
    setCart(await api.getCart());
    showToast("Item moved to cart.");
  };

  const updateCartQuantity = async (productId, quantity) => {
    await api.updateCart(productId, quantity);
    setCart(await api.getCart());
  };

  const removeCartItem = async (productId) => {
    await api.removeFromCart(productId);
    setCart(await api.getCart());
  };

  const moveCartItemToWishlist = async (productId) => {
    await api.moveCartToWishlist(productId);
    setCart(await api.getCart());
    setWishlist(await api.getWishlist());
    showToast("Item moved to wishlist.");
  };

  const placeOrder = async () => {
    await api.placeOrder({
      userId: currentUser?.id || 2,
      items: cart.items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      total: cart.total,
      paymentMethod: "UPI",
      paymentStatus: "Paid"
    });
    setOrders(await api.getOrders());
    setCart(await api.getCart());
    showToast("Your order has been placed successfully.");
  };

  const loadRazorpayCheckout = async () => {
    if (window.Razorpay) {
      return true;
    }

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payWithRazorpay = async ({ paymentMethod = "UPI" } = {}) => {
    if (!paymentConfig.enabled || !paymentConfig.keyId) {
      throw new Error("Online payment is not configured yet.");
    }

    const scriptLoaded = await loadRazorpayCheckout();
    if (!scriptLoaded) {
      throw new Error("Unable to load Razorpay checkout.");
    }

    const orderPayload = {
      userId: currentUser?.id || 2,
      items: cart.items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      total: cart.total,
      paymentMethod,
      paymentStatus: "Paid"
    };

    const razorpayOrder = await api.createRazorpayOrder({
      amount: cart.total * 100,
      receipt: `order_${Date.now()}`,
      notes: {
        customerName: currentUser?.name || "Guest",
        customerEmail: currentUser?.email || ""
      }
    });

    await new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: paymentConfig.keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Cracker Kingdom",
        description: "Secure crackers order payment",
        order_id: razorpayOrder.id,
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        },
        prefill: {
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          contact: currentUser?.phone || ""
        },
        theme: {
          color: "#b42e13"
        },
        handler: async (response) => {
          try {
            await api.verifyRazorpayPayment({
              ...response,
              orderPayload
            });
            setOrders(await api.getOrders());
            setCart(await api.getCart());
            showToast("Payment successful. Your order has been placed.");
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled."))
        }
      });

      razorpay.open();
    });
  };

  const cancelOrder = async (orderId) => {
    await api.cancelOrder(orderId);
    setOrders(await api.getOrders());
  };

  const submitReview = async (productId, rating, comment) => {
    await api.addReview({ productId, user: profile?.name || "Guest", rating, comment });
  };

  const updateProfile = async (payload) => {
    const response = await api.updateProfile(currentUser?.id || 2, payload);
    setProfile(response.user);
    if (currentUser) {
      const nextUser = { ...currentUser, ...response.user };
      setCurrentUser(nextUser);
      window.localStorage.setItem("cracker-user", JSON.stringify(nextUser));
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    await api.updateOrderStatus(orderId, status);
    setOrders(await api.getOrders());
    setDashboard(await api.getDashboard());
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        notifications,
        profile,
        dashboard,
        currentUser,
        isAuthenticated: Boolean(currentUser),
        toast,
        paymentConfig,
        loading,
        login,
        registerCustomer,
        logout,
        addProductToCart,
        addProductToWishlist,
        moveWishlistItemToCart,
        updateCartQuantity,
        removeCartItem,
        moveCartItemToWishlist,
        placeOrder,
        payWithRazorpay,
        cancelOrder,
        submitReview,
        updateProfile,
        updateOrderStatus
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
