import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./Login.css";
import LoginAnimation from "../../components/LoginAnimation";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.username, form.password);

      const redirectTo =
        location.state?.from?.pathname || "/dashboard";

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Section */}
        <div className="login-left">

          <h1 className="brand-title">
            FinanceAI
          </h1>

          <p className="brand-subtitle">
            Smarter Finance Starts Here
          </p>

          <LoginAnimation />

        </div>

        {/* Right Section */}
        <div className="login-card">

          <h1 className="login-title">
            Welcome Back !!
          </h1>

          <p className="login-subtitle">
            Sign in to continue managing your finances with AI-powered insights.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">

            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            <Button
              type="submit"
              full
              loading={submitting}
              className="login-button"
            >
              Log In
            </Button>

          </form>

          <p className="auth-switch">
            Don't have an account?
            <Link to="/register">
              Sign Up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}