import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBullseye,
  FaPiggyBank,
  FaWallet,
  FaChartLine,
  FaRobot,
  FaTrash,
} from "react-icons/fa";

import GoalPlannerForm from "../../components/finance/GoalPlanner";
import GoalChart from "../../components/charts/GoalChart";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

import * as goalService from "../../services/goalService";

import {
  formatCurrency,
  monthsToYearsLabel,
} from "../../utils/formatters";

import "./GoalPlannerPage.css";

export default function GoalPlanner() {

  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);

  const [selectedGoal, setSelectedGoal] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  function loadGoals() {

    setLoading(true);

    goalService
      .getGoals()
      .then((data) => {

        setGoals(data);

        if (data.length && !selectedGoal) {

          goalService
            .getGoal(data[0].id)
            .then(setSelectedGoal);

        }

      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }

  async function handleCreate(payload) {

    setSubmitting(true);

    setError("");

    try {

      const saved = await goalService.createGoal(payload);

      setGoals((prev) => [saved, ...prev]);

      const fullGoal = await goalService.getGoal(saved.id);

      setSelectedGoal(fullGoal);

    } catch (err) {

      setError(err.message);

    } finally {

      setSubmitting(false);

    }

  }

  async function handleSelectGoal(id) {

    const fullGoal = await goalService.getGoal(id);

    setSelectedGoal(fullGoal);

  }

  async function handleDelete(id) {

    await goalService.deleteGoal(id);

    setGoals((prev) =>
      prev.filter((goal) => goal.id !== id)
    );

    if (selectedGoal?.id === id) {

      setSelectedGoal(null);

    }

  }

  function openAdvisor() {

    if (!selectedGoal) {

      navigate("/ai-advisor");

      return;

    }

    navigate("/ai-advisor", {

      state: {

        source: "goal",

        goal: selectedGoal,

      },

    });

  }
  return (
  <div className="loan-analyzer">

    {/* ===============================
        HERO
    ================================ */}

    <div className="loan-header">

      <div>

        <span className="loan-badge">
          SMART GOAL PLANNER
        </span>

        <h1>Goal Planner</h1>

        <p>
          Plan your financial goals, track your savings,
          visualize your progress and receive
          AI-powered financial guidance.
        </p>

      </div>

    </div>

    {error && (
      <p className="auth-error">
        {error}
      </p>
    )}

    {loading ? (

      <Loader label="Loading goals..." />

    ) : (

      <>

        {selectedGoal && (

          <div className="loan-summary-cards">

            {/* Target Amount */}

            <div className="summary-card">

              <div className="summary-icon blue">
                <FaBullseye />
              </div>

              <h4>Target Amount</h4>

              <h2>
                {formatCurrency(selectedGoal.targetAmount)}
              </h2>

            </div>

            {/* Current Savings */}

            <div className="summary-card">

              <div className="summary-icon green">
                <FaPiggyBank />
              </div>

              <h4>Current Savings</h4>

              <h2>
                {formatCurrency(selectedGoal.currentSavings)}
              </h2>

            </div>

            {/* Monthly Required */}

            <div className="summary-card">

              <div className="summary-icon orange">
                <FaWallet />
              </div>

              <h4>Monthly Required</h4>

              <h2>
                {formatCurrency(
                  selectedGoal.requiredMonthlyInvestment
                )}
              </h2>

            </div>

            {/* Progress */}

            <div className="summary-card">

              <div className="summary-icon purple">
                <FaChartLine />
              </div>

              <h4>Progress</h4>

              <h2>

                {selectedGoal.progress.toFixed(1)}%

              </h2>

            </div>

          </div>

        )}

        <div className="loan-main-grid">

          {/* LEFT FORM */}

          <div className="loan-form-card">

            <GoalPlannerForm
              onSubmit={handleCreate}
              submitting={submitting}
            />

          </div>

          {/* RIGHT SECTION */}

          <div className="loan-right-section">
            {selectedGoal ? (

  <>

    <div className="loan-info-grid">

      {/* =========================
          GOAL DETAILS
      ========================== */}

      <div className="loan-summary-card">

        <div className="card-header">

          <div>

            <h3>

              {selectedGoal.goalName}

            </h3>

            <p className="text-muted">

              {monthsToYearsLabel(selectedGoal.tenureMonths)}

            </p>

          </div>

          

        </div>

        <div className="loan-details-grid">

          <div>

            <span>Target Amount</span>

            <strong>

              {formatCurrency(
                selectedGoal.targetAmount
              )}

            </strong>

          </div>

          <div>

            <span>Current Savings</span>

            <strong>

              {formatCurrency(
                selectedGoal.currentSavings
              )}

            </strong>

          </div>

          <div>

            <span>Monthly Required</span>

            <strong>

              {formatCurrency(
                selectedGoal.requiredMonthlyInvestment
              )}

            </strong>

          </div>

          <div>

            <span>Progress</span>

            <strong>

              {selectedGoal.progress.toFixed(1)}%

            </strong>

          </div>

        </div>

        <GoalChart
          progressPercentage={
            selectedGoal.progress
          }
        />

      </div>

      {/* =========================
          AI GOAL COACH
      ========================== */}

      <div className="loan-ai-card">

        <div className="ai-icon">

          <FaRobot />

        </div>

        <h3>

          AI Goal Coach

        </h3>

        <p>

          You have achieved{" "}

          <strong>

            {selectedGoal.progress.toFixed(1)}%

          </strong>

          {" "}of your financial goal.

        </p>

        <p>

          Ask AI how you can reach this goal
          faster, reduce your monthly investment,
          or discover better investment strategies.

        </p>

        <Button

          onClick={openAdvisor}

        >

          <FaChartLine />

          &nbsp;

          Open AI Advisor

        </Button>

      </div>

    </div>  


    {/* =========================SAVED GOALS========================== */}

                  <div className="saved-loans-card">

                    <h3>Your Saved Goals</h3>

                    {goals.length ? (

                      <div className="saved-loans-grid">

                        {goals.map((goal) => (

                          <div
                            key={goal.id}
                            className={`saved-loan-card ${
                              selectedGoal?.id === goal.id
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleSelectGoal(goal.id)
                            }
                          >

                            <div className="saved-loan-top">

                              <h4>{goal.goalName}</h4>

                              <button
                                className="delete-btn"
                                onClick={(e) => {

                                  e.stopPropagation();

                                  handleDelete(goal.id);

                                }}
                              >

                                <FaTrash />

                              </button>

                            </div>

                            <div className="saved-loan-body">

                              <div>

                                <span>Target</span>

                                <strong>

                                  {formatCurrency(
                                    goal.targetAmount
                                  )}

                                </strong>

                              </div>

                              <div>

                                <span>Progress</span>

                                <strong>

                                  {goal.progress.toFixed(1)}%

                                </strong>

                              </div>

                            </div>

                          </div>

                        ))}

                      </div>

                    ) : (

                      <div className="loan-empty">

                        <h3>No Goals Yet</h3>

                        <p>

                          Create your first financial goal
                          using the planner on the left.

                        </p>

                      </div>

                    )}

                  </div>

                </>

              ) : (

                <div className="loan-empty">

                  <h2>No Goal Selected</h2>

                  <p>

                    Create a new goal or select one from
                    your saved goals to see its complete
                    analysis.

                  </p>

                </div>

              )}

            </div>

          </div>

        </>

      )}

    </div>

  );

}