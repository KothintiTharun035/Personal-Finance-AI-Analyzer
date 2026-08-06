  import React, { useEffect, useState } from 'react'
  import {
    FaUniversity,
    FaMoneyBillWave,
    FaPercentage,
    FaWallet,
    FaRobot,
    FaChartLine,
    FaTrash
  } from 'react-icons/fa'

  import LoanCalculator from '../../components/finance/LoanCalculator'
  import LoanChart from '../../components/charts/LoanChart'
  import Loader from '../../components/common/Loader'
  import Button from '../../components/common/Button'

  import * as loanService from '../../services/loanService'
  import {
    formatCurrency,
    monthsToYearsLabel
  } from '../../utils/formatters'

  import './LoanAnalyzer.css'

  import { useNavigate } from "react-router-dom";


  export default function LoanAnalyzer() {
    const [loans, setLoans] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [selectedLoan, setSelectedLoan] = useState(null)
    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
      loadLoans()
    }, [])

    function loadLoans() {
      setLoading(true)

      loanService
        .getLoans()
        .then((data) => {
          setLoans(data)

          if (data.length && !selectedLoan) {
            loanService.getLoan(data[0].id).then(setSelectedLoan)
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }

    async function handleCreate(payload) {
      setSubmitting(true)
      setError('')

      try {
        const saved = await loanService.saveLoan(payload)

        setLoans((prev) => [saved, ...prev])

        const fullLoan = await loanService.getLoan(saved.id)

        setSelectedLoan(fullLoan)
      } catch (err) {
        setError(err.message)
      } finally {
        setSubmitting(false)
      }
    }

    async function handleSelectLoan(id) {
      const fullLoan = await loanService.getLoan(id)
      setSelectedLoan(fullLoan)
    }

    async function handleDelete(id) {
      await loanService.deleteLoan(id)

      setLoans((prev) => prev.filter((loan) => loan.id !== id))

      if (selectedLoan?.id === id) {
        setSelectedLoan(null)
      }
    }

    return (
      <div className="loan-analyzer">

        <div className="loan-header">

          <div>
            <span className="loan-badge">
              SMART LOAN MANAGER
            </span>

            <h1>Loan Analyzer</h1>

            <p>
              Calculate EMIs, monitor repayment,
              visualize loan schedules and receive
              AI-powered repayment insights.
            </p>
          </div>

        </div>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        {loading ? (
          <Loader label="Loading loans..." />
        ) : (
          <>

            {selectedLoan && (

              <div className="loan-summary-cards">

                <div className="summary-card">

                  <div className="summary-icon blue">
                    <FaUniversity />
                  </div>

                  <h4>Loan Amount</h4>

                  <h2>
                    {formatCurrency(selectedLoan.loanAmount)}
                  </h2>

                </div>

                <div className="summary-card">

                  <div className="summary-icon green">
                    <FaMoneyBillWave />
                  </div>

                  <h4>Monthly EMI</h4>

                  <h2>
                    {formatCurrency(selectedLoan.emiAmount)}
                  </h2>

                </div>

                <div className="summary-card">

                  <div className="summary-icon orange">
                    <FaPercentage />
                  </div>

                  <h4>Total Interest</h4>

                  <h2>
                    {formatCurrency(selectedLoan.totalInterest)}
                  </h2>

                </div>

                <div className="summary-card">

                  <div className="summary-icon purple">
                    <FaWallet />
                  </div>

                  <h4>Total Payment</h4>

                  <h2>
                    {formatCurrency(selectedLoan.totalPayment)}
                  </h2>

                </div>

              </div>

            )}

            <div className="loan-main-grid">

              <div className="loan-form-card">

                <LoanCalculator
                  onSubmit={handleCreate}
                  submitting={submitting}
                />

              </div>

              <div className="loan-right-section">

                {selectedLoan ? (

                  <>
                    <div className="loan-info-grid">

                      <div className="loan-summary-card">

                        <div className="card-header">

                          <div>

                            <h3>
                              {selectedLoan.loanName}
                            </h3>

                            <p className="text-muted">
                              {monthsToYearsLabel(selectedLoan.tenureMonths)} • {selectedLoan.interestRate}% p.a.
                            </p>

                          </div>

                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              handleDelete(selectedLoan.id)
                            }
                          >
                            <FaTrash />
                          </Button>

                        </div>

                        <div className="loan-details-grid">

                          <div>
                            <span>Principal</span>

                            <strong>
                              {formatCurrency(
                                selectedLoan.loanAmount
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>Monthly EMI</span>

                            <strong>
                              {formatCurrency(
                                selectedLoan.emiAmount
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>Total Interest</span>

                            <strong>
                              {formatCurrency(
                                selectedLoan.totalInterest
                              )}
                            </strong>
                          </div>

                          <div>
                            <span>Total Payment</span>

                            <strong>
                              {formatCurrency(
                                selectedLoan.totalPayment
                              )}
                            </strong>
                          </div>

                        </div>

                        <LoanChart
                          schedule={selectedLoan.schedule}
                        />

                      </div>

                      <div className="loan-ai-card">

                        <div className="ai-icon">
                          <FaRobot />
                        </div>

                        <h3>AI Loan Insights</h3>

                        <p>
                          Your monthly EMI is{' '}
                          <strong>
                            {formatCurrency(
                              selectedLoan.emiAmount
                            )}
                          </strong>
                          .
                        </p>

                        <p>
                          Paying a little extra every
                          month can significantly reduce
                          your total interest and loan tenure.
                        </p>

                        <Button
                          onClick={() =>
                            navigate("/ai-advisor", {
                              state: {
                                source: "loan",
                                loan: selectedLoan,
                              },
                            })
                          }
                        >
                          <FaChartLine />
                          &nbsp;Open AI Advisor
                        </Button>

                      </div>

                    </div>

                    {/* PART 2 STARTS FROM HERE */}                  
                    <div className="saved-loans-card">

                      <h3>Your Saved Loans</h3>

                      {loans.length ? (

                        <div className="saved-loans-grid">

                          {loans.map((loan) => (

                            <div
                              key={loan.id}
                              className={`saved-loan-card ${
                                selectedLoan?.id === loan.id
                                  ? 'active'
                                  : ''
                              }`}
                              onClick={() =>
                                handleSelectLoan(loan.id)
                              }
                            >
                              <div className="saved-loan-top">

                                <h4>{loan.loanName}</h4>

                                <button
                                  className="delete-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(loan.id)
                                  }}
                                >
                                  <FaTrash />
                                </button>

                              </div>

                              <div className="saved-loan-body">

                                <div>

                                  <span>EMI</span>

                                  <strong>
                                    {formatCurrency(
                                      loan.emiAmount
                                    )}
                                    /mo
                                  </strong>

                                </div>

                                <div>

                                  <span>Loan</span>

                                  <strong>
                                    {formatCurrency(
                                      loan.loanAmount
                                    )}
                                  </strong>

                                </div>

                              </div>

                            </div>

                          ))}

                        </div>

                      ) : (

                        <div className="loan-empty">

                          <h3>No Loans Yet</h3>

                          <p>
                            Add your first loan using the
                            calculator on the left.
                          </p>

                        </div>

                      )}

                    </div>

                  </>

                ) : (

                  <div className="loan-empty">

                    <h2>No Loan Selected</h2>

                    <p>
                      Create a new loan or select one from
                      your saved loans to see its complete
                      analysis.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </>

        )}

      </div>
    )
  }