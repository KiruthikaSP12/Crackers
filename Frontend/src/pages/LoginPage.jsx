import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

const demoAccounts = {
  customer: {
    email: "priya@example.com",
    password: "customer123"
  },
  admin: {
    email: "admin@crackershop.com",
    password: "admin123"
  }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, registerCustomer } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    role: "customer",
    email: demoAccounts.customer.email,
    password: demoAccounts.customer.password
  });
  const [error, setError] = useState("");

  const handleRoleChange = (role) => {
    setForm({
      role,
      email: demoAccounts[role].email,
      password: demoAccounts[role].password
    });
    setError("");
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setError("");

    if (nextMode === "register") {
      setForm({
        name: "",
        role: "customer",
        email: "",
        password: ""
      });
      return;
    }

    setForm({
      name: "",
      role: "customer",
      email: demoAccounts.customer.email,
      password: demoAccounts.customer.password
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user =
        mode === "register"
          ? await registerCustomer({ name: form.name, email: form.email, password: form.password })
          : await login(form);
      const destination = location.state?.from || (user.role === "admin" ? "/admin" : "/account");
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-shell">
      <article className="panel auth-card">
        <p className="eyebrow">Role Based Login</p>
        <h1>{mode === "register" ? "Create a customer account" : "Sign in as customer or admin"}</h1>
        <p>
          {mode === "register"
            ? "Register a new customer account with your own email and password."
            : "Choose your role first, then log in to access the right dashboard and controls."}
        </p>

        <div className="auth-mode-switch">
          <button
            type="button"
            className={mode === "login" ? "role-chip active-role" : "role-chip"}
            onClick={() => handleModeChange("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "role-chip active-role" : "role-chip"}
            onClick={() => handleModeChange("register")}
          >
            New Customer
          </button>
        </div>

        {mode === "login" ? (
          <div className="role-switch">
            <button
              type="button"
              className={form.role === "customer" ? "role-chip active-role" : "role-chip"}
              onClick={() => handleRoleChange("customer")}
            >
              Customer
            </button>
            <button
              type="button"
              className={form.role === "admin" ? "role-chip active-role" : "role-chip"}
              onClick={() => handleRoleChange("admin")}
            >
              Admin
            </button>
          </div>
        ) : null}

        <form className="stack-form" onSubmit={handleSubmit}>
          {mode === "register" ? (
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Full name"
            />
          ) : null}
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="Email"
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="Password"
          />
          <button type="submit">{mode === "register" ? "Create customer account" : `Login as ${form.role}`}</button>
        </form>

        {error ? <p className="error-text">{error}</p> : null}

        {mode === "login" ? (
          <div className="demo-box">
            <strong>Demo accounts</strong>
            <p>Customer: `priya@example.com` / `customer123`</p>
            <p>Admin: `admin@crackershop.com` / `admin123`</p>
          </div>
        ) : (
          <div className="demo-box">
            <strong>Registration note</strong>
            <p>New signups are created as customer accounts and can log in immediately after registration.</p>
          </div>
        )}
      </article>
    </section>
  );
}
