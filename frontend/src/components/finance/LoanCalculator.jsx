import React, { useState, useMemo } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import { LOAN_TYPES } from '../../utils/constants'
import { calculateEMI } from '../../utils/calculations'
import { formatCurrency } from '../../utils/formatters'
import './finance.css'

const initialState = {
  loanName: '',
  loanType: 'HOME_LOAN',
  principalAmount: '',
  annualInterestRate: '',
  tenureMonths: '',
}

export default function LoanCalculator({ onSubmit, submitting }) {
  const [form, setForm] = useState(initialState)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const livePreviewEmi = useMemo(() => {
    const p = Number(form.principalAmount)
    const r = Number(form.annualInterestRate)
    const n = Number(form.tenureMonths)
    if (!p || !r || !n) return null
    return calculateEMI(p, r, n)
  }, [form.principalAmount, form.annualInterestRate, form.tenureMonths])

  function handleSubmit(e) {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    onSubmit({
      loanName: form.loanName || `${form.loanType} Loan`,
      loanType: form.loanType,

      loanAmount: Number(form.principalAmount),
      outstandingAmount: Number(form.principalAmount),

      interestRate: Number(form.annualInterestRate),
      tenureMonths: Number(form.tenureMonths),

      startDate: today,
      endDate: null,
    });
  }

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
      <Input
        label="Loan name (optional)"
        name="loanName"
        value={form.loanName}
        onChange={handleChange}
        placeholder="e.g. Apartment home loan"
      />

      <div className="finance-form__field">
        <label className="input-field__label" htmlFor="loanType">Loan type</label>
        <select id="loanType" name="loanType" value={form.loanType} onChange={handleChange} className="finance-form__select">
          {LOAN_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <Input
        label="Principal amount"
        name="principalAmount"
        type="number"
        min="0"
        step="1000"
        prefix="₹"
        value={form.principalAmount}
        onChange={handleChange}
        required
      />

      <Input
        label="Annual interest rate"
        name="annualInterestRate"
        type="number"
        min="0"
        step="0.1"
        suffix="%"
        value={form.annualInterestRate}
        onChange={handleChange}
        required
      />

      <Input
        label="Tenure"
        name="tenureMonths"
        type="number"
        min="1"
        suffix="months"
        value={form.tenureMonths}
        onChange={handleChange}
        required
      />

      {livePreviewEmi ? (
        <div className="finance-form__preview">
          <span className="text-muted">Estimated EMI</span>
          <span className="figure-lg">{formatCurrency(livePreviewEmi)}</span>
        </div>
      ) : null}

      <Button
        type="submit"
        full
        loading={submitting}
        className="finance-submit-btn"
      >
        Calculate & save
      </Button>
    </form>
  )
}
