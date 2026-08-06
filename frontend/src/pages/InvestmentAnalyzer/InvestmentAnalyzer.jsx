import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SIPCalculator from "../../components/finance/SIPCalculator";
import FDCalculator from "../../components/finance/FDCalculator";
import InvestmentChart from "../../components/charts/InvestmentChart";

import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

import * as investmentService from "../../services/investmentService";

import { formatCurrency } from "../../utils/formatters";

import {
  FaChartLine,
  FaPiggyBank,
  FaCoins,
  FaWallet,
  FaRobot,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";

import "../LoanAnalyzer/LoanAnalyzer.css";
import "./InvestmentAnalyzer.css";

const TABS = [
  {
    key: "SIP",
    label: "SIP",
  },
  {
    key: "FD",
    label: "Fixed Deposit",
  },
];

export default function InvestmentAnalyzer() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("SIP");
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInvestments();
  }, []);

  function loadInvestments() {
    setLoading(true);

    investmentService
      .getInvestments()
      .then((data) => {
        setInvestments(data);

        if (data.length && !selected) {
          investmentService
            .getInvestment(data[0].id)
            .then(setSelected);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  async function handleCreate(payload) {
    setSubmitting(true);
    setError("");

    try {
      const saved =
        await investmentService.saveInvestment(payload);

      setInvestments((prev) => [saved, ...prev]);

      const full =
        await investmentService.getInvestment(saved.id);

      setSelected(full);

      setActiveTab(
        full.type === "FIXED_DEPOSIT"
          ? "FD"
          : "SIP"
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSelect(id) {
    const full =
      await investmentService.getInvestment(id);

    setSelected(full);
  }

  async function handleDelete(id) {
    await investmentService.deleteInvestment(id);

    setInvestments((prev) =>
      prev.filter((i) => i.id !== id)
    );

    if (selected?.id === id) {
      setSelected(null);
    }
  }

  const summary = useMemo(() => {
    if (!selected) {
      return {
        invested: 0,
        maturity: 0,
        returns: 0,
        rate: 0,
      };
    }

    return {
      invested: selected.totalInvested,
      maturity: selected.maturityValue,
      returns: selected.estimatedReturns,
      rate: selected.expectedReturn,
    };
  }, [selected]);

  // Show only investments of the selected tab
    const filteredInvestments = useMemo(() => {
    return investments.filter((investment) =>
      activeTab === "SIP"
        ? investment.type === "MUTUAL_FUND"
        : investment.type === "FIXED_DEPOSIT"
    );
  }, [investments, activeTab]);

  // Automatically switch selection when changing tabs
    useEffect(() => {

    if (filteredInvestments.length === 0) {
      setSelected(null);
      return;
    }

    if (
      !selected ||
      !filteredInvestments.some(
        (item) => item.id === selected.id
      )
    ) {
      handleSelect(filteredInvestments[0].id);
    }

  }, [filteredInvestments]);

  function openAdvisor() {

    if (!selected) {
      navigate("/ai-advisor");
      return;
    }

    navigate("/ai-advisor", {
      state: {
        investment: selected,
      },
    });

  }

  return ( <div className="investment-page">

  <div className="investment-hero">

    <span className="investment-badge">
      SMART INVESTMENT MANAGER
    </span>

    <h1>Investment Analyzer</h1>

    <p>
      Project SIP and Fixed Deposit growth,
      visualize portfolio performance and
      receive AI-powered investment insights.
    </p>

  </div>

  {error && (
    <p className="auth-error">
      {error}
    </p>
  )}

  <div className="investment-tabs">

    {TABS.map((tab) => (

      <button
        key={tab.key}
        className={`investment-tab ${
          activeTab === tab.key
            ? "investment-tab--active"
            : ""
        }`}
        onClick={() => setActiveTab(tab.key)}
      >
        {tab.label}
      </button>

    ))}

  </div>

  {!loading && selected && (

    <div className="investment-summary-grid">

      <div className="investment-summary-card">

        <div className="summary-icon blue">
          <FaWallet />
        </div>

        <span>Total Invested</span>

        <h2>
          {formatCurrency(summary.invested)}
        </h2>

      </div>

      <div className="investment-summary-card">

        <div className="summary-icon green">
          <FaPiggyBank />
        </div>

        <span>Maturity Value</span>

        <h2>
          {formatCurrency(summary.maturity)}
        </h2>

      </div>

      <div className="investment-summary-card">

        <div className="summary-icon orange">
          <FaChartLine />
        </div>

        <span>Projected Returns</span>

        <h2>
          {formatCurrency(summary.returns)}
        </h2>

      </div>

      <div className="investment-summary-card">

        <div className="summary-icon purple">
          <FaCoins />
        </div>

        <span>Expected Return</span>

        <h2>
          {summary.rate}%
        </h2>

      </div>

    </div>

  )}

  <div className="investment-main-grid">

    <div className="investment-form-section">

      {activeTab === "SIP" ? (

        <SIPCalculator
          onSubmit={handleCreate}
          submitting={submitting}
        />

      ) : (

        <FDCalculator
          onSubmit={handleCreate}
          submitting={submitting}
        />

      )}

    </div>

    <div className="investment-content">

      {loading ? (

        <Loader label="Loading your investments..." />

      ) : selected ? (

        <>

          <div className="investment-detail-grid">

            <div className="investment-detail-card">

              <div className="investment-detail-header">

                <div>

                  <h2>
                    {selected.investmentName}
                  </h2>

                  <p className="text-muted">

                    {selected.type?.replaceAll("_", " ")}

                    {" • "}

                    {selected.expectedReturn}% Expected Return

                  </p>

                </div>

                <button
                  className="delete-icon-btn"
                  onClick={() => handleDelete(selected.id)}
                >
                  <FaTrash />
                </button>

              </div>

              <div className="investment-metrics">

                <div className="metric-box">

                  <span>Total Invested</span>

                  <h3>

                    {formatCurrency(
                      selected.totalInvested
                    )}

                  </h3>

                </div>

                <div className="metric-box">

                  <span>Maturity Value</span>

                  <h3>

                    {formatCurrency(
                      selected.maturityValue
                    )}

                  </h3>

                </div>

                <div className="metric-box">

                  <span>Estimated Returns</span>

                  <h3>

                    {formatCurrency(
                      selected.estimatedReturns
                    )}

                  </h3>

                </div>

                <div className="metric-box">

                  <span>Expected Return</span>

                  <h3>

                    {selected.expectedReturn}%

                  </h3>

                </div>

              </div>

              <div className="investment-chart-wrapper">

                <InvestmentChart
                  growthProjection={
                    selected.growthProjection
                  }
                />

              </div>

            </div>             <div className="investment-ai-card">

              <div className="ai-icon">
                <FaRobot />
              </div>

              <h3>
                AI Investment Insights
              </h3>

              <p>
                Your investment could grow to{" "}
                <strong>
                  {formatCurrency(selected.maturityValue)}
                </strong>
              </p>

              <p>
                Continue investing consistently and review
                your portfolio periodically to maximize
                long-term wealth creation.
              </p>

              <Button
                onClick={openAdvisor}
              >
                <FaArrowRight />
                &nbsp;
                Open AI Advisor
              </Button>

            </div>

          </div>

          <div className="saved-investment-card">

            <h3>Your Saved Investments</h3>

            {filteredInvestments.length === 0 ? (

              <p className="text-muted">
                No investments found.
              </p>

            ) : (

              <div className="saved-investment-grid">

                {filteredInvestments.map((investment) => {

                  const active =
                    selected?.id === investment.id;

                  return (

                    <div
                    key={investment.id}
                    className={`saved-investment-card ${
                      active ? "active" : ""
                    }`}
                      onClick={() =>
                        handleSelect(investment.id)
                      }
                    >

                     

                     <div className="saved-investment-top">

                        <h4>{investment.investmentName}</h4>

                        <button
                          className="saved-investment-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(investment.id);
                          }}
                        >
                          <FaTrash />
                        </button>

                        </div>

                      <div className="saved-investment-body">

                        <div>
                          <span>Type</span>
                          <strong>
                            {investment.type?.replaceAll("_", " ")}
                          </strong>
                        </div>

                        <div>
                          <span>Maturity Value</span>
                          <strong>
                            {formatCurrency(investment.maturityValue)}
                          </strong>
                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </>

      ) : (

        <div className="loan-analyzer__empty">

          <p className="text-muted">
            Create your first investment to start
            analyzing your future wealth.
          </p>

        </div>

      )}

    </div>

  </div>

</div>

);
}