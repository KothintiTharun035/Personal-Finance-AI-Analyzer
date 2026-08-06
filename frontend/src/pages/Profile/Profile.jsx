import React, { useMemo, useState } from "react";
import {
  User,
  Mail,
  Wallet,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Camera,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import * as authService from "../../services/authService";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import "./Profile.css";

export default function Profile() {

  const { user, setUser } = useAuth();

  const [form, setForm] = useState({

    fullName: user?.fullName || "",

    email: user?.email || "",

    monthlyIncome: user?.monthlyIncome || "",

  });

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  /* ============================================
      Profile Completion
  ============================================ */

  const profileCompletion = useMemo(() => {

    let score = 40;

    if (form.fullName) score += 20;

    if (form.email) score += 20;

    if (form.monthlyIncome) score += 20;

    return score;

  }, [form]);

  /* ============================================
      Form Change
  ============================================ */

  function handleChange(e) {

    setForm((prev) => ({

      ...prev,

      [e.target.name]: e.target.value,

    }));

  }

  /* ============================================
      Save Profile
  ============================================ */

  async function handleSubmit(e) {

    e.preventDefault();

    setSaving(true);

    setMessage("");

    setError("");

    try {

      const updated = await authService.updateProfile({

        ...form,

        monthlyIncome: form.monthlyIncome
          ? Number(form.monthlyIncome)
          : null,

      });

      setUser((prev) => ({

        ...prev,

        ...updated,

      }));

      setMessage("Profile updated successfully.");

    } catch (err) {

      setError(err.message);

    } finally {

      setSaving(false);

    }

  }

  return (

    <div className="profile-page">

      {/* ============================================
            Page Header
      ============================================ */}

      <div className="profile-header">

        <div>

          <h1>

            My Profile

          </h1>

          <p>

            Manage your personal information and
            help FinanceAI provide smarter financial
            recommendations.

          </p>

        </div>

      </div>

      {/* ============================================
            Top Cards
      ============================================ */}

      <div className="profile-top-grid">

        {/* ===============================
              User Card
        =============================== */}

        <div className="profile-user-card">

          <div className="profile-avatar">

            {user?.fullName
              ? user.fullName.charAt(0).toUpperCase()
              : "U"}

            <button
              type="button"
              className="avatar-edit-btn"
            >

              <Camera size={15} />

            </button>

          </div>

          <h2>

            {user?.fullName || "FinanceAI User"}

          </h2>


          <span className="member-badge">

            <ShieldCheck size={15} />

            FinanceAI Member

          </span>

        </div>

        {/* ===============================
              AI Card
        =============================== */}

        <div className="profile-ai-card">

          <div className="ai-card-header">

            <Sparkles size={22} />

            <h3>

              AI Personalization

            </h3>

          </div>

          <p>

            Complete your profile to receive
            personalized financial insights,
            investment recommendations and
            smarter budgeting advice.

          </p>

          <div className="completion-wrapper">

            <div className="completion-title">

              <span>

                Profile Completion

              </span>

              <strong>

                {profileCompletion}%

              </strong>

            </div>

            <div className="completion-bar">

              <div
                className="completion-fill"
                style={{
                  width: `${profileCompletion}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* ============================================
            Main Content
      ============================================ */}

      <div className="profile-content">

        {/* ============================================
              Left Column Starts Here
        ============================================ */}

        <div className="profile-left">

          <form
            className="profile-form card"
            onSubmit={handleSubmit}
          >
                        <h3 className="section-title">

              Personal Information

            </h3>


            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Monthly Income"
              name="monthlyIncome"
              type="number"
              prefix="₹"
              value={form.monthlyIncome}
              onChange={handleChange}
            />

            {message && (

              <div className="profile-success">

                {message}

              </div>

            )}

            {error && (

              <div className="profile-error">

                {error}

              </div>

            )}

            <Button
              type="submit"
              loading={saving}
            >

              Save Changes

            </Button>

          </form>

        </div>

        {/* ============================================
              Right Column
        ============================================ */}

        <div className="profile-right">

          {/* ===============================
                Income Card
          =============================== */}

          <div className="card profile-stat-card">

            <div className="stat-icon income-icon">

              <Wallet size={26} />

            </div>

            <div>

              <span>

                Monthly Income

              </span>

              <h2>

                {form.monthlyIncome
                  ? `₹${Number(form.monthlyIncome).toLocaleString()}`
                  : "Not Added"}

              </h2>

            </div>

          </div>

          {/* ===============================
                AI Summary
          =============================== */}

          <div className="card ai-summary-card">

            <div className="summary-header">

              <TrendingUp size={22} />

              <h3>

                AI Financial Summary

              </h3>

            </div>

            <ul>

              <li>

                {form.monthlyIncome
                  ? "✅ Monthly income available for AI analysis."
                  : "⚠ Add your monthly income for better recommendations."}

              </li>

              <li>

                {form.email
                  ? "✅ Contact information completed."
                  : "⚠ Email address missing."}

              </li>

              <li>

                {profileCompletion >= 100
                  ? "✅ Your profile is fully completed."
                  : "⚠ Complete your profile for smarter AI advice."}

              </li>

            </ul>

          </div>

          {/* ===============================
                Tips Card
          =============================== */}

          <div className="card profile-tip-card">

            <div className="summary-header">

              <Sparkles size={22} />

              <h3>

                FinanceAI Tips

              </h3>

            </div>

            <ul className="tips-list">

              <li>

                💰 Update your monthly income regularly.

              </li>

              <li>

                📈 Keep investments updated for better AI analysis.

              </li>

              <li>

                🎯 Track your financial goals frequently.

              </li>

              <li>

                🏦 Maintain accurate loan information.

              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

}