import { store, getProductById } from "../data/store.js";

export const getProducts = (req, res) => {
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
};

export const getProductDetails = (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  const reviews = store.reviews.filter((review) => review.productId === product.id);
  res.json({ ...product, reviewsList: reviews });
};

export const createProduct = (req, res) => {
  const product = { id: Date.now(), ...req.body };
  store.products.push(product);
  res.status(201).json(product);
};

export const updateProduct = (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found." });
  }

  Object.assign(product, req.body);
  res.json(product);
};

export const deleteProduct = (req, res) => {
  store.products = store.products.filter((product) => product.id !== Number(req.params.id));
  res.json({ message: "Product deleted." });
};
