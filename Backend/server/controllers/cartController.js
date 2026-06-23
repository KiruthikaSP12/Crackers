import { store, enrichCart, getProductById } from "../data/store.js";

export const getCart = (_req, res) => {
  const items = enrichCart();
  const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
  res.json({ items, total });
};

export const addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const existing = store.cart.find((item) => item.productId === productId);

  if (existing) existing.quantity += quantity;
  else store.cart.push({ productId, quantity });

  res.status(201).json({ message: "Item added to cart.", cart: enrichCart() });
};

export const updateCartItem = (req, res) => {
  const item = store.cart.find((entry) => entry.productId === Number(req.params.productId));
  if (!item) {
    return res.status(404).json({ message: "Cart item not found." });
  }

  item.quantity = req.body.quantity;
  res.json({ message: "Cart updated.", cart: enrichCart() });
};

export const removeFromCart = (req, res) => {
  store.cart = store.cart.filter((entry) => entry.productId !== Number(req.params.productId));
  res.json({ message: "Item removed.", cart: enrichCart() });
};

export const moveToWishlist = (req, res) => {
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
};

export const getWishlist = (_req, res) => {
  res.json(store.wishlist.map((productId) => getProductById(productId)));
};

export const addToWishlist = (req, res) => {
  const productId = Number(req.params.productId);
  if (!store.wishlist.includes(productId)) {
    store.wishlist.push(productId);
  }
  res.status(201).json({ message: "Added to wishlist." });
};

export const removeFromWishlist = (req, res) => {
  store.wishlist = store.wishlist.filter((productId) => productId !== Number(req.params.productId));
  res.json({ message: "Removed from wishlist." });
};

export const moveWishlistToCart = (req, res) => {
  const productId = Number(req.params.productId);
  const existing = store.cart.find((item) => item.productId === productId);

  if (existing) existing.quantity += 1;
  else store.cart.push({ productId, quantity: 1 });

  store.wishlist = store.wishlist.filter((entry) => entry !== productId);
  res.json({ message: "Moved to cart.", cart: enrichCart() });
};
