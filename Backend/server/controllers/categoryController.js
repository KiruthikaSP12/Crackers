import { store } from "../data/store.js";

export const getCategories = (_req, res) => {
  res.json(store.categories);
};

export const createCategory = (req, res) => {
  const category = { id: Date.now(), ...req.body };
  store.categories.push(category);
  res.status(201).json(category);
};

export const updateCategory = (req, res) => {
  const category = store.categories.find((entry) => entry.id === Number(req.params.id));
  if (!category) {
    return res.status(404).json({ message: "Category not found." });
  }

  Object.assign(category, req.body);
  res.json(category);
};

export const deleteCategory = (req, res) => {
  store.categories = store.categories.filter((entry) => entry.id !== Number(req.params.id));
  res.json({ message: "Category deleted." });
};
