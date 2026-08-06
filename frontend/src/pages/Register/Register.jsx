import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { isValidEmail, minLength } from "../../utils/validators";
import RegisterAnimation from "../../components/RegisterAnimation";

import "./Register.css";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.fullName.trim())
      nextErrors.fullName = "Full name is required";

    if (!isValidEmail(form.email))
      nextErrors.email = "Enter a valid email address";

    if (!minLength(form.password, 6))
      nextErrors.password = "Password must be at least 6 characters";

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitError("");

    if (!validate()) return;

    setSubmitting(true);

    try {

      navigate("/dashboard", { replace: true });

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="register-page">

      <div className="register-overlay"></div>

      <div className="register-container">

        {/* Left Side */}

        <div className="register-left">

          <h1 className="register-brand">
            FinanceAI
          </h1>

          <p className="register-tagline">
            Build your financial future with intelligent
            <br />AI-powered planning and insights.
          </p>
            <RegisterAnimation />
        </div>

        {/* Right Side */}

        <div className="register-card">

          <h1 className="register-title">
            Create Account !!
          </h1>

          <p className="register-subtitle">
            Join FinanceAI and start managing your money smarter.
          </p>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />


            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              required
            />


            {submitError && (
              <p className="auth-error">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              full
              loading={submitting}
              className="register-button"
            >
              Create Account
            </Button>

          </form>

          <p className="auth-switch">
            Already have an account?

            <Link to="/login">
              Log In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}