import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, registerCustomer } = useStore();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    role: "customer",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const displayError = (() => {
    if (!error) return "";
    if (error.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(error);
        return parsed.message || error;
      } catch {
        return error;
      }
    }
    return error;
  })();

  const handleRoleChange = (role) => {
    setForm((current) => ({
      ...current,
      role
    }));
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
      email: "",
      password: ""
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        ...form,
        name: String(form.name || "").trim(),
        email: String(form.email || "").trim(),
        password: String(form.password || "").trim()
      };
      if (!payload.email || !payload.password) {
        setError("Please enter your email and password.");
        return;
      }
      if (mode === "register" && !payload.name) {
        setError("Please enter your full name.");
        return;
      }
      const user =
        mode === "register"
          ? await registerCustomer({ name: payload.name, email: payload.email, password: payload.password })
          : await login(payload);
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

        {displayError ? <p className="error-text">{displayError}</p> : null}

        {mode === "register" ? (
          <div className="demo-box">
            <strong>Registration note</strong>
            <p>New signups are created as customer accounts and can log in immediately after registration.</p>
          </div>
        ) : null}
      </article>
    </section>
  );
}
