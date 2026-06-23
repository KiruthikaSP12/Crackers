import { store } from "../data/store.js";

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

export const getOrders = (_req, res) => {
  res.json(store.orders);
};

export const placeOrder = (req, res) => {
  const order = buildAppOrder(req.body);

  store.orders.push(order);
  store.cart = [];
  res.status(201).json({ message: "Order placed successfully.", order });
};

export const updateOrderStatus = (req, res) => {
  const order = store.orders.find((entry) => entry.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  order.status = req.body.status;
  res.json({ message: "Order status updated.", order });
};

export const cancelOrder = (req, res) => {
  const order = store.orders.find((entry) => entry.id === Number(req.params.id));
  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  order.status = "Cancelled";
  res.json({ message: "Order cancelled.", order });
};

// Also export buildAppOrder for use in paymentController
export { buildAppOrder };
