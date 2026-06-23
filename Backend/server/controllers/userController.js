import { store } from "../data/store.js";

export const getUserProfile = (req, res) => {
  const user = store.users.find((entry) => entry.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({
    ...user,
    password: undefined,
    orders: store.orders.filter((order) => order.userId === user.id)
  });
};

export const updateUserProfile = (req, res) => {
  const user = store.users.find((entry) => entry.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  Object.assign(user, req.body);
  res.json({ message: "Profile updated.", user: { ...user, password: undefined } });
};

export const getCustomers = (_req, res) => {
  const customers = store.users
    .filter((user) => user.role === "customer")
    .map((user) => {
      const orders = store.orders.filter((order) => order.userId === user.id);
      const payments = store.payments.filter((payment) => payment.userId === user.id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        addresses: user.addresses,
        orders,
        payments
      };
    });

  res.json(customers);
};
