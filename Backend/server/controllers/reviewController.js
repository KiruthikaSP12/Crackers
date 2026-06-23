import { store } from "../data/store.js";

export const getReviews = (_req, res) => {
  res.json(store.reviews);
};

export const addReview = (req, res) => {
  const review = { id: Date.now(), ...req.body };
  store.reviews.push(review);
  res.status(201).json({ message: "Review added.", review });
};
