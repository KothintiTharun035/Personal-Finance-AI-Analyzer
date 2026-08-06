import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Wallet,
  Landmark,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { getDashboardSummary } from "../../services/authService";
import ExpenseChart from "../../components/charts/ExpenseChart";
import Loader from "../../components/common/Loader";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../hooks/useAuth";
import { formatCurrency } from "../../utils/formatters";

import "./Dashboard.css";

export default function Dashboard() {

  const { user } = useAuth();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    getDashboardSummary()
      .then(setSummary)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, []);

  if (loading) {
    return (
      <Layout>
        <Loader label="Loading your dashboard..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="auth-error">{error}</p>
      </Layout>
    );
  }

  const hasAnyData =
    summary.totalLoans > 0 ||
    summary.totalInvestments > 0 ||
    summary.totalGoals > 0;

  const greeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";

    if (hour < 17) return "Good Afternoon 👋";

    return "Good Evening 🌙";

  };

  return (

<Layout>

<div className="dashboard">

    {/* Hero */}

    <section className="dashboard-hero">

        <div>

            <span className="dashboard-greeting">

                {greeting()}

            </span>

            <h1>

                Welcome Back,

                {user?.fullName
                    ? ` ${user.fullName.split(" ")[0]}`
                    : ""}

            </h1>

            <p>

                Track your financial health with
                AI-powered insights and smarter
                money decisions.

            </p>

        </div>

    </section>
    <section className="dashboard-stats">

    <div className="dashboard-stat-card">

        <div className="stat-icon blue">

            <Wallet />

        </div>

        <h4>Total Investments</h4>

        <h2>

            {formatCurrency(summary.investedAmount)}

        </h2>

    </div>

    <div className="dashboard-stat-card">

        <div className="stat-icon orange">

            <Landmark />

        </div>

        <h4>Total Loans</h4>

        <h2>

            {summary.totalLoans}

        </h2>

    </div>

    <div className="dashboard-stat-card">

        <div className="stat-icon green">

            <TrendingUp />

        </div>

        <h4>Projected Gains</h4>

        <h2>

            {formatCurrency(summary.profit)}

        </h2>

    </div>

    <div className="dashboard-stat-card">

        <div className="stat-icon purple">

            <Target />

        </div>

        <h4>Financial Goals</h4>

        <h2>

            {summary.totalGoals}

        </h2>

    </div>

</section>
{/* Dashboard Content */}

{!hasAnyData ? (

<section className="dashboard-empty">

    <Sparkles
        size={60}
        className="empty-icon"
    />

    <h2>

        Your Dashboard is Waiting 🚀

    </h2>

    <p>

        Add your first loan, investment,
        or financial goal to unlock
        powerful analytics and AI insights.

    </p>

    <div className="quick-actions">

        <Link
            to="/loans"
            className="action-card"
        >

            <Landmark size={30} />

            <span>Add Loan</span>

        </Link>

        <Link
            to="/investments"
            className="action-card"
        >

            <TrendingUp size={30} />

            <span>Add Investment</span>

        </Link>

        <Link
            to="/goals"
            className="action-card"
        >

            <Target size={30} />

            <span>Create Goal</span>

        </Link>

        <Link
            to="/ai-advisor"
            className="action-card"
        >

            <Sparkles size={30} />

            <span>AI Advisor</span>

        </Link>

    </div>

</section>

) : (

<>

<section className="dashboard-grid">

    {/* Portfolio */}

    <div className="dashboard-card large-card">

        <div className="card-header">
            <h3>Portfolio Overview</h3>
        </div>

        <div className="portfolio-summary">

            <div className="summary-item">
                <span>Total Investment</span>
                <strong>{formatCurrency(summary.investedAmount)}</strong>
            </div>

            <div className="summary-item">
                <span>Projected Value</span>
                <strong>{formatCurrency(summary.currentValue)}</strong>
            </div>

            <div className="summary-item">
                <span>Projected Profit</span>

                <strong
                    className={
                        summary.profit >= 0
                            ? "profit-positive"
                            : "profit-negative"
                    }
                >
                    {formatCurrency(summary.profit)}
                </strong>
            </div>

            <div className="summary-item">
                <span>Total Loans</span>
                <strong>{summary.totalLoans}</strong>
            </div>

            <div className="summary-item">
                <span>Financial Goals</span>
                <strong>{summary.totalGoals}</strong>
            </div>

            <div className="portfolio-progress">

                <div className="progress-header">
                    <span>Portfolio Health</span>
                    <span>Good</span>
                </div>

                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>

            </div>

        </div>

    </div>

    {/* AI */}

    <div className="dashboard-card ai-card">

        <div className="ai-icon">

            🤖

        </div>

        <h3>

            AI Financial Insight

        </h3>

        <p>

            {summary.totalInvestments === 0

                ? "Start by adding your first investment to receive personalized AI recommendations."

                : "Your portfolio looks healthy. Continue investing consistently to maximize long-term growth."}

        </p>

        <Link

            to="/ai-advisor"

            className="ai-button"

        >

            Open AI Advisor

            <ArrowRight size={18} />

        </Link>

    </div>

</section>

<section className="quick-actions-section">

    <h2>

        Quick Actions

    </h2>

    <div className="quick-actions">

        <Link
            to="/loans"
            className="action-card"
        >

            <Landmark size={30} />

            <span>

                Loan Analyzer

            </span>

        </Link>

        <Link
            to="/investments"
            className="action-card"
        >

            <TrendingUp size={30} />

            <span>

                Investments

            </span>

        </Link>

        <Link
            to="/goals"
            className="action-card"
        >

            <Target size={30} />

            <span>

                Goal Planner

            </span>

        </Link>

        <Link
            to="/profile"
            className="action-card"
        >

            <Wallet size={30} />

            <span>

                My Profile

            </span>

        </Link>

    </div>

</section>

</>

)}

</div>

</Layout>

);

}