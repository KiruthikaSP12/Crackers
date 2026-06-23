import { store } from "../data/store.js";
import { hashPassword } from "../utils/security.js";

export const registerUser = (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "").trim();
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const exists = store.users.some((user) => String(user.email || "").toLowerCase() === email);
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
};

export const loginUser = (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "").trim();
  const user = store.users.find(
    (entry) =>
      String(entry.email || "").toLowerCase() === email && entry.password === hashPassword(password)
  );
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
};

export const logoutUser = (_req, res) => {
  res.json({ message: "Logged out successfully." });
};
